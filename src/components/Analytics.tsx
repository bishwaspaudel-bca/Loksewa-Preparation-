import { motion } from "motion/react";
import { UserProfile } from "../types";
import { 
  Trophy, 
  Flame, 
  Target, 
  Zap, 
  Calendar,
  ChevronRight
} from "lucide-react";

export default function Analytics({ profile }: { profile: UserProfile }) {
  const stats = [
    { label: "Points Earned", value: profile.points, icon: <Trophy />, color: "text-yellow-500", bg: "bg-yellow-50" },
    { label: "Daily Streak", value: `${profile.streak} Days`, icon: <Flame />, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Tests Completed", value: "12", icon: <Target />, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Success Rate", value: "78%", icon: <Zap />, color: "text-green-500", bg: "bg-green-50" },
  ];

  const categories = [
    { name: "General Knowledge", progress: 85, color: "bg-blue-500" },
    { name: "English Proficiency", progress: 60, color: "bg-orange-500" },
    { name: "Public Administration", progress: 45, color: "bg-purple-500" },
    { name: "Constitution of Nepal", progress: 92, color: "bg-red-500" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Namaste, {profile.displayName}! 🙏</h2>
          <p className="text-slate-500 mb-6">You're making great progress. Ready to tackle today's challenges?</p>
          <div className="flex gap-4">
             <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200">Start Daily Quiz</button>
             <button className="px-6 py-2.5 bg-white text-blue-600 border border-blue-100 rounded-xl text-sm font-bold">Review Notes</button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 pointer-events-none">
          <GlobeIcon className="w-full h-full" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-stats gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div>
               <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
               <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart (Simplified) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">Progress by Category</h3>
              <button className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">Details <ChevronRight className="w-4 h-4" /></button>
           </div>
           <div className="space-y-6">
              {categories.map((cat, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="font-semibold text-slate-700">{cat.name}</span>
                      <span className="text-slate-500">{cat.progress}%</span>
                   </div>
                   <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${cat.color}`}
                      ></motion.div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
           <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
           <div className="space-y-6">
              {[
                { title: "Mock Test #42", time: "2 hours ago", type: "Test", score: "18/20" },
                { title: "Nepal Constitution Notes", time: "5 hours ago", type: "Read", score: "Complete" },
                { title: "Daily Quiz", time: "Yesterday", type: "Quiz", score: "8/10" },
                { title: "GK - Provincial Info", time: "Yesterday", type: "Read", score: "Complete" }
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-slate-400" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.time} • {activity.type}</p>
                   </div>
                   <div className="text-xs font-bold text-blue-600">{activity.score}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="100" fill="currentColor"/>
    </svg>
  );
}
