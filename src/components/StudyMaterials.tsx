import { Search, BookOpen, Download, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";

export default function StudyMaterials() {
  const categories = ["All Topics", "Constitution", "Geography", "History", "Current Affairs", "Management"];
  const [activeCat, setActiveCat] = useState("All Topics");

  const topics = [
    { title: "Salient Features of Nepal Constitution", cat: "Constitution", lang: "Nepali", views: "1.2k" },
    { title: "Rivers and Lakes of Nepal", cat: "Geography", lang: "English", views: "850" },
    { title: "Rana Regime to Democracy", cat: "History", lang: "Bilingual", views: "2.1k" },
    { title: "Civil Service Act 2049", cat: "Management", lang: "Nepali", views: "900" },
    { title: "Economic Survey 2080/81", cat: "Current Affairs", lang: "Bilingual", views: "5.4k" },
    { title: "Electoral System in Nepal", cat: "Constitution", lang: "English", views: "600" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 max-w-xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search for topics, acts, or questions..." 
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all text-sm outline-none shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
           <Filter className="w-5 h-5 text-slate-400" />
           <div className="flex bg-white p-1 rounded-xl border border-slate-200 overflow-hidden text-xs font-bold uppercase tracking-widest shadow-sm">
              {["List", "Grid"].map(m => (
                <button key={m} className={`px-4 py-2 rounded-lg transition-all ${m === "Grid" ? "bg-slate-900 text-white" : "text-slate-400"}`}>{m}</button>
              ))}
           </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider border ${
              activeCat === cat 
              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
              : "bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.filter(t => activeCat === "All Topics" || t.cat === activeCat).map((topic, i) => (
          <div key={i} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                 <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">{topic.cat}</span>
                 <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                    <BookOpen className="w-3 h-3" /> {topic.views}
                 </div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{topic.title}</h4>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-bold text-slate-500">{topic.lang}</span>
                 </div>
                 <button className="p-2 text-slate-400 hover:text-blue-600 transition-all"><Download className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="bg-slate-50 p-4 text-center">
               <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center gap-2 w-full">View Summary <ChevronRight className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Featured Banner */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
         <div className="max-w-xl space-y-6 relative z-10">
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase font-mono italic">WEEKLY CURRENT AFFAIRS 🚀</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Stay ahead with our AI-curated weekly digest of national and international news focused on PSC exams. Available every Sunday morning.</p>
            <button className="px-8 py-3 bg-blue-600 rounded-xl text-sm font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">Download This Week's PDF</button>
         </div>
         <div className="absolute top-0 right-0 h-full w-1/3 bg-blue-600/10 skew-x-12 translate-x-12"></div>
      </div>
    </div>
  );
}
