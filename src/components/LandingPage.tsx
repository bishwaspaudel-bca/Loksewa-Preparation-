import { motion } from "motion/react";
import { 
  ArrowRight, 
  Bot, 
  FileText, 
  Languages, 
  LineChart, 
  MessageSquare, 
  Trophy,
  CheckCircle2,
  Clock,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-bottom border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Loksewa<span className="text-blue-600">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#demo" className="hover:text-blue-600 transition-colors">AI Assistant</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <button 
              onClick={onLogin}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Start Free Now
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-bottom border-slate-100 px-4 py-4 space-y-4">
            <a href="#features" className="block text-slate-600">Features</a>
            <a href="#demo" className="block text-slate-600">AI Assistant</a>
            <a href="#pricing" className="block text-slate-600">Pricing</a>
            <button 
              onClick={onLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold"
            >
              Start Free Now
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 inline-block">
              🇳🇵 The #1 AI Platform for Nepal PSC
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Crack Loksewa with <span className="text-blue-600">AI</span> <br className="hidden md:block" />
              Your Smart Study Partner
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Master government exams with bilingual support, instant doubt solving, 
              timed mock tests, and personalized tracking. Available in English & Nepali.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onLogin}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
              >
                Start Your Journey Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> No credit card required
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale"
          >
            <div className="text-2xl font-black text-slate-400 font-serif italic">PSC Nepal</div>
            <div className="text-2xl font-black text-slate-400 font-serif italic">Nepal Government</div>
            <div className="text-2xl font-black text-slate-400 font-serif italic">Kharidar Hub</div>
            <div className="text-2xl font-black text-slate-400 font-serif italic">Officer Academy</div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-1">50K+</div>
            <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">Active Aspirants</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">1M+</div>
            <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">Questions Solved</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">98%</div>
            <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">24/7</div>
            <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">AI Availability</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why study with LoksewaAI?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Traditional coaching is expensive. We bring the expert to your pocket.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-7 h-7" />,
                title: "24/7 Bilingual Chatbot",
                desc: "Ask anything in Nepali or English. Get exam-ready points, definitions, and examples instantly.",
                color: "bg-blue-500"
              },
              {
                icon: <Clock className="w-7 h-7" />,
                title: "Timed Mock Tests",
                desc: "Simulate the real exam environment with our AI-curated question sets for Section Officer, Subba, & Kharidar.",
                color: "bg-orange-500"
              },
              {
                icon: <LineChart className="w-7 h-7" />,
                title: "Performance Analytics",
                desc: "Track your progress, identify weak topics, and see how you rank against thousands of other users.",
                color: "bg-green-500"
              },
              {
                icon: <Languages className="w-7 h-7" />,
                title: "Bilingual Study Material",
                desc: "Notes, summaries, and current affairs available in both languages with a single toggle.",
                color: "bg-purple-500"
              },
              {
                icon: <Trophy className="w-7 h-7" />,
                title: "Gamified Learning",
                desc: "Earn points, maintain streaks, and climb the leaderboard. Consistency is the key to passing.",
                color: "bg-yellow-500"
              },
              {
                icon: <FileText className="w-7 h-7" />,
                title: "Past Question Solver",
                desc: "Get detailed explanations for last 10 years of PSC questions. Learn the 'why' behind the answer.",
                color: "bg-slate-800"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section (Call to Action) */}
      <section id="demo" className="py-24 px-4">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-slate-900 overflow-hidden relative">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12 md:p-20 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">See the magic in <br className="hidden md:block" /> action.</h2>
              <ul className="space-y-6 mb-10">
                <li className="flex items-center gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                  Type: "नेपालको संविधानको ३ विशेषता लेख्नुहोस्।"
                </li>
                <li className="flex items-center gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                  Get: Structured points, explanation & exam tips.
                </li>
              </ul>
              <button 
                onClick={onLogin}
                className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl"
              >
                Try the AI Yourself
              </button>
            </div>
            
            <div className="relative h-[500px] bg-gradient-to-tr from-blue-900 to-slate-900 p-8 flex items-end">
               <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                  <div className="flex gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <Bot className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-white/20 rounded mb-2"></div>
                      <div className="h-16 w-full bg-white/10 rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 h-12 bg-white/5 rounded-full border border-white/10 px-4 flex items-center">
                       <span className="text-white/40 text-sm">Ask about Nepal's Geography...</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <ArrowRight className="text-white w-6 h-6" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-mono uppercase">Early Bird Pricing</h2>
             <p className="text-slate-600">Invest in your career today.</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Free */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Basic</h3>
              <p className="text-slate-500 text-sm mb-6">Explore the power of AI.</p>
              <div className="text-4xl font-bold mb-8">Rs. 0 <span className="text-lg font-medium text-slate-400">/ forever</span></div>
              <ul className="space-y-4 mb-10 flex-1 text-sm text-slate-600">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> 10 AI Messages per day</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> 1 Mock Test per week</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Community News</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Basic Notes</li>
              </ul>
              <button 
                onClick={onLogin}
                className="w-full py-4 border-2 border-slate-200 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Continue Free
              </button>
            </div>

            {/* Premium */}
            <div className="bg-slate-900 p-10 rounded-3xl border-4 border-blue-600 shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-4 right-[-35px] bg-blue-600 text-white text-[10px] uppercase font-bold py-1 px-10 rotate-45">Best Value</div>
              <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
              <p className="text-slate-400 text-sm mb-6">The ultimate preparation pack.</p>
              <div className="text-4xl font-bold text-white mb-8">Rs. 499 <span className="text-lg font-medium text-slate-500">/ six months</span></div>
              <ul className="space-y-4 mb-10 flex-1 text-sm text-slate-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Unlimited AI Messages</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Unlimited Mock Tests</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Full Answer Explanations</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Advanced Analytics</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> PDF Downloads</li>
              </ul>
              <button 
                onClick={onLogin}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
              >
                Unlock Premium Now
              </button>
              <p className="text-center text-xs text-white/30 mt-4 underline cursor-pointer">Refundable for 7 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Loksewa<span className="text-blue-600">AI</span></span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 LoksewaAI Nepal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
