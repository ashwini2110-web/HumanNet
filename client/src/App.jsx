import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingView from './components/LandingView';
import DashboardView from './components/DashboardView';
import AiMatcher from './components/AiMatcher';
import SkillMarketplace from './components/SkillMarketplace';
import LearningRequestsView from './components/LearningRequestsView';
import ConnectionsView from './components/ConnectionsView';
import AiInsightsView from './components/AiInsightsView';
import DataStructuresView from './components/DataStructuresView';
import DsaShowcaseView from './components/DsaShowcaseView';
import ProfileView from './components/ProfileView';
import AuthModal from './components/AuthModal';

function AppContent() {
  // Navigation tabs: 'landing' | 'dashboard' | 'dsa_showcase' | 'matcher' | 'marketplace' | 'requests' | 'connections' | 'dsa' | 'insights' | 'profile'
  const [currentTab, setCurrentTab] = useState('dsa_showcase');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [selectedMatcherSkill, setSelectedMatcherSkill] = useState(null);

  // Cross-component handlers
  const handleSelectSkillFromMarketplace = (skillName) => {
    setSelectedMatcherSkill(skillName);
    setCurrentTab('matcher');
  };

  const handleConnectFromMarketplace = (mentor) => {
    if (mentor?.skillsOffered?.[0]?.name) {
      setSelectedMatcherSkill(mentor.skillsOffered[0].name);
    }
    setCurrentTab('matcher');
  };

  const handleFindMatchesForRequest = (req) => {
    if (req?.skillRequired) {
      setSelectedMatcherSkill(req.skillRequired);
    }
    setCurrentTab('matcher');
  };

  return (
    <div className="flex h-screen bg-[#0F172A] text-white overflow-hidden font-sans">
      {/* If currentTab is 'landing', show full-width landing page */}
      {currentTab === 'landing' ? (
        <div className="w-full h-screen overflow-y-auto">
          {/* Landing Mini Navbar */}
          <header className="h-16 px-6 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur sticky top-0 z-30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-purple-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                HN
              </div>
              <span className="font-bold text-lg text-white">Human<span className="text-sky-400">Net</span></span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentTab('dashboard')} 
                className="text-xs text-slate-300 hover:text-white px-3 py-1.5"
              >
                Go to Platform
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(true)} 
                className="text-xs font-bold px-4 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all"
              >
                Sign In
              </button>
            </div>
          </header>

          <LandingView 
            onGetStarted={() => setCurrentTab('dashboard')}
            onExploreSkills={() => setCurrentTab('marketplace')}
          />
        </div>
      ) : (
        /* Authenticated SaaS Dashboard Mode */
        <>
          <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <Header 
              onOpenAuthModal={() => setIsAuthModalOpen(true)} 
              onOpenRequestModal={() => setCurrentTab('requests')}
            />

            <main className="flex-1 overflow-y-auto">
              {currentTab === 'dsa_showcase' && <DsaShowcaseView />}
              {currentTab === 'dashboard' && <DashboardView onNavigate={setCurrentTab} />}
              {currentTab === 'matcher' && (
                <AiMatcher 
                  initialSkill={selectedMatcherSkill} 
                  onRequestConnect={() => setCurrentTab('connections')} 
                />
              )}
              {currentTab === 'marketplace' && (
                <SkillMarketplace 
                  onSelectSkill={handleSelectSkillFromMarketplace}
                  onConnectMentor={handleConnectFromMarketplace}
                />
              )}
              {currentTab === 'requests' && (
                <LearningRequestsView 
                  onFindMatchesForRequest={handleFindMatchesForRequest}
                  onRequestCreated={() => setCurrentTab('matcher')}
                />
              )}
              {currentTab === 'connections' && <ConnectionsView />}
              {currentTab === 'dsa' && <DataStructuresView />}
              {currentTab === 'insights' && <AiInsightsView onExploreSkill={() => setCurrentTab('matcher')} />}
              {currentTab === 'profile' && <ProfileView />}
            </main>
          </div>
        </>
      )}

      {/* Global Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
