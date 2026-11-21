import { RowData } from "@tanstack/react-table";
import { DEFAULT_DATAGRID_PAGINATION, DEFAULT_DATAGRID_SORTING } from "../config/config";
import { DataGridProps } from "../types/data-grid-props";

export function normalizeDataGridProps<TData extends RowData>(props: DataGridProps<TData>) {
  return {
    ...props,
    sorting: props.sorting ?? DEFAULT_DATAGRID_SORTING,
    pagination: props.pagination ?? DEFAULT_DATAGRID_PAGINATION,
  };
}
