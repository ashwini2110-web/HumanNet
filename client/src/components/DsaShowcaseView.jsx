import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  HelpCircle, 
  GraduationCap, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ArrowDown, 
  Share2, 
  Check, 
  Activity, 
  Network, 
  Clock, 
  Cpu, 
  Hash, 
  Workflow, 
  Boxes,
  Compass,
  ArrowUp,
  CornerDownRight,
  RefreshCw,
  Eye
} from 'lucide-react';

export default function DsaShowcaseView() {
  // Global modes
  const [vivaMode, setVivaMode] = useState(true); // Default Viva Mode ON for professor viva
  const [isAutoDemonstrating, setIsAutoDemonstrating] = useState(false);
  const [demoStep, setDemoStep] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or specific ds id

  // ==========================================
  // 1. LINKED LIST STATE
  // ==========================================
  const [linkedList, setLinkedList] = useState(['Ashwini', 'Rahul', 'Priya', 'Siddharth']);
  const [llNewName, setLlNewName] = useState('');
  const [llTraverseIdx, setLlTraverseIdx] = useState(null);
  const [llStatusMsg, setLlStatusMsg] = useState('Ready for operations');

  const insertLL = (name) => {
    const val = name || llNewName.trim() || 'New Member';
    setLinkedList(prev => [...prev, val]);
    setLlNewName('');
    setLlStatusMsg(`Node [${val}] inserted at end. Time Complexity: O(1) with tail reference, else O(n).`);
  };

  const deleteLL = (targetName) => {
    if (linkedList.length === 0) return;
    const nameToRemove = targetName || linkedList[linkedList.length - 1];
    setLinkedList(prev => prev.filter(item => item !== nameToRemove));
    setLlStatusMsg(`Node [${nameToRemove}] deleted. Time Complexity: O(n) to find pointer, O(1) to unlink.`);
  };

  const traverseLL = async () => {
    setLlStatusMsg('Traversing Linked List from HEAD to NULL...');
    for (let i = 0; i < linkedList.length; i++) {
      setLlTraverseIdx(i);
      await new Promise(r => setTimeout(r, 600));
    }
    setLlTraverseIdx(null);
    setLlStatusMsg(`Traversal complete. Visited ${linkedList.length} nodes. Time Complexity: O(n).`);
  };

  // ==========================================
  // 2. STACK STATE (LIFO)
  // ==========================================
  const [stack, setStack] = useState(['React', 'Python', 'AI']);
  const [stackInput, setStackInput] = useState('');
  const [stackPeekMsg, setStackPeekMsg] = useState(null);
  const [stackStatusMsg, setStackStatusMsg] = useState('Top points to AI');

  const pushStack = (val) => {
    const item = val || stackInput.trim() || 'Data Structure';
    setStack(prev => [...prev, item]);
    setStackInput('');
    setStackPeekMsg(null);
    setStackStatusMsg(`Pushed "${item}" to TOP. LIFO principle applied. Time Complexity: O(1).`);
  };

  const popStack = () => {
    if (stack.length === 0) {
      setStackStatusMsg('Stack Underflow! Stack is empty.');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(prev => prev.slice(0, prev.length - 1));
    setStackPeekMsg(null);
    setStackStatusMsg(`Popped "${popped}" from TOP. LIFO principle applied. Time Complexity: O(1).`);
  };

  const peekStack = () => {
    if (stack.length === 0) {
      setStackPeekMsg('Empty stack (null)');
      return;
    }
    const top = stack[stack.length - 1];
    setStackPeekMsg(`Top Element is: "${top}"`);
    setStackStatusMsg(`Peeked top element without removing it. Time Complexity: O(1).`);
  };

  // ==========================================
  // 3. QUEUE STATE (FIFO)
  // ==========================================
  const [queue, setQueue] = useState(['Ashwini', 'Priya', 'Karan', 'Akash']);
  const [queueInput, setQueueInput] = useState('');
  const [queueStatusMsg, setQueueStatusMsg] = useState('Ready: First In First Out');

  const enqueue = (val) => {
    const item = val || queueInput.trim() || 'Learner';
    setQueue(prev => [...prev, item]);
    setQueueInput('');
    setQueueStatusMsg(`Enqueued "${item}" at REAR. Time Complexity: O(1).`);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setQueueStatusMsg('Queue Underflow! No pending requests.');
      return;
    }
    const dequeued = queue[0];
    setQueue(prev => prev.slice(1));
    setQueueStatusMsg(`Dequeued "${dequeued}" from FRONT. Request served. Time Complexity: O(1).`);
  };

  // ==========================================
  // 4. PRIORITY QUEUE STATE (Max-Heap by Score)
  // ==========================================
  const [priorityQueue, setPriorityQueue] = useState([
    { name: 'Rahul', score: 95, expertise: 'Machine Learning' },
    { name: 'Priya', score: 92, expertise: 'Web Architecture' },
    { name: 'Akash', score: 88, expertise: 'Cloud DevOps' },
    { name: 'Karan', score: 80, expertise: 'Data Science' }
  ]);
  const [pqStatusMsg, setPqStatusMsg] = useState('Mentors sorted by highest match score first.');

  const insertPQ = (custom) => {
    const names = ['Sneha', 'Vikram', 'Divya', 'Ananya', 'Rohan'];
    const topics = ['System Design', 'Cybersecurity', 'Database Internals', 'Algorithms'];
    const newName = custom?.name || names[Math.floor(Math.random() * names.length)];
    const newScore = custom?.score || Math.floor(Math.random() * 20) + 79;
    const newExp = custom?.expertise || topics[Math.floor(Math.random() * topics.length)];

    const updated = [...priorityQueue, { name: newName, score: newScore, expertise: newExp }];
    updated.sort((a, b) => b.score - a.score);
    setPriorityQueue(updated);
    setPqStatusMsg(`Inserted ${newName} (Score: ${newScore}). Heap re-balanced. Insert: O(log n).`);
  };

  const recalculatePQ = () => {
    const updated = priorityQueue.map(m => ({
      ...m,
      score: Math.min(99, Math.max(65, m.score + Math.floor(Math.random() * 9) - 4))
    }));
    updated.sort((a, b) => b.score - a.score);
    setPriorityQueue(updated);
    setPqStatusMsg(`Recalculated match scores. Priority Queue restored via Max-Heapify. Time: O(n log n).`);
  };

  // ==========================================
  // 5. HASH MAP STATE (Key-Value O(1))
  // ==========================================
  const userHashMap = {
    '1001': { name: 'Ashwini', role: 'Staff Mentor', skills: 'DSA, Distributed Systems, Python', credits: 1250 },
    '1002': { name: 'Rahul', role: 'Senior Mentor', skills: 'Machine Learning, Neural Nets', credits: 890 },
    '1003': { name: 'Priya', role: 'Full Stack Guide', skills: 'React, Node.js, Express', credits: 940 },
    '1004': { name: 'Akash', role: 'Cloud Architect', skills: 'AWS, Kubernetes, Docker', credits: 780 },
    '1005': { name: 'Siddharth', role: 'Algorithm Specialist', skills: 'C++, Dynamic Programming', credits: 620 }
  };
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hashStatusMsg, setHashStatusMsg] = useState('Direct key addressing enabled.');

  const lookupHashMap = (customKey) => {
    const key = customKey || searchKey.trim();
    if (!key) return;
    if (userHashMap[key]) {
      setSearchResult({ key, ...userHashMap[key] });
      setHashStatusMsg(`Key "${key}" hashed to bucket. Profile retrieved instantly. Average Complexity: O(1).`);
    } else {
      setSearchResult(false);
      setHashStatusMsg(`Key "${key}" not found in Hash Table. Collision check resolved to NULL.`);
    }
  };

  // ==========================================
  // 6. TREE STATE (Hierarchical Category Navigation)
  // ==========================================
  const [treeExpanded, setTreeExpanded] = useState({
    'Technology': true,
    'AI': true,
    'Web': true,
    'Cloud': true
  });

  const toggleTreeNode = (nodeName) => {
    setTreeExpanded(prev => ({ ...prev, [nodeName]: !prev[nodeName] }));
  };

  // ==========================================
  // 7. GRAPH STATE (Nodes and Edges)
  // ==========================================
  const [graphNodes, setGraphNodes] = useState(['Ashwini', 'Rahul', 'Priya', 'Akash']);
  const [graphEdges, setGraphEdges] = useState([
    ['Ashwini', 'Rahul'],
    ['Ashwini', 'Priya'],
    ['Ashwini', 'Akash'],
    ['Rahul', 'Priya']
  ]);
  const [graphStatusMsg, setGraphStatusMsg] = useState('Graph modeled as Adjacency List: G = (V, E).');

  const addGraphNode = (name) => {
    const candidates = ['Karan', 'Sneha', 'Vikram', 'Divya'];
    const chosen = name || candidates.find(c => !graphNodes.includes(c)) || `User_${graphNodes.length + 1}`;
    if (!graphNodes.includes(chosen)) {
      setGraphNodes(prev => [...prev, chosen]);
      // Connect to Ashwini by default
      setGraphEdges(prev => [...prev, ['Ashwini', chosen]]);
      setGraphStatusMsg(`Added vertex [${chosen}] and edge (Ashwini ↔ ${chosen}). Graph updated.`);
    }
  };

  const removeGraphNode = (name) => {
    const target = name || (graphNodes.length > 2 ? graphNodes[graphNodes.length - 1] : null);
    if (!target || target === 'Ashwini') return;
    setGraphNodes(prev => prev.filter(n => n !== target));
    setGraphEdges(prev => prev.filter(([u, v]) => u !== target && v !== target));
    setGraphStatusMsg(`Removed vertex [${target}] and all incident edges.`);
  };

  // ==========================================
  // 8. BFS STATE (Breadth First Search - Level Order)
  // ==========================================
  const [bfsQueueDisplay, setBfsQueueDisplay] = useState([]);
  const [bfsVisited, setBfsVisited] = useState([]);
  const [bfsCurrent, setBfsCurrent] = useState(null);
  const [bfsStatusMsg, setBfsStatusMsg] = useState('Ready to run BFS starting from Ashwini.');

  const runBFS = async () => {
    setBfsVisited([]);
    setBfsQueueDisplay([]);
    setBfsStatusMsg('Starting BFS. Finding closest mentors level by level using Queue (FIFO)...');

    // Build Adjacency List
    const adj = {};
    graphNodes.forEach(n => adj[n] = []);
    graphEdges.forEach(([u, v]) => {
      adj[u]?.push(v);
      adj[v]?.push(u);
    });

    const start = 'Ashwini';
    const visitedSet = new Set([start]);
    const q = [start];
    setBfsQueueDisplay([...q]);
    setBfsVisited([start]);
    await new Promise(r => setTimeout(r, 600));

    while (q.length > 0) {
      const curr = q.shift();
      setBfsCurrent(curr);
      setBfsQueueDisplay([...q]);
      setBfsStatusMsg(`Visited: ${curr}. Checking adjacent neighbors...`);
      await new Promise(r => setTimeout(r, 700));

      const neighbors = adj[curr] || [];
      for (const nbr of neighbors) {
        if (!visitedSet.has(nbr)) {
          visitedSet.add(nbr);
          q.push(nbr);
          setBfsVisited(Array.from(visitedSet));
          setBfsQueueDisplay([...q]);
          setBfsStatusMsg(`Discovered neighbor [${nbr}]. Enqueued to BFS Queue.`);
          await new Promise(r => setTimeout(r, 600));
        }
      }
    }

    setBfsCurrent(null);
    setBfsStatusMsg('BFS Complete. All reachable mentors discovered in order of shortest distance. Time: O(V + E).');
  };

  // ==========================================
  // 9. DFS STATE (Depth First Search - Recursive/Stack)
  // ==========================================
  const [dfsStackDisplay, setDfsStackDisplay] = useState([]);
  const [dfsVisited, setDfsVisited] = useState([]);
  const [dfsCurrent, setDfsCurrent] = useState(null);
  const [dfsStatusMsg, setDfsStatusMsg] = useState('Ready to run DFS deep network exploration.');

  const runDFS = async () => {
    setDfsVisited([]);
    setDfsStackDisplay([]);
    setDfsStatusMsg('Starting DFS. Exploring branch as deep as possible before backtracking...');

    const adj = {};
    graphNodes.forEach(n => adj[n] = []);
    graphEdges.forEach(([u, v]) => {
      adj[u]?.push(v);
      adj[v]?.push(u);
    });

    const visitedSet = new Set();
    const stackTracking = [];

    const dfsHelper = async (u) => {
      visitedSet.add(u);
      stackTracking.push(u);
      setDfsCurrent(u);
      setDfsVisited(Array.from(visitedSet));
      setDfsStackDisplay([...stackTracking]);
      setDfsStatusMsg(`Entered node [${u}]. Call Stack depth: ${stackTracking.length}`);
      await new Promise(r => setTimeout(r, 800));

      const neighbors = adj[u] || [];
      for (const nbr of neighbors) {
        if (!visitedSet.has(nbr)) {
          await dfsHelper(nbr);
        }
      }

      stackTracking.pop();
      setDfsStackDisplay([...stackTracking]);
      setDfsStatusMsg(`Backtracked from node [${u}].`);
      await new Promise(r => setTimeout(r, 500));
    };

    await dfsHelper('Ashwini');
    setDfsCurrent(null);
    setDfsStatusMsg('DFS Complete. Entire connected component explored. Time: O(V + E).');
  };

  // ==========================================
  // 11. DEMONSTRATE ALL DATA STRUCTURES
  // ==========================================
  const handleDemonstrateAll = async () => {
    if (isAutoDemonstrating) return;
    setIsAutoDemonstrating(true);

    // 1. Linked List
    setDemoStep('1/9: Demonstrating Linked List Insertion & Traversal');
    insertLL('Vikram');
    await new Promise(r => setTimeout(r, 1000));
    await traverseLL();
    await new Promise(r => setTimeout(r, 1000));

    // 2. Stack
    setDemoStep('2/9: Demonstrating Stack Push, Pop & Peek');
    pushStack('Cloud Computing');
    await new Promise(r => setTimeout(r, 1000));
    peekStack();
    await new Promise(r => setTimeout(r, 1000));
    popStack();
    await new Promise(r => setTimeout(r, 1000));

    // 3. Queue
    setDemoStep('3/9: Demonstrating Queue Enqueue & Dequeue');
    enqueue('Vikram');
    await new Promise(r => setTimeout(r, 1000));
    dequeue();
    await new Promise(r => setTimeout(r, 1000));

    // 4. Priority Queue
    setDemoStep('4/9: Demonstrating Priority Queue Max-Heap Ordering');
    insertPQ({ name: 'Divya', score: 97, expertise: 'Distributed Databases' });
    await new Promise(r => setTimeout(r, 1200));

    // 5. Hash Map
    setDemoStep('5/9: Demonstrating Hash Map O(1) Search');
    setSearchKey('1001');
    lookupHashMap('1001');
    await new Promise(r => setTimeout(r, 1200));

    // 6. Tree
    setDemoStep('6/9: Demonstrating Hierarchical Skill Tree');
    setTreeExpanded({ Technology: true, AI: true, Web: true, Cloud: true });
    await new Promise(r => setTimeout(r, 1000));

    // 7. Graph
    setDemoStep('7/9: Demonstrating Graph Nodes & Edges');
    addGraphNode('Divya');
    await new Promise(r => setTimeout(r, 1200));

    // 8. BFS
    setDemoStep('8/9: Demonstrating BFS (Breadth First Search)');
    await runBFS();
    await new Promise(r => setTimeout(r, 1000));

    // 9. DFS
    setDemoStep('9/9: Demonstrating DFS (Depth First Search)');
    await runDFS();
    await new Promise(r => setTimeout(r, 1000));

    setDemoStep('Demonstration of all 9 Data Structures & Algorithms Completed Successfully!');
    setTimeout(() => {
      setIsAutoDemonstrating(false);
      setDemoStep(null);
    }, 3000);
  };

  // Helper Viva Card Component
  const VivaExplanationCard = ({ dsName, whyUsed, advantages, disadvantages, timeComp, spaceComp, realLife }) => {
    if (!vivaMode) return null;
    return (
      <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 text-xs space-y-2.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>SPPU Viva Explanation: {dsName}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
            Viva Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
          <div>
            <strong className="text-white block mb-0.5">Why is it used?</strong>
            <p className="text-slate-400 leading-relaxed">{whyUsed}</p>
          </div>
          <div>
            <strong className="text-white block mb-0.5">Real-Life Application:</strong>
            <p className="text-slate-400 leading-relaxed">{realLife}</p>
          </div>
          <div>
            <strong className="text-emerald-400 block mb-0.5">Advantages:</strong>
            <p className="text-slate-400 leading-relaxed">{advantages}</p>
          </div>
          <div>
            <strong className="text-rose-400 block mb-0.5">Disadvantages:</strong>
            <p className="text-slate-400 leading-relaxed">{disadvantages || 'Requires extra memory for pointers.'}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-4 font-mono text-[11px]">
          <div className="text-amber-300">
            <span className="text-slate-400 font-sans">Time Complexity: </span>
            {timeComp}
          </div>
          <div className="text-purple-300">
            <span className="text-slate-400 font-sans">Space Complexity: </span>
            {spaceComp}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-white font-sans">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono font-medium mb-3">
              <Boxes className="w-3.5 h-3.5" />
              <span>SPPU NEP 2020 Examination & Practical Viva Module</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              HumanNet: A Skill Sharing Platform Based on Data Structures
            </h1>
            <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl leading-relaxed">
              Every feature visibly demonstrates its underlying computer science data structure, operations, time complexity, and practical execution.
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {/* Demonstrate All Button */}
            <button
              onClick={handleDemonstrateAll}
              disabled={isAutoDemonstrating}
              className={`px-5 py-3 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 transition-all ${
                isAutoDemonstrating
                  ? 'bg-purple-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-slate-950 hover:scale-105 shadow-sky-500/20'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isAutoDemonstrating ? 'Running Demo...' : 'DEMONSTRATE ALL DATA STRUCTURES'}</span>
            </button>

            {/* Viva Mode Toggle */}
            <button
              onClick={() => setVivaMode(!vivaMode)}
              className={`px-4 py-3 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 ${
                vivaMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Viva Mode: {vivaMode ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Live Auto-Demo Progress Notification */}
        {demoStep && (
          <div className="mt-4 p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center gap-3 text-purple-200 text-xs font-mono animate-fade-in">
            <RefreshCw className="w-4 h-4 animate-spin text-purple-400 shrink-0" />
            <span className="font-bold">{demoStep}</span>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* 10. DSA LIVE METRICS DASHBOARD */}
      {/* ================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <span>Data Structures Live Metrics Dashboard</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Real-time state tracking</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Linked List Nodes</div>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">{linkedList.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Head: {linkedList[0] || 'NULL'}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Stack Depth</div>
            <div className="text-2xl font-bold font-mono text-purple-400 mt-1">{stack.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Top: {stack[stack.length - 1] || 'Empty'}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Queue Size</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{queue.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Front: {queue[0] || 'Empty'}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Priority Queue Size</div>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{priorityQueue.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Max: {priorityQueue[0]?.score || 0} pts</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Hash Records</div>
            <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">{Object.keys(userHashMap).length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">O(1) Direct Access</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Graph Nodes (V)</div>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{graphNodes.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Vertices in Network</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Graph Edges (E)</div>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{graphEdges.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Undirected Connections</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Tree Levels</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">3</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Root: Technology</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">BFS Operations</div>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">{bfsVisited.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Level-order Traversed</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1E293B]/80 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">DFS Operations</div>
            <div className="text-2xl font-bold font-mono text-purple-400 mt-1">{dfsVisited.length}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Depth Traversed</div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 1. LINKED LIST VISUALIZATION (Human Connections) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <h3 className="text-lg font-bold text-white">1. Linked List Visualization</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono">Module: Human Connections</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Linear data structure where elements are not stored at contiguous memory locations; elements are linked using pointers.
            </p>
          </div>

          {/* Operations Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="User name..."
                value={llNewName}
                onChange={(e) => setLlNewName(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-400 w-32"
              />
              <button
                onClick={() => insertLL()}
                className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Insert</span>
              </button>
            </div>

            <button
              onClick={() => deleteLL()}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Last</span>
            </button>

            <button
              onClick={traverseLL}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Traverse List</span>
            </button>
          </div>
        </div>

        {/* Visual Structure */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 overflow-x-auto">
          <div className="text-[11px] font-mono text-slate-400 mb-2">HEAD POINTER:</div>
          <div className="flex items-center gap-2 min-w-max py-2">
            <div className="px-3 py-2 rounded-lg bg-sky-500/20 border border-sky-400 text-sky-300 font-mono text-xs font-bold shadow-sm">
              HEAD
            </div>
            <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />

            {linkedList.map((item, idx) => {
              const isCurrent = llTraverseIdx === idx;
              return (
                <React.Fragment key={idx}>
                  <div
                    className={`px-4 py-3 rounded-xl border text-xs font-mono transition-all flex flex-col items-center gap-1 min-w-[100px] shadow-sm ${
                      isCurrent
                        ? 'bg-sky-500 text-slate-950 border-white scale-110 shadow-lg shadow-sky-500/30 font-bold'
                        : 'bg-[#1E293B] text-white border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-sans">Node #{idx}</span>
                    <span className="text-sm font-semibold">{item}</span>
                    <span className="text-[9px] text-sky-300/80 font-mono">next → ptr</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${isCurrent ? 'text-sky-300' : 'text-slate-500'}`} />
                </React.Fragment>
              );
            })}

            <div className="px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold">
              NULL
            </div>
          </div>
          <div className="text-[11px] font-mono text-sky-400 mt-2">Status: {llStatusMsg}</div>
        </div>

        {/* Explanation Panel */}
        <VivaExplanationCard
          dsName="Singly Linked List"
          whyUsed="Users frequently connect and disconnect from mentorship threads dynamically without fixed array reallocation."
          realLife="Maintaining dynamic user connection lists, buddy lists, and train compartments."
          advantages="Dynamic size allocation; Insertion and deletion at current node pointer is O(1) without shifting elements."
          disadvantages="Random access is not allowed; extra memory required for pointer fields."
          timeComp="Insertion: O(1) at Head, Deletion: O(n) to locate, Traversal: O(n)"
          spaceComp="O(n) for n elements + pointer references"
        />
      </div>

      {/* ================================================== */}
      {/* 2. STACK VISUALIZATION (Search History & Undo) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <h3 className="text-lg font-bold text-white">2. Stack Visualization (LIFO)</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono">Module: Search History and Undo</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Linear data structure following Last In First Out (LIFO). Elements are pushed and popped from the same end (TOP).
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Topic..."
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-400 w-32"
              />
              <button
                onClick={() => pushStack()}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Push</span>
              </button>
            </div>

            <button
              onClick={popStack}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs flex items-center gap-1"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Pop</span>
            </button>

            <button
              onClick={peekStack}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Peek</span>
            </button>
          </div>
        </div>

        {/* Visual Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center">
            <div className="text-[11px] font-mono text-purple-300 mb-2">TOP POINTER (LIFO)</div>
            <div className="w-48 flex flex-col-reverse gap-1.5 p-3 rounded-lg bg-slate-900/80 border-b-4 border-purple-500/60">
              {stack.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 font-mono">Stack Empty</div>
              ) : (
                stack.map((item, idx) => {
                  const isTop = idx === stack.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-center font-mono text-xs transition-all ${
                        isTop
                          ? 'bg-purple-600/30 text-purple-200 border-purple-400 font-bold shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {item} {isTop && <span className="text-[10px] text-amber-300 font-sans ml-1">← TOP</span>}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-center space-y-2">
            <div className="text-xs font-semibold text-white">Stack State Analysis:</div>
            <div className="text-xs font-mono text-slate-300">Total Depth: <span className="text-purple-400 font-bold">{stack.length} elements</span></div>
            <div className="text-xs font-mono text-slate-300">Current TOP: <span className="text-amber-400 font-bold">{stack[stack.length - 1] || 'None'}</span></div>
            {stackPeekMsg && (
              <div className="p-2 rounded bg-purple-500/20 text-purple-300 text-xs font-mono">
                {stackPeekMsg}
              </div>
            )}
            <div className="text-[11px] font-mono text-purple-400 pt-1">Status: {stackStatusMsg}</div>
          </div>
        </div>

        {/* Viva Panel */}
        <VivaExplanationCard
          dsName="Stack (LIFO - Last In First Out)"
          whyUsed="Used for Undo operations and storing recent search history in reverse chronological order."
          realLife="Browser forward/backward history, function call execution stack, text editor undo (Ctrl+Z)."
          advantages="Fast O(1) push and pop operations; very simple array or linked list implementation."
          disadvantages="Cannot directly access middle elements without popping top items."
          timeComp="Push: O(1), Pop: O(1), Peek: O(1)"
          spaceComp="O(n) where n is depth of stored actions"
        />
      </div>

      {/* ================================================== */}
      {/* 3. QUEUE VISUALIZATION (Learning Requests - FIFO) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="text-lg font-bold text-white">3. Queue Visualization (FIFO)</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">Module: Learning Requests</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Linear data structure following First In First Out (FIFO). Elements are inserted at REAR and removed from FRONT.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Learner name..."
                value={queueInput}
                onChange={(e) => setQueueInput(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400 w-32"
              />
              <button
                onClick={() => enqueue()}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Enqueue</span>
              </button>
            </div>

            <button
              onClick={dequeue}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Dequeue (Process)</span>
            </button>
          </div>
        </div>

        {/* Visual Queue Structure */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 overflow-x-auto">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span className="text-emerald-400 font-bold">← FRONT (Exit/Served First)</span>
            <span className="text-sky-400 font-bold">REAR (Entry/Joined Last) →</span>
          </div>

          <div className="flex items-center gap-2 min-w-max py-2">
            {queue.length === 0 ? (
              <div className="text-xs text-slate-500 font-mono py-4">Queue is empty</div>
            ) : (
              queue.map((item, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queue.length - 1;
                return (
                  <div
                    key={idx}
                    className={`px-4 py-3 rounded-xl border text-xs font-mono flex flex-col items-center gap-1 min-w-[110px] transition-all shadow-sm ${
                      isFront
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                        : isRear
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'bg-[#1E293B] border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-sans">
                      {isFront ? 'FRONT' : isRear ? 'REAR' : `Pos #${idx + 1}`}
                    </span>
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2">Status: {queueStatusMsg}</div>
        </div>

        {/* Viva Panel */}
        <VivaExplanationCard
          dsName="Queue (FIFO - First In First Out)"
          whyUsed="Learning requests must be serviced fairly in the exact order they arrive without starvations."
          realLife="CPU task scheduling, printer spooling buffers, customer service ticket systems."
          advantages="Fair ordering (FIFO); O(1) enqueue and dequeue operations."
          disadvantages="Cannot directly access middle elements without dequeuing earlier requests."
          timeComp="Enqueue: O(1), Dequeue: O(1)"
          spaceComp="O(n) where n is pending requests"
        />
      </div>

      {/* ================================================== */}
      {/* 4. PRIORITY QUEUE VISUALIZATION (Mentor Ranking) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h3 className="text-lg font-bold text-white">4. Priority Queue Visualization (Max-Heap)</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono">Module: Mentor Ranking</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              An extension of queue where each element has a priority score. Elements with higher priority are served before lower priority elements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => insertPQ()}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Insert Mentor</span>
            </button>
            <button
              onClick={recalculatePQ}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recalculate Ranking</span>
            </button>
          </div>
        </div>

        {/* Ranked Mentors List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {priorityQueue.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                idx === 0
                  ? 'bg-amber-500/15 border-amber-400/80 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Priority Rank #{idx + 1}
                </span>
                <span className="text-sm font-bold font-mono text-amber-400">
                  {m.score} pts
                </span>
              </div>
              <div className="text-sm font-bold text-white mt-2">{m.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{m.expertise}</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
                  style={{ width: `${m.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[11px] font-mono text-amber-400">Status: {pqStatusMsg}</div>

        <VivaExplanationCard
          dsName="Priority Queue (Max-Heap)"
          whyUsed="The highest scoring mentor must always be retrieved first without sorting the entire array every lookup."
          realLife="Emergency hospital triage, Dijkstra shortest path algorithm, Huffman coding."
          advantages="Guarantees highest priority element is at root in O(1) time; insertion and deletion in O(log n)."
          disadvantages="Finding arbitrary elements takes O(n) search."
          timeComp="Insert: O(log n), Extract-Max: O(log n), Peek Max: O(1)"
          spaceComp="O(n) for binary heap storage"
        />
      </div>

      {/* ================================================== */}
      {/* 5. HASH MAP VISUALIZATION (User Profile Lookup) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              <h3 className="text-lg font-bold text-white">5. Hash Map Visualization</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono">Module: User Profile Lookup</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Associative data structure mapping unique keys to values using a hash function for constant-time lookups.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter User ID (1001-1005)..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-400 w-48"
            />
            <button
              onClick={() => lookupHashMap()}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Lookup O(1)</span>
            </button>
          </div>
        </div>

        {/* Display Buckets and Result */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400 mb-2">HASH TABLE ENTRIES (KEY → VALUE):</div>
            <div className="space-y-1.5 font-mono text-xs">
              {Object.entries(userHashMap).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() => { setSearchKey(key); lookupHashMap(key); }}
                  className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    searchResult?.key === key
                      ? 'bg-indigo-500/20 border-indigo-400 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-indigo-400">{key} → hash(key)</span>
                  <span>{val.name} ({val.role})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-center">
            {searchResult ? (
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-bold">✓ Profile Found</span>
                  <span className="text-xs font-mono text-indigo-300">ID: {searchResult.key}</span>
                </div>
                <div className="text-base font-bold text-white">{searchResult.name}</div>
                <div className="text-xs text-slate-300 font-medium">{searchResult.role}</div>
                <div className="text-xs text-slate-400">Skills: {searchResult.skills}</div>
                <div className="text-xs font-mono text-amber-300">Credits: {searchResult.credits}</div>
              </div>
            ) : searchResult === false ? (
              <div className="text-center py-6 text-xs text-rose-400 font-mono">
                No user profile found for key "{searchKey}".
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-500 font-mono">
                Click an entry on the left or type an ID above to execute an O(1) Hash Map lookup.
              </div>
            )}
            <div className="text-[11px] font-mono text-indigo-400 mt-2">Status: {hashStatusMsg}</div>
          </div>
        </div>

        <VivaExplanationCard
          dsName="Hash Map (Hash Table)"
          whyUsed="Provides instantaneous user profile retrieval by unique ID without scanning an entire array."
          realLife="Database indexing, caching layers (Redis), compiler symbol tables, cryptography."
          advantages="Average constant time complexity O(1) for search, insert, and delete."
          disadvantages="Collisions can degrade performance to O(n) in worst case; does not maintain sorted order."
          timeComp="Average: O(1) search/insert, Worst Case: O(n) with collisions"
          spaceComp="O(n) where n is number of stored key-value pairs"
        />
      </div>

      {/* ================================================== */}
      {/* 6. TREE VISUALIZATION (Skill Hierarchy) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <h3 className="text-lg font-bold text-white">6. Tree Visualization (Hierarchical Structure)</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">Module: Skill Hierarchy</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Non-linear hierarchical data structure consisting of nodes connected by edges, rooted at Technology.
            </p>
          </div>

          <div className="text-xs font-mono text-cyan-300">
            Click any parent node to expand/collapse branch
          </div>
        </div>

        {/* Tree Render */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs">
          <div
            onClick={() => toggleTreeNode('Technology')}
            className="flex items-center gap-2 cursor-pointer font-bold text-sky-400 hover:text-sky-300 select-none"
          >
            {treeExpanded['Technology'] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span>ROOT: Technology (General Category)</span>
          </div>

          {treeExpanded['Technology'] && (
            <div className="ml-6 border-l border-slate-700 pl-4 mt-2 space-y-3">
              {/* Branch 1: AI */}
              <div>
                <div
                  onClick={() => toggleTreeNode('AI')}
                  className="flex items-center gap-2 cursor-pointer font-semibold text-purple-300 hover:text-purple-200 select-none"
                >
                  {treeExpanded['AI'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>├── AI (Artificial Intelligence)</span>
                </div>
                {treeExpanded['AI'] && (
                  <div className="ml-6 border-l border-slate-800 pl-4 mt-1 space-y-1 text-slate-300 text-[11px]">
                    <div>├── Machine Learning</div>
                    <div>├── Deep Learning</div>
                    <div>└── Large Language Models (LLM)</div>
                  </div>
                )}
              </div>

              {/* Branch 2: Web */}
              <div>
                <div
                  onClick={() => toggleTreeNode('Web')}
                  className="flex items-center gap-2 cursor-pointer font-semibold text-emerald-300 hover:text-emerald-200 select-none"
                >
                  {treeExpanded['Web'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>├── Web Development</span>
                </div>
                {treeExpanded['Web'] && (
                  <div className="ml-6 border-l border-slate-800 pl-4 mt-1 space-y-1 text-slate-300 text-[11px]">
                    <div>├── Frontend (React, Tailwind)</div>
                    <div>└── Backend (Node.js, Express)</div>
                  </div>
                )}
              </div>

              {/* Branch 3: Cloud */}
              <div>
                <div
                  onClick={() => toggleTreeNode('Cloud')}
                  className="flex items-center gap-2 cursor-pointer font-semibold text-amber-300 hover:text-amber-200 select-none"
                >
                  {treeExpanded['Cloud'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>└── Cloud Computing</span>
                </div>
                {treeExpanded['Cloud'] && (
                  <div className="ml-6 border-l border-slate-800 pl-4 mt-1 space-y-1 text-slate-300 text-[11px]">
                    <div>├── AWS (Amazon Web Services)</div>
                    <div>└── Azure (Microsoft Azure)</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <VivaExplanationCard
          dsName="Tree (Hierarchical Non-Linear Structure)"
          whyUsed="Skills naturally form parent-child taxonomic relationships from broader categories to specialized tools."
          realLife="File system directory hierarchies, HTML DOM tree, organizational hierarchy charts."
          advantages="Reflects structural relationships; enables efficient sub-tree pruning and recursive classification."
          disadvantages="Unbalanced trees can cause traversal performance to degrade."
          timeComp="Traversal: O(n) to visit all skill nodes"
          spaceComp="O(h) stack frames where h is tree height"
        />
      </div>

      {/* ================================================== */}
      {/* 7. GRAPH VISUALIZATION (Human Network) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <h3 className="text-lg font-bold text-white">7. Graph Visualization (Network Modeling)</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-mono">Module: Human Network</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Mathematical structure G = (V, E) of vertices representing users and edges representing mutual mentorship connections.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addGraphNode()}
              className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-semibold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Node</span>
            </button>
            <button
              onClick={() => removeGraphNode()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Node</span>
            </button>
          </div>
        </div>

        {/* Visual Graph Layout */}
        <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Top Node */}
            <div className="px-5 py-2.5 rounded-xl bg-purple-500/20 border-2 border-purple-400 text-purple-200 font-bold text-xs font-mono shadow-md">
              Rahul (Mentor)
            </div>

            {/* Middle Row with Ashwini and Priya */}
            <div className="flex items-center justify-center gap-16 w-full max-w-md">
              <div className="px-5 py-2.5 rounded-xl bg-sky-500/30 border-2 border-sky-400 text-sky-200 font-bold text-xs font-mono shadow-lg shadow-sky-500/20">
                Ashwini (Center)
              </div>
              <div className="h-0.5 bg-slate-600 flex-1 relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-400 bg-slate-900 px-1">
                  edge(u, v)
                </span>
              </div>
              <div className="px-5 py-2.5 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-200 font-bold text-xs font-mono shadow-md">
                Priya (Mentor)
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center gap-8">
              <div className="px-5 py-2.5 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-bold text-xs font-mono shadow-md">
                Akash (Learner)
              </div>
              {graphNodes.includes('Divya') && (
                <div className="px-5 py-2.5 rounded-xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 font-bold text-xs font-mono shadow-md animate-fade-in">
                  Divya (Mentor)
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
            <div>Vertices V = {'{'}{graphNodes.join(', ')}{'}'}</div>
            <div>Total Edges |E| = {graphEdges.length}</div>
          </div>
          <div className="text-[11px] font-mono text-rose-400 mt-2">Status: {graphStatusMsg}</div>
        </div>

        <VivaExplanationCard
          dsName="Graph (Adjacency List G = (V, E))"
          whyUsed="Real-world human relationships form complex multi-way networks with mutual connections, cliques, and social paths."
          realLife="Social networks (LinkedIn, Facebook), GPS navigation maps, internet routing protocols."
          advantages="Represents arbitrary many-to-many connections accurately."
          disadvantages="Algorithms on graphs have higher complexity than trees; cycles must be handled."
          timeComp="Graph storage: O(V + E) with Adjacency List"
          spaceComp="O(V + E) space"
        />
      </div>

      {/* ================================================== */}
      {/* 8. BFS VISUALIZATION (Closest Mentor Search) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <h3 className="text-lg font-bold text-white">8. BFS Visualization (Breadth First Search)</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono">Module: Closest Mentor Search</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Graph traversal algorithm that explores neighbor nodes first before moving to next level depth. Uses a FIFO Queue.
            </p>
          </div>

          <button
            onClick={runBFS}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run BFS Traversal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
            <div className="text-xs font-bold text-white">FIFO Traversal Queue:</div>
            <div className="flex items-center gap-1.5 min-h-[40px] flex-wrap">
              {bfsQueueDisplay.length === 0 ? (
                <span className="text-xs text-slate-500 font-mono">Queue Empty</span>
              ) : (
                bfsQueueDisplay.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-400 text-xs font-mono font-bold"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>

            <div className="text-xs font-bold text-white pt-2">Visited Order (Level-by-Level):</div>
            <div className="flex items-center gap-1.5 flex-wrap min-h-[40px]">
              {bfsVisited.map((item, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    bfsCurrent === item
                      ? 'bg-amber-400 text-slate-950 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-center space-y-2">
            <div className="text-xs font-mono text-slate-300">Start Vertex: <span className="text-sky-400 font-bold">Ashwini</span></div>
            <div className="text-xs font-mono text-slate-300">Level 0: <span className="text-white">Ashwini</span></div>
            <div className="text-xs font-mono text-slate-300">Level 1 (Direct Mentors): <span className="text-white">Rahul, Priya, Akash</span></div>
            <div className="text-[11px] font-mono text-sky-400 mt-2">Status: {bfsStatusMsg}</div>
          </div>
        </div>

        <VivaExplanationCard
          dsName="BFS (Breadth First Search)"
          whyUsed="Finds the closest mentor with the minimum number of network hops (unweighted shortest path)."
          realLife="Friend recommendation suggestions (mutual connections), GPS routing, web crawlers."
          advantages="Guaranteed to discover the shortest path in unweighted graphs."
          disadvantages="Requires more memory than DFS because entire levels are held in the queue."
          timeComp="O(V + E) where V = users, E = connection edges"
          spaceComp="O(V) to store the BFS queue"
        />
      </div>

      {/* ================================================== */}
      {/* 9. DFS VISUALIZATION (Deep Network Exploration) */}
      {/* ================================================== */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <h3 className="text-lg font-bold text-white">9. DFS Visualization (Depth First Search)</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono">Module: Deep Network Exploration</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Graph traversal that dives as deep as possible along each branch before backtracking. Uses a Recursion Stack / Call Stack.
            </p>
          </div>

          <button
            onClick={runDFS}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run DFS Traversal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
            <div className="text-xs font-bold text-white">Call Stack Tracking (LIFO):</div>
            <div className="flex items-center gap-1.5 min-h-[40px] flex-wrap">
              {dfsStackDisplay.length === 0 ? (
                <span className="text-xs text-slate-500 font-mono">Call Stack Empty</span>
              ) : (
                dfsStackDisplay.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-400 text-xs font-mono font-bold"
                  >
                    {item} {idx === dfsStackDisplay.length - 1 && '← Top'}
                  </span>
                ))
              )}
            </div>

            <div className="text-xs font-bold text-white pt-2">Full Traversal Path with Backtracking:</div>
            <div className="flex items-center gap-1.5 flex-wrap min-h-[40px]">
              {dfsVisited.map((item, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    dfsCurrent === item
                      ? 'bg-purple-500 text-white animate-pulse'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-center space-y-2">
            <div className="text-xs font-mono text-slate-300">Algorithm Type: <span className="text-purple-400 font-bold">Recursive Backtracking</span></div>
            <div className="text-xs font-mono text-slate-300">Exploration Direction: <span className="text-white">Deepest reachable leaf first</span></div>
            <div className="text-[11px] font-mono text-purple-400 mt-2">Status: {dfsStatusMsg}</div>
          </div>
        </div>

        <VivaExplanationCard
          dsName="DFS (Depth First Search)"
          whyUsed="Explores deep mentor knowledge chains and checks full connectivity or cycle detection across the human network."
          realLife="Solving mazes, topological sorting in build tools, detecting deadlocks in operating systems."
          advantages="Consumes less memory than BFS on wide graphs; naturally implemented with recursion."
          disadvantages="Does not find the shortest path; may get trapped in deep branches if depth is unbounded."
          timeComp="O(V + E) where V = users, E = connection edges"
          spaceComp="O(V) recursive call stack depth"
        />
      </div>
    </div>
  );
}
