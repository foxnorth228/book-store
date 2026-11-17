import { RowData, useTable } from "@tanstack/react-table";

import { DataGridProps } from "./DataGrid.types";
import { createDataGridFeatures } from "./DataGrid.features";
import { useMemo } from "react";

export function useDataGridTable<TData extends RowData>(props: DataGridProps<TData>) {
  const features = useMemo(() => createDataGridFeatures(props), [props]);

  return useTable({
    features,
    data: props.data,
    columns: props.columns,

    state: {
      ...(props.sorting.enabled &&
        props.sorting.strategy === "state" && {
          sorting: props.sorting.state,
        }),
    },

    atoms: {
      ...(props.sorting.enabled &&
        props.sorting.strategy === "atom" && {
          sorting: props.sorting.atom,
        }),
    },

    enableSorting: props.sorting.enabled,
    ...(props.sorting.enabled &&
      props.sorting.strategy === "state" && {
        onSortingChange: props.sorting.onSortingChange,
      }),
  });
}
