# HumanNet — AI-Powered Human Capability Network

> **Tagline:** *"Unlock Human Potential"*  
> **Subtitle:** *"Connect, learn, teach and grow through intelligent human matching."*

HumanNet is an AI-powered human capability network that connects people who want to learn with people who can teach. The platform acts as an intelligent marketplace for knowledge, mentorship, skill sharing, and human collaboration.

---

## 🚀 Architecture & Tech Stack

- **Frontend:** React 19 + Vite + Tailwind CSS v4 + Lucide Icons
- **Backend:** Node.js + Express
- **AI Matching Engine:** Multi-factor vector weighting algorithm (Domain Skills, Experience Level, Availability, Interests, Location/Mode, Historical Ratings)
- **Data Structures Integration:**
  - **Arrays:** Structured skill catalogs and indexed search lookups
  - **Queues (FIFO):** Ingestion buffer for learning requests (`RequestQueue`)
  - **Stacks (LIFO):** Global rollback & Undo engine (`UndoStack`)
  - **Linked Lists:** Interactive sequential node chain visualizer for ongoing mentorship pairs
  - **Recursion:** Deep tree traversal and multi-level sub-tree filtering across hierarchical skill taxonomies

---

## 📁 Repository Structure

```
├── client/                     # Vite + React Frontend Application
│   ├── public/                 # Static assets & favicons
│   ├── src/                    # Components, views, context & styles
│   │   ├── components/         # Modular UI views (AiMatcher, Dashboard, Marketplace, etc.)
│   │   ├── context/            # AuthContext & persistent state
│   │   ├── App.jsx             # Main App layout & tab routing
│   │   └── index.css           # Modern dark theme & glassmorphism styles
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js + Express Backend
│   ├── aiMatcher.js            # Multi-factor AI recommendation engine
│   ├── dataStructures.js       # CS data structures implementation (Stack, Queue, LinkedList, Recursion)
│   ├── db.js                   # Mock persistent repository & expanded mentor pool
│   ├── index.js                # Express API REST endpoints
│   └── package.json
├── package.json                # Root workspace configuration
├── vercel.json                 # Vercel deployment configuration
└── README.md
```

---

## 🛠️ Local Development

### 1. Install & Run Server
```bash
cd server
npm install
node index.js
# Backend runs on http://localhost:5000
```

### 2. Install & Run Client
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```
