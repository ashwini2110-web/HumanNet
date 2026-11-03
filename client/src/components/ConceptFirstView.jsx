import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
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
  Users, 
  Check, 
  Sparkles,
  Maximize2
} from 'lucide-react';

// =====================================================================
// 3D HERO GRAPH (Three.js Organic Network with Nodes, Edges, BFS & DFS)
// =====================================================================
function Hero3DNetwork({ bfsActive, dfsActive, highlightNodes = [] }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Ambient and Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight.position.set(10, 10, 15);
    scene.add(pointLight);

    // Nodes Data (Network vertices)
    const nodesData = [
      { id: 'Ashwini', pos: [0, 0, 0], color: 0x38bdf8, size: 1.4 },
      { id: 'Rahul', pos: [-6, 3.5, 2], color: 0xa855f7, size: 1.1 },
      { id: 'Priya', pos: [6, 3, -1], color: 0x22c55e, size: 1.1 },
      { id: 'Karan', pos: [-5, -4, -2], color: 0xf59e0b, size: 1.0 },
      { id: 'Akash', pos: [5.5, -3.5, 1], color: 0x06b6d4, size: 1.0 },
      { id: 'Sneha', pos: [0, 6, -2], color: 0xec4899, size: 0.95 },
      { id: 'Vikram', pos: [-8, 0, -3], color: 0x8b5cf6, size: 0.95 }
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 5], [2, 5], [1, 6], [3, 6],
      [2, 4], [1, 2]
    ];

    const sphereGeom = new THREE.SphereGeometry(1, 24, 24);
    const nodeMeshes = [];

    nodesData.forEach((data, idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.2,
        metalness: 0.6,
        emissive: data.color,
        emissiveIntensity: 0.35
      });
      const mesh = new THREE.Mesh(sphereGeom, mat);
      mesh.position.set(...data.pos);
      mesh.scale.setScalar(data.size);
      scene.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Edges (Lines)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.7 });
    const lineGeom = new THREE.BufferGeometry();
    const linePositions = [];

    edges.forEach(([u, v]) => {
      linePositions.push(...nodesData[u].pos);
      linePositions.push(...nodesData[v].pos);
    });
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineSegments = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lineSegments);

    // Subtle Particle Starfield
    const starGeom = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 180; i++) {
      starCoords.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      );
    }
    starGeom.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x64748b, size: 0.15, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // Animation Loop
    let animationFrameId;
    let angle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      angle += 0.0035;

      // Gentle organic oscillation
      scene.rotation.y = Math.sin(angle) * 0.15;
      scene.rotation.x = Math.cos(angle * 0.7) * 0.08;

      // Highlight active pulse
      nodeMeshes.forEach((mesh, idx) => {
        const id = nodesData[idx].id;
        const isBfs = bfsActive === id;
        const isDfs = dfsActive === id;
        const isHi = highlightNodes.includes(id);

        if (isBfs || isDfs || isHi) {
          mesh.scale.setScalar(nodesData[idx].size * 1.35);
          mesh.material.emissiveIntensity = 0.9;
        } else {
          mesh.scale.setScalar(nodesData[idx].size);
          mesh.material.emissiveIntensity = 0.35;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [bfsActive, dfsActive, highlightNodes]);

  return (
    <div className="relative w-full h-[400px] md:h-[440px] rounded-2xl bg-gradient-to-b from-slate-950 via-[#0B0F19] to-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
          Graph
        </span>
        <span className="text-xs text-slate-400 font-medium">3D Human Network</span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 font-mono pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400"></span> Ashwini (Center)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Mentors</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Peers</span>
        </div>
        <span className="hidden sm:inline text-slate-500">7 Nodes · 10 Edges</span>
      </div>
    </div>
  );
}

// =====================================================================
// MAIN CONCEPT-FIRST INTEGRATED DASHBOARD
// =====================================================================
export default function ConceptFirstView() {
  // 1. LINKED LIST (3D Floating Chain)
  const [connections, setConnections] = useState(['Ashwini', 'Rahul', 'Priya', 'Karan']);
  const [llActiveNode, setLlActiveNode] = useState(null);

  const addConnection = () => {
    const pool = ['Siddharth', 'Divya', 'Vikram', 'Sneha', 'Ananya'];
    const chosen = pool.find(p => !connections.includes(p)) || `Peer_${connections.length + 1}`;
    setConnections(prev => [...prev, chosen]);
  };
  const removeConnection = () => {
    if (connections.length > 2) setConnections(prev => prev.slice(0, prev.length - 1));
  };
  const traverseChain = async () => {
    for (let i = 0; i < connections.length; i++) {
      setLlActiveNode(connections[i]);
      await new Promise(r => setTimeout(r, 450));
    }
    setLlActiveNode(null);
  };

  // 2. STACK (3D Vertical Card Stack)
  const [searchStack, setSearchStack] = useState(['Distributed Systems', 'Generative AI', 'React Internals']);
  const [poppedStackItem, setPoppedStackItem] = useState(null);

  const pushSearch = () => {
    const topics = ['Graph Neural Nets', 'Kafka Streams', 'TypeScript', 'Vector Databases', 'Rust'];
    const item = topics[Math.floor(Math.random() * topics.length)];
    setSearchStack(prev => [item, ...prev]);
  };
  const popSearch = () => {
    if (searchStack.length === 0) return;
    const removed = searchStack[0];
    setPoppedStackItem(removed);
    setSearchStack(prev => prev.slice(1));
    setTimeout(() => setPoppedStackItem(null), 1500);
  };

  // 3. QUEUE (Visual FIFO Pipeline)
  const [requestQueue, setRequestQueue] = useState(['Ashwini', 'Priya', 'Karan', 'Akash']);
  const [dequeuedItem, setDequeuedItem] = useState(null);

  const enqueueRequest = () => {
    const pool = ['Divya', 'Rohan', 'Sneha', 'Vikram', 'Ananya'];
    const next = pool[Math.floor(Math.random() * pool.length)];
    setRequestQueue(prev => [...prev, next]);
  };
  const dequeueRequest = () => {
    if (requestQueue.length === 0) return;
    const item = requestQueue[0];
    setDequeuedItem(item);
    setRequestQueue(prev => prev.slice(1));
    setTimeout(() => setDequeuedItem(null), 1400);
  };

  // 4. PRIORITY QUEUE (Dynamic Ranking Tower)
  const [mentors, setMentors] = useState([
    { name: 'Dr. Aris Chen', score: 96, domain: 'AI Architect' },
    { name: 'Rahul Sharma', score: 92, domain: 'Machine Learning' },
    { name: 'Priya Patel', score: 88, domain: 'Full Stack' },
    { name: 'Marcus Vance', score: 82, domain: 'Cloud & DevOps' }
  ]);

  const reorderPriority = () => {
    const updated = mentors.map(m => ({
      ...m,
      score: Math.min(99, Math.max(72, m.score + Math.floor(Math.random() * 9) - 4))
    })).sort((a, b) => b.score - a.score);
    setMentors(updated);
  };

  // 5. HASH MAP (Interactive Slots)
  const userSlots = {
    '1001': { name: 'Ashwini', role: 'Staff Guide', color: 'sky' },
    '1002': { name: 'Rahul', role: 'ML Lead', color: 'purple' },
    '1003': { name: 'Priya', role: 'Web Architect', color: 'emerald' },
    '1004': { name: 'Akash', role: 'Cloud Lead', color: 'amber' }
  };
  const [activeSlot, setActiveSlot] = useState('1001');

  // 6. TREE (Expandable Skill Branching)
  const [treeExpanded, setTreeExpanded] = useState({ AI: true, Web: true, Cloud: false });

  // 7. BFS & DFS State for 3D Hero Graph
  const [bfsActive, setBfsActive] = useState(null);
  const [dfsActive, setDfsActive] = useState(null);
  const [traversalLabel, setTraversalLabel] = useState(null);

  const runBFS = async () => {
    setTraversalLabel('BFS: Level-wise neighbor expansion');
    const sequence = ['Ashwini', 'Rahul', 'Priya', 'Karan', 'Akash', 'Sneha', 'Vikram'];
    for (const node of sequence) {
      setBfsActive(node);
      await new Promise(r => setTimeout(r, 500));
    }
    setBfsActive(null);
    setTraversalLabel('BFS Target Found (Shortest Hops)');
    setTimeout(() => setTraversalLabel(null), 2000);
  };

  const runDFS = async () => {
    setTraversalLabel('DFS: Deep network branch traversal');
    const sequence = ['Ashwini', 'Rahul', 'Sneha', 'Priya', 'Akash', 'Karan', 'Vikram'];
    for (const node of sequence) {
      setDfsActive(node);
      await new Promise(r => setTimeout(r, 550));
    }
    setDfsActive(null);
    setTraversalLabel('DFS Traversal Complete');
    setTimeout(() => setTraversalLabel(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-7 text-white font-sans animate-fade-in">
      
      {/* ===================================================== */}
      {/* HERO SECTION: INTERACTIVE 3D GRAPH WITH BFS & DFS     */}
      {/* ===================================================== */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <h2 className="text-xl font-bold tracking-tight text-white">Interactive Human Network</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runBFS}
              className="px-3.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Find Nearest Mentor</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-200 ml-1">BFS</span>
            </button>

            <button
              onClick={runDFS}
              className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Network</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-400/20 text-purple-200 ml-1">DFS</span>
            </button>
          </div>
        </div>

        {traversalLabel && (
          <div className="text-xs font-mono text-sky-300 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-sky-400" />
            <span>{traversalLabel}</span>
          </div>
        )}

        <Hero3DNetwork 
          bfsActive={bfsActive} 
          dfsActive={dfsActive} 
          highlightNodes={connections} 
        />
      </div>

      {/* ===================================================== */}
      {/* CORE 2-COLUMN VISUAL DATA STRUCTURES GRID             */}
      {/* ===================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. HUMAN CONNECTIONS: 3D FLOATING LINKED LIST */}
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
                  onClick={addConnection}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Add Connection"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={removeConnection}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
                  title="Remove Connection"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={traverseChain}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-medium flex items-center gap-1"
                >
                  <Play className="w-3 h-3" /> Traverse
                </button>
              </div>
            </div>

            {/* Visual Floating Chain */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 overflow-x-auto min-h-[92px] flex items-center gap-3">
              <span className="text-[10px] font-mono text-sky-400 font-bold shrink-0">HEAD →</span>
              <AnimatePresence>
                {connections.map((person, i) => {
                  const isActive = llActiveNode === person;
                  return (
                    <React.Fragment key={person}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: isActive ? 1.08 : 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-medium shrink-0 flex items-center gap-2 shadow-sm ${
                          isActive
                            ? 'bg-sky-400 text-slate-950 font-bold border-white shadow-lg shadow-sky-400/40'
                            : 'bg-[#1E293B] border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                        <span>{person}</span>
                      </motion.div>
                      {i < connections.length - 1 ? (
                        <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-colors ${isActive ? 'text-sky-300' : 'text-slate-600'}`} />
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
            <span>Dynamic connection pointers</span>
            <span className="text-sky-400">{connections.length} Nodes</span>
          </div>
        </div>

        {/* 2. SEARCH HISTORY & UNDO: 3D VERTICAL STACK */}
        <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Search History & Undo</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Stack
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={pushSearch}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
                >
                  <ArrowUp className="w-3 h-3 text-purple-400" /> Push
                </button>
                <button
                  onClick={popSearch}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Undo (Pop)
                </button>
              </div>
            </div>

            {/* Visual 3D Stack */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[92px] flex items-center justify-center">
              <div className="w-full max-w-sm space-y-1.5">
                <AnimatePresence>
                  {searchStack.slice(0, 3).map((item, idx) => (
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
                {poppedStackItem && (
                  <div className="text-[11px] text-rose-400 font-mono text-center animate-fade-in pt-1">
                    Popped: {poppedStackItem}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Last In First Out</span>
            <span className="text-purple-400">Depth: {searchStack.length}</span>
          </div>
        </div>

        {/* 3. LEARNING REQUESTS: ANIMATED FIFO PIPELINE */}
        <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Learning Requests Pipeline</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Queue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={enqueueRequest}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 text-emerald-400" /> Enqueue
                </button>
                <button
                  onClick={dequeueRequest}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Process (Dequeue)
                </button>
              </div>
            </div>

            {/* Visual FIFO Pipeline */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[92px] flex items-center justify-between overflow-x-auto gap-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">FRONT (Served) →</span>
              <div className="flex items-center gap-2 mx-2">
                <AnimatePresence>
                  {requestQueue.map((req, idx) => (
                    <motion.div
                      key={req}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono shrink-0 ${
                        idx === 0
                          ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      {req}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <span className="text-[10px] font-mono text-sky-400 font-bold shrink-0">← REAR</span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>First In First Out order</span>
            <span className="text-emerald-400">{requestQueue.length} In Queue</span>
          </div>
        </div>

        {/* 4. MENTOR RECOMMENDATIONS: DYNAMIC RANKING TOWER */}
        <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Mentor Ranking Tower</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Priority Queue
                </span>
              </div>
              <button
                onClick={reorderPriority}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Re-Rank Tower
              </button>
            </div>

            {/* Visual Ranking Tower */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[92px] space-y-1.5">
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
            <span>Max-Heap score ordering</span>
            <span className="text-amber-400">Top: {mentors[0]?.score}%</span>
          </div>
        </div>

        {/* 5. PROFILE LOOKUP: INTERACTIVE HASH SLOTS */}
        <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Profile Direct Access</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Hash Map
                </span>
              </div>
              <span className="text-xs font-mono text-indigo-400">hash(key) → O(1)</span>
            </div>

            {/* Visual Hash Slots */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[92px] flex items-center justify-between gap-2">
              <div className="grid grid-cols-4 gap-1.5 w-full">
                {Object.entries(userSlots).map(([id, info]) => {
                  const isSelected = activeSlot === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveSlot(id)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'bg-indigo-500/25 border-indigo-400 text-white font-bold scale-105 shadow-md shadow-indigo-500/20'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-indigo-400">slot[{id}]</div>
                      <div className="text-xs font-semibold truncate mt-0.5">{info.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Instant bucket resolution</span>
            <span className="text-emerald-400">→ {userSlots[activeSlot]?.role}</span>
          </div>
        </div>

        {/* 6. SKILL HIERARCHY: EXPANDABLE 3D TREE */}
        <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Skill Hierarchy</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Tree
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400">Root: Technology</span>
            </div>

            {/* Visual Expandable Tree */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[92px] font-mono text-xs space-y-1.5">
              <div className="text-sky-400 font-bold">Technology (Root)</div>
              <div className="ml-4 border-l border-slate-800 pl-3 space-y-1">
                {/* AI Branch */}
                <div>
                  <button
                    onClick={() => setTreeExpanded(prev => ({ ...prev, AI: !prev.AI }))}
                    className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200"
                  >
                    {treeExpanded.AI ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    <span>AI (Machine Learning, LLM)</span>
                  </button>
                </div>

                {/* Web Branch */}
                <div>
                  <button
                    onClick={() => setTreeExpanded(prev => ({ ...prev, Web: !prev.Web }))}
                    className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200"
                  >
                    {treeExpanded.Web ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    <span>Web (Frontend, Backend)</span>
                  </button>
                </div>

                {/* Cloud Branch */}
                <div>
                  <button
                    onClick={() => setTreeExpanded(prev => ({ ...prev, Cloud: !prev.Cloud }))}
                    className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200"
                  >
                    {treeExpanded.Cloud ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    <span>Cloud (AWS, Docker)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Hierarchical taxonomy branching</span>
            <span className="text-cyan-400">3 Domains</span>
          </div>
        </div>

      </div>

    </div>
  );
}
