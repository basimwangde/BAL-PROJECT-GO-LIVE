import { Component, effect, input, signal } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';
import { BrandedImageComponent } from '../../shared/branded-image/branded-image.component';

@Component({
  selector: 'app-photo-gallery-section',
  standalone: true,
  imports: [BrandedImageComponent],
  templateUrl: './photo-gallery-section.component.html',
  styleUrl: './photo-gallery-section.component.css'
})
export class PhotoGallerySectionComponent {
  readonly d = PROJECT_DISPLAY_DATA.gallery;
  readonly isActive = input(false);

  readonly index = signal(0);

  constructor() {
    effect((onCleanup) => {
      if (!this.isActive()) {
        this.index.set(0);
        return;
      }
      const id = window.setInterval(() => {
        const n = this.d.images.length;
        if (n === 0) {
          return;
        }
        this.index.update((i) => (i + 1) % n);
      }, Math.max(800, this.d.rotateEveryMs));
      onCleanup(() => window.clearInterval(id));
    });
  }

  prev(): number {
    const n = this.d.images.length;
    if (n === 0) {
      return 0;
    }
    return (this.index() - 1 + n) % n;
  }

  next(): number {
    const n = this.d.images.length;
    if (n === 0) {
      return 0;
    }
    return (this.index() + 1) % n;
  }
}
