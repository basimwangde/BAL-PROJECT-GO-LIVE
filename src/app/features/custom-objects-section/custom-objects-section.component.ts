import { Component, input } from '@angular/core';
import { AnimatedCounterComponent } from '../../shared/animated-counter/animated-counter.component';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-custom-objects-section',
  standalone: true,
  imports: [AnimatedCounterComponent],
  templateUrl: './custom-objects-section.component.html',
  styleUrl: './custom-objects-section.component.css'
})
export class CustomObjectsSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
  readonly isActive = input(false);
}
