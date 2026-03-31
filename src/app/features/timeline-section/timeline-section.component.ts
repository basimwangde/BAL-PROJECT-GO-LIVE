import { Component, input } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-timeline-section',
  standalone: true,
  templateUrl: './timeline-section.component.html',
  styleUrl: './timeline-section.component.css'
})
export class TimelineSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
  readonly isActive = input(false);
}
