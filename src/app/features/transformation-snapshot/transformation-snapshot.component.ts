import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';

@Component({
  selector: 'app-transformation-snapshot',
  standalone: true,
  templateUrl: './transformation-snapshot.component.html',
  styleUrl: './transformation-snapshot.component.css'
})
export class TransformationSnapshotComponent {
  readonly d = PROJECT_DISPLAY_DATA;
}
