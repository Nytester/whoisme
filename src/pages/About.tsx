import { useEffect } from 'react';
import Starfield from '../components/Starfield';
import PullTheme from '../components/PullTheme';
import Dock from '../components/Dock';
import SiteHero from '../components/SiteHero';

const STACK = [
  { label: 'Core Frontend', chips: ['TypeScript','React','Next.js','Vite','Tailwind CSS'] },
  { label: 'Animation & UI', chips: ['Framer Motion','GSAP','Radix UI','Web Animations API'] },
  { label: 'Backend & Runtimes', chips: ['Go','Node.js','Bun','Python','tRPC'] },
  { label: 'Data & BaaS', chips: ['PostgreSQL','SQLite','Redis','Supabase','Drizzle ORM'] },
  { label: 'Infrastructure & Cloud', chips: ['AWS','GCP','Azure','Terraform','Kubernetes','ArgoCD','Cloudflare'] },
  { label: 'Architecture & Workflow', chips: ['GitOps','OpenTelemetry','Prometheus','Grafana','GitHub Actions','Dagger'] },
  { label: 'Currently Exploring', chips: ['Rust','eBPF','Wasm','LLM Ops'], exploring: true },
];

export default function About() {
  useEffect(() => {
    document.title = 'About — Roshan Bhatta';
  }, []);

  return (
    <>
      <style>{`
        body { background-image: none; }
        [data-theme="dark"] { --bg: #08080b; --surface: rgba(255,255,255,0.03); }
        main { position: relative; z-index: 1; transition: opacity .38s var(--ease), transform .38s var(--ease); }
        .ab-main { max-width: 768px; margin: 0 auto; padding: 110px 28px 100px; }
        .ab-section { margin-bottom: 74px; }
        @media (prefers-reduced-motion: no-preference) {
          .ab-section { animation: slideUp .65s var(--ease) both; }
          .ab-section:nth-child(1){ animation-delay: .08s; }
          .ab-section:nth-child(2){ animation-delay: .22s; }
          .ab-section:nth-child(3){ animation-delay: .36s; }
        }
        .ab-section h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(32px, 5vw, 52px); letter-spacing: -0.03em; color: var(--text); margin-bottom: 30px; line-height: 1.0; }
        .bio p { font-size: 18px; line-height: 1.72; color: var(--text-2); margin-bottom: 20px; }
        [data-theme="light"] .bio p { color: var(--text); }
        .bio p:last-child { margin-bottom: 0; }
        .ux-blue { text-decoration: underline; text-decoration-color: #3b82f6; text-underline-offset: 4px; text-decoration-thickness: 2.5px; color: inherit; }
        .specs-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .spec-row { display: flex; gap: 0; padding: 18px 0; border-bottom: 1px solid var(--border); align-items: flex-start; }
        .spec-row:first-child { border-top: 1px solid var(--border); }
        .spec-key { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--text-3); width: 130px; flex: none; padding-top: 2px; }
        .spec-val { font-size: 16px; color: var(--text); line-height: 1.5; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .spec-tag { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-2); border: 1px solid var(--border); background: var(--surface-2); padding: 4px 10px; border-radius: 8px; white-space: nowrap; }
        [data-theme="dark"] .spec-tag { background: rgba(255,255,255,0.05); }
        .stack-list { display: flex; flex-direction: column; gap: 0; }
        .stack-cat { padding: 20px 0; border-bottom: 1px solid var(--border); display: flex; gap: 0; align-items: flex-start; }
        .stack-cat:first-child { border-top: 1px solid var(--border); }
        .stack-cat-label { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--text-3); width: 200px; flex: none; padding-top: 5px; line-height: 1.4; }
        .stack-chips { display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-start; }
        .chip { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-2); border: 1px solid var(--border); padding: 5px 11px; border-radius: 9px; transition: border-color .2s, color .2s; white-space: nowrap; min-width: max-content; }
        .chip:hover { border-color: var(--accent); color: var(--text); }
        [data-theme="dark"] .chip { background: rgba(255,255,255,0.03); }
        .chip.exploring { border-style: dashed; color: var(--accent); border-color: var(--accent); opacity: .85; }
        @media (max-width: 820px) { .pull { right: 24px; } .spec-key, .stack-cat-label { width: 110px; font-size: 11px; } }
        @media (max-width: 540px) { .spec-row, .stack-cat { flex-direction: column; gap: 10px; } .spec-key, .stack-cat-label { width: auto; } }
      `}</style>

      <Starfield />
      <PullTheme />
      <Dock />

      <main className="ab-main">
        <SiteHero />

        <section className="ab-section bio">
          <span className="eyebrow">/about</span>
          <h2>About Me</h2>
          <p>
            Hi, I'm Roshan Bhatta, a Computer Information Systems student passionate about building technology that solves real-world problems. My interests span software development, data analytics, artificial intelligence, and web applications. I enjoy turning ideas into practical solutions, whether it's developing AI-powered tools, analyzing data for insights, or creating websites for businesses.
          </p>
          <p>
            Beyond technology, I have experience in leadership, community service, and student organizations, which have strengthened my communication and problem-solving skills. My goal is to continue growing as a software engineer while building impactful products that make a difference.
          </p>
          <p>
            I came to cloud engineering through the side door. I started as a self-taught frontend developer, obsessed with <span className="ux-blue">UX-heavy web applications</span> — the kind where a 10ms interaction delay feels wrong. That obsession for responsiveness is what pulled me deeper: first into performance, then into the infrastructure that makes performance possible at scale.
          </p>
          <p>
            I believe the best infrastructure is invisible. Pipelines that just pass. Secrets that rotate themselves. Clusters that scale before anyone notices they needed to. I build for the engineers who shouldn't have to think about any of this — so they can ship the thing they actually came here to build.
          </p>
        </section>

        <section className="ab-section">
          <h2>The Specs</h2>
          <ul className="specs-list">
            <li className="spec-row">
              <span className="spec-key">Location</span>
              <span className="spec-val">Monroe, Louisiana</span>
            </li>
            <li className="spec-row">
              <span className="spec-key">Languages</span>
              <span className="spec-val">
                <span className="spec-tag">English — Fluent</span>
                <span className="spec-tag">Nepali — Native</span>
                <span className="spec-tag">TypeScript</span>
              </span>
            </li>
            <li className="spec-row">
              <span className="spec-key">Education</span>
              <span className="spec-val" style={{ whiteSpace: 'nowrap' }}>University of Louisiana Monroe</span>
            </li>
          </ul>
        </section>

        <section className="ab-section">
          <h2>Tech Stack</h2>
          <div className="stack-list">
            {STACK.map(({ label, chips, exploring }) => (
              <div key={label} className="stack-cat">
                <span className="stack-cat-label">{label}</span>
                <div className="stack-chips">
                  {chips.map(chip => (
                    <span key={chip} className={`chip${exploring ? ' exploring' : ''}`}>{chip}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
