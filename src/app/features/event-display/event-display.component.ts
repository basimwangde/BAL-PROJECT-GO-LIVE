import { Component, OnDestroy, computed, signal } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';
import type { DisplaySectionId } from '../../core/models/display-section.model';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { TransformationSnapshotComponent } from '../transformation-snapshot/transformation-snapshot.component';
import { TimelineSectionComponent } from '../timeline-section/timeline-section.component';
import { TechnicalSectionComponent } from '../technical-section/technical-section.component';
import { CustomObjectsSectionComponent } from '../custom-objects-section/custom-objects-section.component';
import { DataImpactSectionComponent } from '../data-impact-section/data-impact-section.component';
import { PartnerEcosystemSectionComponent } from '../partner-ecosystem-section/partner-ecosystem-section.component';
import { PhotoGallerySectionComponent } from '../photo-gallery-section/photo-gallery-section.component';
import { ClosingSectionComponent } from '../closing-section/closing-section.component';

@Component({
  selector: 'app-event-display',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TransformationSnapshotComponent,
    TimelineSectionComponent,
    TechnicalSectionComponent,
    CustomObjectsSectionComponent,
    DataImpactSectionComponent,
    PartnerEcosystemSectionComponent,
    PhotoGallerySectionComponent,
    ClosingSectionComponent
  ],
  templateUrl: './event-display.component.html',
  styleUrl: './event-display.component.css'
})
export class EventDisplayComponent implements OnDestroy {
  readonly data = PROJECT_DISPLAY_DATA;

  readonly sectionIndex = signal(0);
  readonly activeSectionId = computed(
    () => this.data.sections[this.sectionIndex()]!.id as DisplaySectionId
  );

  /** Partner logos on interior slides only (not opening hero or closing). */
  readonly showPartnerCornerLogos = computed(() => {
    const id = this.activeSectionId();
    return id !== 'hero' && id !== 'closing';
  });

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.scheduleAdvance();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  isActive(id: DisplaySectionId): boolean {
    return this.activeSectionId() === id;
  }

  readonly sectionCount = computed(() => this.data.sections.length);

  prev(): void {
    const n = this.data.sections.length;
    this.sectionIndex.update((i) => (i - 1 + n) % n);
    this.restartAutoplay();
  }

  next(): void {
    const n = this.data.sections.length;
    this.sectionIndex.update((i) => (i + 1) % n);
    this.restartAutoplay();
  }

  goTo(i: number): void {
    const n = this.data.sections.length;
    if (i < 0 || i >= n) {
      return;
    }
    this.sectionIndex.set(i);
    this.restartAutoplay();
  }

  private restartAutoplay(): void {
    this.scheduleAdvance();
  }

  private scheduleAdvance(): void {
    this.clearTimer();
    if (!this.data.autoplay.enabled) {
      return;
    }
    const section = this.data.sections[this.sectionIndex()]!;
    const ms = section.durationMs ?? this.data.autoplay.defaultSectionDurationMs;
    this.timer = setTimeout(() => {
      const nextIdx = (this.sectionIndex() + 1) % this.data.sections.length;
      this.sectionIndex.set(nextIdx);
      this.scheduleAdvance();
    }, ms);
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
