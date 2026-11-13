import { tableFeatures } from "@tanstack/react-table";
import { DataGridOptionProps } from "./DataGrid.types";

export const createDataGridFeatures = (options: DataGridOptionProps) => {
  return tableFeatures({});
};
