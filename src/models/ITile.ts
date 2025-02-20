/**
 * Donnée des tuiles.
 */
export interface ITile {
  id: string;
  value: number;
  row: number;
  col: number;
  isNew: boolean;
  isMerged: boolean;
}
