import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-partner-ecosystem-section',
  standalone: true,
  templateUrl: './partner-ecosystem-section.component.html',
  styleUrl: './partner-ecosystem-section.component.css'
})
export class PartnerEcosystemSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;
}
