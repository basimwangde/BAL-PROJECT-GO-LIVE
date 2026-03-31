import type { DisplaySection } from '../models/display-section.model';
import type { GalleryImage } from '../models/gallery-image.model';
import type { ProjectStat } from '../models/project-stat.model';

export interface DisplayConfig {
  autoplay: {
    enabled: boolean;
    defaultSectionDurationMs: number;
    transitionMs: number;
  };
  branding: {
    customerName: string;
    partnerName: string;
    projectName: string;
    /** Full line for secondary slides */
    landscapeMigration: string;
    kickoffDateLabel: string;
    goLiveDateLabel: string;
    kickoffDateDisplay: string;
    goLiveDateDisplay: string;
    /** Opening story beats */
    heroEyebrow: string;
    transformationWord: string;
    heroTagline: string;
    migrationPrimary: string;
    migrationSecondary: string;
    logos: {
      baramati: string;
      percipere: string;
      parivartan: string;
    };
  };
  sections: DisplaySection[];
  /** S/4 vs ECC — key highlights shown as staggered “bubbles” on the snapshot slide */
  s4HighlightsSection: {
    slideKicker: string;
    title: string;
    lead: string;
    /** Delay between each bubble entrance (ms) */
    itemStaggerMs: number;
    /**
     * Must stay in sync with `.bubble` pop animation length in
     * `transformation-snapshot.component.css` (snapBubblePop).
     */
    bubbleEntranceDurationMs: number;
    /** Autoplay waits this long after the last bubble finishes entering */
    holdAfterLastBubbleMs: number;
    items: string[];
  };
  timeline: Array<{ label: string; dateHint?: string }>;
  technical: {
    headline: string;
    subheadline: string;
    bullets: string[];
    interfaces: string[];
  };
  customObjectStats: ProjectStat[];
  dataImpact: Array<{ label: string; from: string; to: string }>;
  /** Flat list: customer, implementation partner, then specialist partners (used by Ecosystem slide). */
  partners: string[];
  ecosystemSlide: {
    slideKicker: string;
    title: string;
    lead: string;
    facilitatorCaption: string;
    hubCaption: string;
    satelliteCaption: string;
  };
  gallery: {
    rotateEveryMs: number;
    images: GalleryImage[];
  };
}

const DEFAULT_DURATION = 10_000;

const s4HighlightsSection: DisplayConfig['s4HighlightsSection'] = {
  slideKicker: 'Capability spotlight',
  title: 'New on S/4HANA',
  lead:
    'Key structural changes and capabilities now live on SAP S/4HANA — areas that were missing, limited, or materially different on SAP ECC.',
  itemStaggerMs: 1000,
  bubbleEntranceDurationMs: 800,
  holdAfterLastBubbleMs: 3000,
  items: [
    'Re-org from 15 Company Codes to 7 Company Codes',
    'Project System',
    'Plant Maintenance',
    'COPA (Product & Customer)',
    'Costing',
    'MRP',
    'Batch Management',
    'CPP Revamp',
    'Sales Rebate',
    'Credit Management',
    'New Service Procurement'
  ]
};

const snapshotSlideDurationMs =
  s4HighlightsSection.items.length > 0
    ? (s4HighlightsSection.items.length - 1) * s4HighlightsSection.itemStaggerMs +
      s4HighlightsSection.bubbleEntranceDurationMs +
      s4HighlightsSection.holdAfterLastBubbleMs
    : DEFAULT_DURATION;

export const PROJECT_DISPLAY_DATA: DisplayConfig = {
  autoplay: {
    enabled: true,
    defaultSectionDurationMs: DEFAULT_DURATION,
    transitionMs: 820
  },
  branding: {
    customerName: 'Baramati Agro',
    partnerName: 'Percipere Consulting',
    projectName: 'Project Parivartan',
    landscapeMigration: 'SAP ECC → SAP S/4HANA (RISE with SAP, 2023 FPS02)',
    heroEyebrow: 'Go-live celebration showcase',
    transformationWord: 'Transformation',
    heroTagline:
      'From legacy strength to intelligent enterprise — one program, one team, one clear north star.',
    migrationPrimary: 'SAP ECC → SAP S/4HANA',
    migrationSecondary: 'RISE with SAP · 2023 FPS02',
    kickoffDateLabel: 'Kick-off',
    goLiveDateLabel: 'Go-live',
    kickoffDateDisplay: '5 June 2025',
    goLiveDateDisplay: '1 April 2026',
    /** Logos under `src/assets/logos/` (PNG + program mark as JPG) */
    logos: {
      baramati: '/assets/logos/baramati-logo.png',
      percipere: '/assets/logos/percipere-logo.png',
      parivartan: '/assets/logos/project-parivartan-logo.jpg'
    }
  },
  sections: [
    { id: 'hero', title: 'The story opens', durationMs: 12_000 },
    { id: 'snapshot', title: 'S/4HANA highlights', durationMs: snapshotSlideDurationMs },
    { id: 'partners', title: 'Ecosystem', durationMs: 13_800 },
    { id: 'timeline', title: 'The journey', durationMs: 10_500 },
    { id: 'technical', title: 'Technical core', durationMs: 10_500 },
    { id: 'customObjects', title: 'Scale of change', durationMs: 11_000 },
    { id: 'dataImpact', title: 'Data impact', durationMs: 10_500 },
    { id: 'gallery', title: 'Moments that matter', durationMs: 11_000 },
    { id: 'closing', title: 'Applause', durationMs: 10_500 }
  ],
  s4HighlightsSection,
  timeline: [
    { label: 'Kick-off', dateHint: 'Jun 2025' },
    { label: 'Design / blueprint' },
    { label: 'Build / realization' },
    { label: 'Data cleansing & transformation' },
    { label: 'Custom code remediation' },
    { label: 'Testing & readiness' },
    { label: 'Cutover' },
    { label: 'Go-live', dateHint: 'Apr 2026' }
  ],
  technical: {
    headline: 'Technical heartbeat of the program',
    subheadline: 'A controlled move: cleanse, transform, reconcile, integrate — then cut over with confidence.',
    bullets: [
      'Landscape: SAP ECC to SAP S/4HANA on RISE (2023 FPS02)',
      'Data migration: cleansed & transformed via FUTUROOT, reconciliation & cutover',
      'Rule-based cleansing through the FUTUROOT ETL engine',
      'Re-org-aware transformation aligned to consolidated company codes'
    ],
    interfaces: [
      'LogicalDNA',
      'Zencon',
      'QA/QC',
      'SBI/IDBI',
      'BestMix',
      'Raintree',
      'Procol',
      'Cashflo',
      'Power BI'
    ]
  },
  customObjectStats: [
    { label: 'Program (ABAP Report)', value: 5064 },
    { label: 'Function module', value: 2779 },
    { label: 'Transaction code', value: 1593 },
    { label: 'Database table', value: 1158 },
    { label: 'Smart Form', value: 286 },
    { label: 'Grand total', value: 10880 }
  ],
  dataImpact: [
    { label: 'Material master', from: '85K (ECC)', to: '35K (S/4)' },
    { label: 'Customer', from: '2.25 lacs (ECC)', to: '1.60 lacs (S/4)' },
    { label: 'Vendor', from: '3.21 lacs (ECC)', to: '1.52 lacs (S/4)' }
  ],
  partners: [
    'Baramati Agro',
    'Percipere Consulting',
    'Raintree',
    'LogicalDNA',
    'PRIMUS',
    'Procol',
    'BestMix',
    'SBI Bank',
    'IDBI Bank',
    'Cashflo',
    'Power BI'
  ],
  ecosystemSlide: {
    slideKicker: 'Partner network',
    title: 'Ecosystem',
    lead:
      'Baramati Agro anchors the program at the center — specialist partners orbit the transformation — with Percipere Consulting orchestrating delivery and integration across the network.',
    facilitatorCaption: 'Implementation partner',
    hubCaption: 'Customer · program anchor',
    satelliteCaption: 'Specialist partners'
  },
  gallery: {
    rotateEveryMs: 2800,
    images: [
      { src: '/assets/project/photo-1.svg', alt: 'Project photo 1', caption: 'Workshops & alignment' },
      { src: '/assets/project/photo-2.svg', alt: 'Project photo 2', caption: 'Blueprint to build' },
      { src: '/assets/project/photo-3.svg', alt: 'Project photo 3', caption: 'Collaboration in action' },
      { src: '/assets/project/photo-4.svg', alt: 'Project photo 4', caption: 'Testing & readiness' },
      { src: '/assets/project/photo-5.svg', alt: 'Project photo 5', caption: 'Cutover planning' },
      { src: '/assets/project/photo-6.svg', alt: 'Project photo 6', caption: 'Go-live energy' },
      { src: '/assets/project/photo-7.svg', alt: 'Project photo 7', caption: 'Team moments' },
      { src: '/assets/project/photo-8.svg', alt: 'Project photo 8', caption: 'Celebrating execution' }
    ]
  }
};
