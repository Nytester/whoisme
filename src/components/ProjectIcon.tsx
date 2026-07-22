import type { IconKey } from '../data/projects';

const stroke = { fill: 'none', stroke: '#fff', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export default function ProjectIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case 'mri':
      return <svg viewBox="0 0 24 24" {...stroke}><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case 'chart':
      return <svg viewBox="0 0 24 24" {...stroke}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/><path d="M7 14h2M13 12h2M13 16h2"/></svg>;
    case 'chat':
      return <svg viewBox="0 0 24 24" {...stroke}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="11" r=".6" fill="#fff"/><circle cx="12" cy="11" r=".6" fill="#fff"/><circle cx="15" cy="11" r=".6" fill="#fff"/></svg>;
    case 'braces':
      return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4 4 8v3l-2 1 2 1v3l4 4M16 4l4 4v3l2 1-2 1v3l-4 4"/></svg>;
    case 'users':
      return <svg viewBox="0 0 24 24" {...stroke}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'book':
      return <svg viewBox="0 0 24 24" {...stroke}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
    case 'home':
      return <svg viewBox="0 0 24 24" {...stroke}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'doc':
      return <svg viewBox="0 0 24 24" {...stroke}><path d="M9 12h6M9 16h6M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M13 3v5h5"/></svg>;
    case 'plate':
      return <svg viewBox="0 0 24 24" {...stroke}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M12 11v4M10 13h4"/></svg>;
  }
}
