import React, { useState } from 'react';
import { 
  UserCircle, 
  MapPin, 
  Clock, 
  Coins, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Check, 
  Save,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfileView() {
  const { user, token, updateUser } = useAuth();
  
  // Profile edit state
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || 'Staff / 10+ Years');
  const [availability, setAvailability] = useState(user?.availability || 'Weekends & Evenings');
  const [location, setLocation] = useState(user?.location || 'San Francisco, CA');
  const [interestsText, setInterestsText] = useState((user?.interests || []).join(', '));
  const [skillsWantedText, setSkillsWantedText] = useState((user?.skillsWanted || []).join(', '));
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Skill form state
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Technology');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');
  const [newSkillDesc, setNewSkillDesc] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          bio,
          experienceLevel,
          availability,
          location,
          interests: interestsText.split(',').map(s => s.trim()).filter(Boolean),
          skillsWanted: skillsWantedText.split(',').map(s => s.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        updateUser(data.user);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setIsAddingSkill(true);
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newSkillName,
          category: newSkillCategory,
          level: newSkillLevel,
          description: newSkillDesc
        })
      });
      const data = await res.json();
      if (data.success) {
        updateUser({ skillsOffered: data.skills, credits: data.credits });
        setNewSkillName('');
        setNewSkillDesc('');
        setShowAddSkill(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingSkill(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      const res = await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        updateUser({ skillsOffered: data.skills });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-[#38BDF8] border border-sky-500/20 text-xs font-mono font-medium mb-2">
          <UserCircle className="w-3.5 h-3.5" />
          <span>Verified Human Capability Profile</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Capability Profile & Skills</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Manage your skills catalog, capabilities you want to acquire, and availability for intelligent AI pairing.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-700/80 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
          <img 
            src={user?.photo} 
            alt={user?.name} 
            className="w-24 h-24 rounded-2xl object-cover ring-2 ring-sky-400 shadow-lg"
          />
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-xs text-sky-400 font-mono">{user?.experienceLevel}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{user?.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{user?.availability}</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-mono font-semibold">
                <Coins className="w-3.5 h-3.5" />
                <span>{user?.credits} Credits</span>
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Experience Level</label>
              <input
                type="text"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                placeholder="e.g. Senior / 8 Years, Staff / 10+ Years"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Availability Windows</label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Interests (Comma separated)</label>
              <input
                type="text"
                value={interestsText}
                onChange={(e) => setInterestsText(e.target.value)}
                placeholder="Generative AI, Venture Capital, Chess"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Skills Wanted (Comma separated)</label>
              <input
                type="text"
                value={skillsWantedText}
                onChange={(e) => setSkillsWantedText(e.target.value)}
                placeholder="Quantum Computing, Public Speaking"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {saveSuccess && (
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Profile updated successfully (Stack Frame Recorded)
              </span>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="ml-auto px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Skills Offered System */}
      <div className="p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Skills You Can Teach</h2>
            <p className="text-xs text-slate-400">Earn +50 credits each time you offer a verified skill.</p>
          </div>
          <button
            onClick={() => setShowAddSkill(!showAddSkill)}
            className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Skill</span>
          </button>
        </div>

        {/* Add Skill Form */}
        {showAddSkill && (
          <form onSubmit={handleAddSkill} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Skill Name (e.g. React Fiber, Seed Pitching)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              >
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Communication">Communication</option>
                <option value="Personal Development">Personal Development</option>
              </select>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <textarea
              rows={2}
              placeholder="Skill description (tools, curriculum, or past projects)..."
              value={newSkillDesc}
              onChange={(e) => setNewSkillDesc(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddSkill(false)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAddingSkill}
                className="px-4 py-1 rounded bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs"
              >
                Publish Skill (+50 cr)
              </button>
            </div>
          </form>
        )}

        {/* Existing Skills List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {user?.skillsOffered?.map((s) => (
            <div key={s.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white">{s.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                    {s.level}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{s.category}</p>
                {s.description && (
                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">{s.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteSkill(s.id)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                title="Remove skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
