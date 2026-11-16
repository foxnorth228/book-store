import {
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";
import { DataGridOptionProps } from "./DataGrid.types";

export const createDataGridFeatures = ({ sorting }: DataGridOptionProps) => {
  return tableFeatures({
    ...(sorting.enabled && {
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
  });
};
