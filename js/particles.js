// js/particles.js

export const PARTICLE_CONFIG = {
  maxMobileParticles: 35,
  maxDesktopParticles: 75,
};

export function createParticle(width, height) {
  const isPetal = Math.random() > 0.65;
  return {
    type: isPetal ? 'petal' : 'sparkle',
    x: Math.random() * width,
    y: Math.random() * height,
    size: isPetal ? Math.random() * 5 + 4 : Math.random() * 2.5 + 1,
    speedY: Math.random() * 0.7 + 0.3,
    speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
    opacity: Math.random() * 0.6 + 0.25,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.5,
    hue: isPetal ? 45 : 42, // Warm cream / golden jasmine
  };
}

export function initParticles(canvas) {
  if (!canvas || typeof window === 'undefined') return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const isMobile = width < 768;
  const particleCount = isMobile ? PARTICLE_CONFIG.maxMobileParticles : PARTICLE_CONFIG.maxDesktopParticles;
  const particles = Array.from({ length: particleCount }, () => createParticle(width, height));

  let animationFrameId = null;
  let isRunning = true;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });

  function draw() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
      p.rotation += p.rotationSpeed;

      // Wrap around
      if (p.y > height + 20) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 10;
      if (p.x > width + 20) p.x = -10;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'sparkle') {
        // Glowing gold ember
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
        gradient.addColorStop(0, 'rgba(255, 245, 200, 1)');
        gradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.7)');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Delicate jasmine/rose petal
        ctx.fillStyle = 'rgba(255, 252, 240, 0.85)';
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  // Battery saving when tab inactive
  function handleVisibilityChange() {
    if (document.hidden) {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      draw();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  draw();

  return {
    destroy: () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    },
  };
}
