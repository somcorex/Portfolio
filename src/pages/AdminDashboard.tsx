import { useState } from 'react';
import { useVideos } from '../context/VideoContext';

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminTab = 'overview' | 'videos' | 'ai' | 'contacts' | 'settings' | 'analytics';

const SidebarItem = ({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`admin-nav-item ${active ? 'active' : ''}`}
    style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 14px', fontSize: 14, fontWeight: active ? 700 : 500,
      color: active ? '#0ea5e9' : '#475569', border: 'none', background: 'transparent',
      cursor: 'pointer', textAlign: 'left',
    }}
  >
    <span style={{ fontSize: 18 }}>{icon}</span>
    <span>{label}</span>
  </button>
);

const StatCard = ({ icon, label, value, change }: { icon: string; label: string; value: string; change?: string }) => (
  <div style={{
    background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(14,165,233,0.15)',
    borderRadius: 18, padding: '22px 24px', backdropFilter: 'blur(12px)',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      {change && <span style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 8px', borderRadius: 20 }}>{change}</span>}
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: '#0284c7', marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 13, color: '#64748b' }}>{label}</div>
  </div>
);

// ---- Overview Tab ----
const OverviewTab = () => (
  <div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0284c7', marginBottom: 24 }}>Dashboard Overview</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20, marginBottom: 32 }}>
      <StatCard icon="🎬" label="Total Videos" value="6" change="+2 this month" />
      <StatCard icon="👁" label="Total Views" value="98.5K" change="+12%" />
      <StatCard icon="📩" label="Contact Leads" value="24" change="+5 today" />
      <StatCard icon="⭐" label="Satisfaction" value="98%" change="↑ 2%" />
      <StatCard icon="💰" label="Revenue" value="₹4.2L" change="+18%" />
      <StatCard icon="🤝" label="Active Clients" value="12" />
    </div>

    {/* Recent Activity */}
    <div style={{ background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(14,165,233,0.15)', borderRadius: 20, padding: '24px 28px', backdropFilter: 'blur(12px)' }}>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0284c7', marginBottom: 18 }}>Recent Activity</h3>
      {[
        { icon: '🎬', msg: 'New video "Cinematic City Dreams" received 2.3K views', time: '2 hours ago' },
        { icon: '📩', msg: 'New contact form submission from Priya Sharma', time: '4 hours ago' },
        { icon: '🤖', msg: 'AI Client Finder identified 8 new luxury leads', time: '6 hours ago' },
        { icon: '⭐', msg: 'New 5-star review received on portfolio', time: '1 day ago' },
        { icon: '📈', msg: 'Instagram following grew by 340 this week', time: '2 days ago' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 4 ? '1px solid rgba(14,165,233,0.08)' : 'none' }}>
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>{item.msg}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---- Videos Tab ----
const VideosTab = () => {
  const { videos, addVideo, deleteVideo } = useVideos();
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', category: 'Cinematic', description: '', duration: '0:00' });

  const handleAddVideo = () => {
    if (!newVideo.title) return;
    
    addVideo({
      ...newVideo,
      thumbnail: 'https://images.pexels.com/videos/3045163/pictures/preview-0.jpg',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      views: '0', 
      featured: false,
    });
    
    setShowForm(false);
    setNewVideo({ title: '', category: 'Cinematic', description: '', duration: '0:00' });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0284c7' }}>Video Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ fontSize: 13 }}>
          + Add Video
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(14,165,233,0.2)', borderRadius: 20, padding: '24px 28px', marginBottom: 24, backdropFilter: 'blur(12px)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0284c7', marginBottom: 18 }}>Add New Video</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Title</label>
              <input className="form-input" value={newVideo.title} onChange={e => setNewVideo({ ...newVideo, title: e.target.value })} placeholder="Video title" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Category</label>
              <select className="form-input" value={newVideo.category} onChange={e => setNewVideo({ ...newVideo, category: e.target.value })}>
                <option>Cinematic</option><option>Commercial</option><option>Nature</option><option>Performance</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Description</label>
            <textarea className="form-input" rows={3} value={newVideo.description} onChange={e => setNewVideo({ ...newVideo, description: e.target.value })} placeholder="Video description" style={{ resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" onClick={handleAddVideo} style={{ fontSize: 13 }}>Save Video</button>
            <button className="btn-ghost" onClick={() => setShowForm(false)} style={{ fontSize: 13 }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Upload area */}
      <div style={{
        border: '2px dashed rgba(14,165,233,0.35)', borderRadius: 20,
        padding: '32px', textAlign: 'center', marginBottom: 24,
        background: uploading ? 'rgba(14,165,233,0.05)' : 'rgba(255,255,255,0.4)',
        cursor: 'pointer', transition: 'all 0.3s ease',
      }}
      onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 2000); }}
      onDragOver={e => e.preventDefault()}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{uploading ? '⏳' : '☁️'}</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#0284c7', marginBottom: 6 }}>
          {uploading ? 'Processing Upload...' : 'Drag & Drop Videos Here'}
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>or click to browse — MP4, MOV, AVI supported</div>
        {uploading && <div style={{ marginTop: 16 }}><div className="loading-bar" style={{ maxWidth: 200, margin: '0 auto' }} /></div>}
      </div>

      {/* Video List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {videos.map(v => (
          <div key={v.id} style={{
            background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.15)',
            borderRadius: 16, padding: '16px 20px', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{ width: 80, height: 50, borderRadius: 10, overflow: 'hidden', background: '#dff4ff', flexShrink: 0 }}>
              <img src={v.thumbnail} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: '#0c4a6e', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.title}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{v.category} · {v.duration} · 👁 {v.views}</div>
            </div>
            {v.featured && <span style={{ fontSize: 11, fontWeight: 600, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '3px 10px', borderRadius: 20 }}>⭐ Featured</span>}
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(14,165,233,0.3)', background: 'transparent', color: '#0ea5e9', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
              <button onClick={() => deleteVideo(v.id)} style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- AI System Tab ----
const AISystemTab = () => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'AI Client Finder', role: 'Lead Generation', status: 'active', tasks: 34, emoji: '🔍' },
    { id: 2, name: 'AI Sales Manager', role: 'Sales & Conversion', status: 'active', tasks: 21, emoji: '💼' },
    { id: 3, name: 'AI Marketing Manager', role: 'Marketing Strategy', status: 'active', tasks: 18, emoji: '📢' },
    { id: 4, name: 'AI Social Media Manager', role: 'Social Strategy', status: 'active', tasks: 45, emoji: '📱' },
    { id: 5, name: 'AI Support Assistant', role: 'Client Support', status: 'active', tasks: 67, emoji: '🤝' },
    { id: 6, name: 'AI Analytics Manager', role: 'Data & Insights', status: 'active', tasks: 12, emoji: '📊' },
    { id: 7, name: 'AI CRM Manager', role: 'Client Relations', status: 'idle', tasks: 8, emoji: '🗂️' },
    { id: 8, name: 'AI Outreach Manager', role: 'Outbound Campaigns', status: 'idle', tasks: 5, emoji: '📧' },
  ]);
  const [ceoInput, setCeoInput] = useState('');
  const [ceoMessages, setCeoMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: '👋 Hello! I am the CEO Advisor — the operational brain of Som Core X Studio. I manage all AI employees and coordinate workflows. How can I help you today?' }
  ]);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRole, setNewAgentRole] = useState('');

  const createAgent = () => {
    if (!newAgentName || !newAgentRole) return;
    const emojis = ['🤖', '⚡', '🧠', '🎯', '💡', '🚀'];
    setAgents([...agents, {
      id: Date.now(), name: newAgentName, role: newAgentRole,
      status: 'active', tasks: 0, emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }]);
    setNewAgentName('');
    setNewAgentRole('');
    setCeoMessages(m => [...m,
      { role: 'ai', text: `✅ New AI Employee "${newAgentName}" has been created and assigned to the ${newAgentRole} role. It will begin onboarding workflows immediately and collaborate with other AI employees.` }
    ]);
  };

  const sendCeoMessage = () => {
    if (!ceoInput.trim()) return;
    const msg = ceoInput.trim();
    setCeoMessages(m => [...m, { role: 'user', text: msg }]);
    setCeoInput('');

    const lower = msg.toLowerCase();
    let reply = '';
    if (lower.includes('client') || lower.includes('luxury')) {
      reply = `🔍 Activating AI Client Finder with luxury targeting mode. I'm also briefing the AI Sales Manager to prepare conversion sequences. The AI CRM Manager will track all identified leads. Expected results within 24 hours.`;
    } else if (lower.includes('social') || lower.includes('instagram')) {
      reply = `📱 The AI Social Media Manager is now optimizing content calendars across all platforms. Coordinating with AI Marketing Manager for campaign strategy. Engagement analytics will be updated hourly.`;
    } else if (lower.includes('create') || lower.includes('new ai') || lower.includes('employee')) {
      reply = `🤖 I can create a specialized AI employee for you. Please specify: (1) The role name and (2) Their primary responsibility. Use the "Create New AI Employee" form below to deploy them instantly.`;
    } else if (lower.includes('revenue') || lower.includes('sales')) {
      reply = `💰 Current revenue pipeline analysis: ₹4.2L active projects, 12 warm leads in nurturing, 3 proposals pending signature. AI Sales Manager recommends focusing on enterprise brand film packages for maximum ROI.`;
    } else {
      reply = `⚡ Understood. I'm coordinating with all AI employees to address your request. The relevant agents — including AI Marketing Manager, AI Client Finder, and AI Analytics Manager — are now analyzing and preparing a strategic response. ETA: 2-4 hours.`;
    }

    setTimeout(() => setCeoMessages(m => [...m, { role: 'ai', text: reply }]), 1000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 4px 15px rgba(14,165,233,0.4)' }}>🧠</div>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0284c7', lineHeight: 1.1 }}>CEO Advisor + AI Ecosystem</h2>
          <p style={{ fontSize: 13, color: '#64748b' }}>The operational brain of Som Core X Studio</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 28 }}>
        {/* CEO Chat */}
        <div style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.2)', borderRadius: 20, padding: '20px', backdropFilter: 'blur(12px)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0284c7', marginBottom: 16 }}>🧠 CEO Advisor Chat</h3>
          <div style={{ height: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14, paddingRight: 4 }}>
            {ceoMessages.map((m, i) => (
              <div key={i} className="ai-chat-bubble" style={{
                maxWidth: '85%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user'
                  ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                  : 'rgba(255,255,255,0.8)',
                border: m.role === 'ai' ? '1px solid rgba(14,165,233,0.2)' : 'none',
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '10px 14px',
                fontSize: 13, lineHeight: 1.6,
                color: m.role === 'user' ? 'white' : '#334155',
              }}>{m.text}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="form-input"
              value={ceoInput}
              onChange={e => setCeoInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendCeoMessage()}
              placeholder="Ask CEO Advisor..."
              style={{ flex: 1, padding: '10px 14px', fontSize: 13 }}
            />
            <button className="btn-primary" onClick={sendCeoMessage} style={{ padding: '10px 16px', fontSize: 13 }}>Send</button>
          </div>
        </div>

        {/* Create Agent */}
        <div style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.2)', borderRadius: 20, padding: '20px', backdropFilter: 'blur(12px)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0284c7', marginBottom: 16 }}>⚡ Create New AI Employee</h3>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Agent Name</label>
            <input className="form-input" value={newAgentName} onChange={e => setNewAgentName(e.target.value)} placeholder="e.g. AI Luxury Client Finder" style={{ fontSize: 13, padding: '10px 14px' }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Role / Responsibility</label>
            <input className="form-input" value={newAgentRole} onChange={e => setNewAgentRole(e.target.value)} placeholder="e.g. Finding high-net-worth clients" style={{ fontSize: 13, padding: '10px 14px' }} />
          </div>
          <button className="btn-primary" onClick={createAgent} style={{ width: '100%', fontSize: 13 }}>🤖 Deploy AI Employee</button>

          <div style={{ marginTop: 20, padding: '14px', background: 'rgba(14,165,233,0.06)', borderRadius: 12, border: '1px solid rgba(14,165,233,0.15)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0ea5e9', marginBottom: 8 }}>💡 Quick Deploy Examples:</div>
            {['AI Luxury Client Finder', 'AI Video Campaign Manager', 'AI Brand Outreach Specialist'].map(ex => (
              <div key={ex} style={{ fontSize: 12, color: '#64748b', cursor: 'pointer', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={() => setNewAgentName(ex)}>
                <span style={{ color: '#0ea5e9' }}>→</span> {ex}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Employee Grid */}
      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0284c7', marginBottom: 16 }}>AI Employee Roster ({agents.length} Active)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {agents.map(agent => (
          <div key={agent.id} style={{
            background: 'rgba(255,255,255,0.65)', border: `1.5px solid ${agent.status === 'active' ? 'rgba(14,165,233,0.25)' : 'rgba(148,163,184,0.25)'}`,
            borderRadius: 18, padding: '18px 18px', backdropFilter: 'blur(12px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 30px rgba(14,165,233,0.15)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{agent.emoji}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                padding: '2px 8px', borderRadius: 20,
                background: agent.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(148,163,184,0.12)',
                color: agent.status === 'active' ? '#16a34a' : '#64748b',
              }}>
                {agent.status === 'active' ? '● Active' : '○ Idle'}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0c4a6e', marginBottom: 4 }}>{agent.name}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>{agent.role}</div>
            <div style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600 }}>⚡ {agent.tasks} tasks completed</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Contacts Tab ----
const ContactsTab = () => {
  const leads = [
    { name: 'Priya Sharma', email: 'priya@example.com', project: 'Brand Film', date: '2 hours ago', status: 'new' },
    { name: 'Rahul Gupta', email: 'rahul@example.com', project: 'Social Media Content', date: '1 day ago', status: 'contacted' },
    { name: 'Anita Patel', email: 'anita@example.com', project: 'Cinematic Edit', date: '3 days ago', status: 'proposal' },
    { name: 'Vikram Singh', email: 'vikram@example.com', project: 'Music Video', date: '5 days ago', status: 'won' },
    { name: 'Deepa Nair', email: 'deepa@example.com', project: 'Product Showcase', date: '1 week ago', status: 'won' },
  ];
  const statusColors: Record<string, string> = { new: '#0ea5e9', contacted: '#f59e0b', proposal: '#8b5cf6', won: '#22c55e' };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0284c7', marginBottom: 24 }}>Contact & Leads</h2>
      <div style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.15)', borderRadius: 20, overflow: 'hidden', backdropFilter: 'blur(12px)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(14,165,233,0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 80px', gap: 12 }}>
          {['Name', 'Email', 'Project', 'Date', 'Status'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
          ))}
        </div>
        {leads.map((lead, i) => (
          <div key={i} style={{ padding: '16px 24px', borderBottom: i < leads.length - 1 ? '1px solid rgba(14,165,233,0.06)' : 'none', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 80px', gap: 12, alignItems: 'center', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(14,165,233,0.03)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#0c4a6e' }}>{lead.name}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>{lead.email}</div>
            <div style={{ fontSize: 13, color: '#475569' }}>{lead.project}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>{lead.date}</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: statusColors[lead.status], background: statusColors[lead.status] + '18', padding: '3px 10px', borderRadius: 20, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{lead.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Settings Tab ----
const SettingsTab = () => {
  const [theme, setTheme] = useState({ primary: '#0ea5e9', secondary: '#06b6d4', accent: '#22d3ee' });
  const [socials, setSocials] = useState({
    instagram: 'https://instagram.com/somcorex',
    youtube: 'https://youtube.com/@somcorex',
    facebook: 'https://facebook.com/somcorex',
    twitter: 'https://x.com/somcorex',
    threads: 'https://threads.net/@somcorex',
  });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0284c7', marginBottom: 24 }}>Settings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Colors */}
        <div style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.15)', borderRadius: 20, padding: '24px 28px', backdropFilter: 'blur(12px)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0284c7', marginBottom: 18 }}>🎨 Theme Colors</h3>
          {[
            { label: 'Primary Color', key: 'primary' as keyof typeof theme },
            { label: 'Secondary Color', key: 'secondary' as keyof typeof theme },
            { label: 'Accent Color', key: 'accent' as keyof typeof theme },
          ].map(c => (
            <div key={c.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{c.label}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: theme[c.key], border: '2px solid rgba(255,255,255,0.8)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                <input type="color" value={theme[c.key]} onChange={e => setTheme({ ...theme, [c.key]: e.target.value })} style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.15)', borderRadius: 20, padding: '24px 28px', backdropFilter: 'blur(12px)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0284c7', marginBottom: 18 }}>🔗 Social Links</h3>
          {Object.entries(socials).map(([key, val]) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'capitalize', display: 'block', marginBottom: 6 }}>{key}</label>
              <input className="form-input" value={val} onChange={e => setSocials({ ...socials, [key]: e.target.value })} style={{ fontSize: 13, padding: '9px 13px' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button className="btn-primary" onClick={save} style={{ fontSize: 13 }}>
          {saved ? '✅ Saved!' : '💾 Save Settings'}
        </button>
        <button className="btn-ghost" style={{ fontSize: 13 }}>Reset to Default</button>
      </div>
    </div>
  );
};

// ---- Analytics Tab ----
const AnalyticsTab = () => {
  const data = [
    { month: 'Jan', views: 8200, leads: 4 },
    { month: 'Feb', views: 12400, leads: 7 },
    { month: 'Mar', views: 9800, leads: 5 },
    { month: 'Apr', views: 15600, leads: 11 },
    { month: 'May', views: 21000, leads: 15 },
    { month: 'Jun', views: 18500, leads: 13 },
  ];
  const maxViews = Math.max(...data.map(d => d.views));

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0284c7', marginBottom: 24 }}>Analytics Dashboard</h2>
      <div style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.15)', borderRadius: 20, padding: '28px', backdropFilter: 'blur(12px)', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0284c7', marginBottom: 24 }}>Monthly Views (2024)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 180 }}>
          {data.map(d => (
            <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 10, color: '#0ea5e9', fontWeight: 600 }}>{(d.views / 1000).toFixed(1)}K</div>
              <div style={{
                width: '100%', borderRadius: '6px 6px 0 0',
                background: 'linear-gradient(180deg, #0ea5e9, #06b6d4)',
                height: `${(d.views / maxViews) * 140}px`,
                minHeight: 8, transition: 'height 0.8s ease',
                boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
              }} />
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {[
          { label: 'Total Views (2024)', value: '85.5K', icon: '👁', change: '+34%' },
          { label: 'Total Leads', value: '55', icon: '🎯', change: '+22%' },
          { label: 'Conversion Rate', value: '18%', icon: '📈', change: '+5%' },
          { label: 'Avg Watch Time', value: '2m 47s', icon: '⏱', change: '+12%' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(14,165,233,0.15)', borderRadius: 18, padding: '20px 22px', backdropFilter: 'blur(12px)', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0284c7', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>{s.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- MAIN DASHBOARD ----
const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'overview' as AdminTab, icon: '📊', label: 'Overview' },
    { id: 'videos' as AdminTab, icon: '🎬', label: 'Videos' },
    { id: 'ai' as AdminTab, icon: '🧠', label: 'AI Ecosystem' },
    { id: 'contacts' as AdminTab, icon: '📩', label: 'Contacts' },
    { id: 'analytics' as AdminTab, icon: '📈', label: 'Analytics' },
    { id: 'settings' as AdminTab, icon: '⚙️', label: 'Settings' },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'videos': return <VideosTab />;
      case 'ai': return <AISystemTab />;
      case 'contacts': return <ContactsTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'settings': return <SettingsTab />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1, paddingTop: 68 }}>
      {/* Sidebar */}
      <div className="admin-sidebar" style={{
        width: sidebarOpen ? 220 : 60, flexShrink: 0,
        position: 'fixed', top: 68, left: 0, bottom: 0,
        overflowY: 'auto', overflowX: 'hidden',
        transition: 'width 0.3s ease', zIndex: 100,
        padding: sidebarOpen ? '20px 12px' : '20px 8px',
      }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ width: '100%', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 10, padding: '8px', marginBottom: 16, cursor: 'pointer', fontSize: 16, color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: sidebarOpen ? 'flex-end' : 'center' }}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {tabs.map(tab => (
          <div key={tab.id} style={{ marginBottom: 4, overflow: 'hidden' }}>
            <SidebarItem
              icon={tab.icon}
              label={sidebarOpen ? tab.label : ''}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontSize: 13,
              color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center',
              gap: 8, justifyContent: sidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <span>🚪</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? 220 : 60, padding: '32px 28px', transition: 'margin-left 0.3s ease', minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0284c7', lineHeight: 1.1 }}>
              {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Som Core X Studio · Admin Panel</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, color: '#64748b', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(14,165,233,0.15)', padding: '6px 14px', borderRadius: 20 }}>
              👤 somcorex
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.5)' }} />
          </div>
        </div>

        {renderTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;

