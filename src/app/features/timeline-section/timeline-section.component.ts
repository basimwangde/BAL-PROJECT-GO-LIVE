import { Component, DestroyRef, ElementRef, effect, inject, input, signal, viewChild } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

/** ~8 beats inside the slide duration (10.5s) so step 8 lands before autoplay advances */
const STEP_MS = 980;

const CONFETTI_COUNT = 620;
const CONFETTI_DURATION_MS = 4200;

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  g: number;
  rot: number;
  vr: number;
  color: string;
  w: number;
  h: number;
  shape: 'rect' | 'circle';
}

@Component({
  selector: 'app-timeline-section',
  standalone: true,
  templateUrl: './timeline-section.component.html',
  styleUrl: './timeline-section.component.css'
})
export class TimelineSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
  readonly isActive = input(false);

  readonly activeStepIndex = signal(-1);

  private readonly confettiCanvas = viewChild<ElementRef<HTMLCanvasElement>>('confettiCanvas');

  private journeyTimers: ReturnType<typeof setTimeout>[] = [];
  private confettiRaf = 0;
  private confettiBurstTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      const on = this.isActive();
      if (!on) {
        this.clearJourney();
        this.cancelConfetti();
        this.activeStepIndex.set(-1);
        return;
      }
      this.clearJourney();
      this.activeStepIndex.set(-1);
      for (let i = 0; i < this.d.timeline.length; i++) {
        const t = setTimeout(() => {
          this.activeStepIndex.set(i);
          if (i === this.d.timeline.length - 1) {
            queueMicrotask(() => this.fireConfetti());
          }
        }, i * STEP_MS);
        this.journeyTimers.push(t);
      }
    });

    destroyRef.onDestroy(() => {
      this.clearJourney();
      this.cancelConfetti();
    });
  }

  /** Fills the vertical rail from the top as steps complete (standard timeline progress). */
  timelineRailFillPercent(): number {
    const idx = this.activeStepIndex();
    const n = this.d.timeline.length;
    if (idx < 0 || n === 0) {
      return 0;
    }
    return ((idx + 1) / n) * 100;
  }

  milestoneLit(i: number): boolean {
    return this.activeStepIndex() >= i;
  }

  milestoneCurrent(i: number): boolean {
    return this.activeStepIndex() === i;
  }

  private clearJourney(): void {
    this.journeyTimers.forEach(clearTimeout);
    this.journeyTimers = [];
  }

  private resetConfettiCanvasStyles(canvas: HTMLCanvasElement): void {
    canvas.classList.remove('tl__confetti--fullscreen');
    canvas.style.width = '';
    canvas.style.height = '';
  }

  private cancelConfetti(): void {
    if (this.confettiBurstTimer !== null) {
      clearTimeout(this.confettiBurstTimer);
      this.confettiBurstTimer = null;
    }
    if (this.confettiRaf) {
      cancelAnimationFrame(this.confettiRaf);
      this.confettiRaf = 0;
    }
    const canvas = this.confettiCanvas()?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.resetConfettiCanvasStyles(canvas);
    }
  }

  private spawnParticle(w: number, h: number, colors: string[]): ConfettiParticle {
    const roll = Math.random();
    let x: number;
    let y: number;
    let vx: number;
    let vy: number;

    if (roll < 0.38) {
      x = Math.random() * w;
      y = -24 - Math.random() * (h * 0.42);
      vx = (Math.random() - 0.5) * 14;
      vy = 3.5 + Math.random() * 11;
    } else if (roll < 0.68) {
      const fromLeft = Math.random() < 0.5;
      x = fromLeft ? -20 : w + 20;
      y = Math.random() * h * 1.05;
      vx = fromLeft ? 7 + Math.random() * 14 : -7 - Math.random() * 14;
      vy = (Math.random() - 0.5) * 10;
    } else {
      x = w * (0.12 + Math.random() * 0.76);
      y = h * (0.04 + Math.random() * 0.32);
      vx = (Math.random() - 0.5) * 26;
      vy = (Math.random() - 0.88) * 20;
    }

    return {
      x,
      y,
      vx,
      vy,
      g: 0.12 + Math.random() * 0.16,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.45,
      color: colors[Math.floor(Math.random() * colors.length)]!,
      w: 2.5 + Math.random() * 6,
      h: 2 + Math.random() * 5,
      shape: Math.random() < 0.42 ? 'circle' : 'rect'
    };
  }

  private fireConfetti(): void {
    const canvas = this.confettiCanvas()?.nativeElement;
    if (!canvas || typeof window === 'undefined') {
      return;
    }

    this.cancelConfetti();

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    canvas.classList.add('tl__confetti--fullscreen');
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      this.resetConfettiCanvasStyles(canvas);
      return;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const colors = [
      '#1b7f4a',
      '#2a9d62',
      '#c9a227',
      '#d4a84b',
      '#4a8f6a',
      '#e8f0ea',
      '#156b3d',
      '#ffffff',
      '#0d2818',
      '#7cb89a'
    ];

    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      particles.push(this.spawnParticle(w, h, colors));
    }

    const start = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - start;
      const fade = Math.max(0, 1 - elapsed / CONFETTI_DURATION_MS);

      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = fade;
        if (p.shape === 'circle') {
          const r = Math.max(p.w, p.h) * 0.45;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      if (elapsed < CONFETTI_DURATION_MS) {
        this.confettiRaf = requestAnimationFrame(tick);
      } else {
        this.confettiRaf = 0;
        ctx.clearRect(0, 0, w, h);
        this.resetConfettiCanvasStyles(canvas);
      }
    };

    this.confettiRaf = requestAnimationFrame(tick);

    this.confettiBurstTimer = window.setTimeout(() => {
      this.confettiBurstTimer = null;
      if (!canvas.classList.contains('tl__confetti--fullscreen')) {
        return;
      }
      for (let i = 0; i < 220; i++) {
        particles.push(this.spawnParticle(w, h, colors));
      }
    }, 380);
  }
}
