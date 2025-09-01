import { useEffect, useState } from 'react';
import { EmotionType } from '@/lib/emotionDetection';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
  direction: number;
}

interface AmbientParticlesProps {
  emotion: EmotionType;
}

const emotionParticleConfigs = {
  calm: {
    count: 8,
    colors: ['hsl(210, 70%, 45%)', 'hsl(220, 60%, 35%)', 'hsl(200, 80%, 40%)'],
    speed: 0.3,
    sizes: [4, 6, 8],
    pattern: 'gentle'
  },
  healing: {
    count: 12,
    colors: ['hsl(160, 70%, 35%)', 'hsl(180, 60%, 45%)', 'hsl(150, 80%, 40%)'],
    speed: 0.4,
    sizes: [3, 5, 7],
    pattern: 'flowing'
  },
  strength: {
    count: 6,
    colors: ['hsl(25, 85%, 55%)', 'hsl(15, 75%, 45%)', 'hsl(35, 90%, 50%)'],
    speed: 0.6,
    sizes: [6, 8, 10],
    pattern: 'rising'
  },
  wisdom: {
    count: 10,
    colors: ['hsl(280, 60%, 45%)', 'hsl(260, 70%, 35%)', 'hsl(300, 50%, 40%)'],
    speed: 0.2,
    sizes: [5, 7, 9],
    pattern: 'spiral'
  },
  joy: {
    count: 15,
    colors: ['hsl(50, 90%, 60%)', 'hsl(45, 85%, 50%)', 'hsl(55, 95%, 55%)'],
    speed: 0.8,
    sizes: [3, 4, 5, 6],
    pattern: 'burst'
  },
  balance: {
    count: 8,
    colors: ['hsl(340, 50%, 50%)', 'hsl(320, 60%, 40%)', 'hsl(350, 45%, 55%)'],
    speed: 0.5,
    sizes: [4, 6, 8],
    pattern: 'orbit'
  },
  neutral: {
    count: 3,
    colors: ['hsl(220, 25%, 20%)', 'hsl(210, 30%, 25%)'],
    speed: 0.1,
    sizes: [2, 3, 4],
    pattern: 'gentle'
  }
};

export const AmbientParticles = ({ emotion }: AmbientParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const config = emotionParticleConfigs[emotion];
    const newParticles: Particle[] = [];

    for (let i = 0; i < config.count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: config.sizes[Math.floor(Math.random() * config.sizes.length)],
        opacity: Math.random() * 0.6 + 0.2,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        speed: config.speed * (Math.random() * 0.5 + 0.75),
        direction: Math.random() * Math.PI * 2
      });
    }

    setParticles(newParticles);
  }, [emotion]);

  useEffect(() => {
    if (particles.length === 0) return;

    const config = emotionParticleConfigs[emotion];
    let animationId: number;

    const animate = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x;
        let newY = particle.y;
        let newDirection = particle.direction;

        switch (config.pattern) {
          case 'gentle':
            newX += Math.sin(Date.now() * 0.001 + particle.id) * particle.speed;
            newY += Math.cos(Date.now() * 0.0008 + particle.id) * particle.speed;
            break;
          
          case 'flowing':
            newX += Math.cos(particle.direction) * particle.speed;
            newY += Math.sin(particle.direction) * particle.speed;
            if (newX < -50) newX = window.innerWidth + 50;
            if (newX > window.innerWidth + 50) newX = -50;
            break;
          
          case 'rising':
            newY -= particle.speed;
            newX += Math.sin(Date.now() * 0.002 + particle.id) * 0.5;
            if (newY < -50) newY = window.innerHeight + 50;
            break;
          
          case 'spiral':
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const radius = 100 + particle.id * 20;
            const angle = Date.now() * 0.0005 * particle.speed + particle.id;
            newX = centerX + Math.cos(angle) * radius;
            newY = centerY + Math.sin(angle) * radius;
            break;
          
          case 'burst':
            newX += Math.cos(particle.direction) * particle.speed * 2;
            newY += Math.sin(particle.direction) * particle.speed * 2;
            newDirection += 0.02;
            if (newX < -50 || newX > window.innerWidth + 50 || 
                newY < -50 || newY > window.innerHeight + 50) {
              newX = window.innerWidth / 2;
              newY = window.innerHeight / 2;
              newDirection = Math.random() * Math.PI * 2;
            }
            break;
          
          case 'orbit':
            const time = Date.now() * 0.001;
            newX += Math.cos(time + particle.id) * particle.speed;
            newY += Math.sin(time + particle.id * 1.5) * particle.speed;
            break;
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          direction: newDirection
        };
      }));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particles.length, emotion]);

  if (emotion === 'neutral') return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle absolute transition-opacity duration-1000"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
};