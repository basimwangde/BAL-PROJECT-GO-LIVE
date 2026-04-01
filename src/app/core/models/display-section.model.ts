export type DisplaySectionId =
  | 'hero'
  | 'snapshot'
  | 'timeline'
  | 'customObjects'
  | 'dataImpact'
  | 'partners'
  | 'gallery'
  | 'closing';

export interface DisplaySection {
  id: DisplaySectionId;
  title: string;
  durationMs: number;
}

