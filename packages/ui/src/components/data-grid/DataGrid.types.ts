import { ColumnDef, RowData, TableFeatures } from "@tanstack/react-table";

export type DataGridProcessState = "client" | "server";
export type DataGridColumnDef<TData extends RowData> = ColumnDef<TableFeatures, TData>;

export interface DataGridSortingProps {
  mode: DataGridProcessState;
}

export interface DataGridOptionProps {
  sorting: DataGridSortingProps;
}

export interface DataGridProps<TData extends RowData> extends DataGridOptionProps {
  data: TData[];
  columns: DataGridColumnDef<TData>[];
}
