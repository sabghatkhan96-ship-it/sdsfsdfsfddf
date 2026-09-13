import React, { useEffect, useRef } from 'react';

export default function AntiGravityCanvas({ isAudioActive = false }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particles system
    const particleCount = Math.min(Math.floor(window.innerWidth / 14), 110);
    const particles = [];
    const colors = [
      'rgba(0, 245, 255, ',    // cyan
      'rgba(176, 38, 255, ',   // purple
      'rgba(255, 42, 133, ',   // pink
      'rgba(56, 189, 248, ',   // sky blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        speedY: -(Math.random() * 0.7 + 0.2), // Upward float (anti-gravity)
        speedX: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseVal: Math.random() * Math.PI,
      });
    }

    // Connective lines between near particles
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12 * (isAudioActive ? 2 : 1);
            ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      particles.forEach((p) => {
        // Floating upward effect (Anti-gravity)
        const boost = isAudioActive ? 1.6 : 1.0;
        p.y += p.speedY * boost;
        p.x += p.speedX * boost;
        p.pulseVal += p.pulseSpeed;

        // Reset if drifted above top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse anti-gravity deflection
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRef.current.radius) {
          const force = (1 - dist / mouseRef.current.radius) * 3.5;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        }

        // Draw particle with glow
        const currentOpacity = (Math.sin(p.pulseVal) * 0.25 + 0.75) * p.opacity;
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = isAudioActive ? 15 : 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (isAudioActive ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      drawLines();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAudioActive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.85 }}
    />
  );
}
