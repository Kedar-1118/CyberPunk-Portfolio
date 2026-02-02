import React, { useEffect, useRef } from 'react';
import { getPerformanceSettings } from '../utils/performance';
import { useCustomization } from '../context/CustomizationContext';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animationRef = useRef(null);
    const { settings } = useCustomization();
    const performance = getPerformanceSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Reduce particles based on performance and user settings
        const baseCount = performance.gpuTier === 'high' ? 100 :
            performance.gpuTier === 'medium' ? 50 : 25;
        const particleCount = Math.floor(baseCount * (settings.particleDensity / 100));

        // Don't render if reduce motion is enabled or very low density
        if (settings.reduceMotion || performance.prefersReducedMotion || particleCount < 5) {
            return;
        }

        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.fadeDelay = Math.random() * 600;
                this.fadeStart = Date.now() + this.fadeDelay;
                this.fadingOut = false;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = 0;
                this.fadeDelay = Math.random() * 600;
                this.fadeStart = Date.now() + this.fadeDelay;
                this.fadingOut = false;
            }

            update() {
                this.y -= this.speed * (settings.animationSpeed / 100);

                const now = Date.now();
                if (now > this.fadeStart) {
                    if (!this.fadingOut) {
                        this.opacity += 0.01;
                        if (this.opacity >= 1) {
                            this.fadingOut = true;
                        }
                    } else {
                        this.opacity -= 0.01;
                    }
                }

                if (this.y < 0 || this.opacity <= 0) {
                    this.reset();
                }
            }

            draw() {
                if (this.opacity > 0) {
                    ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity * 0.5})`;
                    ctx.fillRect(this.x, this.y, 2, 2);
                }
            }
        }

        // Initialize particles
        particles.current = Array.from({ length: particleCount }, () => new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [settings.particleDensity, settings.animationSpeed, settings.reduceMotion, performance]);

    // Don't render canvas if performance is too low
    if (performance.prefersReducedMotion || settings.reduceMotion) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

export default React.memo(ParticleBackground);
