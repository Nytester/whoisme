import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PullTheme from '../components/PullTheme';
import ProjectIcon from '../components/ProjectIcon';
import { PROJECTS, PROJECT_ORDER } from '../data/projects';

export default function Projects() {
  useEffect(() => {
    document.title = 'Projects — Roshan Bhatta';
    const field = document.getElementById('starfield');
    if (!field) return;
    const count = Math.min(160, Math.round(window.innerWidth * window.innerHeight / 9000));
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = 2 + Math.random() * 2;
      s.style.width = size.toFixed(1) + 'px';
      s.style.height = size.toFixed(1) + 'px';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      s.style.opacity = (0.2 + Math.random() * 0.2).toFixed(2);
      frag.appendChild(s);
    }
    field.appendChild(frag);
    return () => { field.innerHTML = ''; };
  }, []);

  return (
    <>
      <style>{`
        body { background: #0d0d0d; color: #fff; font-family: 'Inter', system-ui, sans-serif; }
        [data-theme="light"] body { background: #fafafa; color: #171717; }
        #starfield { position: fixed; inset: 0; z-index: 0; pointer-events: none; transition: opacity .6s ease; }
        [data-theme="light"] #starfield { opacity: 0; }
        .star { position: absolute; border-radius: 50%; background: #ffffff; }
        .pj-container { position: relative; z-index: 1; max-width: 672px; margin: 0 auto; padding: 0 24px 96px; }
        .hero { text-align: center; padding-top: 80px; padding-bottom: 64px; }
        .hero-link { display: inline-block; text-decoration: none; transition: opacity .25s ease; }
        .hero-link:hover { opacity: .8; }
        .hero-name { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(48px, 6vw, 60px); font-weight: 600; color: #fff; line-height: 1.05; }
        [data-theme="light"] .hero-name { color: #171717; }
        .hero-role { margin-top: 8px; font-size: 12px; color: #a3a3a3; letter-spacing: 0.22em; text-transform: uppercase; }
        [data-theme="light"] .hero-role { color: #737373; }
        .pj-dock { position: fixed; left: 24px; top: 50%; transform: translateY(-50%); z-index: 50; display: flex; flex-direction: column; gap: 6px; padding: 10px 8px; border-radius: 100px; background: rgba(23,23,23,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 24px -6px rgba(0,0,0,0.25); }
        [data-theme="light"] .pj-dock { background: rgba(255,255,255,0.8); border-color: rgba(0,0,0,0.05); }
        .pj-dock a { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; color: #737373; text-decoration: none; transition: color .25s ease-in-out, background .25s ease-in-out, transform .25s ease-in-out; }
        .pj-dock a svg { width: 19px; height: 19px; display: block; }
        .pj-dock a:hover { color: #fafafa; transform: scale(1.08); }
        [data-theme="light"] .pj-dock a:hover { color: #262626; }
        .pj-dock a.active { background: #fafafa; color: #171717; }
        [data-theme="light"] .pj-dock a.active { background: #262626; color: #fafafa; }
        .stack { display: flex; flex-direction: column; gap: 32px; }
        .card { display: flex; align-items: center; gap: 24px; width: 100%; padding: 32px; border-radius: 24px; text-decoration: none; background: var(--g); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4), 0 10px 24px -8px rgba(0,0,0,0.55); transition: transform .3s ease-in-out, box-shadow .3s ease-in-out; position: relative; overflow: hidden; }
        .card::after { content: ''; position: absolute; inset: 0; background: radial-gradient(120% 110% at 88% -10%, rgba(255,255,255,.16), transparent 52%); pointer-events: none; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5), 0 24px 50px -12px rgba(0,0,0,0.65); }
        .card > * { position: relative; z-index: 1; }
        .app-icon { width: 96px; height: 96px; border-radius: 22px; flex: none; display: grid; place-items: center; background: rgba(0,0,0,0.3); box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 4px 14px rgba(0,0,0,.18); }
        .app-icon svg { width: 48px; height: 48px; }
        .card-body { min-width: 0; flex: 1; }
        .card-title { font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.01em; line-height: 1.2; }
        .card-desc { margin-top: 6px; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.9); max-width: 42ch; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .card-tags span { font-size: 10.5px; font-weight: 500; padding: 3px 10px; border-radius: 100px; background: rgba(255,255,255,.18); color: rgba(255,255,255,.88); white-space: nowrap; }
        .g-amber { --g: linear-gradient(135deg, #f6c252 0%, #ef9f2e 48%, #d97816 100%); }
        .g-violet { --g: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 45%, #6d28d9 100%); }
        .g-forest { --g: linear-gradient(135deg, #34d399 0%, #14935f 50%, #065f41 100%); }
        .g-coral  { --g: linear-gradient(135deg, #fb7185 0%, #ef4444 48%, #b91c1c 100%); }
        .g-cyan   { --g: linear-gradient(135deg, #22d3ee 0%, #0891b2 50%, #0e7490 100%); }
        .g-lime   { --g: linear-gradient(135deg, #a3e635 0%, #65a30d 50%, #3f6212 100%); }
        .g-rose   { --g: linear-gradient(135deg, #f472b6 0%, #db2777 50%, #9d174d 100%); }
        .g-indigo { --g: linear-gradient(135deg, #818cf8 0%, #4f46e5 50%, #3730a3 100%); }
        .g-orange { --g: linear-gradient(135deg, #fb923c 0%, #ea580c 50%, #9a3412 100%); }
        .card-cta { background: rgba(23,23,23,0.4); border: 1px solid #262626; box-shadow: none; }
        [data-theme="light"] .card-cta { background: #f5f5f5; border-color: #e5e5e5; }
        .card-cta::after { display: none; }
        .card-cta:hover { box-shadow: 0 12px 28px -10px rgba(0,0,0,0.28); }
        .cta-plus { width: 96px; height: 96px; border-radius: 22px; flex: none; display: grid; place-items: center; background: rgba(255,255,255,0.04); border: 1.5px dashed #262626; color: #a3a3a3; }
        [data-theme="light"] .cta-plus { background: #fafafa; border-color: #e5e5e5; }
        .card-cta:hover .cta-plus { color: #fff; }
        [data-theme="light"] .card-cta:hover .cta-plus { color: #262626; }
        .cta-plus svg { width: 32px; height: 32px; }
        .card-cta .card-title { color: #fff; }
        [data-theme="light"] .card-cta .card-title { color: #262626; }
        .card-cta .card-desc { color: rgba(255,255,255,0.55); }
        [data-theme="light"] .card-cta .card-desc { color: #737373; }
        @media (max-width: 768px) { .pj-dock { display: none; } }
        @media (max-width: 520px) { .card { flex-direction: column; text-align: center; padding: 28px 22px; } .card-desc { max-width: 100%; } .card-tags { justify-content: center; } .cta-plus { margin: 0 auto; } }
      `}</style>

      <div id="starfield" aria-hidden="true" />
      <PullTheme />

      <nav className="pj-dock" aria-label="Primary navigation">
        {[
          { to: '/projects', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>, label: 'Projects' },
          { to: '/about', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/></svg>, label: 'About' },
          { to: '/', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>, label: 'Home' },
          { to: '/work', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>, label: 'Work' },
          { to: '/contact', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3 11 14M22 3l-7 18-4-7-7-4z"/></svg>, label: 'Contact' },
        ].map(({ to, icon, label }) => (
          <Link key={to} to={to} className={location.pathname === to ? 'active' : ''} aria-label={label}>{icon}</Link>
        ))}
      </nav>

      <div className="pj-container">
        <header className="hero">
          <Link className="hero-link" to="/" aria-label="Go to home page">
            <h1 className="hero-name">Roshan Bhatta</h1>
            <p className="hero-role">Software Engineer</p>
          </Link>
        </header>

        <main className="stack">
          {PROJECT_ORDER.map(slug => {
            const p = PROJECTS[slug];
            return (
              <Link key={slug} className={`card ${p.grad}`} to={`/project/${slug}`}>
                <span className="app-icon"><ProjectIcon icon={p.icon} /></span>
                <div className="card-body">
                  <div className="card-title">{p.title}</div>
                  <div className="card-desc">{p.summary}</div>
                  <div className="card-tags">
                    {p.tech.slice(0, 4).map(t => <span key={t.name}>{t.name}</span>)}
                  </div>
                </div>
              </Link>
            );
          })}

          <Link className="card card-cta" to="/contact">
            <span className="cta-plus">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </span>
            <div className="card-body">
              <div className="card-title">New Project</div>
              <div className="card-desc">I'm always exploring new ideas. Let's connect.</div>
            </div>
          </Link>
        </main>
      </div>
    </>
  );
}
