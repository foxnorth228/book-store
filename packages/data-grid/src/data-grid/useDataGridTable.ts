import { RowData, useTable } from "@tanstack/react-table";

import { DataGridProps } from "./DataGrid.types";
import { createDataGridFeatures } from "./DataGrid.features";
import { useMemo } from "react";

export function useDataGridTable<TData extends RowData>(props: DataGridProps<TData>) {
  const features = useMemo(() => createDataGridFeatures(props), [props]);

  return useTable({
    features,
    data: props.dataSource,
    columns: props.columns,
    enableSorting: props.sorting.enabled,
  });
}
