const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { readDb, writeDb } = require('./db');
const { calculateMatchScore, rankMentorsForRequest } = require('./aiMatcher');
const {
  UndoStack,
  RequestQueue,
  ConnectionLinkedList,
  traverseCategoryTree,
  countTotalSkillsRecursive,
  filterCategoriesRecursive
} = require('./dataStructures');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'humannet_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// In-memory data structure instances initialized from DB
const undoStack = new UndoStack(30);
const requestQueue = new RequestQueue();
const connectionChain = new ConnectionLinkedList();

// Seed initial Queue and Linked list from db
const initialData = readDb();
if (initialData.requests) {
  initialData.requests.forEach(r => requestQueue.enqueue(r));
}
if (initialData.connections) {
  connectionChain.fromArray(initialData.connections);
}

// ---------------- AUTH MIDDLEWARE ----------------
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// ---------------- AUTH ROUTES ----------------
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, bio, experienceLevel, location } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }

  const db = readDb();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'User with this email already exists' });
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    email,
    password, // In real deployment: bcrypt.hashSync(password, 10)
    photo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0f172a`,
    bio: bio || 'Exploring new frontiers and sharing knowledge on HumanNet.',
    skillsOffered: [],
    skillsWanted: [],
    interests: ['AI', 'Mentorship', 'Technology'],
    experienceLevel: experienceLevel || 'Intermediate',
    availability: 'Flexible (Remote)',
    location: location || 'Global Remote',
    rating: 5.0,
    reviewsCount: 1,
    credits: 500, // Welcome grant
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDb(db);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({
    success: true,
    user: newUser,
    token
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Try ashwini@humannet.ai / password123' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    success: true,
    user,
    token
  });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  const db = readDb();
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user) {
    return res.status(404).json({ success: false, message: 'No account found with this email' });
  }
  // Mock reset link sent
  res.json({
    success: true,
    message: `Password reset instructions have been dispatched to ${email}`
  });
});

// ---------------- USER & PROFILE ROUTES ----------------
app.get('/api/users/me', authMiddleware, (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, user });
});

app.put('/api/users/profile', authMiddleware, (req, res) => {
  const db = readDb();
  const userIndex = db.users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) return res.status(404).json({ success: false, message: 'User not found' });

  // Record undo state
  undoStack.push({
    action: 'UPDATE_PROFILE',
    userId: req.user.id,
    previousData: { ...db.users[userIndex] }
  });

  const { name, bio, experienceLevel, availability, location, photo, interests, skillsWanted } = req.body;
  const user = db.users[userIndex];

  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (experienceLevel !== undefined) user.experienceLevel = experienceLevel;
  if (availability !== undefined) user.availability = availability;
  if (location !== undefined) user.location = location;
  if (photo !== undefined) user.photo = photo;
  if (interests !== undefined) user.interests = interests;
  if (skillsWanted !== undefined) user.skillsWanted = skillsWanted;

  writeDb(db);
  res.json({ success: true, user, message: 'Profile updated successfully' });
});

app.get('/api/users', (req, res) => {
  const db = readDb();
  const mentors = db.users.map(u => ({
    id: u.id,
    name: u.name,
    photo: u.photo,
    bio: u.bio,
    rating: u.rating,
    reviewsCount: u.reviewsCount,
    experienceLevel: u.experienceLevel,
    location: u.location,
    availability: u.availability,
    skillsOffered: u.skillsOffered,
    credits: u.credits
  }));
  res.json({ success: true, mentors });
});

// ---------------- SKILLS MANAGEMENT ----------------
app.post('/api/skills', authMiddleware, (req, res) => {
  const { name, category, level, description } = req.body;
  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Skill name and category are required' });
  }

  const db = readDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const newSkill = {
    id: 'skl_' + Date.now(),
    name,
    category,
    level: level || 'Intermediate',
    description: description || ''
  };

  // Stack record for Undo
  undoStack.push({
    action: 'ADD_SKILL',
    userId: req.user.id,
    skillId: newSkill.id,
    skill: newSkill
  });

  user.skillsOffered.push(newSkill);
  user.credits = (user.credits || 0) + 50; // Bonus credits for sharing a skill
  writeDb(db);

  res.status(201).json({ success: true, skill: newSkill, skills: user.skillsOffered, credits: user.credits });
});

app.put('/api/skills/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, category, level, description } = req.body;

  const db = readDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const skillIndex = user.skillsOffered.findIndex(s => s.id === id);
  if (skillIndex === -1) return res.status(404).json({ success: false, message: 'Skill not found' });

  const oldSkill = { ...user.skillsOffered[skillIndex] };
  undoStack.push({
    action: 'EDIT_SKILL',
    userId: req.user.id,
    skillId: id,
    previousSkill: oldSkill
  });

  user.skillsOffered[skillIndex] = {
    ...oldSkill,
    name: name || oldSkill.name,
    category: category || oldSkill.category,
    level: level || oldSkill.level,
    description: description !== undefined ? description : oldSkill.description
  };

  writeDb(db);
  res.json({ success: true, skill: user.skillsOffered[skillIndex], skills: user.skillsOffered });
});

app.delete('/api/skills/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const skillIndex = user.skillsOffered.findIndex(s => s.id === id);
  if (skillIndex === -1) return res.status(404).json({ success: false, message: 'Skill not found' });

  const removedSkill = user.skillsOffered[skillIndex];
  undoStack.push({
    action: 'DELETE_SKILL',
    userId: req.user.id,
    skill: removedSkill,
    index: skillIndex
  });

  user.skillsOffered.splice(skillIndex, 1);
  writeDb(db);
  res.json({ success: true, message: 'Skill removed', skills: user.skillsOffered });
});

// ---------------- SKILL REQUESTS & QUEUE ----------------
app.get('/api/requests', (req, res) => {
  const db = readDb();
  res.json({
    success: true,
    requests: db.requests,
    queueSize: requestQueue.size(),
    nextInQueue: requestQueue.peek()
  });
});

app.post('/api/requests', authMiddleware, (req, res) => {
  const { skillRequired, category, levelRequired, mode, schedulePreference, description } = req.body;
  if (!skillRequired) {
    return res.status(400).json({ success: false, message: 'Skill required is mandatory' });
  }

  const db = readDb();
  const user = db.users.find(u => u.id === req.user.id);

  const newRequest = {
    id: 'req_' + Date.now(),
    userId: req.user.id,
    userName: user ? user.name : req.user.name,
    userPhoto: user ? user.photo : '',
    skillRequired,
    category: category || 'Technology',
    levelRequired: levelRequired || 'Intermediate',
    mode: mode || 'Online',
    schedulePreference: schedulePreference || 'Flexible',
    description: description || '',
    status: 'active',
    createdAt: new Date().toISOString()
  };

  // Stack record for Undo
  undoStack.push({
    action: 'CREATE_REQUEST',
    userId: req.user.id,
    requestId: newRequest.id
  });

  db.requests.unshift(newRequest);
  writeDb(db);

  // Enqueue in data structure
  requestQueue.enqueue(newRequest);

  // Automatically compute AI matches for this request immediately
  const aiMatches = rankMentorsForRequest(db.users, newRequest, req.user.id);

  res.status(201).json({
    success: true,
    request: newRequest,
    aiMatches: aiMatches.slice(0, 5),
    queuePosition: requestQueue.size()
  });
});

// ---------------- AI MATCHING ENGINE ENDPOINTS ----------------
app.post('/api/match/evaluate', (req, res) => {
  const { skillRequired, category, levelRequired, mode, schedulePreference, description, userId } = req.body;
  const db = readDb();

  const tempRequest = {
    userId: userId || 'anonymous',
    skillRequired: skillRequired || 'Machine Learning & LLMs',
    category: category || 'Technology',
    levelRequired: levelRequired || 'Intermediate',
    mode: mode || 'Online',
    schedulePreference: schedulePreference || 'Flexible',
    description: description || ''
  };

  const rankedMentors = rankMentorsForRequest(db.users, tempRequest, userId);
  res.json({
    success: true,
    requestAnalyzed: tempRequest,
    totalEvaluated: db.users.length,
    matches: rankedMentors
  });
});

// ---------------- CONNECTIONS & LINKED LIST ----------------
app.get('/api/connections', authMiddleware, (req, res) => {
  const db = readDb();
  const userConns = db.connections.filter(c => c.mentorId === req.user.id || c.learnerId === req.user.id);
  
  res.json({
    success: true,
    connections: userConns,
    allConnectionsChain: connectionChain.toArray(),
    linkedListChainLength: connectionChain.size
  });
});

app.post('/api/connections/request', authMiddleware, (req, res) => {
  const { mentorId, skill, initialMessage } = req.body;
  const db = readDb();

  const mentor = db.users.find(u => u.id === mentorId);
  const learner = db.users.find(u => u.id === req.user.id);

  if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
  if (mentor.id === req.user.id) {
    return res.status(400).json({ success: false, message: 'Cannot connect to yourself' });
  }

  const newConn = {
    id: 'conn_' + Date.now(),
    mentorId: mentor.id,
    mentorName: mentor.name,
    mentorPhoto: mentor.photo,
    learnerId: learner.id,
    learnerName: learner.name,
    learnerPhoto: learner.photo,
    skill: skill || mentor.skillsOffered[0]?.name || 'Mentorship',
    status: 'active',
    sessionsCompleted: 1,
    totalCreditsExchanged: 100,
    startedAt: new Date().toISOString(),
    lastInteraction: new Date().toISOString()
  };

  // Stack record for Undo
  undoStack.push({
    action: 'CREATE_CONNECTION',
    connectionId: newConn.id
  });

  db.connections.unshift(newConn);
  // Award credits to both participants
  mentor.credits = (mentor.credits || 0) + 100;
  if (learner.credits >= 100) {
    learner.credits -= 100;
  }
  writeDb(db);

  connectionChain.append(newConn);

  res.status(201).json({
    success: true,
    connection: newConn,
    message: `Connected successfully with ${mentor.name}! 100 HumanNet Credits transferred.`
  });
});

// ---------------- DATA STRUCTURE DEMO & UNDO STACK ----------------
app.post('/api/dsa/undo', authMiddleware, (req, res) => {
  const lastOp = undoStack.pop();
  if (!lastOp) {
    return res.status(400).json({ success: false, message: 'Undo stack is currently empty. No operations to revert.' });
  }

  const db = readDb();
  let revertSummary = '';

  if (lastOp.action === 'ADD_SKILL') {
    const user = db.users.find(u => u.id === lastOp.userId);
    if (user) {
      user.skillsOffered = user.skillsOffered.filter(s => s.id !== lastOp.skillId);
      revertSummary = `Reverted addition of skill "${lastOp.skill?.name}"`;
    }
  } else if (lastOp.action === 'DELETE_SKILL') {
    const user = db.users.find(u => u.id === lastOp.userId);
    if (user && lastOp.skill) {
      user.skillsOffered.splice(lastOp.index || 0, 0, lastOp.skill);
      revertSummary = `Restored deleted skill "${lastOp.skill.name}"`;
    }
  } else if (lastOp.action === 'EDIT_SKILL') {
    const user = db.users.find(u => u.id === lastOp.userId);
    if (user) {
      const idx = user.skillsOffered.findIndex(s => s.id === lastOp.skillId);
      if (idx !== -1) user.skillsOffered[idx] = lastOp.previousSkill;
      revertSummary = `Restored previous content for skill "${lastOp.previousSkill?.name}"`;
    }
  } else if (lastOp.action === 'CREATE_REQUEST') {
    db.requests = db.requests.filter(r => r.id !== lastOp.requestId);
    revertSummary = `Deleted newly created request #${lastOp.requestId}`;
  } else if (lastOp.action === 'CREATE_CONNECTION') {
    db.connections = db.connections.filter(c => c.id !== lastOp.connectionId);
    revertSummary = `Reverted mentorship connection`;
  }

  writeDb(db);
  res.json({
    success: true,
    revertedAction: lastOp.action,
    summary: revertSummary,
    remainingStackSize: undoStack.size()
  });
});

app.get('/api/dsa/stack-status', (req, res) => {
  res.json({
    success: true,
    size: undoStack.size(),
    recentOperations: undoStack.toArray()
  });
});

// Category Tree navigation using Recursion
app.get('/api/categories/tree', (req, res) => {
  const db = readDb();
  const { search } = req.query;

  if (search && search.trim()) {
    const filteredTree = filterCategoriesRecursive(db.categoriesTree, search.trim());
    return res.json({
      success: true,
      tree: filteredTree || { name: 'No matches found', children: [] },
      totalSkillsCount: countTotalSkillsRecursive(db.categoriesTree)
    });
  }

  const flattenedList = [];
  traverseCategoryTree(db.categoriesTree, null, flattenedList);

  res.json({
    success: true,
    tree: db.categoriesTree,
    flattened: flattenedList,
    totalSkillsCount: countTotalSkillsRecursive(db.categoriesTree)
  });
});

// ---------------- HUD STATISTICS & AI INSIGHTS ----------------
app.get('/api/insights', (req, res) => {
  const db = readDb();
  
  // Dynamic metrics
  const totalUsers = db.users.length;
  let totalSkillsShared = 0;
  db.users.forEach(u => {
    totalSkillsShared += (u.skillsOffered ? u.skillsOffered.length : 0);
  });
  
  let totalSessions = 0;
  db.connections.forEach(c => {
    totalSessions += (c.sessionsCompleted || 1);
  });

  const successfulMatches = db.connections.length * 4 + 18;

  res.json({
    success: true,
    hud: {
      users: 1420 + totalUsers,
      skillsShared: 3840 + totalSkillsShared,
      knowledgeSessions: 892 + totalSessions,
      successfulMatches: 980 + successfulMatches
    },
    trendingSkills: [
      { name: 'LLM Fine-tuning & LoRA', category: 'Technology', growth: '+142%', mentors: 48 },
      { name: 'Figma Design Tokens', category: 'Design', growth: '+88%', mentors: 35 },
      { name: 'B2B Sales Funnels', category: 'Business', growth: '+76%', mentors: 29 },
      { name: 'Rust Embedded & WebAssembly', category: 'Technology', growth: '+64%', mentors: 21 },
      { name: 'Executive Storytelling', category: 'Communication', growth: '+52%', mentors: 19 }
    ],
    fastestGrowingCategories: [
      { category: 'Technology', velocity: '94/100', topSkill: 'Generative AI' },
      { category: 'Design', velocity: '82/100', topSkill: 'Micro-interactions' },
      { category: 'Business', velocity: '79/100', topSkill: 'Fractional CMO' },
      { category: 'Communication', velocity: '71/100', topSkill: 'Pitch Mastery' }
    ],
    personalizedRecommendations: [
      {
        title: 'Master Prompt Engineering & Agent Systems',
        reason: 'High market demand matching your interest profile in AI Systems',
        category: 'Technology',
        estimatedTimeToMatch: '< 15 mins'
      },
      {
        title: 'Design Systems Architecture with Tailwind',
        reason: 'Complementary to your existing Frontend skill stack',
        category: 'Design',
        estimatedTimeToMatch: '< 2 hours'
      },
      {
        title: 'Venture Pitch Strategy & Cap Tables',
        reason: 'High ROI skill requested by 84% of startup founders this quarter',
        category: 'Business',
        estimatedTimeToMatch: '< 4 hours'
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`HumanNet Backend Server running on http://localhost:${PORT}`);
});
