import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Starfield from '../components/Starfield';
import PullTheme from '../components/PullTheme';
import Dock from '../components/Dock';
import SiteHero from '../components/SiteHero';

const ENTRIES = [
  {
    period: '2026 — Present',
    current: true,
    location: 'Sentio · Hybrid / Remote',
    role: 'Founder & Lead Engineer',
    company: 'Sentio',
    desc: 'Building Sentio, an AI-powered workspace memory platform that automatically captures context, decisions, and activity across GitHub, Slack, Gmail, and Figma so teams never lose project context.',
    bullets: [
      'Engineered the core AI indexing engine that continuously parses and links unstructured data from 10+ third-party tool integrations.',
      'Built real-time project briefing features ("Workspace Resume") allowing users to instantly catch up on project decisions and updates.',
      'Designed and deployed low-latency vector search and LLM context pipelines, supporting secure workspaces for early team adopters.',
    ],
    stack: ['Next.js','TypeScript','Python','FastAPI','PostgreSQL','Vector DB','AWS','Docker'],
  },
  {
    period: '2022 — 2023',
    location: 'University of Louisiana Monroe · On-site',
    role: 'IT Help Desk Specialist / Technician',
    company: 'University of Louisiana Monroe',
    desc: 'Provided Tier 1 and Tier 2 technical support and troubleshooting for university students, faculty, and administrative staff across campus.',
    bullets: [
      'Resolved technical issues via phone, online ticketing (ComputerSOS/HelpDesk), and walk-in support, maintaining high first-contact resolution rates.',
      'Managed account access, password resets, and authentication setup across Microsoft 365, Canvas LMS, and campus directory systems.',
      'Assisted with OS deployment, image configuration, software installation, and network connectivity troubleshooting (eduroam, VPN, hardware/VOIP).',
    ],
    stack: ['Help Desk Support','Ticketing Systems','Active Directory','Canvas LMS','Windows/macOS','Networking'],
  },
  {
    period: '2020 — 2021',
    location: 'Foodmandu',
    role: 'Technical Intern',
    company: 'Foodmandu',
    desc: 'Supported the core engineering team in maintaining and scaling food delivery platform services, API integrations, and internal toolings.',
    bullets: [
      'Assisted in developing and refactoring RESTful APIs for order management and delivery tracking, improving response times.',
      'Wrote automated unit and integration tests, increasing overall code coverage across internal services by 20%.',
      'Collaborated on debugging production issues, optimizing SQL database queries, and participating in daily agile code reviews.',
    ],
    stack: ['Python','Node.js','PostgreSQL','REST APIs','Git','Docker'],
  },
];

export default function Work() {
  useEffect(() => {
    document.title = 'Work — Roshan Bhatta';
  }, []);

  return (
    <>
      <style>{`
        body { background-image: none; }
        [data-theme="dark"] { --bg: #08080b; --surface: rgba(255,255,255,0.03); }
        main { position: relative; z-index: 1; transition: opacity .38s var(--ease), transform .38s var(--ease); }
        .wk-main { max-width: 880px; margin: 0 auto; padding: 110px 28px 100px; }
        @media (prefers-reduced-motion: no-preference) {
          .tentry { animation: slideUp .65s var(--ease) both; }
          .tentry:nth-child(1){ animation-delay: .10s; }
          .tentry:nth-child(2){ animation-delay: .22s; }
          .tentry:nth-child(3){ animation-delay: .34s; }
          .wk-cta { animation: slideUp .65s var(--ease) both; animation-delay: .44s; }
        }
        .timeline { display: flex; flex-direction: column; }
        .tentry { display: grid; grid-template-columns: 210px 1fr; gap: 36px; padding: 40px 0; border-top: 1px solid var(--border); position: relative; }
        .tentry:last-child { border-bottom: 1px solid var(--border); }
        .twhen { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-3); line-height: 1.7; padding-top: 3px; }
        .tnow { display: inline-flex; align-items: center; gap: 7px; color: var(--accent); margin-top: 8px; font-size: 12px; }
        .tnow .d { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: pulse 2.4s infinite; }
        @keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(236,72,153,.45);}70%{box-shadow:0 0 0 6px rgba(236,72,153,0);}100%{box-shadow:0 0 0 0 rgba(236,72,153,0);} }
        .tloc { color: var(--text-3); margin-top: 6px; }
        .tbody h3 { font-family: var(--font-serif); font-weight: 500; font-size: clamp(22px, 3vw, 32px); letter-spacing: -0.01em; line-height: 1.05; }
        .tco { font-family: var(--font-mono); font-size: 13px; color: var(--accent); margin-top: 8px; }
        .tbody p { color: var(--text-2); font-size: 16px; line-height: 1.65; margin-top: 14px; max-width: 56ch; }
        .tbody ul { list-style: none; margin-top: 16px; display: flex; flex-direction: column; gap: 9px; }
        .tbody li { display: flex; gap: 12px; font-size: 15px; color: var(--text); }
        .tbody li::before { content: "→"; color: var(--accent); flex: none; }
        .tstack { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
        .tstack span { font-family: var(--font-mono); font-size: 11.5px; color: var(--text-3); border: 1px solid var(--border); padding: 4px 9px; border-radius: 7px; white-space: nowrap; }
        .wk-cta { margin-top: 60px; border: 1px solid var(--border); border-radius: 22px; padding: 36px 40px; background: var(--surface); backdrop-filter: blur(8px); display: flex; flex-wrap: wrap; gap: 22px; align-items: center; justify-content: space-between; }
        .wk-cta h4 { font-family: var(--font-serif); font-weight: 500; font-size: 22px; color: var(--text); }
        .wk-cta p { color: var(--text-2); font-size: 15px; margin-top: 4px; }
        .cta-btn { display: inline-flex; align-items: center; gap: 9px; background: #fbe3cc; color: #1c1409; border: none; border-radius: 100px; padding: 13px 22px; font-family: var(--font-mono); font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; text-decoration: none; transition: transform .25s var(--ease), filter .2s; }
        .cta-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .cta-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .cta-btn.secondary { background: none; border: 1px solid var(--border); color: var(--text); }
        .cta-btn.secondary:hover { border-color: var(--text-2); filter: none; }
        @media (max-width: 820px) { .pull { right: 24px; } .tentry { grid-template-columns: 1fr; gap: 14px; } .wk-main { padding-bottom: 116px; } }
      `}</style>

      <Starfield />
      <PullTheme />
      <Dock />

      <main className="wk-main">
        <SiteHero />

        <div className="timeline">
          {ENTRIES.map((e, i) => (
            <div key={i} className="tentry">
              <div className="twhen">
                {e.period}
                {e.current && <div className="tnow"><span className="d"/>Current</div>}
                <div className="tloc">{e.location}</div>
              </div>
              <div className="tbody">
                <h3>{e.role}</h3>
                <div className="tco">{e.company}</div>
                <p>{e.desc}</p>
                <ul>
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="tstack">
                  {e.stack.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wk-cta">
          <div>
            <h4>Want the full résumé?</h4>
            <p>Download the PDF, or reach out directly.</p>
          </div>
          <div className="cta-actions">
            <a className="cta-btn secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>Download résumé</a>
            <Link className="cta-btn" to="/contact">Get in touch →</Link>
          </div>
        </div>
      </main>
    </>
  );
}
