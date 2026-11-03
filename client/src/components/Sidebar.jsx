import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Compass, 
  BrainCircuit, 
  Users2, 
  SendHorizontal, 
  Layers, 
  Coins, 
  History, 
  UserCircle, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'network', label: 'Network Graph', icon: Layers, badge: '3D Live', highlight: true },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'matcher', label: 'Mentor Matching', icon: Sparkles, badge: 'Priority Queue' },
    { id: 'marketplace', label: 'Skill Catalog', icon: Compass, badge: 'Tree' },
    { id: 'requests', label: 'Learning Requests', icon: SendHorizontal, badge: 'Queue' },
    { id: 'connections', label: 'Connections', icon: Users2, badge: 'Linked List' },
    { id: 'insights', label: 'Capability Insights', icon: BrainCircuit, badge: null },
    { id: 'profile', label: 'Skill Profile', icon: UserCircle, badge: 'Hash Map' },
  ];

  return (
    <aside className="w-64 bg-[#111827] border-r border-slate-800 flex flex-col justify-between shrink-0 select-none h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('landing')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#A855F7] flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white font-sans">Human<span className="text-[#38BDF8]">Net</span></span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-[#38BDF8] border border-sky-500/20">v2.4</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Unlock Human Potential</p>
            </div>
          </div>
        </div>

        {/* User Capability Badge */}
        <div className="mx-3.5 my-3.5 p-3 rounded-xl bg-[#1E293B]/70 border border-slate-700/60 flex items-center gap-3">
          <img 
            src={user?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
            alt={user?.name} 
            className="w-10 h-10 rounded-lg object-cover ring-1 ring-sky-400/30"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Explorer'}</p>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Coins className="w-3 h-3 text-amber-400" />
              <span className="text-[11px] font-mono text-amber-300 font-medium">{user?.credits ?? 1250} credits</span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="px-2.5 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/15 to-purple-500/10 text-white border border-sky-500/30 shadow-sm'
                    : 'text-[#94A3B8] hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#38BDF8]' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  <span className="tracking-wide">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    item.highlight 
                      ? 'bg-purple-500/20 text-[#A855F7] border border-purple-500/30 animate-pulse' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        <div className="px-2 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>DSA Engine</span>
          </div>
          <span className="font-mono text-emerald-400 font-semibold">100% Active</span>
        </div>

        <button
          onClick={() => setCurrentTab('landing')}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <span>View Public Landing Page</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
