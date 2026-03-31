import { Component } from '@angular/core';
import { PROJECT_DISPLAY_DATA } from '../../core/data/project-display.data';
import { BrandedImageComponent } from '../../shared/branded-image/branded-image.component';

export type EcosystemPartnerIcon = 'chart' | 'bank' | 'link' | 'puzzle' | 'cube';

@Component({
  selector: 'app-partner-ecosystem-section',
  standalone: true,
  imports: [BrandedImageComponent],
  templateUrl: './partner-ecosystem-section.component.html',
  styleUrl: './partner-ecosystem-section.component.css'
})
export class PartnerEcosystemSectionComponent {
  readonly d = PROJECT_DISPLAY_DATA;

  readonly customerName = this.d.branding.customerName;
  readonly facilitatorName = this.d.branding.partnerName;

  readonly hubX = 50;
  readonly hubY = 57;
  readonly wireOriginY = 11;
  readonly orbitRadius = 37.5;

  get specialistPartners(): string[] {
    return this.d.partners.filter(
      (n) => n !== this.customerName && n !== this.facilitatorName
    );
  }

  satelliteLayout(): { name: string; x: number; y: number }[] {
    const names = this.specialistPartners;
    const n = names.length;
    if (n === 0) return [];
    const cx = this.hubX;
    const cy = this.hubY;
    const r = this.orbitRadius;
    return names.map((name, i) => {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      return {
        name,
        x: Math.round((cx + r * Math.cos(a)) * 100) / 100,
        y: Math.round((cy + r * Math.sin(a)) * 100) / 100
      };
    });
  }

  iconForPartner(name: string): EcosystemPartnerIcon {
    const u = name.toUpperCase();
    if (u.includes('POWER')) return 'chart';
    if (u.includes('CASH') || u.includes('BANK') || u.includes('SBI') || u.includes('IDBI')) {
      return 'bank';
    }
    if (u.includes('PROCOL') || u.includes('PRIMUS')) return 'puzzle';
    if (u.includes('MIX') || u.includes('DNA') || u.includes('RAIN')) return 'cube';
    return 'link';
  }

  get diagramAriaLabel(): string {
    const specs = this.specialistPartners.join(', ');
    return `Network diagram: ${this.facilitatorName} and ${this.customerName} connect to specialist partners ${specs}.`;
  }
}
