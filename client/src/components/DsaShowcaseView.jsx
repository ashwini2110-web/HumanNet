import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Info, 
  X,
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Layers,
  Activity,
  RefreshCw,
  Eye,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function DsaShowcaseView() {
  const [activeModal, setActiveModal] = useState(null); // id of DS to show viva popup
  const [isAutoDemo, setIsAutoDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(null);

  // 1. LINKED LIST
  const [linkedList, setLinkedList] = useState(['Ashwini', 'Rahul', 'Priya', 'Siddharth']);
  const [llActiveIdx, setLlActiveIdx] = useState(null);
  const insertLL = () => {
    const names = ['Karan', 'Vikram', 'Divya', 'Ananya', 'Sneha'];
    const chosen = names[Math.floor(Math.random() * names.length)];
    setLinkedList(prev => [...prev, chosen]);
  };
  const deleteLL = () => {
    if (linkedList.length > 1) setLinkedList(prev => prev.slice(0, prev.length - 1));
  };
  const traverseLL = async () => {
    for (let i = 0; i < linkedList.length; i++) {
      setLlActiveIdx(i);
      await new Promise(r => setTimeout(r, 450));
    }
    setLlActiveIdx(null);
  };

  // 2. STACK (LIFO)
  const [stack, setStack] = useState(['React', 'Python', 'AI']);
  const [poppedItem, setPoppedItem] = useState(null);
  const pushStack = (val) => {
    const topics = ['Cloud', 'DevOps', 'DSA', 'Docker', 'GraphQL'];
    const item = val || topics[Math.floor(Math.random() * topics.length)];
    setStack(prev => [...prev, item]);
    setPoppedItem(null);
  };
  const popStack = () => {
    if (stack.length === 0) return;
    const item = stack[stack.length - 1];
    setPoppedItem(item);
    setStack(prev => prev.slice(0, prev.length - 1));
    setTimeout(() => setPoppedItem(null), 1500);
  };

  // 3. QUEUE (FIFO)
  const [queue, setQueue] = useState(['Ashwini', 'Priya', 'Karan', 'Akash']);
  const [servedItem, setServedItem] = useState(null);
  const enqueue = (val) => {
    const learners = ['Divya', 'Rohan', 'Sneha', 'Vikram', 'Arjun'];
    const item = val || learners[Math.floor(Math.random() * learners.length)];
    setQueue(prev => [...prev, item]);
  };
  const dequeue = () => {
    if (queue.length === 0) return;
    const item = queue[0];
    setServedItem(item);
    setQueue(prev => prev.slice(1));
    setTimeout(() => setServedItem(null), 1500);
  };

  // 4. PRIORITY QUEUE (Max-Heap)
  const [priorityQueue, setPriorityQueue] = useState([
    { name: 'Rahul', score: 95 },
    { name: 'Priya', score: 92 },
    { name: 'Akash', score: 88 },
    { name: 'Karan', score: 80 }
  ]);
  const insertPQ = (custom) => {
    const names = ['Sneha', 'Vikram', 'Divya', 'Ananya'];
    const name = custom?.name || names[Math.floor(Math.random() * names.length)];
    const score = custom?.score || Math.floor(Math.random() * 20) + 79;
    const updated = [...priorityQueue, { name, score }].sort((a, b) => b.score - a.score);
    setPriorityQueue(updated);
  };
  const recalcPQ = () => {
    const updated = priorityQueue.map(m => ({
      ...m,
      score: Math.min(99, Math.max(70, m.score + Math.floor(Math.random() * 7) - 3))
    })).sort((a, b) => b.score - a.score);
    setPriorityQueue(updated);
  };

  // 5. HASH MAP
  const userMap = {
    '1001': { name: 'Ashwini', role: 'Staff Guide' },
    '1002': { name: 'Rahul', role: 'ML Mentor' },
    '1003': { name: 'Priya', role: 'Web Lead' },
    '1004': { name: 'Akash', role: 'Cloud Lead' }
  };
  const [searchKey, setSearchKey] = useState('1001');
  const [searchResult, setSearchResult] = useState(userMap['1001']);
  const doLookup = (k) => {
    const key = k || searchKey;
    setSearchResult(userMap[key] || null);
  };

  // 6. TREE (Expandable)
  const [treeOpen, setTreeOpen] = useState({ AI: true, Web: true, Cloud: false });

  // 7. GRAPH
  const [graphNodes, setGraphNodes] = useState(['Ashwini', 'Rahul', 'Priya', 'Akash']);
  const addGraphNode = () => {
    const options = ['Divya', 'Karan', 'Sneha'];
    const chosen = options.find(o => !graphNodes.includes(o));
    if (chosen) setGraphNodes(prev => [...prev, chosen]);
  };
  const removeGraphNode = () => {
    if (graphNodes.length > 3) setGraphNodes(prev => prev.slice(0, prev.length - 1));
  };

  // 8. BFS
  const [bfsActive, setBfsActive] = useState(null);
  const [bfsVisited, setBfsVisited] = useState([]);
  const runBFS = async () => {
    setBfsVisited([]);
    const sequence = ['Ashwini', 'Rahul', 'Priya', 'Akash'];
    const visited = [];
    for (const node of sequence) {
      setBfsActive(node);
      visited.push(node);
      setBfsVisited([...visited]);
      await new Promise(r => setTimeout(r, 550));
    }
    setBfsActive(null);
  };

  // 9. DFS
  const [dfsActive, setDfsActive] = useState(null);
  const [dfsVisited, setDfsVisited] = useState([]);
  const runDFS = async () => {
    setDfsVisited([]);
    const sequence = ['Ashwini', 'Rahul', 'Priya', 'Akash'];
    const visited = [];
    for (const node of sequence) {
      setDfsActive(node);
      visited.push(node);
      setDfsVisited([...visited]);
      await new Promise(r => setTimeout(r, 550));
    }
    setDfsActive(null);
  };

  // DEMO ALL
  const runDemonstrateAll = async () => {
    if (isAutoDemo) return;
    setIsAutoDemo(true);

    setDemoStep('1/9: Linked List Traversal');
    await traverseLL();

    setDemoStep('2/9: Stack Push & Pop');
    pushStack('DevOps');
    await new Promise(r => setTimeout(r, 600));
    popStack();
    await new Promise(r => setTimeout(r, 600));

    setDemoStep('3/9: Queue Enqueue & Dequeue');
    enqueue('Rohan');
    await new Promise(r => setTimeout(r, 600));
    dequeue();
    await new Promise(r => setTimeout(r, 600));

    setDemoStep('4/9: Priority Queue Max-Heap');
    recalcPQ();
    await new Promise(r => setTimeout(r, 700));

    setDemoStep('5/9: Hash Map O(1) Lookup');
    doLookup('1002');
    await new Promise(r => setTimeout(r, 700));

    setDemoStep('6/9: Tree Hierarchy');
    setTreeOpen({ AI: true, Web: true, Cloud: true });
    await new Promise(r => setTimeout(r, 700));

    setDemoStep('7/9: Graph Expansion');
    addGraphNode();
    await new Promise(r => setTimeout(r, 700));

    setDemoStep('8/9: BFS Traversal');
    await runBFS();

    setDemoStep('9/9: DFS Traversal');
    await runDFS();

    setDemoStep('Demo Completed Successfully');
    setTimeout(() => {
      setIsAutoDemo(false);
      setDemoStep(null);
    }, 2500);
  };

  // VIVA DETAILS DICTIONARY (Kept inside clean modal)
  const vivaDetails = {
    ll: {
      title: 'Linked List (Singly Linked List)',
      why: 'Mentorship connections are created and removed dynamically without shifting elements.',
      ops: 'Insert: O(1) at Head, Delete: O(n), Traversal: O(n)',
      space: 'O(n) with pointer references',
      real: 'Friend lists, undo history pointers, dynamic chains.'
    },
    stack: {
      title: 'Stack (LIFO: Last In First Out)',
      why: 'Recent searches and action undo are tracked in reverse chronological order.',
      ops: 'Push: O(1), Pop: O(1), Peek: O(1)',
      space: 'O(n) where n is stack depth',
      real: 'Browser back button, Ctrl+Z undo, function call frames.'
    },
    queue: {
      title: 'Queue (FIFO: First In First Out)',
      why: 'Learning requests are processed fairly in the exact order they arrive.',
      ops: 'Enqueue: O(1), Dequeue: O(1)',
      space: 'O(n) for pending requests',
      real: 'Ticket queues, printer spoolers, CPU process scheduling.'
    },
    pq: {
      title: 'Priority Queue (Max-Heap)',
      why: 'The highest match-score mentor is always retrieved first at the root.',
      ops: 'Insert: O(log n), Extract-Max: O(log n), Peek: O(1)',
      space: 'O(n) binary heap storage',
      real: 'Hospital emergency triage, Dijkstra shortest path algorithm.'
    },
    hash: {
      title: 'Hash Map (Hash Table)',
      why: 'Constant-time direct profile lookup by unique User ID without array scanning.',
      ops: 'Average Search: O(1), Worst Case: O(n) on collisions',
      space: 'O(n) key-value storage',
      real: 'Database indexing, Redis key-value cache, compiler symbol tables.'
    },
    tree: {
      title: 'Tree (Hierarchical Taxonomy)',
      why: 'Skills naturally branch from broad domains to specialized topics.',
      ops: 'Traversal: O(n), Height: O(h)',
      space: 'O(h) recursive call frames',
      real: 'File directory folders, HTML DOM hierarchy, taxonomic classification.'
    },
    graph: {
      title: 'Graph G = (V, E)',
      why: 'Models real-world human social networks with multi-way mutual mentorship links.',
      ops: 'Adjacency representation: O(V + E)',
      space: 'O(V + E)',
      real: 'LinkedIn connections, road networks, recommendation links.'
    },
    bfs: {
      title: 'Breadth First Search (BFS)',
      why: 'Discovers the closest mentor with the minimum number of network hops (shortest path).',
      ops: 'Time: O(V + E)',
      space: 'O(V) using FIFO Queue',
      real: 'Friend-of-friend suggestions, shortest path in unweighted graphs.'
    },
    dfs: {
      title: 'Depth First Search (DFS)',
      why: 'Deeply traces mentorship lineages and verifies network connectivity or cycles.',
      ops: 'Time: O(V + E)',
      space: 'O(V) using Recursive Call Stack',
      real: 'Maze pathfinding, cycle detection in networks, topological sorting.'
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-white font-sans animate-fade-in">
      {/* Top Clean Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Data Structures Architecture
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual interactive representations of the core data structures powering HumanNet.
          </p>
        </div>

        {/* Global Demo Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={runDemonstrateAll}
            disabled={isAutoDemo}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              isAutoDemo
                ? 'bg-purple-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isAutoDemo ? 'Running Live Demo...' : 'Demonstrate All'}</span>
          </button>
        </div>
      </div>

      {/* Auto Demo Notification */}
      {demoStep && (
        <div className="p-2.5 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center gap-2 text-purple-200 text-xs font-mono animate-fade-in">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
          <span>{demoStep}</span>
        </div>
      )}

      {/* Compact Status Counters */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        <div className="p-2.5 rounded-lg bg-[#1E293B]/70 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Linked List</div>
          <div className="text-base font-bold font-mono text-sky-400 mt-0.5">{linkedList.length} nodes</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#1E293B]/70 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Stack (LIFO)</div>
          <div className="text-base font-bold font-mono text-purple-400 mt-0.5">{stack.length} items</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#1E293B]/70 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Queue (FIFO)</div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">{queue.length} items</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#1E293B]/70 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Priority Queue</div>
          <div className="text-base font-bold font-mono text-amber-400 mt-0.5">{priorityQueue.length} ranked</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#1E293B]/70 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Hash Map</div>
          <div className="text-base font-bold font-mono text-indigo-400 mt-0.5">O(1) Access</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#1E293B]/70 border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Graph (V / E)</div>
          <div className="text-base font-bold font-mono text-rose-400 mt-0.5">{graphNodes.length}V / 4E</div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VISUAL CARDS GRID */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* 1. LINKED LIST */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Linked List</span>
                <span className="text-[11px] text-slate-400">· Human Connections</span>
              </div>
              <button
                onClick={() => setActiveModal('ll')}
                className="text-slate-400 hover:text-sky-400 p-1 transition-colors"
                title="Learn More & Viva Info"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Users frequently connect and disconnect through linked pointers.</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 overflow-x-auto flex items-center gap-2 py-3 min-h-[64px]">
              {linkedList.map((node, i) => (
                <React.Fragment key={i}>
                  <div className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
                    llActiveIdx === i 
                      ? 'bg-sky-400 text-slate-950 font-bold scale-110 shadow-md shadow-sky-400/30' 
                      : 'bg-slate-900 border-slate-700 text-slate-200'
                  }`}>
                    {node}
                  </div>
                  {i < linkedList.length - 1 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  ) : (
                    <span className="text-xs text-rose-400 font-mono shrink-0">→ NULL</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Quick Controls */}
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button onClick={insertLL} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
                <Plus className="w-3 h-3 text-sky-400" /> Insert
              </button>
              <button onClick={deleteLL} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
                <Trash2 className="w-3 h-3 text-rose-400" /> Delete
              </button>
            </div>
            <button onClick={traverseLL} className="px-2.5 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-medium flex items-center gap-1">
              <Play className="w-3 h-3" /> Traverse
            </button>
          </div>
        </div>

        {/* 2. STACK */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Stack (LIFO)</span>
                <span className="text-[11px] text-slate-400">· Search History & Undo</span>
              </div>
              <button onClick={() => setActiveModal('stack')} className="text-slate-400 hover:text-purple-400 p-1">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Recent searches and undo actions stacked vertically.</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-center min-h-[64px]">
              <div className="flex items-center gap-2">
                {stack.length === 0 ? (
                  <span className="text-xs text-slate-500 font-mono">Empty Stack</span>
                ) : (
                  stack.map((item, i) => (
                    <div
                      key={i}
                      className={`px-3 py-1.5 rounded-md border text-xs font-mono ${
                        i === stack.length - 1
                          ? 'bg-purple-500/20 text-purple-200 border-purple-400 font-bold'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      {item} {i === stack.length - 1 && <span className="text-[9px] text-amber-300 ml-1">TOP</span>}
                    </div>
                  ))
                )}
                {poppedItem && (
                  <span className="text-xs text-rose-400 font-mono animate-fade-in">
                    Popped: {poppedItem}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <button onClick={() => pushStack()} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
              <ArrowUp className="w-3 h-3 text-purple-400" /> Push
            </button>
            <button onClick={popStack} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
              <ArrowDown className="w-3 h-3 text-rose-400" /> Pop (Undo)
            </button>
          </div>
        </div>

        {/* 3. QUEUE */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Queue (FIFO)</span>
                <span className="text-[11px] text-slate-400">· Learning Requests</span>
              </div>
              <button onClick={() => setActiveModal('queue')} className="text-slate-400 hover:text-emerald-400 p-1">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Learning requests processed fairly in arrival order.</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between overflow-x-auto min-h-[64px]">
              <span className="text-[10px] text-emerald-400 font-mono shrink-0">FRONT →</span>
              <div className="flex items-center gap-2 mx-2">
                {queue.map((q, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1.5 rounded-md border text-xs font-mono shrink-0 ${
                      i === 0
                        ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400 font-bold'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    {q}
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-sky-400 font-mono shrink-0">← REAR</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <button onClick={() => enqueue()} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
              <Plus className="w-3 h-3 text-emerald-400" /> Enqueue
            </button>
            <button onClick={dequeue} className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Dequeue
            </button>
          </div>
        </div>

        {/* 4. PRIORITY QUEUE */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Priority Queue</span>
                <span className="text-[11px] text-slate-400">· Mentor Ranking</span>
              </div>
              <button onClick={() => setActiveModal('pq')} className="text-slate-400 hover:text-amber-400 p-1">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Mentor ranking with score-based sorting (Max-Heap).</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 grid grid-cols-4 gap-2 text-center min-h-[64px]">
              {priorityQueue.slice(0, 4).map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-md border text-xs font-mono ${
                    i === 0
                      ? 'bg-amber-500/20 text-amber-200 border-amber-400 font-bold'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">#{i + 1}</div>
                  <div className="truncate font-semibold">{m.name}</div>
                  <div className="text-amber-400 font-bold mt-0.5">{m.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <button onClick={() => insertPQ()} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
              <Plus className="w-3 h-3 text-amber-400" /> Insert
            </button>
            <button onClick={recalcPQ} className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Heapify
            </button>
          </div>
        </div>

        {/* 5. HASH MAP */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Hash Map</span>
                <span className="text-[11px] text-slate-400">· Fast User Lookup</span>
              </div>
              <button onClick={() => setActiveModal('hash')} className="text-slate-400 hover:text-indigo-400 p-1">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Instant O(1) user profile retrieval via key hashing.</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between min-h-[64px]">
              <div className="flex items-center gap-1.5">
                {Object.keys(userMap).map(k => (
                  <button
                    key={k}
                    onClick={() => { setSearchKey(k); doLookup(k); }}
                    className={`px-2 py-1 rounded text-xs font-mono border transition-all ${
                      searchKey === k
                        ? 'bg-indigo-500/20 border-indigo-400 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-200">
                {searchResult ? (
                  <span className="text-emerald-400 font-semibold">→ {searchResult.name} ({searchResult.role})</span>
                ) : (
                  <span className="text-rose-400">Not Found</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>hash(key) → bucket index</span>
            <span className="text-indigo-400 font-semibold">Average: O(1)</span>
          </div>
        </div>

        {/* 6. TREE */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Tree</span>
                <span className="text-[11px] text-slate-400">· Skill Hierarchy</span>
              </div>
              <button onClick={() => setActiveModal('tree')} className="text-slate-400 hover:text-cyan-400 p-1">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Expandable skill taxonomy organizing skills hierarchically.</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs font-mono min-h-[64px] flex flex-wrap gap-2 items-center">
              <span className="text-sky-400 font-bold">Technology:</span>
              
              <button
                onClick={() => setTreeOpen(prev => ({ ...prev, AI: !prev.AI }))}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-purple-300 flex items-center gap-1"
              >
                {treeOpen.AI ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />} AI (ML, LLM)
              </button>

              <button
                onClick={() => setTreeOpen(prev => ({ ...prev, Web: !prev.Web }))}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-300 flex items-center gap-1"
              >
                {treeOpen.Web ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />} Web (React, Node)
              </button>

              <button
                onClick={() => setTreeOpen(prev => ({ ...prev, Cloud: !prev.Cloud }))}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-amber-300 flex items-center gap-1"
              >
                {treeOpen.Cloud ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />} Cloud (AWS, Azure)
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Root → Branches → Leaves</span>
            <span className="text-cyan-400">Traversal: O(n)</span>
          </div>
        </div>

        {/* 7. GRAPH */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Graph G = (V, E)</span>
                <span className="text-[11px] text-slate-400">· Human Network</span>
              </div>
              <button onClick={() => setActiveModal('graph')} className="text-slate-400 hover:text-rose-400 p-1">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Interactive mentor network with nodes (users) and edges (connections).</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-around min-h-[64px] font-mono text-xs">
              <div className="px-2.5 py-1 rounded bg-sky-500/20 border border-sky-400 text-sky-200 font-bold">
                Ashwini (Center)
              </div>
              <span className="text-slate-500">↔</span>
              <div className="flex flex-wrap gap-1.5">
                {graphNodes.filter(n => n !== 'Ashwini').map((n, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px]">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <button onClick={addGraphNode} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
              <Plus className="w-3 h-3 text-rose-400" /> Add Node
            </button>
            <button onClick={removeGraphNode} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
              <Trash2 className="w-3 h-3 text-slate-400" /> Remove
            </button>
          </div>
        </div>

        {/* 8. BFS / DFS ALGORITHMS */}
        <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">BFS & DFS Traversals</span>
                <span className="text-[11px] text-slate-400">· Network Search</span>
              </div>
              <button onClick={() => setActiveModal('bfs')} className="text-slate-400 hover:text-sky-400 p-1">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">Animated traversal of the network: Level-order (BFS) vs Deep (DFS).</p>

            {/* Visual */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between min-h-[64px] font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block font-sans">Active Traversal Sequence:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['Ashwini', 'Rahul', 'Priya', 'Akash'].map((node, i) => {
                    const isVis = bfsVisited.includes(node) || dfsVisited.includes(node);
                    const isAct = bfsActive === node || dfsActive === node;
                    return (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-[11px] border transition-all ${
                          isAct
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 scale-105'
                            : isVis
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {node}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <button onClick={runBFS} className="px-2.5 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 flex items-center gap-1">
              <Play className="w-3 h-3" /> Run BFS (Queue)
            </button>
            <button onClick={runDFS} className="px-2.5 py-1 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 flex items-center gap-1">
              <Play className="w-3 h-3" /> Run DFS (Stack)
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* MINIMAL MODAL FOR VIVA & LEARN MORE (No on-screen clutter) */}
      {/* ========================================================= */}
      {activeModal && vivaDetails[activeModal] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#1E293B] border border-slate-700 shadow-2xl p-6 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <h3 className="text-base font-bold text-white font-mono">
                {vivaDetails[activeModal].title}
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Why used in HumanNet?</span>
                <p className="text-slate-200">{vivaDetails[activeModal].why}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Time Complexity:</span>
                <p className="font-mono text-amber-300">{vivaDetails[activeModal].ops}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Space Complexity:</span>
                <p className="font-mono text-purple-300">{vivaDetails[activeModal].space}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">Real-Life Application:</span>
                <p className="text-slate-300">{vivaDetails[activeModal].real}</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
