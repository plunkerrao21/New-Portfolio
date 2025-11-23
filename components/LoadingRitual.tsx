import React, { useEffect, useRef, useState } from 'react';

const LoadingRitual: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        const glow = glowRef.current;

        if (!canvas || !overlay || !glow) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const CONFIG = {
            colors: {
                void: '#050505',
                particle: '#Eaeaea',
                particleDim: '#444444',
                scanline: '#ffffff',
                infrared: 'rgba(255, 50, 50, 0.4)'
            },
            gridSpacing: 40,
            particleCount: 2200,
            timings: {
                scan: 1500,
                gridWake: 1000,
                silhouetteMorph: 1200,
                monogramMorph: 1200,
                charge: 1800,
                explode: 800
            }
        };

        class Particle {
            x: number;
            y: number;
            targetX: number;
            targetY: number;
            vx: number;
            vy: number;
            size: number;
            type: number; // 0: dim, 1: bright
            alpha: number;
            symbol: string;
            friction: number;
            ease: number;
            wobble: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.targetX = this.x;
                this.targetY = this.y;
                this.vx = 0;
                this.vy = 0;
                this.size = 1;
                this.type = 0;
                this.alpha = 0;
                this.symbol = '';
                this.friction = 0.94;
                this.ease = 0.1;
                this.wobble = Math.random() * Math.PI * 2;
            }

            update(state: string, centerX: number, centerY: number) {
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;

                if (state === 'SCAN') {
                    this.alpha = 0;
                } else if (state === 'GRID_WAKE') {
                    this.x += (Math.random() - 0.5) * 0.5;
                    this.y += (Math.random() - 0.5) * 0.5;
                    if (this.alpha < 1) this.alpha += 0.05;
                    this.type = 0;
                    this.size = 1.5;
                } else if (state === 'VORTEX') {
                    this.targetX = centerX;
                    this.targetY = centerY;
                    const angle = Math.atan2(this.y - centerY, this.x - centerX);
                    this.vx += Math.cos(angle - 1.5) * 0.5;
                    this.vy += Math.sin(angle - 1.5) * 0.5;
                    this.vx -= Math.cos(angle) * 0.8;
                    this.vy -= Math.sin(angle) * 0.8;
                    this.vx *= this.friction;
                    this.vy *= this.friction;
                    this.x += this.vx;
                    this.y += this.vy;
                    this.alpha = 1;
                } else if (state === 'SILHOUETTE' || state === 'MONOGRAM') {
                    this.x += dx * this.ease;
                    this.y += dy * this.ease;
                    this.wobble += 0.05;
                    this.x += Math.sin(this.wobble) * 0.3;
                    this.y += Math.cos(this.wobble) * 0.3;
                    this.type = 1;
                    this.size = state === 'MONOGRAM' ? 1.8 : 1.2;
                } else if (state === 'CHARGE') {
                    this.x += dx * 0.2;
                    this.y += dy * 0.2;
                    if (Math.random() > 0.98) {
                        this.x += (Math.random() - 0.5) * 10;
                        this.y += (Math.random() - 0.5) * 10;
                    }
                } else if (state === 'EXPLODE') {
                    const angle = Math.atan2(this.y - centerY, this.x - centerX);
                    this.vx = Math.cos(angle) * 20;
                    this.vy = Math.sin(angle) * 20;
                    this.x += this.vx;
                    this.y += this.vy;
                    this.alpha -= 0.05;
                }
            }
        }

        class RitualController {
            particles: Particle[] = [];
            width: number = window.innerWidth;
            height: number = window.innerHeight;
            state: string = 'SCAN';
            startTime: number = 0;
            stateStartTime: number = 0;
            silhouetteTargets: { x: number; y: number }[] = [];
            monogramTargets: { x: number; y: number }[] = [];
            animationFrameId: number = 0;

            constructor() {
                this.init();
            }

            init() {
                this.resize();
                window.addEventListener('resize', this.resize.bind(this));
                this.silhouetteTargets = this.generateSilhouetteTargets();
                this.monogramTargets = this.generateMonogramTargets();
                this.initParticles();
                this.startTime = performance.now();
                this.stateStartTime = this.startTime;
                this.loop(this.startTime);
            }

            resize() {
                const dpr = window.devicePixelRatio || 1;
                this.width = window.innerWidth;
                this.height = window.innerHeight;
                canvas.width = this.width * dpr;
                canvas.height = this.height * dpr;
                if (ctx) ctx.scale(dpr, dpr);
            }

            initParticles() {
                const symbols = ['+', '·', 'x', '-', '::', '■'];
                const cols = Math.floor(this.width / CONFIG.gridSpacing);
                const rows = Math.floor(this.height / CONFIG.gridSpacing);
                let count = 0;

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (count >= CONFIG.particleCount) break;
                        const p = new Particle(this.width, this.height);
                        p.x = (c * CONFIG.gridSpacing) + (CONFIG.gridSpacing / 2);
                        p.y = (r * CONFIG.gridSpacing) + (CONFIG.gridSpacing / 2);
                        p.targetX = p.x;
                        p.targetY = p.y;
                        p.symbol = symbols[Math.floor(Math.random() * symbols.length)];
                        this.particles.push(p);
                        count++;
                    }
                }
                while (this.particles.length < CONFIG.particleCount) {
                    this.particles.push(new Particle(this.width, this.height));
                }
            }

            generateSilhouetteTargets() {
                const targets = [];
                const cx = this.width / 2;
                const cy = this.height / 2;
                const scale = Math.min(this.width, this.height) * 0.25;

                for (let i = 0; i < CONFIG.particleCount; i++) {
                    let tx, ty;
                    if (Math.random() > 0.4) {
                        const angle = Math.random() * Math.PI * 2;
                        const r = Math.sqrt(Math.random()) * (scale * 0.5);
                        tx = cx + Math.cos(angle) * r;
                        ty = cy - (scale * 0.5) + Math.sin(angle) * r;
                    } else {
                        tx = cx + (Math.random() - 0.5) * scale * 2.5;
                        ty = cy + (scale * 0.4) + (Math.random() * scale * 0.6);
                        if (Math.abs(tx - cx) > scale * 1.2) tx = cx;
                    }
                    targets.push({ x: tx, y: ty });
                }
                return targets;
            }

            generateMonogramTargets() {
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                if (!tempCtx) return [];
                const w = Math.min(this.width, 2000);
                const h = Math.min(this.height, 2000);
                tempCanvas.width = w;
                tempCanvas.height = h;

                const fontSize = Math.min(w, h) * 0.25;
                tempCtx.font = `800 ${fontSize}px "Helvetica Neue", Arial`;
                tempCtx.fillStyle = 'white';
                tempCtx.textAlign = 'center';
                tempCtx.textBaseline = 'middle';
                tempCtx.fillText('AD', w / 2, h / 2);

                const imgData = tempCtx.getImageData(0, 0, w, h).data;
                const validPixels = [];
                const step = 6;
                for (let y = 0; y < h; y += step) {
                    for (let x = 0; x < w; x += step) {
                        const index = (y * w + x) * 4;
                        if (imgData[index] > 128) {
                            validPixels.push({ x: x * (this.width / w), y: y * (this.height / h) });
                        }
                    }
                }

                const targets = [];
                for (let i = 0; i < CONFIG.particleCount; i++) {
                    if (validPixels.length > 0) {
                        targets.push(validPixels[i % validPixels.length]);
                    } else {
                        targets.push({ x: this.width / 2, y: this.height / 2 });
                    }
                }
                return targets;
            }

            loop(timestamp: number) {
                if (!ctx) return;
                const elapsed = timestamp - this.stateStartTime;
                const cx = this.width / 2;
                const cy = this.height / 2;

                ctx.clearRect(0, 0, this.width, this.height);

                switch (this.state) {
                    case 'SCAN':
                        if (elapsed > CONFIG.timings.scan) this.transition('GRID_WAKE', timestamp);
                        this.renderScan(elapsed, CONFIG.timings.scan);
                        break;
                    case 'GRID_WAKE':
                        if (elapsed > CONFIG.timings.gridWake) this.transition('VORTEX', timestamp);
                        if (glow) glow.style.opacity = '0.5';
                        break;
                    case 'VORTEX':
                        if (elapsed > 800) this.transition('SILHOUETTE', timestamp);
                        break;
                    case 'SILHOUETTE':
                        if (elapsed < 20) {
                            this.particles.forEach((p, i) => {
                                p.targetX = this.silhouetteTargets[i].x;
                                p.targetY = this.silhouetteTargets[i].y;
                            });
                        }
                        if (elapsed > CONFIG.timings.silhouetteMorph) this.transition('MONOGRAM', timestamp);
                        break;
                    case 'MONOGRAM':
                        if (elapsed < 20) {
                            this.particles.forEach((p, i) => {
                                const t = this.monogramTargets[(i + Math.floor(Math.random() * 100)) % this.monogramTargets.length];
                                p.targetX = t.x;
                                p.targetY = t.y;
                                p.ease = 0.05;
                            });
                        }
                        if (elapsed > CONFIG.timings.monogramMorph) this.transition('CHARGE', timestamp);
                        break;
                    case 'CHARGE':
                        const chargeProgress = Math.min(elapsed / CONFIG.timings.charge, 1);
                        this.renderChargeRing(cx, cy, chargeProgress);
                        if (elapsed > CONFIG.timings.charge) this.transition('EXPLODE', timestamp);
                        break;
                    case 'EXPLODE':
                        this.renderExplosion(elapsed, cx, cy);
                        if (elapsed > CONFIG.timings.explode) {
                            this.transition('DONE', timestamp);
                            this.finish();
                            return;
                        }
                        break;
                }

                if (this.state !== 'SCAN') {
                    for (let i = 0; i < this.particles.length; i++) {
                        this.particles[i].update(this.state, cx, cy);
                    }

                    if (this.state === 'GRID_WAKE') {
                        ctx.fillStyle = CONFIG.colors.particleDim;
                        ctx.font = '10px monospace';
                        for (let i = 0; i < this.particles.length; i++) {
                            const p = this.particles[i];
                            if (p.alpha > 0.01 && p.symbol) {
                                ctx.globalAlpha = p.alpha;
                                ctx.fillText(p.symbol, p.x, p.y);
                            }
                        }
                        ctx.globalAlpha = 1;
                    } else {
                        ctx.fillStyle = CONFIG.colors.particleDim;
                        ctx.beginPath();
                        let hasDim = false;
                        for (let i = 0; i < this.particles.length; i++) {
                            const p = this.particles[i];
                            if (p.type === 0 && p.alpha > 0.1) {
                                hasDim = true;
                                ctx.rect(p.x, p.y, p.size, p.size);
                            }
                        }
                        if (hasDim) ctx.fill();

                        ctx.fillStyle = CONFIG.colors.particle;
                        ctx.beginPath();
                        let hasBright = false;
                        for (let i = 0; i < this.particles.length; i++) {
                            const p = this.particles[i];
                            if (p.type === 1 && p.alpha > 0.1) {
                                hasBright = true;
                                ctx.rect(p.x, p.y, p.size, p.size);
                            }
                        }
                        if (hasBright) ctx.fill();
                    }
                }

                this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
            }

            transition(newState: string, time: number) {
                this.state = newState;
                this.stateStartTime = time;
            }

            renderScan(elapsed: number, duration: number) {
                if (!ctx) return;
                const progress = elapsed / duration;
                const y = progress * this.height;

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(this.width, y);
                ctx.stroke();

                const grad = ctx.createLinearGradient(0, y - 50, 0, y);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(1, 'rgba(255, 50, 50, 0.2)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, y - 50, this.width, 50);

                if (Math.random() > 0.8) {
                    ctx.fillStyle = '#666';
                    ctx.font = '10px monospace';
                    const txt = `SYS_INIT_0${Math.floor(Math.random() * 9)} // MEM: ${Math.floor(Math.random() * 9999)}MB`;
                    ctx.fillText(txt, 10 + Math.random() * 20, y - 10);
                }
            }

            renderChargeRing(cx: number, cy: number, progress: number) {
                if (!ctx) return;
                const radius = Math.min(this.width, this.height) * 0.3;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 2;
                const segments = 12;
                const segAngle = (Math.PI * 2) / segments;

                ctx.beginPath();
                for (let i = 0; i < segments; i++) {
                    if (progress * segments > i) {
                        const start = (i * segAngle) - Math.PI / 2;
                        const end = start + (segAngle * 0.7);
                        ctx.moveTo(cx + Math.cos(start) * radius, cy + Math.sin(start) * radius);
                        ctx.arc(cx, cy, radius, start, end);
                    }
                }
                ctx.stroke();

                if (progress > 0.9) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${(progress - 0.9) * 10})`;
                    ctx.beginPath();
                    ctx.arc(cx, cy, radius * 0.1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            renderExplosion(elapsed: number, cx: number, cy: number) {
                if (!ctx) return;
                const progress = elapsed / CONFIG.timings.explode;
                const maxRadius = Math.max(this.width, this.height) * 1.5;
                const currentRadius = Math.pow(progress, 3) * maxRadius;

                ctx.fillStyle = '#FDFCF8';
                ctx.beginPath();
                ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            finish() {
                if (overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        onComplete();
                    }, 1000);
                }
            }

            cleanup() {
                window.removeEventListener('resize', this.resize.bind(this));
                cancelAnimationFrame(this.animationFrameId);
            }
        }

        const controller = new RitualController();

        return () => {
            controller.cleanup();
        };

    }, [onComplete]);

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                backgroundColor: '#050505',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'opacity 0.8s ease-out',
            }}
        >
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vh',
                    height: '60vh',
                    background: 'radial-gradient(circle, rgba(255, 50, 50, 0.15) 0%, transparent 70%)',
                    opacity: 0,
                    transition: 'opacity 2s ease',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                }}
            />
        </div>
    );
};

export default LoadingRitual;
