export type KeyHighlightIcon =
  | 'modules'
  | 'features'
  | 'consolidation'
  | 'improvement'
  | 'plants'
  | 'users'
  | 'partners'
  | 'dataCleansing'
  | 'lob';

export interface KeyHighlightKpi {
  title: string;
  value: string;
  icon: KeyHighlightIcon;
}
