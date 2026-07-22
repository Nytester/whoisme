import { useEffect, useState } from 'react';
import Starfield from '../components/Starfield';
import PullTheme from '../components/PullTheme';
import Dock from '../components/Dock';
import SiteHero from '../components/SiteHero';

interface Fields { name: string; email: string; company: string; message: string }
interface Errors { name?: boolean; email?: boolean; message?: boolean }

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Contact — Roshan Bhatta';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!fields.name.trim()) errs.name = true;
    if (!fields.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) errs.email = true;
    if (!fields.message.trim()) errs.message = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: false }));
  };

  return (
    <>
      <style>{`
        body { background-image: none; overflow-x: hidden; }
        [data-theme="dark"] { --bg: #08080b; --surface: rgba(255,255,255,0.03); }
        main { position: relative; z-index: 1; }
        .gt-main { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 100px 28px 80px; }
        .gt-wrap { width: 100%; max-width: 560px; }
        .gt-form { display: flex; flex-direction: column; gap: 12px; }
        .fcard { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 13px 18px; backdrop-filter: blur(8px); transition: border-color .2s, box-shadow .2s, background .2s; }
        [data-theme="light"] .fcard { background: #fff; }
        .fcard:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .fcard.invalid { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.14); }
        .fcard label { display: block; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: var(--text-3); }
        .fcard input, .fcard textarea { width: 100%; background: none; border: none; outline: none; color: var(--text); font-family: var(--font-body); font-size: 16px; margin-top: 5px; resize: vertical; line-height: 1.5; }
        .fcard input::placeholder, .fcard textarea::placeholder { color: var(--text-3); }
        .send-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 6px; background: #fbe3cc; color: #1c1409; border: none; border-radius: 100px; padding: 17px; cursor: pointer; font-family: var(--font-mono); font-size: 14px; font-weight: 600; letter-spacing: .01em; transition: transform .25s var(--ease), filter .2s, box-shadow .25s; box-shadow: 0 10px 30px -12px rgba(251,227,204,.5); }
        .send-btn:hover { transform: translateY(-2px); filter: brightness(1.03); box-shadow: 0 16px 40px -14px rgba(251,227,204,.7); }
        .send-btn svg { width: 18px; height: 18px; }
        .gt-success { text-align: center; padding: 44px 20px; }
        .gt-success .ck { width: 58px; height: 58px; border-radius: 50%; background: #fbe3cc; color: #1c1409; display: grid; place-items: center; margin: 0 auto 18px; font-size: 26px; }
        .gt-success h2 { font-family: var(--font-serif); font-weight: 500; font-size: 28px; color: var(--text); }
        .gt-success p { color: var(--text-2); margin-top: 8px; }
        .socials { display: flex; gap: 14px; justify-content: center; margin-top: 34px; }
        .socials a { width: 46px; height: 46px; border-radius: 50%; border: 1px solid var(--border); display: grid; place-items: center; color: var(--text-2); transition: color .2s, border-color .2s, transform .25s var(--ease); }
        .socials a:hover { color: var(--text); border-color: var(--text-2); transform: translateY(-3px); }
        .socials a svg { width: 19px; height: 19px; }
        @media (prefers-reduced-motion: no-preference) {
          .gt-wrap { animation: popIn .55s var(--ease) both; }
          .gt-form > * { animation: fadeUp .6s var(--ease) both; }
          .gt-form > *:nth-child(1){ animation-delay: .18s; }
          .gt-form > *:nth-child(2){ animation-delay: .26s; }
          .gt-form > *:nth-child(3){ animation-delay: .34s; }
          .gt-form > *:nth-child(4){ animation-delay: .42s; }
          .gt-form > *:nth-child(5){ animation-delay: .50s; }
          .socials { animation: fadeUp .6s var(--ease) both; animation-delay: .58s; }
        }
        @keyframes popIn { from { transform: scale(.965); } to { transform: none; } }
        @keyframes fadeUp { from { transform: translateY(18px); } to { transform: none; } }
        @media (max-width: 820px) { .pull { right: 24px; } .gt-main { padding-bottom: 110px; } }
      `}</style>

      <Starfield />
      <PullTheme />
      <Dock />

      <main className="gt-main">
        <div className="gt-wrap">
          <SiteHero />

          {!sent ? (
            <form className="gt-form" onSubmit={handleSubmit} noValidate>
              <div className={`fcard${errors.name ? ' invalid' : ''}`}>
                <label htmlFor="f-name">Name</label>
                <input id="f-name" type="text" placeholder="Your name" value={fields.name} onChange={set('name')} />
              </div>
              <div className={`fcard${errors.email ? ' invalid' : ''}`}>
                <label htmlFor="f-email">Email</label>
                <input id="f-email" type="email" placeholder="you@company.com" value={fields.email} onChange={set('email')} />
              </div>
              <div className="fcard">
                <label htmlFor="f-company">Company</label>
                <input id="f-company" type="text" placeholder="Where you work (optional)" value={fields.company} onChange={set('company')} />
              </div>
              <div className={`fcard${errors.message ? ' invalid' : ''}`}>
                <label htmlFor="f-msg">Message</label>
                <textarea id="f-msg" rows={4} placeholder="What are you building?" value={fields.message} onChange={set('message')} />
              </div>
              <button className="send-btn" type="submit">
                Send message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 3 11 14M22 3l-7 18-4-7-7-4z"/>
                </svg>
              </button>
            </form>
          ) : (
            <div className="gt-success">
              <div className="ck">✓</div>
              <h2>Message sent</h2>
              <p>Thanks for reaching out — I'll get back to you soon.</p>
            </div>
          )}

          <div className="socials">
            <a href="https://www.linkedin.com/in/roshanbhatta21/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3zM6.5 7.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM19 19h-3v-5.3c0-3.1-3.5-2.9-3.5 0V19h-3V9h3v1.4c1.4-2.6 6.5-2.8 6.5 2.5z"/></svg>
            </a>
            <a href="https://github.com/Nytester" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18.3 4.6 19.3 5 19.3 5c.7 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
