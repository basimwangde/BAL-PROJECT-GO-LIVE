import type { DisplaySection } from '../models/display-section.model';
import type { DataImpactRow } from '../models/data-impact-row.model';
import type { GalleryImage } from '../models/gallery-image.model';
import type { KeyHighlightKpi } from '../models/key-highlight-kpi.model';
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
  timeline: Array<{ label: string; dateHint?: string; summary?: string }>;
  customObjectStats: ProjectStat[];
  dataImpact: DataImpactRow[];
  /** Data simplification slide — spotlight rotation timing */
  dataImpactSection: {
    rotateEveryMs: number;
  };
  /** Program outcomes — slide after hero (all KPIs visible, staggered entrance) */
  keyHighlightsSection: {
    slideKicker: string;
    title: string;
    lead: string;
    /** Delay between each KPI’s entrance animation (ms); pass to CSS --kh-stagger. */
    itemStaggerMs: number;
    kpis: KeyHighlightKpi[];
  };
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
    'Re-organization',
    'Project System',
    'Plant Maintenance',
    'COPA Redesign',
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

/** Stagger between KPI row animations (must match `.kh__item` delay usage). */
const KEY_HIGHLIGHT_STAGGER_MS = 420;
/** Approximate row entrance length in `key-highlights-section.component.css` (kh-row-in). */
const KEY_HIGHLIGHT_ROW_ENTRANCE_MS = 580;
const KEY_HIGHLIGHT_HOLD_AFTER_MS = 5_000;

const KEY_HIGHLIGHT_KPIS: KeyHighlightKpi[] = [
  { title: 'New modules implemented', value: '5', icon: 'modules' },
  { title: 'New features activated', value: '10', icon: 'features' },
  { title: 'Company code consolidation', value: '15 → 7', icon: 'consolidation' },
  { title: 'Improvement areas covered', value: '37', icon: 'improvement' },
  { title: 'Plants covered', value: '310', icon: 'plants' },
  { title: 'Users covered', value: '407', icon: 'users' },
  { title: 'Implementation partners', value: '10', icon: 'partners' },
  { title: 'Master Objects cleansed', value: '25', icon: 'dataCleansing' },
  { title: 'LoB Solution Redesigned', value: '2', icon: 'lob' }
];

const keyHighlightsSlideDurationMs =
  KEY_HIGHLIGHT_KPIS.length > 0
    ? (KEY_HIGHLIGHT_KPIS.length - 1) * KEY_HIGHLIGHT_STAGGER_MS +
      KEY_HIGHLIGHT_ROW_ENTRANCE_MS +
      KEY_HIGHLIGHT_HOLD_AFTER_MS
    : DEFAULT_DURATION;

const DATA_IMPACT_ROTATE_MS = 4_200;
const DATA_IMPACT_HOLD_AFTER_MS = 4_500;

const DATA_IMPACT_ROWS: DataImpactRow[] = [
  {
    label: 'Customer master',
    from: '225K',
    to: '160K',
    eccRecords: 225_000,
    s4Records: 160_000,
    icon: 'customer'
  },
  {
    label: 'Material master',
    from: '85K',
    to: '35K',
    eccRecords: 85_000,
    s4Records: 35_000,
    icon: 'material'
  },
  {
    label: 'Vendor master',
    from: '321K',
    to: '152K',
    eccRecords: 321_000,
    s4Records: 152_000,
    icon: 'vendor'
  },
  {
    label: 'G/L accounts',
    from: '2K',
    to: '1K',
    eccRecords: 2_000,
    s4Records: 1_000,
    icon: 'material'
  },
  {
    label: 'Bill of material (BoM)',
    from: '6.5K',
    to: '2.5K',
    eccRecords: 6_500,
    s4Records: 2_500,
    icon: 'material'
  },
  {
    label: 'Routing',
    from: '60K',
    to: '8K',
    eccRecords: 60_000,
    s4Records: 8_000,
    icon: 'material'
  }
];

const dataImpactSlideDurationMs =
  DATA_IMPACT_ROWS.length * DATA_IMPACT_ROTATE_MS + DATA_IMPACT_HOLD_AFTER_MS;

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
      baramati: 'assets/logos/baramati-logo.png',
      percipere: 'assets/logos/percipere-logo.png',
      parivartan: 'assets/logos/project-parivartan-logo.jpg'
    }
  },
  sections: [
    { id: 'hero', title: 'The story opens', durationMs: 12_000 },
    { id: 'keyHighlights', title: 'Key highlights', durationMs: keyHighlightsSlideDurationMs },
    { id: 'snapshot', title: 'S/4HANA highlights', durationMs: snapshotSlideDurationMs },
    { id: 'partners', title: 'Ecosystem', durationMs: 13_800 },
    { id: 'timeline', title: 'The journey', durationMs: 10_500 },
    { id: 'customObjects', title: 'Scale of change', durationMs: 11_000 },
    { id: 'dataImpact', title: 'Data simplification', durationMs: dataImpactSlideDurationMs },
    { id: 'gallery', title: 'Moments that matter', durationMs: 11_000 },
    { id: 'closing', title: 'Applause', durationMs: 10_500 }
  ],
  keyHighlightsSection: {
    slideKicker: 'Highlights',
    title: 'Key highlights',
    lead: 'Program milestones and outcomes at a glance — from footprint and users to data and LoB.',
    itemStaggerMs: KEY_HIGHLIGHT_STAGGER_MS,
    kpis: KEY_HIGHLIGHT_KPIS
  },
  s4HighlightsSection,
  timeline: [
    {
      label: 'KICK-OFF',
      dateHint: 'Jun 2025',
      summary: 'Charter, governance, and joint teams aligned on scope and success measures.'
    },
    {
      label: 'DESIGN / BLUEPRINT',
      summary: 'Process fit, solution design, and a signed blueprint for S/4HANA.'
    },
    {
      label: 'BUILD / REALIZATION',
      summary: 'Configuration, extensions, and integrations brought together in the target landscape.'
    },
    {
      label: 'DATA CLEANSING & TRANSFORMATION WITH FUTUROOT',
      summary: 'Rule-based cleansing and re-org-aware loads through FUTUROOT into S/4.'
    },
    {
      label: 'CUSTOM CODE REMEDIATION',
      summary: 'ABAP and interfaces adjusted for compatibility and clean S/4 operations.'
    },
    {
      label: 'TESTING & READINESS',
      summary: 'End-to-end cycles, cutover rehearsal, and operational readiness sign-off.'
    },
    {
      label: 'CUTOVER',
      summary: 'Final sync, freeze, and controlled switch to the new digital core.'
    },
    {
      label: 'GO-LIVE',
      dateHint: 'Apr 2026',
      summary: 'Parivartan live on SAP S/4HANA — business on the new platform.'
    }
  ],
  customObjectStats: [
    { label: 'Program (ABAP Report)', value: 5064, icon: 'report' },
    { label: 'Function module', value: 2779, icon: 'functionModule' },
    { label: 'Transaction code', value: 1593, icon: 'transaction' },
    { label: 'Database table', value: 1158, icon: 'table' },
    { label: 'Smart Form', value: 286, icon: 'smartForm' },
    { label: 'RFC', value: 232, icon: 'rfc' },
    { label: 'Grand total', value: 11_112, icon: 'grandTotal' }
  ],
  dataImpact: DATA_IMPACT_ROWS,
  dataImpactSection: {
    rotateEveryMs: DATA_IMPACT_ROTATE_MS
  },
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
    'Power BI',
    'ZENCON'
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
  /**
   * Slideshow timing + fallback list if `assets/project/gallery-manifest.json` is missing.
   * Prefer editing the manifest so new files in `assets/project/` are listed in one place.
   */
  gallery: {
    rotateEveryMs: 4000,
    images: [
      { src: 'assets/project/photo-1.jpg', alt: 'Project photo 1' },
      { src: 'assets/project/photo-2.jpg', alt: 'Project photo 2' },
      { src: 'assets/project/photo-3.jpg', alt: 'Project photo 3' },
      { src: 'assets/project/photo-4.jpg', alt: 'Project photo 4' },
      { src: 'assets/project/photo-5.jpg', alt: 'Project photo 5' },
      { src: 'assets/project/photo-6.png', alt: 'Project photo 6' },
      { src: 'assets/project/photo-7.png', alt: 'Project photo 7' },
      { src: 'assets/project/photo-8.jpeg', alt: 'Project photo 8' },
      { src: 'assets/project/photo-9.jpeg', alt: 'Project photo 9' }
    ]
  }
};
