import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';
import type { DataImpactRow } from '../../core/models/data-impact-row.model';

@Component({
  selector: 'app-data-impact-section',
  standalone: true,
  templateUrl: './data-impact-section.component.html',
  styleUrl: './data-impact-section.component.css'
})
export class DataImpactSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;

  /** S/4 bar width as % of the ECC baseline bar (same scale across both rows). */
  s4BarPercent(row: DataImpactRow): number {
    if (row.eccRecords <= 0) {
      return 0;
    }
    return (100 * row.s4Records) / row.eccRecords;
  }

  /** Human-readable reduction (fewer records vs ECC). */
  reductionPercent(row: DataImpactRow): string {
    if (row.eccRecords <= 0) {
      return '0';
    }
    const raw = (100 * (row.eccRecords - row.s4Records)) / row.eccRecords;
    const rounded = Math.round(raw * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }
}
