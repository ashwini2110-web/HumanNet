const fs = require('fs');
const path = require('path');

// Simple persistent JSON DB storage for robust instant execution without MongoDB local dependency,
// with clean MongoDB schema & mongoose interface ready.
const DB_FILE = path.join(__dirname, 'db.json');

const defaultData = {
  users: [
    {
      id: 'usr_ashwini',
      name: 'Ashwini Muthamshetty',
      email: 'ashwini@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Staff AI Engineer & Distributed Systems Architect. Passionate about LLMs, Vector Search, and mentoring founders.',
      skillsOffered: [
        { id: 's1', name: 'Machine Learning & LLMs', category: 'Technology', level: 'Expert', description: 'Transformer architectures, PyTorch, LoRA fine-tuning, RAG pipelines' },
        { id: 's2', name: 'System Design at Scale', category: 'Technology', level: 'Expert', description: 'Microservices, Kafka, Redis caching, high concurrency patterns' },
        { id: 's3', name: 'Startup Pitching', category: 'Business', level: 'Intermediate', description: 'Structuring seed pitch decks and technical due diligence' }
      ],
      skillsWanted: ['Quantum Computing', 'Digital Product UI', 'Neuroscience Basics'],
      interests: ['Generative AI', 'Deep Tech', 'Angel Investing', 'Philosophy'],
      experienceLevel: 'Staff / 10+ Years',
      availability: 'Weekends & Evenings (EST)',
      location: 'San Francisco, CA (Remote/Hybrid)',
      rating: 4.98,
      reviewsCount: 42,
      credits: 1250,
      createdAt: '2026-01-15T10:00:00.000Z'
    },
    {
      id: 'usr_rahul',
      name: 'Rahul Mehta',
      email: 'rahul@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Full Stack Tech Lead & React / Node Performance Specialist. 8+ yrs scaling web apps to millions of MAUs.',
      skillsOffered: [
        { id: 's4', name: 'Full Stack Web Architecture', category: 'Technology', level: 'Expert', description: 'Next.js 15, Node.js, GraphQL, PostgreSQL performance indexing' },
        { id: 's5', name: 'Product Engineering', category: 'Business', level: 'Advanced', description: 'Scrum sprint pacing, engineering culture, CI/CD pipelines' },
        { id: 's6', name: 'TypeScript & React Internals', category: 'Technology', level: 'Expert', description: 'Fiber architecture, custom hooks, memory optimizations' }
      ],
      skillsWanted: ['Machine Learning & LLMs', 'Public Speaking', 'Seed Fundraising'],
      interests: ['Open Source', 'SaaS Growth', 'Cycling', 'Chess'],
      experienceLevel: 'Senior / 8 Years',
      availability: 'Flexible (IST / GMT)',
      location: 'Bangalore, India (Remote)',
      rating: 4.92,
      reviewsCount: 38,
      credits: 840,
      createdAt: '2026-02-01T12:00:00.000Z'
    },
    {
      id: 'usr_priya',
      name: 'Priya Sundaram',
      email: 'priya@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Product Design Lead & Design Systems Pioneer. Ex-Fintech, mentor at multiple YC cohort startups.',
      skillsOffered: [
        { id: 's7', name: 'Design Systems & Figma Mastery', category: 'Design', level: 'Expert', description: 'Component architecture, tokens, atomic design, accessibility WCAG' },
        { id: 's8', name: 'UX Research & Product Strategy', category: 'Design', level: 'Expert', description: 'User interviews, usability heuristics, retention-focused flows' },
        { id: 's9', name: 'Design Leadership', category: 'Personal Development', level: 'Advanced', description: 'Career ladders, portfolio critiques, cross-functional stakeholder alignment' }
      ],
      skillsWanted: ['Frontend Coding (Tailwind/React)', 'AI Prototyping'],
      interests: ['Typography', 'Generative Art', 'Human-Computer Interaction'],
      experienceLevel: 'Lead / 9 Years',
      availability: 'Weekday Mornings (PST)',
      location: 'Seattle, WA (Remote)',
      rating: 4.95,
      reviewsCount: 51,
      credits: 1420,
      createdAt: '2026-01-20T09:30:00.000Z'
    },
    {
      id: 'usr_elena',
      name: 'Elena Rostova',
      email: 'elena@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'Venture Capital Associate & Growth Hacker. Helping builders scale B2B SaaS from 0 to $1M ARR.',
      skillsOffered: [
        { id: 's10', name: 'B2B Go-To-Market & Growth', category: 'Business', level: 'Expert', description: 'Outbound sales funnels, product-led growth, cold outreach engines' },
        { id: 's11', name: 'Pitch Deck & Financial Modeling', category: 'Business', level: 'Advanced', description: 'Unit economics, LTV/CAC, cap tables, investor updates' }
      ],
      skillsWanted: ['Data Science', 'SQL Mastery'],
      interests: ['Venture Capital', 'Fintech', 'Rock Climbing'],
      experienceLevel: 'Principal / 7 Years',
      availability: 'Evenings (EST)',
      location: 'New York, NY (Hybrid)',
      rating: 4.88,
      reviewsCount: 29,
      credits: 910,
      createdAt: '2026-02-14T14:15:00.000Z'
    },
    {
      id: 'usr_marcus',
      name: 'Marcus Vance',
      email: 'marcus@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Executive Vocal & Public Speaking Coach. Former TED speaker trainer, corporate storytelling coach.',
      skillsOffered: [
        { id: 's12', name: 'Executive Presence & Storytelling', category: 'Communication', level: 'Expert', description: 'Overcoming stage anxiety, pitch delivery, cadence, body language' },
        { id: 's13', name: 'Cross-cultural Communication', category: 'Communication', level: 'Advanced', description: 'High-stakes negotiations, leadership roundtables' }
      ],
      skillsWanted: ['Podcasting Setup', 'Digital Marketing'],
      interests: ['Public Speaking', 'Improv', 'Philosophy', 'Jazz'],
      experienceLevel: 'Executive / 12 Years',
      availability: 'Weekdays & Weekends',
      location: 'London, UK (Remote/In-person)',
      rating: 4.99,
      reviewsCount: 64,
      credits: 1680,
      createdAt: '2026-01-10T16:00:00.000Z'
    },
    // --- 1. AI & Machine Learning ---
    {
      id: 'usr_dr_chen',
      name: 'Dr. Aris Chen',
      email: 'aris.chen@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      bio: 'Principal AI Research Scientist. Ex-DeepMind, author of 14 published papers on sparse neural representations & multi-modal foundations.',
      skillsOffered: [
        { id: 's14', name: 'AI & Machine Learning', category: 'Technology', level: 'Expert', description: 'Deep learning theory, PyTorch, gradient estimation, neural pruning' },
        { id: 's15', name: 'Machine Learning & LLMs', category: 'Technology', level: 'Expert', description: 'Encoder-decoder models, pre-training regimes, RLHF alignment' }
      ],
      skillsWanted: ['Quantum Computing', 'Chip Architecture'],
      interests: ['Artificial General Intelligence', 'Reinforcement Learning', 'Robotics'],
      experienceLevel: 'Principal / 11 Years',
      availability: 'Weekends & Evenings',
      location: 'Boston, MA (Remote)',
      rating: 4.97,
      reviewsCount: 47,
      credits: 1540,
      createdAt: '2026-02-18T10:00:00.000Z'
    },
    // --- 2. Data Science ---
    {
      id: 'usr_maya_lin',
      name: 'Maya Lin',
      email: 'maya.lin@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      bio: 'Lead Data Scientist at Streaming Unicorn. Specializing in predictive modeling, causal inference, and user behavior cohort analytics.',
      skillsOffered: [
        { id: 's16', name: 'Data Science', category: 'Technology', level: 'Expert', description: 'Bayesian statistics, A/B testing design, scikit-learn, XGBoost, pandas' },
        { id: 's17', name: 'Predictive Analytics & Experimentation', category: 'Technology', level: 'Expert', description: 'Synthetic controls, observational data studies, causal graphs' }
      ],
      skillsWanted: ['Product Management', 'Data Engineering'],
      interests: ['Behavioral Economics', 'Data Visualization', 'Rock Climbing'],
      experienceLevel: 'Staff / 9 Years',
      availability: 'Weekday Evenings (PST)',
      location: 'San Jose, CA (Remote/Hybrid)',
      rating: 4.94,
      reviewsCount: 36,
      credits: 1180,
      createdAt: '2026-02-20T11:00:00.000Z'
    },
    // --- 3. Generative AI ---
    {
      id: 'usr_tariq_almansoor',
      name: 'Tariq Al-Mansoor',
      email: 'tariq@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      bio: 'Generative AI Specialist & Diffusion Model Creator. Built commercial video & image generation pipelines powered by ComfyUI and custom Flux LoRAs.',
      skillsOffered: [
        { id: 's18', name: 'Generative AI', category: 'Technology', level: 'Expert', description: 'Stable Diffusion, Flux, Latent Consistency Models, ControlNet pipelines' },
        { id: 's19', name: 'AI Voice & Video Synthesis', category: 'Technology', level: 'Advanced', description: 'Tortoise/Bark TTS, lip-sync neural nets, real-time avatar pipelines' }
      ],
      skillsWanted: ['C++ CUDA Kernels', 'Blender Python API'],
      interests: ['Generative Media', 'Film Production', 'Synthetic Voices'],
      experienceLevel: 'Lead / 7 Years',
      availability: 'Flexible (GST / GMT+4)',
      location: 'Dubai, UAE (Remote)',
      rating: 4.96,
      reviewsCount: 31,
      credits: 1320,
      createdAt: '2026-03-01T08:30:00.000Z'
    },
    // --- 4. Prompt Engineering ---
    {
      id: 'usr_chloe_bennett',
      name: 'Chloe Bennett',
      email: 'chloe@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      bio: 'AI Solutions Architect & Prompt Engineering Lead. Designing structured tool-calling systems, recursive agent chains, and DSPy optimization routines.',
      skillsOffered: [
        { id: 's20', name: 'Prompt Engineering', category: 'Technology', level: 'Expert', description: 'DSPy prompt compilation, few-shot chain-of-thought, structured JSON extraction' },
        { id: 's21', name: 'Autonomous AI Agents', category: 'Technology', level: 'Expert', description: 'LangGraph, AutoGen, multi-agent debate topologies, memory compaction' }
      ],
      skillsWanted: ['Full Stack Development', 'Go Systems'],
      interests: ['Cognitive Architectures', 'LLM Red-Teaming', 'Creative Writing'],
      experienceLevel: 'Senior / 6 Years',
      availability: 'Weekdays & Evenings',
      location: 'Austin, TX (Remote)',
      rating: 4.93,
      reviewsCount: 41,
      credits: 1100,
      createdAt: '2026-03-05T14:00:00.000Z'
    },
    // --- 5. Full Stack Development ---
    {
      id: 'usr_vikram_nair',
      name: 'Vikram Nair',
      email: 'vikram.nair@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      bio: 'Staff Full Stack Engineer at enterprise SaaS. Master of Next.js App Router, Tailwind, tRPC, PostgreSQL, and resilient micro-frontends.',
      skillsOffered: [
        { id: 's22', name: 'Full Stack Development', category: 'Technology', level: 'Expert', description: 'Full stack TypeScript, React 19, Node.js microservices, Prisma, Redis' },
        { id: 's23', name: 'Full Stack Web Architecture', category: 'Technology', level: 'Expert', description: 'Server Actions, streaming SSR, edge middleware caching' }
      ],
      skillsWanted: ['DevOps', 'Cybersecurity'],
      interests: ['High-Performance Web', 'Vim/Neovim', 'Marathon Running'],
      experienceLevel: 'Staff / 10+ Years',
      availability: 'Flexible (IST / Remote)',
      location: 'Hyderabad, India (Remote)',
      rating: 4.95,
      reviewsCount: 55,
      credits: 1470,
      createdAt: '2026-01-25T09:00:00.000Z'
    },
    // --- 6. Cloud Computing ---
    {
      id: 'usr_siddharth_deshmukh',
      name: 'Siddharth Deshmukh',
      email: 'siddharth@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
      bio: 'Principal Cloud Architect. Multi-cloud certified (AWS Solution Architect Pro, GCP Fellow). Architecting petabyte-scale multi-region fault tolerance.',
      skillsOffered: [
        { id: 's24', name: 'Cloud Computing', category: 'Technology', level: 'Expert', description: 'AWS, GCP, Azure, multi-region failover, VPC peering, IAM zero-trust' },
        { id: 's25', name: 'Serverless & Distributed Edge', category: 'Technology', level: 'Expert', description: 'AWS Lambda, Cloudflare Workers, DynamoDB global tables' }
      ],
      skillsWanted: ['Data Science', 'Machine Learning & LLMs'],
      interests: ['Distributed Consensus', 'FinOps', 'Hiking'],
      experienceLevel: 'Principal / 12 Years',
      availability: 'Weekends & Evenings',
      location: 'Chicago, IL (Remote/Hybrid)',
      rating: 4.98,
      reviewsCount: 62,
      credits: 1750,
      createdAt: '2026-01-18T16:00:00.000Z'
    },
    // --- 7. DevOps ---
    {
      id: 'usr_ananya_roy',
      name: 'Ananya Roy',
      email: 'ananya.roy@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Senior DevOps & Platform Engineer. Kubernetes CKA, Terraform pioneer, specialist in GitOps deployments, ArgoCD, and zero-downtime canary rollouts.',
      skillsOffered: [
        { id: 's26', name: 'DevOps', category: 'Technology', level: 'Expert', description: 'Kubernetes orchestration, Helm charts, Terraform IaC, Prometheus/Grafana observability' },
        { id: 's27', name: 'CI/CD & GitOps Automation', category: 'Technology', level: 'Expert', description: 'GitHub Actions matrix builds, ArgoCD, Docker rootless security' }
      ],
      skillsWanted: ['Cloud Computing', 'Cybersecurity'],
      interests: ['Site Reliability Engineering', 'Chaos Engineering', 'Cycling'],
      experienceLevel: 'Senior / 8 Years',
      availability: 'Weekday Evenings (EST)',
      location: 'Toronto, Canada (Remote)',
      rating: 4.91,
      reviewsCount: 34,
      credits: 1150,
      createdAt: '2026-02-11T13:00:00.000Z'
    },
    // --- 8. Cybersecurity ---
    {
      id: 'usr_felix_vogel',
      name: 'Felix Vogel',
      email: 'felix.vogel@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
      bio: 'Offensive Security Certified Expert (OSCE) & AppSec Director. Leading red-team exercises, cloud threat modeling, and OWASP Top 10 mitigation.',
      skillsOffered: [
        { id: 's28', name: 'Cybersecurity', category: 'Technology', level: 'Expert', description: 'Penetration testing, threat modeling, smart contract auditing, vulnerability scanning' },
        { id: 's29', name: 'AppSec & Zero-Trust Defense', category: 'Technology', level: 'Expert', description: 'OAuth 2.1 / OIDC, cryptographic primitives, SOC2 compliance, SAST/DAST' }
      ],
      skillsWanted: ['DevOps', 'Machine Learning & LLMs'],
      interests: ['Reverse Engineering', 'Cryptography', 'Hardware Hacking'],
      experienceLevel: 'Lead / 9 Years',
      availability: 'Flexible (CET / UTC+1)',
      location: 'Berlin, Germany (Remote)',
      rating: 4.96,
      reviewsCount: 49,
      credits: 1390,
      createdAt: '2026-02-05T15:00:00.000Z'
    },
    // --- 9. UI/UX Design ---
    {
      id: 'usr_camila_morales',
      name: 'Camila Morales',
      email: 'camila.morales@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
      bio: 'Staff Product & UI/UX Designer. Ex-Airbnb, specialist in high-fidelity micro-interactions, dark mode design systems, and user empathy maps.',
      skillsOffered: [
        { id: 's30', name: 'UI/UX Design', category: 'Design', level: 'Expert', description: 'Figma prototypes, user research, wireframing, motion design in Rive' },
        { id: 's31', name: 'Design Systems & Figma Mastery', category: 'Design', level: 'Expert', description: 'Variable modes, auto-layout 5.0, tokens for Web and Mobile' }
      ],
      skillsWanted: ['Full Stack Development', 'Frontend Coding (Tailwind/React)'],
      interests: ['Interaction Design', 'Accessibility', 'Ceramics'],
      experienceLevel: 'Staff / 10+ Years',
      availability: 'Weekday Mornings (PST)',
      location: 'San Francisco, CA (Remote)',
      rating: 4.99,
      reviewsCount: 58,
      credits: 1610,
      createdAt: '2026-01-12T11:00:00.000Z'
    },
    // --- 10. Product Management ---
    {
      id: 'usr_david_stern',
      name: 'David Stern',
      email: 'david.stern@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      bio: 'VP of Product Management. Built and launched products reaching $100M ARR. Expert in PRDs, feature prioritization, discovery, and North Star metrics.',
      skillsOffered: [
        { id: 's32', name: 'Product Management', category: 'Business', level: 'Expert', description: 'Product strategy, PRD formulation, roadmap prioritization, customer interview synthesis' },
        { id: 's33', name: 'Product-Led Growth (PLG)', category: 'Business', level: 'Expert', description: 'Activation funnels, onboarding optimization, viral loops, cohort retention' }
      ],
      skillsWanted: ['Data Science', 'Generative AI'],
      interests: ['Product Strategy', 'Venture Capital', 'Tennis'],
      experienceLevel: 'Executive / 13 Years',
      availability: 'Weekends & Evenings',
      location: 'New York, NY (Remote/Hybrid)',
      rating: 4.95,
      reviewsCount: 67,
      credits: 1820,
      createdAt: '2026-01-08T10:00:00.000Z'
    },
    // --- 11. Startup & Entrepreneurship ---
    {
      id: 'usr_zack_alvarez',
      name: 'Zack Alvarez',
      email: 'zack.alvarez@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      bio: '2x Y Combinator Alum Founder & Angel Investor. Scaled two startups from idea to acquisition. Mentoring on fundraising, hiring, and 0-to-1 PMF.',
      skillsOffered: [
        { id: 's34', name: 'Startup & Entrepreneurship', category: 'Business', level: 'Expert', description: 'Zero-to-one product market fit, YC application coaching, cap table management' },
        { id: 's35', name: 'Startup Pitching', category: 'Business', level: 'Expert', description: 'Seed & Series A deck design, angel syndicate pitching, investor narratives' }
      ],
      skillsWanted: ['Machine Learning & LLMs', 'Cybersecurity'],
      interests: ['Venture Capital', 'Angel Investing', 'Tech History'],
      experienceLevel: 'Executive / 10+ Years',
      availability: 'Weekends (Flexible)',
      location: 'San Francisco, CA (Remote/In-person)',
      rating: 4.97,
      reviewsCount: 73,
      credits: 1950,
      createdAt: '2026-01-05T12:00:00.000Z'
    },
    // --- 12. Data Engineering ---
    {
      id: 'usr_meera_krishnan',
      name: 'Meera Krishnan',
      email: 'meera.krishnan@humannet.ai',
      password: 'password123',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      bio: 'Staff Data Engineer. Architect of petabyte streaming platforms using Apache Spark, Kafka, Iceberg, and dbt. Ex-Fintech data infrastructure lead.',
      skillsOffered: [
        { id: 's36', name: 'Data Engineering', category: 'Technology', level: 'Expert', description: 'Apache Spark, Apache Iceberg, Snowflake, Kafka streams, dbt data modeling' },
        { id: 's37', name: 'Real-Time Streaming Pipelines', category: 'Technology', level: 'Expert', description: 'Flink stream processing, schema registry, CDC with Debezium' }
      ],
      skillsWanted: ['Cloud Computing', 'Data Science'],
      interests: ['Data Infrastructure', 'Distributed Storage', 'Classical Music'],
      experienceLevel: 'Staff / 10+ Years',
      availability: 'Weekdays & Evenings',
      location: 'Austin, TX (Remote)',
      rating: 4.96,
      reviewsCount: 44,
      credits: 1490,
      createdAt: '2026-02-02T10:00:00.000Z'
    }
  ],
  requests: [
    {
      id: 'req_1',
      userId: 'usr_rahul',
      userName: 'Rahul Mehta',
      userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      skillRequired: 'Machine Learning & LLMs',
      category: 'Technology',
      levelRequired: 'Intermediate',
      mode: 'Online',
      schedulePreference: 'Weekends / 2 hours weekly',
      description: 'Looking to transition from traditional full-stack to deploying local LLM models with Ollama, fine-tuning Llama-3, and building low-latency RAG architectures.',
      status: 'active',
      createdAt: '2026-10-01T10:00:00.000Z'
    },
    {
      id: 'req_2',
      userId: 'usr_priya',
      userName: 'Priya Sundaram',
      userPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      skillRequired: 'Frontend Coding (Tailwind/React)',
      category: 'Technology',
      levelRequired: 'Beginner',
      mode: 'Online',
      schedulePreference: 'Flexible Weekday Evenings',
      description: 'I want to build real interactive prototypes instead of static mockups. Need guidance in structuring React state and component props cleanly.',
      status: 'active',
      createdAt: '2026-10-03T14:30:00.000Z'
    },
    {
      id: 'req_3',
      userId: 'usr_elena',
      userName: 'Elena Rostova',
      userPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      skillRequired: 'Executive Presence & Storytelling',
      category: 'Communication',
      levelRequired: 'Advanced',
      mode: 'Online',
      schedulePreference: 'Tuesdays & Thursdays',
      description: 'Preparing for global investor keynote and tech podcast interviews. Need focused feedback on voice inflection and clarity.',
      status: 'in_progress',
      createdAt: '2026-10-04T09:15:00.000Z'
    }
  ],
  connections: [
    {
      id: 'conn_1',
      mentorId: 'usr_ashwini',
      mentorName: 'Ashwini Muthamshetty',
      mentorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      learnerId: 'usr_rahul',
      learnerName: 'Rahul Mehta',
      learnerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      skill: 'Machine Learning & LLMs',
      status: 'active', // active, pending, completed
      sessionsCompleted: 4,
      totalCreditsExchanged: 320,
      startedAt: '2026-09-15T00:00:00.000Z',
      lastInteraction: '2026-10-05T18:00:00.000Z',
      nodeNextId: 'conn_2' // Linked list demonstration representation
    },
    {
      id: 'conn_2',
      mentorId: 'usr_marcus',
      mentorName: 'Marcus Vance',
      mentorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      learnerId: 'usr_elena',
      learnerName: 'Elena Rostova',
      learnerPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      skill: 'Executive Presence & Storytelling',
      status: 'active',
      sessionsCompleted: 2,
      totalCreditsExchanged: 160,
      startedAt: '2026-09-28T00:00:00.000Z',
      lastInteraction: '2026-10-04T12:00:00.000Z',
      nodeNextId: null
    }
  ],
  undoStack: [], // Stack data structure for undo operations
  categoriesTree: {
    id: 'root',
    name: 'All Knowledge Domains',
    children: [
      {
        id: 'cat_tech',
        name: 'Technology',
        badge: 'High Demand',
        children: [
          {
            id: 'cat_ai',
            name: 'Artificial Intelligence & Data',
            children: [
              { id: 'cat_llm', name: 'LLMs & Prompt Engineering', count: 184 },
              { id: 'cat_genai', name: 'Generative AI & Diffusion', count: 120 },
              { id: 'cat_datasci', name: 'Data Science & Analytics', count: 155 },
              { id: 'cat_dataeng', name: 'Data Engineering & Streaming', count: 140 },
              { id: 'cat_rag', name: 'RAG & Vector Embeddings', count: 145 }
            ]
          },
          {
            id: 'cat_web',
            name: 'Web, Systems & Security',
            children: [
              { id: 'cat_fullstack', name: 'Full Stack Development', count: 240 },
              { id: 'cat_cloudarch', name: 'Cloud Computing & Serverless', count: 195 },
              { id: 'cat_devops', name: 'DevOps & GitOps', count: 170 },
              { id: 'cat_cybersec', name: 'Cybersecurity & AppSec', count: 130 }
            ]
          }
        ]
      },
      {
        id: 'cat_biz',
        name: 'Business & Leadership',
        badge: 'High Value',
        children: [
          {
            id: 'cat_product',
            name: 'Product Management',
            children: [
              { id: 'cat_plg', name: 'Product-Led Growth (PLG)', count: 95 },
              { id: 'cat_prd', name: 'Product Strategy & Discovery', count: 88 }
            ]
          },
          {
            id: 'cat_startup',
            name: 'Startup & Entrepreneurship',
            children: [
              { id: 'cat_pitch', name: 'Pitch Decks & Fundraising', count: 85 },
              { id: 'cat_pmf', name: '0-to-1 Product Market Fit', count: 70 }
            ]
          }
        ]
      },
      {
        id: 'cat_design',
        name: 'Design & Creative',
        children: [
          { id: 'cat_uiux', name: 'UI/UX & Design Systems', count: 165 },
          { id: 'cat_brand', name: 'Brand Strategy & Identity', count: 78 }
        ]
      },
      {
        id: 'cat_comm',
        name: 'Communication & Soft Skills',
        children: [
          { id: 'cat_speaker', name: 'Executive Public Speaking', count: 96 },
          { id: 'cat_nego', name: 'Negotiation & Pitching', count: 84 }
        ]
      }
    ]
  }
};

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB, reinitializing:', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  readDb,
  writeDb,
  defaultData
};
