import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  RowData,
  SortingState,
  TableFeatures,
} from "@tanstack/react-table";
import { Atom } from "@tanstack/react-store";

export type DataGridProcessState = "client" | "server";
export type DataGridColumnDef<TData extends RowData> = ColumnDef<TableFeatures, TData>;

//sorting
export interface DataGridSortingBaseProps {
  enabled: boolean;
  mode: DataGridProcessState;
}

export interface DataGridSortingStateProps extends DataGridSortingBaseProps {
  strategy: "state";
  state?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

export interface DataGridSortingAtomProps extends DataGridSortingBaseProps {
  strategy: "atom";
  atom?: Atom<SortingState>;
}

export type DataGridSortingProps = DataGridSortingStateProps | DataGridSortingAtomProps;

//pagination
export interface DataGridPaginationBaseProps {
  enabled: boolean;
  mode: DataGridProcessState;
}

export interface DataGridPaginationStateProps extends DataGridPaginationBaseProps {
  strategy: "state";
  state?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export interface DataGridPaginationAtomProps extends DataGridPaginationBaseProps {
  strategy: "atom";
  atom?: Atom<PaginationState>;
}

export type DataGridPaginationProps = DataGridPaginationStateProps | DataGridPaginationAtomProps;

//DataGrid
export interface DataGridOptionProps {
  sorting?: DataGridSortingProps;
  pagination?: DataGridPaginationProps;
}

export interface DataGridProps<TData extends RowData> extends DataGridOptionProps {
  data: TData[];
  columns: DataGridColumnDef<TData>[];
}
