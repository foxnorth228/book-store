import { useCreateAtom } from "@tanstack/react-store";
import type { SortingState, PaginationState } from "@tanstack/react-table";

export function useDataGridAtoms() {
  const sortingAtom = useCreateAtom<SortingState>([]);

  const paginationAtom = useCreateAtom<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  return {
    sorting: sortingAtom,
    pagination: paginationAtom,
  };
}
