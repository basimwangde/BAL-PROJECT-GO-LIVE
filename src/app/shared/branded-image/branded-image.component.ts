import { Component, EventEmitter, input, Output, signal } from '@angular/core';

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
  readonly loading = input<'lazy' | 'eager'>('lazy');

  /** Emits when the underlying `<img>` loads successfully */
  @Output() readonly loaded = new EventEmitter<HTMLImageElement>();

  /** Shown if the file is missing */
  readonly fallbackTitle = input('');
  readonly fallbackSubtitle = input('Add file to assets');

  readonly failed = signal(false);

  onLoad(evt: Event): void {
    const el = evt.target;
    if (el instanceof HTMLImageElement) {
      this.loaded.emit(el);
    }
  }

  onError(): void {
    this.failed.set(true);
  }
}
