import { useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function PullTheme() {
  const { toggle } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    toggle();
    const btn = btnRef.current;
    if (!btn) return;
    btn.classList.remove('pulled');
    void btn.offsetWidth;
    btn.classList.add('pulled');
    setTimeout(() => btn.classList.remove('pulled'), 640);
  };

  return (
    <button
      ref={btnRef}
      className="pull"
      aria-label="Pull to switch light or dark theme"
      title="Pull to switch theme"
      onClick={handleClick}
    >
      <span className="cord" />
      <span className="knot" />
      <span className="weight" />
    </button>
  );
}
