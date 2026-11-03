import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass, Shield, Zap, Users, BrainCircuit, Play, CheckCircle2, ChevronRight } from 'lucide-react';

export default function LandingView({ onGetStarted, onExploreSkills }) {
  const [activeTab, setActiveTab] = useState('match');

  const categories = [
    { name: 'Technology & AI', count: '1,420 Mentors', growth: '+34%' },
    { name: 'Business & Leadership', count: '890 Mentors', growth: '+28%' },
    { name: 'Product & UI/UX Design', count: '640 Mentors', growth: '+19%' },
    { name: 'Executive Communication', count: '410 Mentors', growth: '+45%' },
    { name: 'Languages & Linguistics', count: '310 Mentors', growth: '+12%' },
    { name: 'Fitness & Longevity', count: '280 Mentors', growth: '+22%' }
  ];

  const stories = [
    {
      author: 'Aarav Chen',
      role: 'Founding Engineer at Synthetix (YC W25)',
      quote: 'HumanNet paired me with Ashwini in under 4 minutes. We did 3 deep-dive architecture sessions that directly unlocked our zero-downtime distributed caching layer.',
      matchScore: '96% Match',
      skill: 'Distributed Systems'
    },
    {
      author: 'Sophia Vance',
      role: 'Senior Product Designer at Linear',
      quote: 'The AI matching engine does not just look at keywords—it understands pacing, timezones, and nuanced senior leadership needs. Truly the Stripe for human wisdom.',
      matchScore: '94% Match',
      skill: 'Design Tokens Architecture'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-sky-500/30 selection:text-white">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-sky-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-6xl mx-auto text-center">
        {/* Startup Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-sky-300 mb-8 backdrop-blur shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span>Next-Gen Capability Marketplace</span>
          <span className="text-slate-500">|</span>
          <span className="text-purple-300 font-mono">Neural Matching v2.4</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Unlock Human <span className="bg-gradient-to-r from-[#38BDF8] via-indigo-400 to-[#A855F7] bg-clip-text text-transparent">Potential</span>
        </h1>

        <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          A new way to connect, teach, learn and grow through AI-powered human matching. Connect directly with vetted practitioners for real-time knowledge exchange.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-sky-400 hover:to-sky-500 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreSkills}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Explore Skills & Catalog</span>
          </button>
        </div>

        {/* HUD Quick Stats Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800/80 backdrop-blur text-left">
            <p className="text-xs text-[#94A3B8] uppercase font-mono tracking-wider">Active Members</p>
            <p className="text-2xl font-bold text-white mt-1">1,425+</p>
            <span className="text-[11px] text-emerald-400 font-medium">99.8% Verified</span>
          </div>
          <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800/80 backdrop-blur text-left">
            <p className="text-xs text-[#94A3B8] uppercase font-mono tracking-wider">Skills Cataloged</p>
            <p className="text-2xl font-bold text-white mt-1">3,850+</p>
            <span className="text-[11px] text-sky-400 font-medium">Indexed by Tree DSA</span>
          </div>
          <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800/80 backdrop-blur text-left">
            <p className="text-xs text-[#94A3B8] uppercase font-mono tracking-wider">Knowledge Sessions</p>
            <p className="text-2xl font-bold text-white mt-1">898+</p>
            <span className="text-[11px] text-purple-400 font-medium">Peer-to-Peer</span>
          </div>
          <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800/80 backdrop-blur text-left">
            <p className="text-xs text-[#94A3B8] uppercase font-mono tracking-wider">Successful Matches</p>
            <p className="text-2xl font-bold text-white mt-1">94.8%</p>
            <span className="text-[11px] text-emerald-400 font-medium">AI Match Accuracy</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-[#38BDF8] mb-3">Workflow</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">How HumanNet Works</h3>
          <p className="text-sm text-[#94A3B8] mt-2">Zero friction peer mentorship powered by deterministic matching algorithms.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 hover:border-sky-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] flex items-center justify-center mb-5 font-mono font-bold text-lg">
              01
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Publish Capability or Request</h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              List the skills you can mentor, or post a targeted learning request with your desired depth, schedule, and format.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[#A855F7] flex items-center justify-center mb-5 font-mono font-bold text-lg">
              02
            </div>
            <h4 className="text-lg font-bold text-white mb-2">AI Neural Match Evaluation</h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Our 6-factor matching engine evaluates skills, seniority, availability overlap, and past credibility to rank matches.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 hover:border-emerald-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-lg">
              03
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Exchange Wisdom & Earn Credits</h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Connect 1-on-1, unlock direct collaboration sessions, and earn HumanNet credits to fuel your ongoing learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* AI Matching Showcase */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="rounded-3xl bg-gradient-to-b from-[#1E293B] to-[#111827] border border-slate-700/80 p-8 md:p-12 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono mb-4">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Explainable AI Engine</span>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-4">
                Not a black box. Real match scores with full transparent rationale.
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                When you request a capability, HumanNet computes multi-dimensional match vectors across domain alignment, timezone overlap, verified track record, and communication style.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Semantic skill matching with vector embeddings</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Timezone & availability matrix intersection</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Seniority delta scoring for maximum learning velocity</span>
                </div>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 shadow-xl shadow-sky-500/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-sky-400"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Ashwini Sharma</p>
                      <p className="text-[11px] text-slate-400">Staff AI Engineer · San Francisco</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#38BDF8] font-mono">95% Match</span>
                    <p className="text-[10px] text-emerald-400">Top Recommendation</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                  <span className="text-[#38BDF8] font-semibold">Why this mentor:</span> Direct subject expertise in Machine Learning & LLMs + Synchronized weekend calendar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Rahul Mehta</p>
                      <p className="text-[11px] text-slate-400">Tech Lead · React & Distributed Systems</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-purple-400 font-mono">91% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-3xl font-bold text-white">Explore High-Demand Categories</h3>
          <p className="text-sm text-[#94A3B8] mt-2">Browse the hierarchical capability tree organized via recursive taxonomy.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={onExploreSkills}
              className="p-5 rounded-xl bg-[#1E293B]/60 hover:bg-[#1E293B] border border-slate-800 hover:border-slate-700 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">{cat.name}</h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{cat.growth}</span>
              </div>
              <p className="text-xs text-slate-400">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-3xl font-bold text-white">Trusted by Top Tech Builders</h3>
          <p className="text-sm text-[#94A3B8] mt-2">See how founders and senior engineers accelerate their roadmap with HumanNet.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 flex flex-col justify-between">
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">"{story.quote}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <p className="text-xs font-bold text-white">{story.author}</p>
                  <p className="text-[11px] text-slate-400">{story.role}</p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#38BDF8] bg-sky-500/10 px-2 py-1 rounded border border-sky-500/20">
                  {story.matchScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Vision & Footer */}
      <footer className="py-16 px-6 border-t border-slate-800 bg-[#111827] text-center">
        <h4 className="text-2xl font-bold text-white mb-3">The Future of Human Intelligence is Collaborative</h4>
        <p className="text-xs text-[#94A3B8] max-w-xl mx-auto mb-8">
          HumanNet bridges raw artificial intelligence with real human intuition, creating an unstoppable network for continuous self-actualization.
        </p>
        <button
          onClick={onGetStarted}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#A855F7] text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
        >
          Launch HumanNet Platform
        </button>
        <p className="text-[11px] text-slate-600 mt-8">© 2026 HumanNet Inc. All rights reserved. Built with React, Node.js, and Algorithmic DSA.</p>
      </footer>
    </div>
  );
}
