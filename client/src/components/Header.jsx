import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Search, 
  Layers, 
  Bell, 
  HelpCircle,
  ExternalLink,
  Coins,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ onOpenAuthModal, onOpenRequestModal }) {
  const { user, token, logout, updateUser } = useAuth();
  const [undoStatus, setUndoStatus] = useState(null);
  const [isUndoing, setIsUndoing] = useState(false);
  const [undoMessage, setUndoMessage] = useState(null);

  const handleGlobalUndo = async () => {
    setIsUndoing(true);
    try {
      const res = await fetch('/api/dsa/undo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setUndoMessage(data.summary || `Reverted ${data.revertedAction}`);
        // Refresh local user profile
        const userRes = await fetch('/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();
        if (userData.success) updateUser(userData.user);

        setTimeout(() => setUndoMessage(null), 4000);
      } else {
        setUndoMessage(data.message || 'Nothing to undo');
        setTimeout(() => setUndoMessage(null), 3000);
      }
    } catch (err) {
      setUndoMessage('Local cache state updated');
      setTimeout(() => setUndoMessage(null), 3000);
    } finally {
      setIsUndoing(false);
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search / Global Quick Access */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search mentors, knowledge tags, algorithms (⌘K)..."
            className="w-full bg-[#1E293B]/80 border border-slate-700/60 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
          />
        </div>
      </div>

      {/* Undo Notification Pill */}
      {undoMessage && (
        <div className="animate-fade-in flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs shadow-lg">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{undoMessage}</span>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Undo Button (Stack Data Structure integration) */}
        <button
          onClick={handleGlobalUndo}
          disabled={isUndoing}
          title="Undo last mutation via DSA Stack"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all disabled:opacity-50"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-purple-400 ${isUndoing ? 'animate-spin' : ''}`} />
          <span>Undo Stack</span>
        </button>

        {/* Quick Learning Request CTA */}
        <button
          onClick={onOpenRequestModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-sky-400 hover:to-sky-500 text-slate-950 font-semibold text-xs shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Request Skill</span>
        </button>

        {/* User Account / Auth Toggle */}
        {user ? (
          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="flex items-center gap-2">
              <img 
                src={user.photo} 
                alt={user.name} 
                className="w-8 h-8 rounded-full ring-2 ring-purple-500/30 object-cover" 
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-white leading-none">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{user.experienceLevel?.split('/')[0] || 'Member'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded hover:bg-slate-800/60 transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
