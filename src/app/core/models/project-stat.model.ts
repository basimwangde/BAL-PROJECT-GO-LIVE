/** Icons for remediation / custom-object stat cards (custom-objects-section). */
export type ProjectStatIcon =
  | 'report'
  | 'functionModule'
  | 'transaction'
  | 'table'
  | 'smartForm'
  | 'grandTotal';

export interface ProjectStat {
  label: string;
  value: number;
  suffix?: string;
  icon?: ProjectStatIcon;
}
