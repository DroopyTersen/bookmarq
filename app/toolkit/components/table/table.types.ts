import { SortDirType } from "../hooks/useSorting";

export interface SortProps {
  onSort: (sortKey: string) => void;
  sortKey: string;
  sortDir: SortDirType;
}
