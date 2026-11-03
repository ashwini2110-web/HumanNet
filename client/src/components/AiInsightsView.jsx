import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  BrainCircuit, 
  Zap, 
  Compass, 
  BarChart3, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldAlert,
  Flame
} from 'lucide-react';

export default function AiInsightsView({ onExploreSkill }) {
  const [insights, setInsights] = useState(null);
  const [hudStats, setHudStats] = useState(null);

  useEffect(() => {
    fetch('/api/insights')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setInsights(d);
          setHudStats(d.hud);
        }
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-medium mb-2">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Real-time Ecosystem Intelligence</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Insights & Predictive Demands</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Machine-generated intelligence on knowledge supply imbalances, velocity trends, and personalized capability unlocks.
        </p>
      </div>

      {/* HUD High-Impact Statistics */}
      {hudStats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 backdrop-blur">
            <span className="text-[11px] font-mono text-[#94A3B8] uppercase">Global Network Members</span>
            <p className="text-3xl font-extrabold text-white mt-1">{hudStats.users?.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">↑ +14.2% this month</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 backdrop-blur">
            <span className="text-[11px] font-mono text-[#94A3B8] uppercase">Skills Cataloged & Verified</span>
            <p className="text-3xl font-extrabold text-[#38BDF8] mt-1">{hudStats.skillsShared?.toLocaleString()}</p>
            <p className="text-[11px] text-sky-400 font-mono mt-1">Across 4 major taxonomies</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 backdrop-blur">
            <span className="text-[11px] font-mono text-[#94A3B8] uppercase">Knowledge Sessions</span>
            <p className="text-3xl font-extrabold text-[#A855F7] mt-1">{hudStats.knowledgeSessions?.toLocaleString()}</p>
            <p className="text-[11px] text-purple-300 font-mono mt-1">Peer video & pairing</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 backdrop-blur">
            <span className="text-[11px] font-mono text-[#94A3B8] uppercase">Successful AI Matches</span>
            <p className="text-3xl font-extrabold text-[#22C55E] mt-1">{hudStats.successfulMatches?.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-300 font-mono mt-1">94.8% mutual satisfaction</p>
          </div>
        </div>
      )}

      {/* Personalized Capability Recommendations */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white">Recommended Skills For Your Career Trajectory</h2>
          </div>
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
            Algorithmic Recommendation
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {insights?.personalizedRecommendations?.map((rec, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  {rec.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-2 mb-1">{rec.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{rec.reason}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-mono">Match time: {rec.estimatedTimeToMatch}</span>
                <button
                  onClick={() => onExploreSkill && onExploreSkill(rec.title)}
                  className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fastest Growing Categories Velocity Table */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Fastest Growing Capability Categories</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Velocity Index (0-100)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights?.fastestGrowingCategories?.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-white">{item.category}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {item.velocity}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Top Demand: <strong className="text-slate-200">{item.topSkill}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
