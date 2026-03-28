import React, { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animationFrameId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.9 + 1;
        this.speedX = (Math.random() - 0.6) * 0.5;
        this.speedY = (Math.random() - 0.5) * 1.0;
        this.density = Math.random() * 30 + 1;

        const colors = ['0,255,255', '255,0,255', '255,255,255'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const maxDistance = 150;
        const force = (maxDistance - distance) / maxDistance;

        // Repel from mouse if close
        if (distance < maxDistance) {
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        }

        // Continuous movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color},0.8)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const count = Math.min(300, window.innerWidth * 0.15);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    // Connect particles
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = 1 - dist / 120;
            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animate loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
