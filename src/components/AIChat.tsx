import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Languages, Trash2 } from "lucide-react";
import { getAIResponse } from "../lib/gemini";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AIChat({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'np'>('np');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "users", userId, "chats"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      userId,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      language: lang
    };

    setInput("");
    setLoading(true);

    try {
      // Save user message to Firestore
      await addDoc(collection(db, "users", userId, "chats"), {
        ...userMsg,
        timestamp: serverTimestamp()
      });

      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      history.push({ role: 'user', parts: [{ text: input }] });

      const aiResponse = await getAIResponse(history);

      // Save AI message to Firestore
      const aiMsg: ChatMessage = {
        userId,
        role: 'model',
        content: aiResponse || "Sorry, I couldn't generate a response.",
        timestamp: new Date().toISOString(),
        language: lang
      };
      
      await addDoc(collection(db, "users", userId, "chats"), {
        ...aiMsg,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-6">
            <Bot className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold">Namaste! How can I help you today?</h3>
            <p className="text-sm max-w-xs mt-2 italic text-slate-500">Ask about constitutional articles, geography, or recent updates.</p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id || i}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 text-slate-500 rounded-tl-none border border-slate-200 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about Loksewa..."
              className="flex-1 px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setLang(lang === 'en' ? 'np' : 'en')}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all"
                >
                  <Languages className="w-3 h-3" />
                  Mode: {lang === 'en' ? 'English' : 'Nepali'}
                </button>
             </div>
             <p className="text-[10px] text-slate-400 font-medium italic">AI responses can sometimes be inaccurate. Always verify with official sources.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
