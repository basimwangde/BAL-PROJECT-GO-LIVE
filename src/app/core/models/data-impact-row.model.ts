/** Master data row for the Data simplification slide (ECC → S/4 record footprint). */
export type DataImpactIcon = 'customer' | 'material' | 'vendor';

export interface DataImpactRow {
  label: string;
  /** Shown in the ECC column (e.g. "85K (ECC)") */
  from: string;
  /** Shown in the S/4 column (e.g. "35K (S/4)") */
  to: string;
  /** Approximate active master record count on ECC (for bar ratio only). */
  eccRecords: number;
  /** Approximate count on S/4HANA after simplification. */
  s4Records: number;
  icon: DataImpactIcon;
}
