import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  template: `<span class="kpi">{{ display() }}</span>`,
  styleUrl: './animated-counter.component.css'
})
export class AnimatedCounterComponent {
  readonly target = input.required<number>();
  readonly isActive = input(false);
  readonly durationMs = input(2400);

  readonly display = signal('0');

  private rafId = 0;

  constructor() {
    effect((onCleanup) => {
      if (!this.isActive()) {
        cancelAnimationFrame(this.rafId);
        this.display.set('0');
        return;
      }
      this.startAnimation();
      onCleanup(() => cancelAnimationFrame(this.rafId));
    });
  }

  private startAnimation(): void {
    cancelAnimationFrame(this.rafId);
    const start = performance.now();
    const from = 0;
    const to = this.target();
    const duration = Math.max(300, this.durationMs());

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(from + (to - from) * eased);
      this.display.set(val.toLocaleString('en-IN'));
      if (t < 1) {
        this.rafId = requestAnimationFrame(tick);
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }
}
