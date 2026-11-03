import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  Send, 
  Coins, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AiMatcher({ onRequestConnect }) {
  const { user, token } = useAuth();
  const [skillQuery, setSkillQuery] = useState('Machine Learning & LLMs');
  const [category, setCategory] = useState('Technology');
  const [level, setLevel] = useState('Intermediate');
  const [mode, setMode] = useState('Online');
  const [schedule, setSchedule] = useState('Weekends & Evenings');
  const [description, setDescription] = useState('Looking for end-to-end guidance on fine-tuning LLMs with LoRA and building low-latency RAG systems.');
  
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [matches, setMatches] = useState([]);
  const [connectedMentors, setConnectedMentors] = useState({});

  const sampleSkills = [
    'Machine Learning & LLMs',
    'Full Stack Web Architecture',
    'Design Systems & Figma Mastery',
    'Executive Presence & Storytelling',
    'B2B Go-To-Market & Growth'
  ];

  const handleEvaluate = async (customSkill = null) => {
    setIsEvaluating(true);
    const targetSkill = customSkill || skillQuery;
    
    try {
      const res = await fetch('/api/match/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillRequired: targetSkill,
          category,
          levelRequired: level,
          mode,
          schedulePreference: schedule,
          description,
          userId: user?.id
        })
      });
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error('Match evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  useEffect(() => {
    handleEvaluate();
  }, []);

  const handleConnect = async (mentor, skillName) => {
    try {
      const res = await fetch('/api/connections/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mentorId: mentor.id,
          skill: skillName || skillQuery
        })
      });
      const data = await res.json();
      if (data.success) {
        setConnectedMentors(prev => ({ ...prev, [mentor.id]: true }));
        if (onRequestConnect) onRequestConnect(data.connection);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-[#A855F7] border border-purple-500/20 text-xs font-mono font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Factor AI Matching Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Mentor & Capability Matching</h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Deterministic ranking across 6 vector weights: Domain Skills (40%), Seniority (20%), Schedule (15%), Interests (10%), Mode (10%), Rating (5%).
          </p>
        </div>
      </div>

      {/* Interactive Match Controller Panel */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-700/70 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          {/* Skill Input */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Skill Required</label>
            <div className="relative">
              <input
                type="text"
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                placeholder="e.g. Machine Learning, Figma, Public Speaking"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {/* Category */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
            >
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Communication">Communication</option>
              <option value="Personal Development">Personal Development</option>
            </select>
          </div>

          {/* Seniority Level */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Target Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced / Staff</option>
            </select>
          </div>

          {/* Mode */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Delivery Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
            >
              <option value="Online">Online Video Pair</option>
              <option value="In-person">In-person / Local</option>
              <option value="Async">Async Code Review</option>
            </select>
          </div>

          {/* Run Action */}
          <div className="md:col-span-2">
            <button
              onClick={() => handleEvaluate()}
              disabled={isEvaluating}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#A855F7] hover:opacity-90 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
              <span>{isEvaluating ? 'Matching...' : 'Evaluate Match'}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Suggestions */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-mono">Trending queries:</span>
          {sampleSkills.map((sample, i) => (
            <button
              key={i}
              onClick={() => {
                setSkillQuery(sample);
                handleEvaluate(sample);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 text-[11px] transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Ranked Mentor Recommendations</span>
            <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              {matches.length} mentors evaluated
            </span>
          </h2>
          <span className="text-xs text-sky-400 font-mono">Sorted by Neural Fit Index</span>
        </div>

        {/* Match Cards */}
        <div className="grid grid-cols-1 gap-4">
          {matches.map((item, index) => {
            const m = item.mentor;
            const isTopMatch = index === 0;
            const isAlreadyConnected = connectedMentors[m.id];

            return (
              <div 
                key={m.id}
                className={`p-6 rounded-2xl transition-all ${
                  isTopMatch 
                    ? 'bg-gradient-to-r from-[#1E293B] to-slate-900 border-2 border-sky-400/50 shadow-xl shadow-sky-500/10'
                    : 'bg-[#1E293B]/70 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left: Mentor Info */}
                  <div className="flex items-start gap-4">
                    <img 
                      src={m.photo} 
                      alt={m.name} 
                      className={`w-16 h-16 rounded-2xl object-cover ring-2 ${
                        isTopMatch ? 'ring-[#38BDF8]' : 'ring-purple-400/40'
                      }`}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white">{m.name}</h3>
                        {isTopMatch && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-[#38BDF8] border border-sky-500/30 font-semibold">
                            ★ Top Recommendation
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{m.rating} ({m.reviewsCount} reviews)</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 max-w-xl leading-relaxed">{m.bio}</p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{m.location}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{m.availability}</span>
                        </span>
                        <span>•</span>
                        <span className="text-sky-300 font-mono font-medium">
                          Exp: {m.experienceLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Match Score Pill & Connect Action */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1.5">
                        <span className={`text-3xl font-extrabold font-mono tracking-tight ${
                          item.matchScore >= 90 ? 'text-[#38BDF8]' : 'text-purple-400'
                        }`}>
                          {item.matchScore}%
                        </span>
                        <span className="text-xs font-semibold text-slate-400">Match</span>
                      </div>
                      <p className="text-[10px] text-emerald-400 font-mono mt-0.5">High Confidence Vector</p>
                    </div>

                    <button
                      onClick={() => handleConnect(m, skillQuery)}
                      disabled={isAlreadyConnected}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isAlreadyConnected
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-sky-400 hover:to-sky-500 text-slate-950 shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isAlreadyConnected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Connected</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Connect & Learn</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Explainability Rationale */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 bg-slate-900/60 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <p className="text-[11px] uppercase font-mono font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Why this mentor was recommended:</span>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.matchReasons.map((reason, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
