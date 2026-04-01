import { Component, computed, effect, input, signal } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-key-highlights-section',
  standalone: true,
  templateUrl: './key-highlights-section.component.html',
  styleUrl: './key-highlights-section.component.css'
})
export class KeyHighlightsSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
  readonly isActive = input(false);

  readonly kpis = computed(() => this.d.keyHighlightsSection.kpis);
  /** Bumps when the slide becomes active so stagger animations replay. */
  readonly animEpoch = signal(0);

  private lastActive = false;

  constructor() {
    effect(() => {
      const active = this.isActive();
      if (active && !this.lastActive) {
        this.animEpoch.update((e) => e + 1);
      }
      this.lastActive = active;
    });
  }
}
