import { useState } from "react";
import { Play, CheckCircle2, Clock, Trophy, ArrowRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Question } from "../types";

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "1",
    text: "नेपालको संविधान २०७२ मा कति भाग, धारा र अनुसूची रहेका छन्?",
    options: ["३५ भाग, ३०८ धारा, ९ अनुसूची", "३० भाग, ३०५ धारा, ८ अनुसूची", "३२ भाग, ३०० धारा, ७ अनुसूची", "३५ भाग, ३०८ धारा, १० अनुसूची"],
    correctAnswer: 0,
    explanation: "नेपालको संविधान २०७२ मा ३५ भाग, ३०८ धारा र ९ अनुसूची रहेका छन्। यो संविधान २०७२ असोज ३ गते जारी गरिएको हो।",
    category: "Constitution"
  },
  {
    id: "2",
    text: "Who is known as the 'Father of the Nation' in Nepal?",
    options: ["Prithvi Narayan Shah", "King Mahendra", "Tribhuvan Shaha", "B.P. Koirala"],
    correctAnswer: 2,
    explanation: "King Tribhuvan was the King of Nepal from 1911 to 1955. He is known as the Father of the Nation for his role in ending the Rana regime.",
    category: "History"
  }
];

export default function MockTests({ userId }: { userId: string }) {
  const [testStarted, setTestStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStart = () => {
    setTestStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setShowResults(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === SAMPLE_QUESTIONS[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  if (!testStarted) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight uppercase">Exam Preparation Hub</h2>
           <p className="text-slate-500">Select a category to start a timed mock test.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "Section Officer (Full)", time: "180 min", q: "100 Qs", difficulty: "High" },
            { name: "Nayab Subba (GK)", time: "45 min", q: "50 Qs", difficulty: "Medium" },
            { name: "Kharidar (First Paper)", time: "45 min", q: "50 Qs", difficulty: "Easy" },
            { name: "Constitutional Law Quiz", time: "15 min", q: "20 Qs", difficulty: "Expert" }
          ].map((test, i) => (
            <motion.div 
               key={i}
               whileHover={{ scale: 1.02 }}
               className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-xl font-bold text-slate-900">{test.name}</h3>
                     <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">{test.difficulty}</span>
                  </div>
                  <div className="flex gap-4 mb-8 text-sm text-slate-500 font-medium">
                     <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {test.time}</span>
                     <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> {test.q}</span>
                  </div>
               </div>
               <button 
                 onClick={handleStart}
                 className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group"
               >
                 Take Test <Play className="w-4 h-4 group-hover:scale-125 transition-transform" />
               </button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
           <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <Trophy className="w-12 h-12" />
           </div>
           <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 font-mono italic">TEST COMPLETED!</h2>
              <p className="text-slate-500">You've successfully finished the constitution quiz.</p>
           </div>
           
           <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
              <div className="text-6xl font-black text-blue-600 mb-2">{score}/{SAMPLE_QUESTIONS.length}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Score</div>
           </div>

           <div className="flex flex-col gap-3 pt-4">
              <button 
                onClick={handleStart}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              >
                Try Again
              </button>
              <button 
                onClick={() => setTestStarted(false)}
                className="w-full py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Back to Tests
              </button>
           </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = SAMPLE_QUESTIONS[currentIndex];

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1 bg-slate-200 w-full overflow-hidden shrink-0">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
           <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-slate-400">
              <span>Question {currentIndex + 1} of {SAMPLE_QUESTIONS.length}</span>
              <span className="flex items-center gap-1.5 text-blue-600"><Clock className="w-4 h-4" /> 14:24</span>
           </div>

           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 leading-snug">{currentQ.text}</h3>
              
              <div className="grid gap-4">
                {currentQ.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-semibold flex items-center justify-between group ${
                      isAnswered
                      ? i === currentQ.correctAnswer 
                        ? "bg-green-50 border-green-500 text-green-700" 
                        : selectedOption === i 
                          ? "bg-red-50 border-red-500 text-red-700" 
                          : "border-slate-100 opacity-50"
                      : "border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-slate-600"
                    }`}
                  >
                    <span>{option}</span>
                    {isAnswered && i === currentQ.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {isAnswered && selectedOption === i && i !== currentQ.correctAnswer && <AlertCircle className="w-5 h-5 text-red-500" />}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
                  >
                     <p className="text-xs font-black uppercase tracking-widest text-blue-600">Explanation</p>
                     <p className="text-sm text-slate-600 leading-relaxed font-medium italic">{currentQ.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
           
           <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold disabled:opacity-0 disabled:translate-y-4 transition-all hover:bg-blue-600 flex items-center gap-2 group"
              >
                {currentIndex < SAMPLE_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Test'} 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
