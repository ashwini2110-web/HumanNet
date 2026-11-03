import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  Plus, 
  Trash2, 
  Play, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Compass, 
  Check, 
  Sparkles,
  RefreshCw,
  FolderTree,
  Send,
  Layers,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// =========================================================================
// 1. GRAPH VISUALIZATION (Primary Hero Interaction with direct BFS & DFS)
// =========================================================================
function InteractiveGraphHero({ onSelectNode }) {
  const mountRef = useRef(null);
  const [activeAlgorithm, setActiveAlgorithm] = useState(null); // 'BFS' | 'DFS'
  const [visitedSequence, setVisitedSequence] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  // Graph Definition
  const nodes = [
    { id: 'Ashwini', x: 0, y: 0, z: 0, color: '#38BDF8', role: 'Staff Guide' },
    { id: 'Rahul', x: -5, y: 2.8, z: 1.5, color: '#A855F7', role: 'ML Mentor' },
    { id: 'Priya', x: 5, y: 2.5, z: -1, color: '#22C55E', role: 'Web Architect' },
    { id: 'Akash', x: 4.5, y: -2.8, z: 1, color: '#F59E0B', role: 'Cloud Lead' },
    { id: 'Karan', x: -4.5, y: -3, z: -1.5, color: '#06B6D4', role: 'Data Systems' },
    { id: 'Sneha', x: 0, y: 4.8, z: -1, color: '#EC4899', role: 'AI Research' },
    { id: 'Vikram', x: -6.5, y: -0.2, z: -2, color: '#8B5CF6', role: 'Security' }
  ];

  const edges = [
    ['Ashwini', 'Rahul'],
    ['Ashwini', 'Priya'],
    ['Ashwini', 'Akash'],
    ['Ashwini', 'Karan'],
    ['Rahul', 'Sneha'],
    ['Priya', 'Sneha'],
    ['Rahul', 'Vikram'],
    ['Karan', 'Vikram'],
    ['Priya', 'Akash']
  ];

  // Adjacency Map
  const adj = {};
  nodes.forEach(n => { adj[n.id] = []; });
  edges.forEach(([u, v]) => {
    adj[u]?.push(v);
    adj[v]?.push(u);
  });

  // Animated BFS Execution
  const triggerBFS = async () => {
    if (activeAlgorithm) return;
    setActiveAlgorithm('BFS');
    setVisitedSequence([]);

    const visited = new Set(['Ashwini']);
    const queue = ['Ashwini'];
    const track = [];

    while (queue.length > 0) {
      const u = queue.shift();
      setCurrentNode(u);
      track.push(u);
      setVisitedSequence([...track]);
      await new Promise(r => setTimeout(r, 600));

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
        }
      }
    }

    setCurrentNode(null);
    setTimeout(() => setActiveAlgorithm(null), 1800);
  };

  // Animated DFS Execution
  const triggerDFS = async () => {
    if (activeAlgorithm) return;
    setActiveAlgorithm('DFS');
    setVisitedSequence([]);

    const visited = new Set();
    const track = [];

    const dfsStep = async (u) => {
      visited.add(u);
      setCurrentNode(u);
      track.push(u);
      setVisitedSequence([...track]);
      await new Promise(r => setTimeout(r, 650));

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        if (!visited.has(v)) {
          await dfsStep(v);
        }
      }
    };

    await dfsStep('Ashwini');
    setCurrentNode(null);
    setTimeout(() => setActiveAlgorithm(null), 1800);
  };

  // Three.js Render for 3D Graph Structure
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 21;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x38bdf8, 2, 40);
    pointLight.position.set(5, 8, 12);
    scene.add(pointLight);

    // Node Meshes
    const geom = new THREE.SphereGeometry(0.9, 24, 24);
    const nodeMap = {};

    nodes.forEach(n => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(n.color),
        roughness: 0.25,
        metalness: 0.5,
        emissive: new THREE.Color(n.color),
        emissiveIntensity: 0.3
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(n.x, n.y, n.z);
      scene.add(mesh);
      nodeMap[n.id] = mesh;
    });

    // Edges (Lines)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.75 });
    const lineGeom = new THREE.BufferGeometry();
    const pts = [];
    edges.forEach(([u, v]) => {
      const n1 = nodes.find(n => n.id === u);
      const n2 = nodes.find(n => n.id === v);
      if (n1 && n2) {
        pts.push(n1.x, n1.y, n1.z);
        pts.push(n2.x, n2.y, n2.z);
      }
    });
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    let frameId;
    let clock = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      clock += 0.003;

      // Soft natural 3D rotation
      scene.rotation.y = Math.sin(clock) * 0.12;
      scene.rotation.x = Math.cos(clock * 0.7) * 0.06;

      // Traversal highlights
      nodes.forEach(n => {
        const mesh = nodeMap[n.id];
        if (!mesh) return;
        const isCurrent = currentNode === n.id;
        const isVisited = visitedSequence.includes(n.id);

        if (isCurrent) {
          mesh.scale.setScalar(1.45);
          mesh.material.emissiveIntensity = 1.0;
        } else if (isVisited) {
          mesh.scale.setScalar(1.15);
          mesh.material.emissiveIntensity = 0.6;
        } else {
          mesh.scale.setScalar(1.0);
          mesh.material.emissiveIntensity = 0.3;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [currentNode, visitedSequence]);

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-[#0B0F19] to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
          <span className="text-sm font-bold text-white tracking-wide">Mentor Network</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
            Graph
          </span>
        </div>

        {/* Algorithm Traversal Triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerBFS}
            disabled={!!activeAlgorithm}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeAlgorithm === 'BFS'
                ? 'bg-sky-400 text-slate-950 font-bold scale-105'
                : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Find Nearest Mentor</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-sky-400/20 text-sky-200">BFS</span>
          </button>

          <button
            onClick={triggerDFS}
            disabled={!!activeAlgorithm}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeAlgorithm === 'DFS'
                ? 'bg-purple-500 text-white font-bold scale-105'
                : 'bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30'
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>Explore Network</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-purple-400/20 text-purple-200">DFS</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-[360px] md:h-[400px]" />

      {/* Traversal State Track */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-slate-400 text-[11px] shrink-0">Visited:</span>
          {visitedSequence.length === 0 ? (
            <span className="text-slate-500 text-[11px]">Click BFS or DFS to animate traversal</span>
          ) : (
            visitedSequence.map((node, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded text-[11px] shrink-0 border ${
                  currentNode === node
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                    : 'bg-slate-900 text-slate-200 border-slate-700'
                }`}
              >
                {node}
              </span>
            ))
          )}
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline shrink-0">
          G = (V, E) · 7 Vertices · 9 Edges
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 2. HUMAN CONNECTIONS (Visible Linked List with Node-to-Node Links)
// =========================================================================
function VisibleLinkedList() {
  const [nodes, setNodes] = useState(['Ashwini', 'Rahul', 'Priya', 'Karan']);
  const [traversingIdx, setTraversingIdx] = useState(null);

  const insertNode = () => {
    const candidates = ['Siddharth', 'Divya', 'Vikram', 'Sneha', 'Ananya'];
    const chosen = candidates.find(c => !nodes.includes(c)) || `Node_${nodes.length + 1}`;
    setNodes(prev => [...prev, chosen]);
  };

  const deleteNode = () => {
    if (nodes.length > 1) setNodes(prev => prev.slice(0, prev.length - 1));
  };

  const traverseNodes = async () => {
    for (let i = 0; i < nodes.length; i++) {
      setTraversingIdx(i);
      await new Promise(r => setTimeout(r, 450));
    }
    setTraversingIdx(null);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Human Connections</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
              Linked List
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={insertNode}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Insert Connection"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={deleteNode}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
              title="Delete Connection"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={traverseNodes}
              className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-medium flex items-center gap-1"
            >
              <Play className="w-3 h-3" /> Traverse
            </button>
          </div>
        </div>

        {/* Visible Node-to-Node Chain */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 overflow-x-auto min-h-[88px] flex items-center gap-2">
          <span className="text-[10px] font-mono text-sky-400 font-bold shrink-0">HEAD →</span>

          <AnimatePresence>
            {nodes.map((node, i) => {
              const isCurrent = traversingIdx === i;
              return (
                <React.Fragment key={node}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: -8 }}
                    animate={{ opacity: 1, scale: isCurrent ? 1.08 : 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 8 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 320 }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono shrink-0 flex items-center gap-2 shadow-sm ${
                      isCurrent
                        ? 'bg-sky-400 text-slate-950 font-bold border-white shadow-lg shadow-sky-400/40'
                        : 'bg-[#1E293B] border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    <span>{node}</span>
                  </motion.div>

                  {i < nodes.length - 1 ? (
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-colors ${isCurrent ? 'text-sky-300' : 'text-slate-600'}`} />
                  ) : (
                    <span className="text-[11px] font-mono text-rose-400 shrink-0">→ NULL</span>
                  )}
                </React.Fragment>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <span>Node-to-node pointer sequence</span>
        <span className="text-sky-400">{nodes.length} Nodes</span>
      </div>
    </div>
  );
}

// =========================================================================
// 3. SEARCH HISTORY (Visible Stack: Pushed on Top, Removed from Top)
// =========================================================================
function VisibleStack() {
  const [stackItems, setStackItems] = useState(['Distributed Systems', 'Generative AI', 'React Internals']);
  const [poppedItem, setPoppedItem] = useState(null);

  const pushItem = () => {
    const topics = ['Graph Neural Nets', 'Kafka Streams', 'TypeScript', 'Vector Databases', 'Rust'];
    const chosen = topics[Math.floor(Math.random() * topics.length)];
    setStackItems(prev => [chosen, ...prev]);
  };

  const popItem = () => {
    if (stackItems.length === 0) return;
    const removed = stackItems[0];
    setPoppedItem(removed);
    setStackItems(prev => prev.slice(1));
    setTimeout(() => setPoppedItem(null), 1400);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Search History</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Stack
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={pushItem}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
            >
              <ArrowUp className="w-3 h-3 text-purple-400" /> Push
            </button>
            <button
              onClick={popItem}
              className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Pop (Top)
            </button>
          </div>
        </div>

        {/* Visible Stack Box */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[88px] flex items-center justify-center">
          <div className="w-full max-w-sm space-y-1.5">
            <AnimatePresence>
              {stackItems.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 12 }}
                  transition={{ duration: 0.2 }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                    idx === 0
                      ? 'bg-purple-500/20 text-purple-200 border-purple-400 font-semibold shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="truncate">{item}</span>
                  {idx === 0 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      TOP
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {poppedItem && (
              <div className="text-[11px] text-rose-400 font-mono text-center animate-fade-in pt-1">
                Popped: {poppedItem}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <span>LIFO: Elements operate at Top</span>
        <span className="text-purple-400">Depth: {stackItems.length}</span>
      </div>
    </div>
  );
}

// =========================================================================
// 4. LEARNING REQUESTS (Visible Queue with Front & Rear Indicators)
// =========================================================================
function VisibleQueue() {
  const [queue, setQueue] = useState(['Ashwini', 'Priya', 'Karan', 'Akash']);

  const enqueue = () => {
    const names = ['Divya', 'Rohan', 'Sneha', 'Vikram', 'Ananya'];
    const chosen = names[Math.floor(Math.random() * names.length)];
    setQueue(prev => [...prev, chosen]);
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(prev => prev.slice(1));
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Learning Requests</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Queue
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={enqueue}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
            >
              <Plus className="w-3 h-3 text-emerald-400" /> Enqueue
            </button>
            <button
              onClick={dequeue}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium flex items-center gap-1"
            >
              <Check className="w-3 h-3" /> Dequeue
            </button>
          </div>
        </div>

        {/* Visible Queue Pipeline with FRONT & REAR */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[88px] flex items-center justify-between overflow-x-auto gap-2">
          <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">FRONT (Next) →</span>

          <div className="flex items-center gap-2 mx-2">
            <AnimatePresence>
              {queue.map((item, idx) => (
                <motion.div
                  key={item}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 320 }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono shrink-0 ${
                    idx === 0
                      ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <span className="text-[10px] font-mono text-sky-400 font-bold shrink-0">← REAR</span>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <span>FIFO: Requests move Front to Rear</span>
        <span className="text-emerald-400">{queue.length} Active</span>
      </div>
    </div>
  );
}

// =========================================================================
// 5. MENTOR RECOMMENDATIONS (Visible Priority Queue: Auto Move Upward)
// =========================================================================
function VisiblePriorityQueue() {
  const [mentors, setMentors] = useState([
    { name: 'Dr. Aris Chen', score: 96, domain: 'AI Architect' },
    { name: 'Rahul Sharma', score: 92, domain: 'Machine Learning' },
    { name: 'Priya Patel', score: 88, domain: 'Full Stack' },
    { name: 'Marcus Vance', score: 82, domain: 'Cloud Lead' }
  ]);

  const reorderHeap = () => {
    const updated = mentors.map(m => ({
      ...m,
      score: Math.min(99, Math.max(70, m.score + Math.floor(Math.random() * 9) - 4))
    })).sort((a, b) => b.score - a.score);
    setMentors(updated);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Mentor Ranking</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Priority Queue
            </span>
          </div>

          <button
            onClick={reorderHeap}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Re-Rank
          </button>
        </div>

        {/* Visible Priority Rearranging Stack */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[88px] space-y-1.5">
          <AnimatePresence>
            {mentors.slice(0, 3).map((m, i) => (
              <motion.div
                key={m.name}
                layout
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center justify-between ${
                  i === 0
                    ? 'bg-amber-500/15 text-amber-200 border-amber-400/80 font-bold shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    #{i + 1}
                  </span>
                  <span>{m.name}</span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">· {m.domain}</span>
                </div>
                <span className="font-mono text-amber-400 font-bold">{m.score}%</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <span>Higher score moves upward</span>
        <span className="text-amber-400">Top: {mentors[0]?.score}%</span>
      </div>
    </div>
  );
}

// =========================================================================
// 6. USER SEARCH (Visible Hash Map: Key-Value Lookup)
// =========================================================================
function VisibleHashMap() {
  const table = {
    '1001': { name: 'Ashwini', role: 'Staff Guide' },
    '1002': { name: 'Rahul', role: 'ML Lead' },
    '1003': { name: 'Priya', role: 'Web Architect' },
    '1004': { name: 'Akash', role: 'Cloud Lead' }
  };
  const [selectedKey, setSelectedKey] = useState('1001');

  return (
    <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">User Search</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              Hash Map
            </span>
          </div>
          <span className="text-xs font-mono text-indigo-400">hash(key) → O(1)</span>
        </div>

        {/* Visible Key-Value Lookup Slots */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[88px] flex items-center justify-between gap-2">
          <div className="grid grid-cols-4 gap-1.5 w-full">
            {Object.entries(table).map(([k, val]) => {
              const isMatch = selectedKey === k;
              return (
                <button
                  key={k}
                  onClick={() => setSelectedKey(k)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    isMatch
                      ? 'bg-indigo-500/25 border-indigo-400 text-white font-bold scale-105 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-mono text-indigo-400">{k}</div>
                  <div className="text-xs font-semibold truncate mt-0.5">{val.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <span>Instant slot resolution</span>
        <span className="text-emerald-400">→ {table[selectedKey]?.name} ({table[selectedKey]?.role})</span>
      </div>
    </div>
  );
}

// =========================================================================
// 7. SKILL CATEGORIES (Expandable Tree)
// =========================================================================
function VisibleTree() {
  const [openBranches, setOpenBranches] = useState({ AI: true, Web: true, Cloud: false });

  const toggle = (branch) => {
    setOpenBranches(prev => ({ ...prev, [branch]: !prev[branch] }));
  };

  return (
    <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Skill Categories</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Tree
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-400">Root: Technology</span>
        </div>

        {/* Visible Expandable Branching Tree */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[88px] font-mono text-xs space-y-1.5">
          <div className="text-sky-400 font-bold">Technology (Root)</div>

          <div className="ml-4 border-l border-slate-800 pl-3 space-y-1">
            <div>
              <button
                onClick={() => toggle('AI')}
                className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200"
              >
                {openBranches.AI ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span>AI (Machine Learning, LLM)</span>
              </button>
            </div>

            <div>
              <button
                onClick={() => toggle('Web')}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200"
              >
                {openBranches.Web ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span>Web (Frontend, Backend)</span>
              </button>
            </div>

            <div>
              <button
                onClick={() => toggle('Cloud')}
                className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200"
              >
                {openBranches.Cloud ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span>Cloud (AWS, Docker)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <span>Hierarchical node expansion</span>
        <span className="text-cyan-400">3 Sub-Trees</span>
      </div>
    </div>
  );
}

// =========================================================================
// MAIN EXPORT
// =========================================================================
export default function ConceptFirstView() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-7 text-white font-sans animate-fade-in">
      {/* 1. Hero Feature: Interactive Graph Network */}
      <InteractiveGraphHero />

      {/* 2. Core Operational Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisibleLinkedList />
        <VisibleStack />
        <VisibleQueue />
        <VisiblePriorityQueue />
        <VisibleHashMap />
        <VisibleTree />
      </div>
    </div>
  );
}
