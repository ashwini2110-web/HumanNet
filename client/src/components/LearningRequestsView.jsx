import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  SendHorizontal, 
  Clock, 
  MapPin, 
  Filter, 
  Layers, 
  CheckCircle2, 
  Plus, 
  ListOrdered,
  Users2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LearningRequestsView({ onFindMatchesForRequest, onRequestCreated }) {
  const { user, token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [queueSize, setQueueSize] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [skillRequired, setSkillRequired] = useState('');
  const [category, setCategory] = useState('Technology');
  const [levelRequired, setLevelRequired] = useState('Intermediate');
  const [mode, setMode] = useState('Online');
  const [schedulePreference, setSchedulePreference] = useState('Weekends (Flexible)');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      if (data.success) {
        setRequests(data.requests);
        setQueueSize(data.queueSize);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skillRequired.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          skillRequired,
          category,
          levelRequired,
          mode,
          schedulePreference,
          description
        })
      });
      const data = await res.json();
      if (data.success) {
        setSkillRequired('');
        setDescription('');
        setShowForm(false);
        fetchRequests();
        if (onRequestCreated) onRequestCreated(data.request);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-medium mb-2">
            <ListOrdered className="w-3.5 h-3.5" />
            <span>FIFO Request Processing Buffer</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Learning Requests Queue</h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Submit learning needs to the global capability pool. Requests are dynamically queued and matched using deterministic AI algorithms.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center gap-2 hover:scale-105 transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Submit New Request'}</span>
        </button>
      </div>

      {/* FIFO Queue Status Bar */}
      <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">Active Queue Pipeline: <strong className="text-white">{queueSize} Requests in FIFO Buffer</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Priority Algorithm:</span>
          <span className="text-sky-400 font-semibold">Strict Timestamp Ordering</span>
        </div>
      </div>

      {/* New Request Modal / Collapsible Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#1E293B] border border-sky-500/40 shadow-2xl space-y-4 animate-fade-in">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Define Knowledge Requirement</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">The AI engine will score potential mentors the moment you submit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Skill Required *</label>
              <input
                type="text"
                required
                value={skillRequired}
                onChange={(e) => setSkillRequired(e.target.value)}
                placeholder="e.g. Distributed Consensus (Raft), React Server Components"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              >
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Communication">Communication</option>
                <option value="Personal Development">Personal Development</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Target Proficiency Level</label>
              <select
                value={levelRequired}
                onChange={(e) => setLevelRequired(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              >
                <option value="Beginner">Beginner (Foundations)</option>
                <option value="Intermediate">Intermediate (Practitioner)</option>
                <option value="Advanced">Advanced (Senior / Architect)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              >
                <option value="Online">Online Video Pair-Programming</option>
                <option value="Offline">Offline / In-person Meetup</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Schedule Preference</label>
              <input
                type="text"
                value={schedulePreference}
                onChange={(e) => setSchedulePreference(e.target.value)}
                placeholder="e.g. Weekends 2-4 PM PST, Weekday Evenings"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Detailed Description & Context</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what specific challenges or outcomes you are targeting..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-purple-500 hover:opacity-90 text-slate-950 text-xs font-bold shadow-lg"
            >
              {isSubmitting ? 'Enqueueing...' : 'Dispatch to Matching Engine'}
            </button>
          </div>
        </form>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((req, index) => (
          <div 
            key={req.id}
            className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <img 
                  src={req.userPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                  alt={req.userName}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700" 
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">{req.skillRequired}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-[#38BDF8] border border-sky-500/30">
                      {req.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      Level: {req.levelRequired}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-0.5">Requested by <strong className="text-slate-200">{req.userName}</strong></p>
                  
                  {req.description && (
                    <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">{req.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{req.schedulePreference}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{req.mode}</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-500 font-mono">Queue Index #{index + 1}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onFindMatchesForRequest && onFindMatchesForRequest(req)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 self-start sm:self-center transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run AI Matcher</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
