import React, { useState, useEffect } from 'react';
import { 
  Users2, 
  MessageSquare, 
  Calendar, 
  Coins, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  GitCommit,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ConnectionsView() {
  const { user, token } = useAuth();
  const [connections, setConnections] = useState([]);
  const [linkedListChain, setLinkedListChain] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetch('/api/connections', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setConnections(d.connections || []);
          setLinkedListChain(d.allConnectionsChain || []);
        }
      });
  }, [token]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium mb-2">
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Linked List Mentorship Graph</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Human Connections & Sessions</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Review active mentorships, exchange knowledge tokens, and inspect the continuous node connections chain.
        </p>
      </div>

      {/* Linked List Sequential Architecture Visualizer */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Linked List Architecture Visualization
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Node Chain: {linkedListChain.length} Elements</span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex items-center gap-3 min-w-max">
            {linkedListChain.map((node, i) => (
              <React.Fragment key={node.id || i}>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 w-64 shadow-lg shrink-0">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                    <span>Node #{i + 1}</span>
                    <span className="text-emerald-400">pointer -&gt; next</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={node.mentorPhoto} 
                      alt="" 
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-sky-400/40"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{node.mentorName}</p>
                      <p className="text-[11px] text-slate-400 truncate">Learner: {node.learnerName}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-sky-300 font-medium mt-2 truncate bg-slate-800/60 px-2 py-0.5 rounded">
                    {node.skill}
                  </p>
                </div>

                {i < linkedListChain.length - 1 && (
                  <div className="flex items-center text-slate-600 font-mono shrink-0">
                    <ArrowRight className="w-5 h-5 text-sky-500/70 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Active Mentorship Threads</h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {connections.length} Active Connections
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((conn) => {
            const isMentor = conn.mentorId === user?.id;
            const peerName = isMentor ? conn.learnerName : conn.mentorName;
            const peerPhoto = isMentor ? conn.learnerPhoto : conn.mentorPhoto;

            return (
              <div 
                key={conn.id}
                className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={peerPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} 
                        alt={peerName} 
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/30"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{peerName}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {isMentor ? 'Your Learner' : 'Your Mentor'}
                          </span>
                        </div>
                        <p className="text-xs text-sky-400 font-medium mt-0.5">{conn.skill}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono text-amber-300 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>{conn.totalCreditsExchanged}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Knowledge Sessions:</span>
                      <span className="font-semibold text-white">{conn.sessionsCompleted} Completed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Synced:</span>
                      <span className="text-slate-300 font-mono text-[11px]">Yesterday, 6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Direct Channel Open</span>
                  </span>

                  <button 
                    onClick={() => alert(`Launching HumanNet Peer Video / Collaboration session with ${peerName}...`)}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer"
                  >
                    Open Session
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
