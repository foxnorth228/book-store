import {
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";
import { DataGridOptionProps } from "../types/data-grid-props";

export const createDataGridFeatures = ({ sorting, pagination }: DataGridOptionProps) => {
  return tableFeatures({
    ...(sorting?.enabled && {
      rowSortingFeature,
      sortFns: {
        alphanumeric: sortFn_alphanumeric,
        text: sortFn_text,
        datetime: sortFn_datetime,
      },
      ...(sorting.mode === "client"
        ? { sortedRowModel: createSortedRowModel() }
        : { manualSorting: true }),
    }),
    ...(pagination?.enabled && {
      rowPaginationFeature,
      ...(pagination.mode === "client"
        ? { paginatedRowModel: createPaginatedRowModel() }
        : { manualPagination: true }),
    }),
  });
};
