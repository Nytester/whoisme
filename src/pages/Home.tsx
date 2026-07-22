import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Starfield from '../components/Starfield';
import PullTheme from '../components/PullTheme';
import ProjectIcon from '../components/ProjectIcon';
import { PROJECTS, PROJECT_ORDER } from '../data/projects';

const KB: Record<string, string> = {
  who: "Roshan Bhatta is a Computer Information Systems student based in Monroe, Louisiana, passionate about building technology that solves real-world problems. He spans software development, data analytics, AI, and web applications.",
  experience: "He has experience across cloud platforms (AWS, GCP, Azure), frontend development, and AI tooling. He's currently studying at University of Louisiana Monroe while building impactful projects.",
  stack: "Day to day: TypeScript, React, Next.js, Python, Go; AWS, GCP, Azure; Terraform, Kubernetes; PostgreSQL, Supabase, Redis; and an OpenTelemetry-based observability stack.",
  hobbies: "Outside of code he enjoys leadership, community service, and student organizations — which have strengthened his communication and problem-solving skills.",
  contact: "Easiest is email — find him on GitHub and LinkedIn. The Contact card has every channel.",
  default: "Good question! Roshan is a Software Engineer who loves turning ideas into practical solutions. Try a suggestion below, or tap the cards above for Projects, Work and Contact.",
};

function canned(q: string) {
  const s = q.toLowerCase();
  if (/who|about|tell me/.test(s)) return KB.who;
  if (/experien|year|career|long/.test(s)) return KB.experience;
  if (/stack|tool|tech|work with|language|skill/.test(s)) return KB.stack;
  if (/hobb|fun|free time|outside|interest/.test(s)) return KB.hobbies;
  if (/contact|email|reach|hire|linkedin|pigeon/.test(s)) return KB.contact;
  return KB.default;
}

interface Message { role: 'user' | 'bot'; text: string }

const CHIPS = [
  'Who is Roshan?',
  'How much experience does he have?',
  'What does he work with?',
  'What are his hobbies?',
  'How can I contact him?',
];

export default function Home() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.classList.remove('leaving');
    const timer = setTimeout(() => {
      document.body.classList.add('revealed');
    }, 40);
    return () => { clearTimeout(timer); document.body.classList.remove('revealed'); };
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const answer = async (q: string) => {
    if (!chatMode) setChatMode(true);
    setMessages(m => [...m, { role: 'user', text: q }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 520));
    setTyping(false);
    setMessages(m => [...m, { role: 'bot', text: canned(q) }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput('');
    answer(q);
  };

  const handleChipClick = (q: string) => {
    answer(q);
  };

  const handleBack = () => {
    setChatMode(false);
    setMessages([]);
    setTyping(false);
    setInput('');
    setExpanded(false);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, dest: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => navigate(dest), 360);
  };

  return (
    <>
      <style>{`
        body { background-image: none; }
        [data-theme="dark"] { --bg: #0b0b0c; --surface: rgba(255,255,255,0.032); }
        [data-theme="dark"] body { background: radial-gradient(ellipse 90% 70% at 50% 40%, #141418 0%, #0b0b0c 55%, #07070a 100%); }
        [data-theme="light"] body { background-image: linear-gradient(var(--bg-grid) 1px, transparent 1px), linear-gradient(90deg, var(--bg-grid) 1px, transparent 1px); background-size: 46px 46px; }

        /* ── Home page (bento) ── */
        .home-page {
          transition: opacity .75s var(--ease), transform .75s var(--ease);
        }
        .home-page.hidden {
          opacity: 0;
          transform: translateY(-60px) scale(0.97);
          pointer-events: none;
        }
        .home-top { text-align: center; padding-top: clamp(52px, 9vh, 104px); position: relative; z-index: 1; }
        .home-name { font-family: var(--font-serif); font-weight: 400; font-size: clamp(58px, 11vw, 138px); line-height: 0.95; letter-spacing: -0.02em; color: var(--text); }
        .home-tag { font-family: var(--font-serif); font-style: italic; font-size: clamp(16px,2.2vw,22px); color: var(--text-3); margin-top: 6px; }
        .bento2 { display: grid; grid-template-columns: 1fr 1.04fr 1fr; gap: 18px; margin-top: clamp(48px, 7vh, 86px); align-items: stretch; }
        .col-left { display: flex; flex-direction: column; gap: 18px; }
        .hcard { position: relative; overflow: hidden; border-radius: 18px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.032); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); padding: 28px; transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease, background .3s ease; min-height: 188px; display: flex; flex-direction: column; }
        [data-theme="dark"] .hcard { box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.5); }
        [data-theme="light"] .hcard { background: var(--surface); border-color: var(--border); box-shadow: var(--shadow); backdrop-filter: none; }
        .hcard:hover { transform: translateY(-4px) scale(1.01); border-color: rgba(255,255,255,0.16); box-shadow: 0 20px 60px -20px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.10); }
        [data-theme="light"] .hcard:hover { transform: translateY(-4px) scale(1.01); border-color: var(--border-strong); box-shadow: var(--shadow-lift); }
        .hcard .stretch { position: absolute; inset: 0; z-index: 4; }
        .hcard .ico { width: 34px; height: 34px; color: var(--text); }
        .hcard .ico svg { width: 100%; height: 100%; }
        .hcard .card-text { margin-top: auto; }
        .hcard h3 { font-family: var(--font-serif); font-weight: 500; font-size: clamp(24px,2.6vw,32px); letter-spacing: -0.01em; color: var(--text); }
        .hcard .sub { color: var(--text-2); font-size: 15px; margin-top: 7px; }
        .hcard .arr { position: absolute; right: 24px; bottom: 28px; z-index: 3; color: var(--text-3); pointer-events: none; transition: transform .4s var(--ease), color .3s; }
        .hcard .arr svg { width: 22px; height: 22px; display: block; }
        .hcard:hover .arr { transform: translateX(5px); color: var(--accent); }
        .card-tall { min-height: 394px; }
        .appstrip { position: relative; margin: -4px -26px 0; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent); mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent); }
        .appstrip .track { display: flex; gap: 16px; width: max-content; padding: 6px 26px; animation: appscroll 26s linear infinite; }
        .hcard:hover .appstrip .track { animation-play-state: paused; }
        @keyframes appscroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce){ .appstrip .track { animation: none; } }
        .appicon { width: 74px; height: 74px; border-radius: 18px; flex: none; display: grid; place-items: center; background: var(--g); box-shadow: 0 10px 24px -12px rgba(0,0,0,.6); position: relative; overflow: hidden; }
        .appicon::after { content:""; position:absolute; inset:0; background: radial-gradient(120% 120% at 24% 12%, rgba(255,255,255,.30), transparent 55%); }
        .appicon svg { width: 32px; height: 32px; position: relative; z-index: 1; }
        .g-amber { --g: linear-gradient(135deg, #f6c252 0%, #ef9f2e 48%, #d97816 100%); }
        .g-violet { --g: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 45%, #6d28d9 100%); }
        .g-forest { --g: linear-gradient(135deg, #34d399 0%, #14935f 50%, #065f41 100%); }
        .g-coral  { --g: linear-gradient(135deg, #fb7185 0%, #ef4444 48%, #b91c1c 100%); }
        .g-cyan   { --g: linear-gradient(135deg, #22d3ee 0%, #0891b2 50%, #0e7490 100%); }
        .g-lime   { --g: linear-gradient(135deg, #a3e635 0%, #65a30d 50%, #3f6212 100%); }
        .g-rose   { --g: linear-gradient(135deg, #f472b6 0%, #db2777 50%, #9d174d 100%); }
        .g-indigo { --g: linear-gradient(135deg, #818cf8 0%, #4f46e5 50%, #3730a3 100%); }
        .g-orange { --g: linear-gradient(135deg, #fb923c 0%, #ea580c 50%, #9a3412 100%); }
        .bubbles { position: absolute; top: 24px; right: 22px; z-index: 1; display: flex; flex-direction: column; gap: 12px; align-items: flex-end; pointer-events: none; }
        .bubble { display: flex; gap: 5px; padding: 11px 15px; border-radius: 18px; }
        .bubble.blue { background: #2f80ff; border-bottom-right-radius: 6px; }
        .bubble.green { background: #34c759; border-bottom-left-radius: 6px; align-self: flex-start; }
        .bubble .d { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.9); animation: bdot 1.4s ease-in-out infinite; }
        .bubble .d:nth-child(2){ animation-delay:.2s; } .bubble .d:nth-child(3){ animation-delay:.4s; }
        @keyframes bdot { 0%,60%,100%{ opacity:.4; transform: translateY(0);} 30%{ opacity:1; transform: translateY(-2px);} }
        @media (prefers-reduced-motion: reduce){ .bubble .d{ animation:none; } }

        /* ── Bottom ask bar (pre-chat) ── */
        .askgpt {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
          display: flex; flex-direction: column; align-items: center;
          padding: 16px 24px 32px;
          background: linear-gradient(to top, rgba(11,11,12,0.98) 40%, transparent 100%);
          pointer-events: none;
          transition: opacity .6s var(--ease), transform .6s var(--ease);
        }
        .askgpt.hide { opacity: 0; transform: translateY(24px); pointer-events: none !important; }
        .askgpt > * { pointer-events: all; }
        .askgpt-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #a1a1aa; max-height: 0; overflow: hidden; opacity: 0; margin-bottom: 0; transition: max-height .3s ease, opacity .3s ease, margin .3s ease; }
        .askgpt.expanded .askgpt-label { max-height: 30px; opacity: 1; margin-bottom: 12px; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 12px; max-width: 672px; max-height: 0; overflow: hidden; opacity: 0; transition: max-height .3s ease, opacity .3s ease, margin .3s ease; pointer-events: none; }
        .askgpt.expanded .chips { max-height: 120px; opacity: 1; pointer-events: all; }
        .chip { font-family: var(--font-mono); font-size: 12px; color: #a1a1aa; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); padding: 6px 16px; border-radius: 100px; cursor: pointer; transition: color .2s, border-color .2s, background .2s, transform .2s; white-space: nowrap; }
        .chip:hover { color: #fff; border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.06); transform: translateY(-1px); }
        [data-theme="light"] .chip { color: var(--text-2); border-color: var(--border); background: var(--surface); }
        [data-theme="light"] .chip:hover { color: var(--text); border-color: var(--border-strong); background: var(--surface-2); }

        /* ── Shared input bar ── */
        .ask-bar { width: 100%; max-width: 672px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.032); border-radius: 18px; padding: 14px 16px; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); display: flex; align-items: center; gap: 12px; transition: border-color .25s, box-shadow .25s; }
        [data-theme="light"] .ask-bar { border-color: var(--border); background: var(--surface); }
        .ask-bar:focus-within { border-color: rgba(255,255,255,0.18); box-shadow: 0 0 0 3px rgba(236,72,153,0.14); }
        [data-theme="light"] .ask-bar:focus-within { border-color: var(--accent); }
        .ask-bar .mic { color: #71717a; width: 20px; height: 20px; flex: none; }
        .ask-bar input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-family: var(--font-body); font-size: 15px; padding: 0; min-width: 0; }
        .ask-bar input::placeholder { color: #71717a; }
        .ask-send { width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0; background: var(--accent); color: #fff; display: grid; place-items: center; transition: transform .2s, background .2s; cursor: pointer; border: none; }
        .ask-send:hover { transform: translateY(-1px); background: var(--accent-deep); }
        .ask-send svg { width: 17px; height: 17px; }

        /* ── Full-page chat overlay ── */
        .chat-overlay {
          position: fixed; inset: 0; z-index: 48;
          display: flex; flex-direction: column;
          background: var(--bg);
          opacity: 0; pointer-events: none;
          transition: opacity .75s var(--ease);
        }
        .chat-overlay.visible { opacity: 1; pointer-events: all; }

        /* Chat header */
        .chat-header {
          flex: none;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px;
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(14px);
          background: color-mix(in srgb, var(--bg) 80%, transparent);
          position: relative; z-index: 2;
        }
        .chat-back {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 12.5px; color: var(--text-2);
          cursor: pointer; background: none; border: none; padding: 8px 12px;
          border-radius: 10px; transition: background .2s, color .2s;
        }
        .chat-back:hover { background: var(--surface-2); color: var(--text); }
        .chat-back svg { width: 16px; height: 16px; }
        .chat-brand {
          position: absolute; left: 50%; transform: translateX(-50%);
          font-family: var(--font-display); font-weight: 600; font-size: 15px;
          color: var(--text); display: flex; align-items: center; gap: 8px;
        }
        .chat-brand-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
          box-shadow: 0 0 8px 2px rgba(236,72,153,0.5);
          animation: gpulse 2.4s infinite;
        }
        @keyframes gpulse { 0%{box-shadow:0 0 0 0 rgba(236,72,153,.5);}70%{box-shadow:0 0 0 6px rgba(236,72,153,0);}100%{box-shadow:0 0 0 0 rgba(236,72,153,0);} }
        .chat-header-right { width: 100px; } /* balance the back button */

        /* Message stream */
        .chat-messages {
          flex: 1; overflow-y: auto;
          display: flex; flex-direction: column;
          padding: 32px 24px 24px;
          gap: 16px;
          scroll-behavior: smooth;
        }
        .chat-messages-inner {
          width: 100%; max-width: 680px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 16px;
        }
        .cmsg {
          display: flex; flex-direction: column; gap: 4px;
          animation: msgIn .3s var(--ease) both;
        }
        @keyframes msgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .cmsg.user { align-items: flex-end; }
        .cmsg.bot  { align-items: flex-start; }
        .cmsg-label {
          font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
          letter-spacing: .06em; color: var(--text-3); padding: 0 4px;
        }
        .cmsg-bubble {
          max-width: 82%; padding: 14px 18px; border-radius: 20px;
          font-size: 15px; line-height: 1.65;
        }
        .cmsg.user .cmsg-bubble {
          background: var(--accent); color: #fff; border-bottom-right-radius: 6px;
        }
        .cmsg.bot .cmsg-bubble {
          background: var(--surface); border: 1px solid var(--border);
          color: var(--text); border-bottom-left-radius: 6px;
        }
        .cmsg-typing { display: inline-flex; gap: 5px; align-items: center; padding: 14px 18px; }
        .cmsg-typing .d { width: 7px; height: 7px; border-radius: 50%; background: var(--text-3); animation: bdot 1.4s ease-in-out infinite; }
        .cmsg-typing .d:nth-child(2){ animation-delay:.2s; } .cmsg-typing .d:nth-child(3){ animation-delay:.4s; }

        /* Chat suggestions (shown when only 1 bot reply or fewer) */
        .chat-suggestions {
          max-width: 680px; margin: 8px auto 0;
          display: flex; flex-wrap: wrap; gap: 8px;
        }

        /* Chat footer (input) */
        .chat-footer {
          flex: none; padding: 16px 24px 28px;
          display: flex; justify-content: center;
          border-top: 1px solid var(--border);
          background: color-mix(in srgb, var(--bg) 90%, transparent);
          backdrop-filter: blur(14px);
        }

        body.leaving main { opacity: 0; transform: scale(.972); }
        @media (max-width: 900px) {
          .bento2 { grid-template-columns: 1fr; gap: 14px; }
          .col-left { gap: 14px; order: 2; }
          .card-projects { order: 1; }
          .card-contact { order: 3; }

          .card-tall { min-height: unset; }
          .hcard { flex-direction: row; align-items: center; gap: 14px; padding: 18px 20px; min-height: unset; border-radius: 20px; }
          .hcard .ico { display: none; }
          .hcard .card-text { margin-top: 0; order: 1; flex: 1 1 auto; min-width: 0; }
          .hcard h3 { font-size: 19px; }
          .hcard .sub { font-size: 13px; margin-top: 3px; }
          .hcard .arr { position: static; order: 3; flex: none; }
          .hcard .arr svg { width: 20px; height: 20px; }

          .card-projects .appstrip { position: static; order: 2; flex: none; width: 64px; height: 64px; margin: 0; border-radius: 14px; -webkit-mask-image: none; mask-image: none; }
          .card-projects .track { height: 100%; padding: 0; align-items: center; }
          .card-projects .appicon { width: 64px; height: 64px; border-radius: 14px; }

          .card-contact .bubbles { position: static; order: 2; flex: none; margin: 0; align-items: center; }
        }
        @media (max-width: 540px) { .cmsg-bubble { max-width: 94%; } }
        @media (max-width: 480px) {
          .home-top { padding-top: clamp(40px, 8vh, 72px); }
          .hcard { padding: 16px 18px; }
          .card-projects .appstrip, .card-projects .appicon { width: 54px; height: 54px; }
          .askgpt { padding: 14px 16px calc(24px + env(safe-area-inset-bottom)); }
          .chips { max-width: 100%; }
          .chat-header { padding: 0 16px; }
          .chat-header-right { width: 60px; }
          .chat-messages { padding: 24px 16px 20px; }
          .chat-footer { padding: 14px 16px calc(20px + env(safe-area-inset-bottom)); }
        }
      `}</style>

      <Starfield />
      <PullTheme />

      {/* ── Bento home content ── */}
      <div className={`home-page${chatMode ? ' hidden' : ''}`}>
        <div className="home-top">
          <div className="wrap">
            <h1 className="home-name reveal r-1">Roshan Bhatta</h1>
            <div className="home-tag reveal r-2">Software Engineer — welcome to my hub.</div>
          </div>
        </div>

        <main className="wrap" style={{ paddingBottom: 300 }}>
          <section className="bento2">
            <div className="col-left">
              <div className="hcard card-about reveal r-3">
                <Link className="stretch" to="/about" onClick={(e) => handleCardClick(e, '/about')} aria-label="About" />
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/>
                  </svg>
                </span>
                <div className="card-text">
                  <h3>About</h3>
                  <div className="sub">A bit about myself.</div>
                </div>
                <span className="arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </div>

              <div className="hcard card-work reveal r-4">
                <Link className="stretch" to="/work" onClick={(e) => handleCardClick(e, '/work')} aria-label="Work Experience" />
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>
                  </svg>
                </span>
                <div className="card-text">
                  <h3>Work Experience</h3>
                  <div className="sub">My career as a Software Engineer.</div>
                </div>
                <span className="arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </div>
            </div>

            <div className="hcard card-tall card-projects reveal r-4">
              <Link className="stretch" to="/projects" onClick={(e) => handleCardClick(e, '/projects')} aria-label="Projects" />
              <div className="appstrip">
                <div className="track">
                  {[...PROJECT_ORDER, ...PROJECT_ORDER].map((slug, i) => {
                    const p = PROJECTS[slug];
                    return (
                      <span key={i} className={`appicon ${p.grad}`}>
                        <ProjectIcon icon={p.icon} />
                      </span>
                    );
                  })}
                </div>
              </div>
              <span className="ico" style={{ marginTop: 'auto' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
              </span>
              <div className="card-text" style={{ marginTop: 14 }}>
                <h3>Projects</h3>
                <div className="sub">Personal projects I've been working on.</div>
              </div>
              <span className="arr">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </div>

            <div className="hcard card-tall card-contact reveal r-5">
              <Link className="stretch" to="/contact" onClick={(e) => handleCardClick(e, '/contact')} aria-label="Contact" />
              <div className="bubbles">
                <div className="bubble blue"><span className="d"/><span className="d"/><span className="d"/></div>
                <div className="bubble green"><span className="d"/><span className="d"/><span className="d"/></div>
                <div className="bubble blue"><span className="d"/><span className="d"/><span className="d"/></div>
                <div className="bubble green"><span className="d"/><span className="d"/><span className="d"/></div>
              </div>
              <span className="ico" style={{ marginTop: 'auto' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 3 11 14M22 3l-7 18-4-7-7-4z"/>
                </svg>
              </span>
              <div className="card-text" style={{ marginTop: 14 }}>
                <h3>Contact</h3>
                <div className="sub">Email, LinkedIn, carrier pigeon…</div>
              </div>
              <span className="arr">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </div>
          </section>
        </main>
      </div>

      {/* ── Bottom ask bar (pre-chat) ── */}
      <section className={`askgpt${expanded ? ' expanded' : ''}${chatMode ? ' hide' : ''}`}>
        <div className="askgpt-label">Ask RoshanGPT</div>
        <div className="chips">
          {CHIPS.map(q => (
            <button key={q} className="chip" onMouseDown={() => handleChipClick(q)}>{q}</button>
          ))}
        </div>
        <form className="ask-bar" onSubmit={handleSubmit}>
          <svg className="mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="What would you like to know?"
            autoComplete="off"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setExpanded(true)}
            onBlur={() => { setTimeout(() => { if (!input.trim()) setExpanded(false); }, 150); }}
          />
          <button className="ask-send" type="submit" aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 3 11 14M22 3l-7 18-4-7-7-4z"/>
            </svg>
          </button>
        </form>
      </section>

      {/* ── Full-page chat overlay ── */}
      <div className={`chat-overlay${chatMode ? ' visible' : ''}`}>
        {/* Header */}
        <header className="chat-header">
          <button className="chat-back" onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <div className="chat-brand">
            <span className="chat-brand-dot" />
            RoshanGPT
          </div>
          <div className="chat-header-right" />
        </header>

        {/* Messages */}
        <div className="chat-messages" ref={streamRef}>
          <div className="chat-messages-inner">
            {messages.map((m, i) => (
              <div key={i} className={`cmsg ${m.role}`}>
                <span className="cmsg-label">{m.role === 'user' ? 'You' : 'RoshanGPT'}</span>
                <div className="cmsg-bubble">{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="cmsg bot">
                <span className="cmsg-label">RoshanGPT</span>
                <div className="cmsg-bubble cmsg-typing">
                  <span className="d"/><span className="d"/><span className="d"/>
                </div>
              </div>
            )}
            {/* Suggestion chips after first bot reply */}
            {messages.length > 0 && !typing && messages.length <= 2 && (
              <div className="chat-suggestions">
                {CHIPS.filter(q => !messages.some(m => m.text === q)).slice(0, 3).map(q => (
                  <button key={q} className="chip" onClick={() => handleChipClick(q)}>{q}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="chat-footer">
          <form className="ask-bar" onSubmit={handleSubmit}>
            <svg className="mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
            </svg>
            <input
              type="text"
              placeholder="Ask me anything about Roshan…"
              autoComplete="off"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button className="ask-send" type="submit" aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 3 11 14M22 3l-7 18-4-7-7-4z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
