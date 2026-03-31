import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-data-impact-section',
  standalone: true,
  templateUrl: './data-impact-section.component.html',
  styleUrl: './data-impact-section.component.css'
})
export class DataImpactSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
}
