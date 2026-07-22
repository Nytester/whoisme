import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PullTheme from '../components/PullTheme';
import ProjectIcon from '../components/ProjectIcon';
import { PROJECTS, PROJECT_ORDER, type ProjectSlug } from '../data/projects';

const META_ICONS = {
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  pulse: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>,
};

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>
  </svg>
);

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const P = PROJECTS[slug as ProjectSlug] || PROJECTS.stepsight;

  useEffect(() => {
    document.title = `${P.title} — Roshan Bhatta`;
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
  }, [P.title]);

  const others = PROJECT_ORDER.filter(k => k !== (slug as ProjectSlug));

  return (
    <>
      <style>{`
        body { background: #0d0d0d; color: #fff; font-family: 'Inter', system-ui, sans-serif; }
        [data-theme="light"] body { background: #fafafa; color: #171717; }
        #starfield { position: fixed; inset: 0; z-index: 0; pointer-events: none; transition: opacity .6s ease; }
        [data-theme="light"] #starfield { opacity: 0; }
        .star { position: absolute; border-radius: 50%; background: #ffffff; }
        .pd-container { position: relative; z-index: 1; max-width: 768px; margin: 0 auto; padding: 0 24px 96px; }
        .hero { text-align: center; padding-top: 64px; padding-bottom: 40px; }
        .hero-link { display: inline-block; text-decoration: none; transition: opacity .25s ease; }
        .hero-link:hover { opacity: .8; }
        .hero-name { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(48px, 6vw, 60px); font-weight: 600; color: #fff; line-height: 1.05; }
        [data-theme="light"] .hero-name { color: #171717; }
        .hero-role { margin-top: 8px; font-size: 12px; color: #a3a3a3; letter-spacing: 0.22em; text-transform: uppercase; }
        .pj-dock { position: fixed; left: 24px; top: 50%; transform: translateY(-50%); z-index: 50; display: flex; flex-direction: column; gap: 6px; padding: 10px 8px; border-radius: 100px; background: rgba(23,23,23,0.72); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 24px -6px rgba(0,0,0,0.25); }
        [data-theme="light"] .pj-dock { background: rgba(255,255,255,0.8); border-color: rgba(0,0,0,0.05); }
        .pj-dock a { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; color: #737373; text-decoration: none; transition: color .25s, background .25s, transform .25s; }
        .pj-dock a svg { width: 19px; height: 19px; display: block; }
        .pj-dock a:hover { color: #fafafa; transform: scale(1.08); }
        [data-theme="light"] .pj-dock a:hover { color: #262626; }
        .pj-dock a.active { background: #fafafa; color: #171717; }
        [data-theme="light"] .pj-dock a.active { background: #262626; color: #fafafa; }
        .crumb { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 20px; font-size: 13.5px; font-weight: 500; color: #737373; text-decoration: none; transition: color .25s; cursor: pointer; background: none; border: none; padding: 0; font-family: inherit; }
        .crumb svg { width: 15px; height: 15px; flex: none; transition: transform .25s ease; }
        .crumb:hover { color: #fff; }
        [data-theme="light"] .crumb:hover { color: #171717; }
        .crumb:hover svg { transform: translateX(-2px); }
        .card { display: flex; align-items: center; gap: 24px; width: 100%; padding: 32px; border-radius: 24px; background: var(--g); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4), 0 10px 24px -8px rgba(0,0,0,0.55); position: relative; overflow: hidden; }
        .card::after { content: ''; position: absolute; inset: 0; background: radial-gradient(120% 110% at 88% -10%, rgba(255,255,255,.16), transparent 52%); pointer-events: none; }
        .card > * { position: relative; z-index: 1; }
        .app-icon { width: 96px; height: 96px; border-radius: 22px; flex: none; display: grid; place-items: center; background: rgba(0,0,0,0.3); box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 4px 14px rgba(0,0,0,.18); }
        .app-icon svg { width: 48px; height: 48px; }
        .card-body { min-width: 0; flex: 1; }
        .card-title { font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.01em; line-height: 1.2; }
        .card-desc { margin-top: 6px; font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,0.9); max-width: 46ch; }
        .g-amber { --g: linear-gradient(135deg, #f6c252 0%, #ef9f2e 48%, #d97816 100%); }
        .g-violet { --g: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 45%, #6d28d9 100%); }
        .g-forest { --g: linear-gradient(135deg, #34d399 0%, #14935f 50%, #065f41 100%); }
        .g-coral  { --g: linear-gradient(135deg, #fb7185 0%, #ef4444 48%, #b91c1c 100%); }
        .g-rose   { --g: linear-gradient(135deg, #f472b6 0%, #db2777 50%, #9d174d 100%); }
        .g-indigo { --g: linear-gradient(135deg, #818cf8 0%, #4f46e5 50%, #3730a3 100%); }
        .g-orange { --g: linear-gradient(135deg, #fb923c 0%, #ea580c 50%, #9a3412 100%); }
        .g-cyan   { --g: linear-gradient(135deg, #22d3ee 0%, #0891b2 50%, #0e7490 100%); }
        .g-lime   { --g: linear-gradient(135deg, #a3e635 0%, #65a30d 50%, #3f6212 100%); }
        .detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 48px; padding-top: 48px; }
        @media (max-width: 700px) { .detail-grid { grid-template-columns: 1fr; gap: 40px; } }
        .section-h { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 500; color: #fff; margin-bottom: 16px; }
        [data-theme="light"] .section-h { color: #171717; }
        .about-text { font-size: 15.5px; line-height: 1.75; color: #d4d4d4; }
        [data-theme="light"] .about-text { color: #404040; }
        .about-text + .about-text { margin-top: 14px; }
        .features { margin-top: 44px; }
        .feature-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .feature-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 14.5px; line-height: 1.6; color: #d4d4d4; }
        [data-theme="light"] .feature-list li { color: #404040; }
        .feature-list svg { width: 17px; height: 17px; flex: none; margin-top: 3px; color: #a3a3a3; }
        .meta-block + .meta-block { margin-top: 36px; }
        .meta-label { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #737373; margin-bottom: 14px; }
        .meta-row { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #d4d4d4; padding: 7px 0; }
        [data-theme="light"] .meta-row { color: #404040; }
        .meta-row svg { width: 16px; height: 16px; flex: none; color: #737373; }
        .meta-row a { color: #fff; text-decoration: underline; text-decoration-color: #737373; text-underline-offset: 3px; }
        [data-theme="light"] .meta-row a { color: #171717; }
        .meta-row a:hover { text-decoration-color: #fff; }
        .tech-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 5px 12px 5px 6px; border-radius: 100px; background: rgba(23,23,23,0.6); border: 1px solid rgba(255,255,255,0.16); font-size: 12px; font-weight: 500; color: #fff; white-space: nowrap; }
        [data-theme="light"] .badge { background: rgba(255,255,255,0.7); border-color: rgba(0,0,0,0.1); color: #262626; }
        .badge i { width: 20px; height: 20px; border-radius: 50%; background: var(--dot, #a3a3a3); flex: none; display: grid; place-items: center; font-style: normal; font-size: 9px; font-weight: 700; color: #fff; }
        .more-rule { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 48px 0; }
        [data-theme="light"] .more-rule { border-color: rgba(0,0,0,0.08); }
        .more-h { font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 500; color: #fff; margin-bottom: 24px; }
        [data-theme="light"] .more-h { color: #171717; }
        .more-grid { display: flex; flex-wrap: wrap; gap: 16px; }
        .more-item { width: 96px; height: 96px; border-radius: 24px; display: grid; place-items: center; background: var(--g); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4), 0 10px 24px -8px rgba(0,0,0,0.55); text-decoration: none; position: relative; overflow: hidden; transition: transform .3s ease; }
        .more-item::after { content: ''; position: absolute; inset: 0; background: radial-gradient(120% 110% at 88% -10%, rgba(255,255,255,.18), transparent 55%); pointer-events: none; }
        .more-item:hover { transform: scale(1.05); }
        .more-item svg { width: 44px; height: 44px; position: relative; z-index: 1; }
        @media (max-width: 768px) { .pj-dock { display: none; } }
        @media (max-width: 520px) { .card { flex-direction: column; text-align: center; padding: 28px 22px; } .app-icon { margin: 0 auto; } }
      `}</style>

      <div id="starfield" aria-hidden="true" />
      <PullTheme />

      <nav className="pj-dock" aria-label="Primary navigation">
        {[
          { to: '/projects', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
          { to: '/about', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/></svg> },
          { to: '/', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg> },
          { to: '/work', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg> },
          { to: '/contact', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3 11 14M22 3l-7 18-4-7-7-4z"/></svg> },
        ].map(({ to, icon }) => (
          <Link key={to} to={to} className={location.pathname === to ? 'active' : ''}>{icon}</Link>
        ))}
      </nav>

      <div className="pd-container">
        <header className="hero">
          <Link className="hero-link" to="/">
            <h1 className="hero-name">Roshan Bhatta</h1>
            <p className="hero-role">Software Engineer</p>
          </Link>
        </header>

        <button className="crumb" onClick={() => navigate('/projects')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Projects
        </button>

        <div className={`card ${P.grad}`}>
          <span className="app-icon"><ProjectIcon icon={P.icon} /></span>
          <div className="card-body">
            <div className="card-title">{P.title}</div>
            <div className="card-desc">{P.summary}</div>
          </div>
        </div>

        <div className="detail-grid">
          <div className="main-col">
            <section>
              <h2 className="section-h">About</h2>
              {P.about.map((p, i) => <p key={i} className="about-text">{p}</p>)}
            </section>
            <section className="features">
              <h2 className="section-h">Key Features</h2>
              <ul className="feature-list">
                {P.features.map(f => (
                  <li key={f}>{CHECK}<span>{f}</span></li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="meta-col">
            <div className="meta-block">
              <div className="meta-label">Info</div>
              {P.info.map((row, i) => (
                <div key={i} className="meta-row">
                  {META_ICONS[row.icon]}
                  {row.href ? <a href={row.href}>{row.label}</a> : <span>{row.label}</span>}
                </div>
              ))}
            </div>
            <div className="meta-block">
              <div className="meta-label">Tech</div>
              <div className="tech-wrap">
                {P.tech.map(t => {
                  const initials = t.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
                  return (
                    <span key={t.name} className="badge">
                      <i style={{ background: t.dot }}>{initials}</i>
                      {t.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        <hr className="more-rule" />
        <section>
          <h2 className="more-h">More Projects</h2>
          <div className="more-grid">
            {others.map(key => {
              const other = PROJECTS[key];
              return (
                <Link key={key} className={`more-item ${other.grad}`} to={`/project/${key}`} title={other.title} aria-label={other.title}>
                  <ProjectIcon icon={other.icon} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
