import { HttpClient } from '@angular/common/http';
import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';
import type { GalleryImage } from '../../core/models/gallery-image.model';
import { BrandedImageComponent } from '../../shared/branded-image/branded-image.component';

const MANIFEST_URL = '/assets/project/gallery-manifest.json';

type ManifestEntry = string | { file: string; alt?: string };

@Component({
  selector: 'app-photo-gallery-section',
  standalone: true,
  imports: [BrandedImageComponent],
  templateUrl: './photo-gallery-section.component.html',
  styleUrl: './photo-gallery-section.component.css'
})
export class PhotoGallerySectionComponent {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly cfg = PROJECT_DISPLAY_DATA.gallery;
  readonly isActive = input(false);

  readonly images = signal<GalleryImage[]>([]);
  readonly index = signal(0);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly slideLabel = computed(() => {
    const n = this.images().length;
    if (n === 0) {
      return '';
    }
    return `Image ${this.index() + 1} of ${n}`;
  });

  constructor() {
    this.http
      .get<ManifestEntry[]>(MANIFEST_URL)
      .pipe(
        map((rows) => this.normalizeManifest(rows)),
        catchError(() => of(null)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((resolved) => {
        const fallback = this.cfg.images;
        const use =
          resolved && resolved.length > 0 ? resolved : fallback.length > 0 ? fallback : [];
        this.images.set(use);
        this.index.set(0);
      });

    effect((onCleanup) => {
      const active = this.isActive();
      const n = this.images().length;
      if (!active || n === 0) {
        this.stopAutoplay();
        return;
      }
      this.startAutoplay();
      onCleanup(() => this.stopAutoplay());
    });
  }

  private normalizeManifest(rows: ManifestEntry[] | null): GalleryImage[] | null {
    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }
    return rows.map((row, i) => {
      if (typeof row === 'string') {
        const file = row.replace(/^\/+/, '');
        return {
          src: `/assets/project/${file}`,
          alt: `Project photo ${i + 1}`
        };
      }
      const file = row.file.replace(/^\/+/, '');
      return {
        src: `/assets/project/${file}`,
        alt: row.alt || `Project photo ${i + 1}`
      };
    });
  }

  private stopAutoplay(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    const ms = Math.max(500, this.cfg.rotateEveryMs);
    const n = this.images().length;
    if (n === 0) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.index.update((i) => (i + 1) % n);
    }, ms);
  }

  /** Restart timer after manual navigation */
  private bumpAutoplay(): void {
    if (!this.isActive()) {
      return;
    }
    this.startAutoplay();
  }

  goPrev(): void {
    const n = this.images().length;
    if (n === 0) {
      return;
    }
    this.index.update((i) => (i - 1 + n) % n);
    this.bumpAutoplay();
  }

  goNext(): void {
    const n = this.images().length;
    if (n === 0) {
      return;
    }
    this.index.update((i) => (i + 1) % n);
    this.bumpAutoplay();
  }

  goTo(i: number): void {
    const n = this.images().length;
    if (n === 0 || i < 0 || i >= n) {
      return;
    }
    this.index.set(i);
    this.bumpAutoplay();
  }
}
