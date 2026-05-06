import { useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "../types";
import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut, 
  Globe,
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import Analytics from "./Analytics";
import AIChat from "./AIChat";
import MockTests from "./MockTests";
import StudyMaterials from "./StudyMaterials";

interface DashboardProps {
  user: User;
  profile: UserProfile;
  onLogout: () => void;
}

export default function Dashboard({ user, profile, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "chat", label: "AI Assistant", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "tests", label: "Mock Tests", icon: <Trophy className="w-5 h-5" /> },
    { id: "notes", label: "Study Materials", icon: <BookOpen className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Analytics profile={profile} />;
      case "chat": return <AIChat userId={user.uid} />;
      case "tests": return <MockTests userId={user.uid} />;
      case "notes": return <StudyMaterials />;
      default: return <Analytics profile={profile} />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed md:relative flex flex-col w-64 h-full bg-white border-r border-slate-200 transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Loksewa<span className="text-blue-600">AI</span></span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id 
                ? "bg-blue-50 text-blue-600" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
                {profile.displayName.substring(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{profile.displayName}</p>
                <p className="text-xs text-slate-500 truncate">{profile.premium ? 'Premium User' : 'Free Plan'}</p>
              </div>
           </div>
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
           >
             <LogOut className="w-5 h-5" />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="w-6 h-6 text-slate-500" />
              </button>
              <h1 className="text-xl font-extrabold text-slate-900">{tabs.find(t => t.id === activeTab)?.label}</h1>
           </div>
           
           <div className="flex items-center gap-6">
              {!profile.premium && (
                <button className="hidden sm:block px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-all uppercase tracking-wider">
                  Go Premium
                </button>
              )}
              <div className="flex items-center gap-4 text-slate-400">
                <Search className="w-5 h-5 cursor-pointer hover:text-slate-900 transition-all" />
                <Bell className="w-5 h-5 cursor-pointer hover:text-slate-900 transition-all" />
                <div className="w-px h-6 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{profile.points} pts</span>
                  <Trophy className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
           </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto bg-slate-50 relative">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}
