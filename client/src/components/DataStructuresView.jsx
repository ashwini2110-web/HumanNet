import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  GitBranch, 
  RotateCcw, 
  ListOrdered, 
  Link as LinkIcon, 
  ChevronRight, 
  FolderTree, 
  Database,
  ArrowRight,
  Sparkles,
  Terminal,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DataStructuresView() {
  const { user, token, updateUser } = useAuth();
  const [stackStatus, setStackStatus] = useState({ size: 0, recentOperations: [] });
  const [queueStatus, setQueueStatus] = useState({ queueSize: 0, requests: [] });
  const [categoryTree, setCategoryTree] = useState(null);
  const [totalCatalogSkills, setTotalCatalogSkills] = useState(0);
  const [treeSearch, setTreeSearch] = useState('');
  const [isUndoing, setIsUndoing] = useState(false);
  const [undoLog, setUndoLog] = useState('');

  const refreshDSA = async () => {
    // 1. Stack Status
    fetch('/api/dsa/stack-status')
      .then(r => r.json())
      .then(d => { if (d.success) setStackStatus(d); });

    // 2. Queue Status
    fetch('/api/requests')
      .then(r => r.json())
      .then(d => { if (d.success) setQueueStatus(d); });

    // 3. Recursive Tree
    const treeUrl = treeSearch ? `/api/categories/tree?search=${encodeURIComponent(treeSearch)}` : '/api/categories/tree';
    fetch(treeUrl)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setCategoryTree(d.tree);
          setTotalCatalogSkills(d.totalSkillsCount);
        }
      });
  };

  useEffect(() => {
    refreshDSA();
  }, [treeSearch]);

  const handleTriggerUndo = async () => {
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
        setUndoLog(`Successfully executed LIFO pop(): ${data.summary}`);
        refreshDSA();
        // Sync profile
        const uRes = await fetch('/api/users/me', { headers: { 'Authorization': `Bearer ${token}` } });
        const uData = await uRes.json();
        if (uData.success) updateUser(uData.user);
      } else {
        setUndoLog(data.message || 'Stack is empty');
      }
    } catch (err) {
      setUndoLog('Undo failed');
    } finally {
      setIsUndoing(false);
    }
  };

  // Recursive Tree Node Renderer Component
  const renderTreeNode = (node, depth = 0) => {
    if (!node) return null;
    return (
      <div key={node.id || node.name} className="ml-4 border-l border-slate-700/60 pl-3 my-1.5 font-mono text-xs">
        <div className="flex items-center gap-2 py-1">
          <span className="text-sky-400">├──</span>
          <span className="font-semibold text-slate-200">{node.name}</span>
          {node.badge && (
            <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {node.badge}
            </span>
          )}
          {node.count !== undefined && (
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
              {node.count} mentors
            </span>
          )}
        </div>
        {node.children && node.children.map(child => renderTreeNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono font-medium mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>Computer Science Architecture</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Data Structures Integration</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Interactive real-time demonstration of how Arrays, Stacks, Queues, Linked Lists, and Recursive Trees drive HumanNet's runtime.
        </p>
      </div>

      {/* Grid of 4 Core Data Structures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. STACK: LIFO Undo Operations */}
        <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-purple-400" />
              <div>
                <h2 className="text-base font-bold text-white">Stack (LIFO)</h2>
                <p className="text-[11px] text-slate-400">Undo & Mutation Rollback Engine</p>
              </div>
            </div>
            <button
              onClick={handleTriggerUndo}
              disabled={isUndoing}
              className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-mono font-semibold transition-all disabled:opacity-40"
            >
              stack.pop() (Undo)
            </button>
          </div>

          {undoLog && (
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
              {undoLog}
            </div>
          )}

          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 font-mono text-xs">
            <div className="flex justify-between text-slate-400 mb-2 pb-2 border-b border-slate-800">
              <span>Stack Depth: {stackStatus.size} frames</span>
              <span className="text-purple-400">Top-of-Stack &darr;</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {stackStatus.recentOperations?.length > 0 ? (
                stackStatus.recentOperations.map((op, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-800/60 border border-slate-700/50">
                    <span className="text-sky-300 font-semibold">{op.action}</span>
                    <span className="text-[10px] text-slate-500">{new Date(op.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic py-2 text-center">Stack is currently empty. Perform actions like adding a skill or submitting a request to push frames.</p>
              )}
            </div>
          </div>
        </div>

        {/* 2. QUEUE: FIFO Learning Requests */}
        <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-base font-bold text-white">Queue (FIFO)</h2>
                <p className="text-[11px] text-slate-400">Asynchronous Request Processing</p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Length: {queueStatus.queueSize}
            </span>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 font-mono text-xs">
            <div className="flex justify-between text-slate-400 mb-2 pb-2 border-b border-slate-800">
              <span>Front of Queue (First In)</span>
              <span className="text-emerald-400">Tail (Last In)</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {queueStatus.requests?.map((req, i) => (
                <div key={req.id} className="flex items-center justify-between p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">#{i + 1}</span>
                    <span className="text-white font-medium truncate">{req.skillRequired}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">{req.userName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 3. RECURSION: Hierarchical Tree Navigation */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-base font-bold text-white">Recursion: Skill Category Tree</h2>
              <p className="text-[11px] text-slate-400">Recursive Depth-First Traversal and Multi-level Sub-tree Filtering</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={treeSearch}
                onChange={(e) => setTreeSearch(e.target.value)}
                placeholder="Recursive filter query..."
                className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>
            <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20 shrink-0">
              {totalCatalogSkills} Total Catalog Leaves
            </span>
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 max-h-80 overflow-y-auto">
          {categoryTree ? (
            renderTreeNode(categoryTree)
          ) : (
            <p className="text-xs text-slate-500 font-mono">Loading recursive tree hierarchy...</p>
          )}
        </div>
      </div>
    </div>
  );
}
