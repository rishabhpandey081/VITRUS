import React, { useState } from 'react';
import Layout from '../components/Layout';

const fieldStyle = {
  width: '100%',
  background: 'rgba(0,0,0,0.35)',
  border: '1px solid var(--v-glass-border)',
  borderRadius: 10,
  padding: 12,
  color: 'var(--v-ink)',
  fontSize: 13.5,
  outline: 'none',
  boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: 12.5, color: 'var(--v-ink-muted)', marginBottom: 6 };

export default function Profile() {
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
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v-gold-500)' }}>
          Settings
        </p>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>User Profile &amp; Settings</h1>
      </div>

      <div className="v-card" style={{ maxWidth: 680, margin: '0 auto', padding: 32 }}>
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--v-ink)' }}>Personal &amp; Career Profile</h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--v-ink-muted)' }}>
            Manage your target roles, skills, and account details for personalized AI recommendations.
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Full Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} style={fieldStyle} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Target Role</label>
              <input type="text" name="targetRole" value={profile.targetRole} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>Experience Level</label>
              <select name="experienceLevel" value={profile.experienceLevel} onChange={handleChange} style={fieldStyle}>
                <option>Student / Intern</option>
                <option>Entry-Level / Junior (0-2 years)</option>
                <option>Mid-Level (2-5 years)</option>
                <option>Senior (5+ years)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Location</label>
            <input type="text" name="location" value={profile.location} onChange={handleChange} style={fieldStyle} />
          </div>

          <div>
            <label style={labelStyle}>Core Skills (comma separated)</label>
            <input type="text" name="skills" value={profile.skills} onChange={handleChange} style={fieldStyle} />
          </div>

          <div>
            <label style={labelStyle}>Short Bio</label>
            <textarea name="bio" value={profile.bio} onChange={handleChange} rows="3" style={{ ...fieldStyle, resize: 'none' }} />
          </div>

          <button type="submit" className="v-btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
            {saved ? 'Profile Updated Successfully! ✓' : 'Save Changes'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
