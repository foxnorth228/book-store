import { RowData } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { TablePagination, TableQuery, TableResponseData, TableSort } from "@org/contracts";
import { useQuery, UseQueryOptions, type QueryKey } from "@tanstack/react-query";

export interface DataGridSourceProps<TData extends RowData> {
  queryKey: QueryKey;
  queryFn: (
    params: TableQuery & {
      signal: AbortSignal;
    },
  ) => Promise<TableResponseData<TData>>;
  options: Omit<UseQueryOptions<TableResponseData<TData>, Error>, "queryKey" | "queryFn">;
}

export function useDataGridSource<TData extends RowData>(props: DataGridSourceProps<TData>) {
  const [sorting, setSorting] = useState<TableSort[]>([]);
  const [pagination, setPagination] = useState<TablePagination>({
    page: 1,
    pageSize: 10,
  });

  const params: TableQuery = useMemo(() => {
    return {
      sorting,
      pagination,
      filters: [],
    };
  }, [sorting, pagination]);

  const query = useQuery({
    queryKey: [...props.queryKey, params],
    queryFn: ({ signal }) =>
      props.queryFn({
        ...params,
        signal,
      }),
    ...props.options,
  });

  return { ...query, sorting, setSorting, pagination, setPagination };
}

export type DataGridSource = ReturnType<typeof useDataGridSource>;
