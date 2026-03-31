import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-technical-section',
  standalone: true,
  templateUrl: './technical-section.component.html',
  styleUrl: './technical-section.component.css'
})
export class TechnicalSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
}
