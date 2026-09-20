import React, { useRef } from 'react';

/**
 * BentoCard
 * Glassmorphic card with smooth 3D cursor-tracking parallax tilt.
 * Pass `span` classes (e.g. "col-span-2 row-span-2") via className
 * to control its position in the parent .v-bento-grid.
 */
export default function BentoCard({
  children,
  onClick,
  className = '',
  style = {},
  glow = true,
  as: Tag = 'div',
}) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = x / rect.width - 0.5;
    const cy = y / rect.height - 0.5;

    const maxTilt = 7;
    el.style.transform = `rotateY(${cx * maxTilt}deg) rotateX(${-cy * maxTilt}deg) translateZ(0)`;

    if (glow) {
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  return (
    <div className={`v-tilt-wrap ${className}`} style={style} onClick={onClick}>
      <Tag
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="v-card v-tilt"
        style={{
          height: '100%',
          width: '100%',
          padding: '26px',
          display: 'flex',
          flexDirection: 'column',
          cursor: onClick ? 'pointer' : 'default',
          overflow: 'hidden',
          backgroundImage: glow
            ? 'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(226,183,20,0.14), transparent 65%)'
            : undefined,
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
