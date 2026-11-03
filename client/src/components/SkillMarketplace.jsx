import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  TrendingUp, 
  Star, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Coins, 
  Check, 
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SkillMarketplace({ onSelectSkill, onConnectMentor }) {
  const { user } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [insights, setInsights] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Technology',
    'Business',
    'Design',
    'Communication',
    'Personal Development'
  ];

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(d => { if (d.success) setMentors(d.mentors); });

    fetch('/api/insights')
      .then(r => r.json())
      .then(d => { if (d.success) setInsights(d); });
  }, []);

  const filteredMentors = mentors.filter(m => {
    const matchesCategory = selectedCategory === 'All' || m.skillsOffered.some(s => s.category === selectedCategory);
    const matchesSearch = !searchQuery || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skillsOffered.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono font-medium mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Real-Time Capability Exchange</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Skill Marketplace</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Discover verified practitioners, trending capabilities, and accelerated learning roadmaps.
        </p>
      </div>

      {/* Trending Skills Strip */}
      {insights?.trendingSkills && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Trending Capabilities This Week</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Real-time demand metrics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {insights.trendingSkills.map((trend, idx) => (
              <div 
                key={idx}
                onClick={() => onSelectSkill && onSelectSkill(trend.name)}
                className="p-3.5 rounded-xl bg-[#1E293B]/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[10px] font-mono text-slate-400">{trend.category}</span>
                  <span className="text-emerald-400 font-mono font-semibold text-[11px] bg-emerald-500/10 px-1 rounded">
                    {trend.growth}
                  </span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                  {trend.name}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">{trend.mentors} active mentors</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Learning Paths */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#1E293B]/90 to-slate-900 border border-purple-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono text-purple-400 font-semibold uppercase">AI Curated Pathways</span>
            <h2 className="text-lg font-bold text-white">Recommended Accelerated Learning Paths</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Personalized for your capability goals</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">Fast-Track (3 Weeks)</span>
            <h3 className="text-sm font-bold text-white mt-2">LLM Engineer to AI Founder</h3>
            <p className="text-xs text-slate-400 mt-1">Prompt engineering, fine-tuning, RAG architecture, and seed pitch deck formulation.</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
              <span>3 Mentors ready</span>
              <button onClick={() => onSelectSkill && onSelectSkill('Machine Learning & LLMs')} className="text-sky-400 hover:underline flex items-center gap-1 font-semibold">
                Explore <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Core Skill (2 Weeks)</span>
            <h3 className="text-sm font-bold text-white mt-2">Full-Stack Design Systems</h3>
            <p className="text-xs text-slate-400 mt-1">Figma component variables, atomic design, Tailwind v4 design tokens, and a11y compliance.</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
              <span>2 Mentors ready</span>
              <button onClick={() => onSelectSkill && onSelectSkill('Design Systems & Figma Mastery')} className="text-purple-400 hover:underline flex items-center gap-1 font-semibold">
                Explore <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Executive Mastery</span>
            <h3 className="text-sm font-bold text-white mt-2">Keynote & Negotiation Mastery</h3>
            <p className="text-xs text-slate-400 mt-1">Executive storytelling, vocal modulation, overcoming imposter syndrome, high-stakes contracts.</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
              <span>2 Mentors ready</span>
              <button onClick={() => onSelectSkill && onSelectSkill('Executive Presence & Storytelling')} className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold">
                Explore <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mentor or skill..."
            className="w-full bg-[#1E293B] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
          />
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div 
            key={mentor.id}
            className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.photo}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-700 group-hover:ring-sky-400 transition-all"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">{mentor.name}</h3>
                    <p className="text-[11px] text-slate-400">{mentor.experienceLevel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{mentor.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">{mentor.bio}</p>

              {/* Skills Offered Badges */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] uppercase font-mono text-slate-400">Skills Offered:</span>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.skillsOffered.map((skill) => (
                    <span 
                      key={skill.id}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80 text-[11px] font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{mentor.location}</span>
              <button
                onClick={() => onConnectMentor && onConnectMentor(mentor)}
                className="px-3.5 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500 text-sky-400 hover:text-slate-950 font-semibold text-xs border border-sky-500/30 transition-all flex items-center gap-1.5"
              >
                <span>View & Match</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
