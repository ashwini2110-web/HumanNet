import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('humannet_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_ashwini',
      name: 'Ashwini Sharma',
      email: 'ashwini@humannet.ai',
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
      credits: 1250
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('humannet_token') || 'demo_token_ashwini');

  useEffect(() => {
    if (user) {
      localStorage.setItem('humannet_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('humannet_user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Login failed');
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('humannet_token', data.token);
      return data;
    } catch (err) {
      // Fallback for offline demo mode
      console.warn('Network login fallback:', err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Registration failed');
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('humannet_token', data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('humannet_user');
    localStorage.removeItem('humannet_token');
  };

  const updateUser = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
