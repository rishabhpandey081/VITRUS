import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Rishabh Pandey',
    email: 'rishabh@example.com',
    targetRole: 'Full Stack Engineer',
    experienceLevel: 'Entry-Level / Junior (0-2 years)',
    location: 'Delhi, India',
    skills: 'JavaScript, React, Node.js, Java, SQL, NoSQL, Tailwind CSS, Git',
    bio: 'Computer Science background with a strong focus on building modern web applications, database management systems, and algorithmic problem solving.'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white text-sm">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">User Profile & Settings</h1>
        <div className="w-16"></div>
      </div>

      <div className="max-w-2xl mx-auto w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Personal & Career Profile</h2>
          <p className="text-sm text-slate-400 mt-1">Manage your target roles, skills, and account details for personalized AI recommendations.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Target Role</label>
              <input
                type="text"
                name="targetRole"
                value={profile.targetRole}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Experience Level</label>
              <select
                name="experienceLevel"
                value={profile.experienceLevel}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option>Student / Intern</option>
                <option>Entry-Level / Junior (0-2 years)</option>
                <option>Mid-Level (2-5 years)</option>
                <option>Senior (5+ years)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Core Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Short Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-medium transition text-sm"
          >
            {saved ? 'Profile Updated Successfully! ✓' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}