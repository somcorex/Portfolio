import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
  time: string;
}

const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const AI_RESPONSES: Record<string, string> = {
  default: "Namaste! 🙏 Main Som Core X Studio ka AI Assistant hoon. Main aapki help karne ke liye yahan hoon — services, pricing, ya portfolio ke baare mein koi bhi sawaal poochh sakte hain!",
  hello: "Hello! Welcome to Som Core X Studio! 🌊 Aap ek premium video production studio mein aaye hain. Main aapki kaise madad kar sakta hoon?",
  hi: "Hi there! 👋 Welcome to Som Core X Studio! How can I assist you today? We create stunning cinematic video edits, brand films, and social media content.",
  service: "Hum yeh services provide karte hain:\n🎬 Cinematic Edits\n📱 Social Media Reels & Shorts\n🏢 Brand Films\n🎵 Music Videos\n📸 Product Showcase\n✨ Motion Graphics\n\nKis service mein aapki interest hai?",
  price: "Our packages start from:\n💎 Basic: ₹15,000 (Social Reels)\n🏆 Standard: ₹35,000 (Brand Video)\n👑 Premium: ₹75,000+ (Cinematic Film)\n\nCustom quotes available! Contact us at somcorex@gmail.com",
  contact: "📩 Aap humse yahan contact kar sakte hain:\nEmail: somcorex@gmail.com\nInstagram: @somcorex\nYouTube: @somcorex\n\nYa website ke Contact page pe form bharen!",
  portfolio: "Hamara portfolio dekhen! 🎬 Home page par videos ek real river ki tarah flow karti hain — super cinematic experience. Portfolio page par filter karke apni category ke videos dekh sakte hain!",
  wedding: "Hum wedding & pre-wedding cinematic videos bhi banate hain! 💍 Beautiful storytelling, cinematic grading, aur 4K quality. Pricing ₹45,000 se shuru hoti hai. Aur details ke liye contact karen!",
  reel: "Instagram Reels & YouTube Shorts ke liye hamari special package hai:\n📱 Reel Package: ₹8,000-15,000 per reel\nIncludes: Color grading, music sync, trending effects!\nBulk discounts available!",
  english: "Great! I can assist you in English too! 😊 Som Core X Studio is a premium video production company. We specialize in cinematic editing, brand films, social media content, and more. What would you like to know?",
  quality: "Our quality standards are top-notch! ✨\n• 4K Ultra HD editing\n• Hollywood-grade color grading\n• Professional audio mixing\n• Cinematic storytelling\n• Fast delivery (5-7 days typically)",
  turnaround: "Our typical turnaround times:\n⚡ Reels: 3-5 days\n🎬 Short Films: 7-10 days\n🏢 Brand Films: 10-15 days\nRush delivery available on request!",
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('helo')) return AI_RESPONSES.hello;
  if (lower.includes('hi ') || lower === 'hi') return AI_RESPONSES.hi;
  if (lower.includes('service') || lower.includes('kya karte') || lower.includes('what do')) return AI_RESPONSES.service;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('kitna') || lower.includes('rate') || lower.includes('charge')) return AI_RESPONSES.price;
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('phone')) return AI_RESPONSES.contact;
  if (lower.includes('portfolio') || lower.includes('work') || lower.includes('video')) return AI_RESPONSES.portfolio;
  if (lower.includes('wedding') || lower.includes('shaadi')) return AI_RESPONSES.wedding;
  if (lower.includes('reel') || lower.includes('short') || lower.includes('instagram')) return AI_RESPONSES.reel;
  if (lower.includes('english') || lower.includes('english mein')) return AI_RESPONSES.english;
  if (lower.includes('quality') || lower.includes('4k') || lower.includes('resolution')) return AI_RESPONSES.quality;
  if (lower.includes('time') || lower.includes('delivery') || lower.includes('days') || lower.includes('kitne din')) return AI_RESPONSES.turnaround;
  return AI_RESPONSES.default;
};

const QUICK_REPLIES = [
  { label: '💼 Services', msg: 'What services do you offer?' },
  { label: '💰 Pricing', msg: 'What are your prices?' },
  { label: '📸 Portfolio', msg: 'Show me your portfolio' },
  { label: '📩 Contact', msg: 'How do I contact you?' },
];

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Namaste! 🙏 Main Som Core X Studio ka AI Assistant hoon!\n\nMain aapki help karne ke liye yahan hoon. Services, pricing, ya kuch bhi poochh sakte hain — Hindi, English, ya Hinglish mein!", time: getTime() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: msg, time: getTime() }]);
    setTyping(true);
    setTimeout(() => {
      const response = getAIResponse(msg);
      setMessages(m => [...m, { role: 'ai', text: response, time: getTime() }]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, 1200);
  };

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 100, right: 24, zIndex: 9990,
          width: 360, maxWidth: 'calc(100vw - 48px)',
          background: 'rgba(240,249,255,0.97)',
          border: '1.5px solid rgba(14,165,233,0.3)',
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(14,165,233,0.25), 0 4px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(24px)',
          animation: 'fadeInUp 0.3s ease',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>SCX AI Assistant</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                Online · Hindi · English · Hinglish
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ height: 300, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} className="ai-chat-bubble" style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)' : 'rgba(255,255,255,0.9)',
                  border: m.role === 'ai' ? '1px solid rgba(14,165,233,0.2)' : 'none',
                  borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '10px 14px',
                  fontSize: 13, lineHeight: 1.7,
                  color: m.role === 'user' ? 'white' : '#334155',
                  whiteSpace: 'pre-line',
                }}>
                  {m.text}
                </div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3, padding: '0 4px' }}>{m.time}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', gap: 5, padding: '8px 14px', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '18px 18px 18px 4px', width: 60 }}>
                {[0,1,2].map(i => (
                  <div key={i} className="ai-typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#0ea5e9', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div style={{ padding: '8px 14px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid rgba(14,165,233,0.1)' }}>
            {QUICK_REPLIES.map(qr => (
              <button key={qr.label} onClick={() => sendMessage(qr.msg)} style={{ fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20, background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', color: '#0ea5e9', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.08)')}>
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(14,165,233,0.1)', display: 'flex', gap: 8 }}>
            <input
              className="form-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type in Hindi, English or Hinglish..."
              style={{ flex: 1, padding: '10px 14px', fontSize: 13, borderRadius: 12 }}
            />
            <button
              onClick={() => sendMessage()}
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                border: 'none', borderRadius: 12, width: 42, height: 42,
                color: 'white', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(14,165,233,0.4)',
                flexShrink: 0,
              }}
            >↑</button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={handleOpen}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9991,
          width: 62, height: 62, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          border: 'none', cursor: 'pointer', fontSize: 26,
          boxShadow: '0 8px 30px rgba(14,165,233,0.5), 0 0 0 0 rgba(14,165,233,0.4)',
          animation: open ? 'none' : 'glowPulse 2s ease-in-out infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.3s ease',
          transform: open ? 'scale(0.9)' : 'scale(1)',
        }}
        title="Chat with AI Assistant"
      >
        {open ? '✕' : '🤖'}
        {!open && unread > 0 && (
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 22, height: 22, borderRadius: '50%',
            background: '#ef4444', color: 'white',
            fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
          }}>{unread}</div>
        )}
      </button>
    </>
  );
};

export default AIAssistant;
    
