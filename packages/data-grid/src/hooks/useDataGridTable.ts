import { RowData, useTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataGridProps } from "../types/data-grid-props";
import { createDataGridFeatures } from "../utils/create-data-grid-features";
import { normalizeDataGridProps } from "../utils/normalize-data-grid-props";

export function useDataGrid<TData extends RowData>(props: DataGridProps<TData>) {
  const features = useMemo(() => createDataGridFeatures(props), [props]);
  const normalizedProps = useMemo(() => normalizeDataGridProps(props), [props]);

  return useTable({
    features,
    data: props.data,
    columns: props.columns,

    state: {
      ...(normalizedProps.sorting.enabled &&
        normalizedProps.sorting.strategy === "state" && {
          sorting: normalizedProps.sorting.state,
        }),
      ...(normalizedProps.pagination.enabled &&
        normalizedProps.pagination.strategy === "state" && {
          pagination: normalizedProps.pagination.state,
        }),
    },

    atoms: {
      ...(normalizedProps.sorting.enabled &&
        normalizedProps.sorting.strategy === "atom" && {
          sorting: normalizedProps.sorting.atom,
        }),
      ...(normalizedProps.pagination.enabled &&
        normalizedProps.pagination.strategy === "atom" && {
          pagination: normalizedProps.pagination.atom,
        }),
    },

    enableSorting: normalizedProps.sorting.enabled,
    ...(normalizedProps.sorting.enabled &&
      normalizedProps.sorting.strategy === "state" && {
        onSortingChange: normalizedProps.sorting.onSortingChange,
      }),
    ...(normalizedProps.pagination.enabled &&
      normalizedProps.pagination.strategy === "state" && {
        onPaginationChange: normalizedProps.pagination.onPaginationChange,
      }),
  });
}
