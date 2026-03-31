import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-branded-image',
  standalone: true,
  templateUrl: './branded-image.component.html',
  styleUrl: './branded-image.component.css'
})
export class BrandedImageComponent {
  /** Path under `src/assets` or full URL */
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly imgClass = input('');
  readonly fit = input<'contain' | 'cover'>('contain');

  /** Shown if the file is missing */
  readonly fallbackTitle = input('');
  readonly fallbackSubtitle = input('Add file to assets');

  readonly failed = signal(false);

  onError(): void {
    this.failed.set(true);
  }
}
