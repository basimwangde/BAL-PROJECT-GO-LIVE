import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-closing-section',
  standalone: true,
  templateUrl: './closing-section.component.html',
  styleUrl: './closing-section.component.css'
})
export class ClosingSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
}
