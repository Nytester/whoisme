import { Link } from 'react-router-dom';

export default function SiteHero() {
  return (
    <header className="site-hero">
      <Link to="/" aria-label="Go to home page">
        <h1 className="sh-name">Roshan Bhatta</h1>
        <p className="sh-role">Software Engineer</p>
      </Link>
    </header>
  );
}
