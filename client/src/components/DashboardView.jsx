import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  SendHorizontal, 
  Users2, 
  Coins, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BookOpen,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardView({ onNavigate }) {
  const { user } = useAuth();
  const [hudStats, setHudStats] = useState(null);
  const [connections, setConnections] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    fetch('/api/insights')
      .then(r => r.json())
      .then(d => { if (d.success) setHudStats(d.hud); });

    fetch('/api/requests')
      .then(r => r.json())
      .then(d => { if (d.success) setRecentRequests(d.requests.slice(0, 3)); });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Capability Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Member'}
          </h1>
          <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
            Your human matching vectors are synchronized. You have 3 active mentorship threads and 12 potential high-affinity learning matches available today.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onNavigate('matcher')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch AI Matcher</span>
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>Explore Marketplace</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-sky-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Skills Offered</span>
          <p className="text-2xl font-bold text-white mt-1">{user?.skillsOffered?.length || 3}</p>
          <span className="text-[10px] text-sky-400 font-mono">Cataloged in DB</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Learning Requests</span>
          <p className="text-2xl font-bold text-white mt-1">{recentRequests.length || 3}</p>
          <span className="text-[10px] text-purple-400 font-mono">In FIFO Queue</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">AI Matches</span>
          <p className="text-2xl font-bold text-white mt-1">95%</p>
          <span className="text-[10px] text-emerald-400 font-mono">Max Confidence</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Active Connections</span>
          <p className="text-2xl font-bold text-white mt-1">2</p>
          <span className="text-[10px] text-emerald-400 font-mono">Linked List Nodes</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Credits Earned</span>
          <p className="text-2xl font-bold text-amber-300 font-mono mt-1">{user?.credits ?? 1250}</p>
          <span className="text-[10px] text-amber-400 font-mono">+150 this week</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Learning Progress</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">78%</p>
          <span className="text-[10px] text-slate-400 font-mono">Quarterly Goal</span>
        </div>
      </div>

      {/* Two Column Layout: Activity & Queue Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Quick AI Match Highlights */}
        <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Recommended Mentors For You</span>
            </h2>
            <button onClick={() => onNavigate('matcher')} className="text-xs text-sky-400 hover:underline font-semibold flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-sky-400" 
                />
                <div>
                  <p className="text-xs font-bold text-white">Rahul Mehta</p>
                  <p className="text-[11px] text-slate-400">Full Stack Web Architecture & React Fiber</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                91% Match
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-400" 
                />
                <div>
                  <p className="text-xs font-bold text-white">Priya Sundaram</p>
                  <p className="text-[11px] text-slate-400">Design Systems & Figma Mastery</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                88% Match
              </span>
            </div>
          </div>
        </div>

        {/* Right: Active Learning Requests in Queue */}
        <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <SendHorizontal className="w-4 h-4 text-emerald-400" />
              <span>Incoming Queue Stream</span>
            </h2>
            <button onClick={() => onNavigate('requests')} className="text-xs text-sky-400 hover:underline font-semibold flex items-center gap-1">
              Open Queue <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentRequests.map((req, i) => (
              <div key={req.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{req.skillRequired}</p>
                  <p className="text-[11px] text-slate-400">By {req.userName} · Level: {req.levelRequired}</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Queue #{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
