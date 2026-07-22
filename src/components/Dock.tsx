import { NavLink } from 'react-router-dom';

const ICONS = {
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/>
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8M5 10v10h14V10"/>
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3 11 14M22 3l-7 18-4-7-7-4z"/>
    </svg>
  ),
};

const LINKS = [
  { to: '/projects', label: 'Projects', icon: 'projects' },
  { to: '/about', label: 'About', icon: 'about' },
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/work', label: 'Work', icon: 'work' },
  { to: '/contact', label: 'Contact', icon: 'contact' },
] as const;

export default function Dock() {
  return (
    <nav className="dock" aria-label="Primary">
      {LINKS.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => isActive ? 'active' : ''}
          aria-label={label}
        >
          <span className="lbl">{label}</span>
          {ICONS[icon]}
        </NavLink>
      ))}
    </nav>
  );
}
