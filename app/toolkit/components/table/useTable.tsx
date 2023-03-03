import { useFilteredItemsByText } from "~/toolkit/hooks/useFilteredItemsByText";
import {
  PagingContext,
  usePagedItems,
  usePagingStats,
} from "~/toolkit/hooks/usePaging";
import { SortDirType, useSorting } from "~/toolkit/hooks/useSorting";

interface UseTableProps {
  filterKeys?: string[];
  sortKey: string;
  sortDir?: SortDirType;
  initialPage?: number;
  pageSize?: number;
  shallow?: boolean;
  initialFilter?: string;
}

interface TableStats {
  totalItems: number;
  start: number;
  end: number;
}

export interface UseTableResult<T> {
  showingItems: T[];
  sorting: Omit<ReturnType<typeof useSorting>, "sortedItems">;
  paging: PagingContext;
  filtering: Omit<ReturnType<typeof useFilteredItemsByText>, "filteredItems">;
  stats: TableStats;
}

// Based off of https://codesandbox.io/s/compount-components-with-a-hook-txolo?from-embed=&file=/table/table.hooks.js:0-844
export function useTable<T>(
  allItems: T[],

  {
    filterKeys = [],
    sortKey,
    sortDir = "asc",
    initialPage = 1,
    pageSize = 25,
    shallow = false,
    initialFilter = "",
  }: UseTableProps
) {
  const { filteredItems, ...filtering } = useFilteredItemsByText(
    allItems,
    filterKeys,
    initialFilter
  );

  const { sortedItems, ...sorting } = useSorting(filteredItems, {
    sortKey,
    sortDir,
  });

  pageSize = pageSize || allItems.length;
  const [showingItems, paging] = usePagedItems(sortedItems, pageSize, {
    initialPage,
    shallow,
  });

  const stats = usePagingStats(
    sortedItems.length,
    pageSize,
    paging.currentPage
  );

  return {
    showingItems,
    sorting,
    paging,
    filtering,
    stats,
  } as UseTableResult<T>;
}

interface TableQueryParams {
  page?: string;
  sortKey?: string;
  sortDir?: string;
  filter?: string;
}
