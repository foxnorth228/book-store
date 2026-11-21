import { RowData } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { TablePagination, TableQuery, TableResponseData, TableSort } from "@org/contracts";
import { useQuery, UseQueryOptions, type QueryKey } from "@tanstack/react-query";

export interface DataGridSourceStateProps<TData extends RowData> {
  queryKey: QueryKey;
  queryFn: (
    params: TableQuery & {
      signal?: AbortSignal;
    },
  ) => Promise<TableResponseData<TData>>;
  options?: Omit<UseQueryOptions<TableResponseData<TData>, Error>, "queryKey" | "queryFn">;
}

export function useDataGridSourceState<TData extends RowData>(
  props: DataGridSourceStateProps<TData>,
) {
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
    ...(props.options ?? {}),
  });

  return { data: query.data, sorting, setSorting, pagination, setPagination };
}

export type DataGridSourceState = ReturnType<typeof useDataGridSourceState>;
