import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';
import { BrandedImageComponent } from '../../shared/branded-image/branded-image.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [BrandedImageComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
}
