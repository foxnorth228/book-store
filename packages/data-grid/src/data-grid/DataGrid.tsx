import { memo } from "react";
import { flexRender, type RowData } from "@tanstack/react-table";

import { Table } from "@org/ui";

import { useDataGrid } from "../hooks/useDataGridTable";
import type { DataGridProps } from "../types/data-grid-props";

function DataGridComponent<TData extends RowData>(props: DataGridProps<TData>) {
  const table = useDataGrid(props);

  return (
    <Table>
      <Table.Header>
        {table.getHeaderGroups().map((hg) => (
          <Table.Row key={hg.id}>
            {hg.headers.map((header) => (
              <Table.Cell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export const DataGrid = memo(DataGridComponent) as typeof DataGridComponent;
