import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number };
    let stars: Star[] = [];
    let rafId: number;

    const rgb = () =>
      document.documentElement.getAttribute('data-theme') === 'light'
        ? '20,18,25'
        : '255,255,255';

    const init = () => {
      cv.width = innerWidth;
      cv.height = innerHeight;
      const n = Math.min(170, Math.round((innerWidth * innerHeight) / 11000));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * 0.0017 + 0.0004,
        ph: Math.random() * 6.2832,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const c = rgb();
      for (const s of stars) {
        const a = s.a * (0.4 + 0.6 * Math.sin(t * s.tw + s.ph));
        if (a < 0.02) continue;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.2832);
        ctx.fillStyle = `rgba(${c},${a.toFixed(3)})`;
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      rafId = requestAnimationFrame(loop);
    };

    init();
    draw(0);
    rafId = requestAnimationFrame(loop);

    const onResize = () => { init(); draw(performance.now()); };
    const observer = new MutationObserver(() => draw(performance.now()));
    addEventListener('resize', onResize);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stars"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
