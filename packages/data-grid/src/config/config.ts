import { DataGridPaginationProps, DataGridSortingProps } from "../types/data-grid-props";

export const DEFAULT_DATAGRID_SORTING = {
  enabled: false,
  mode: "server",
  strategy: "state",
  state: [],
} satisfies DataGridSortingProps;

export const DEFAULT_DATAGRID_PAGINATION = {
  enabled: false,
  mode: "server",
  strategy: "state",
  state: {
    pageIndex: 0,
    pageSize: 10,
  },
} satisfies DataGridPaginationProps;
