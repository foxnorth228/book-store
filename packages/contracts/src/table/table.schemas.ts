import { z } from "zod";
import { FilterOperation, SortOrder } from "./table.types.js";

export const SortOrderSchema = z.enum(SortOrder);
export const FilterOperationSchema = z.enum(FilterOperation);

export const TableSortSchema = z.object({
  field: z.string().min(1),
  order: SortOrderSchema,
});

export const TableFilterSchema = z.object({
  field: z.string().min(1),
  operator: FilterOperationSchema,
  value: z.unknown().optional(),
});

export const TablePaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

export const TableSearchSchema = z.string().trim().optional();

export const TableQuerySchema = z.object({
  pagination: TablePaginationSchema,
  sorting: z.array(TableSortSchema).default([]),
  filters: z.array(TableFilterSchema).default([]),
  search: TableSearchSchema,
});

export const TableResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),

    pagination: z.object({
      page: z.number().int(),
      pageSize: z.number().int(),
      total: z.number().int(),
      totalPages: z.number().int(),
    }),
  });

export type TableQuery = z.infer<typeof TableQuerySchema>;
export type TableSort = z.infer<typeof TableSortSchema>;
export type TableFilter = z.infer<typeof TableFilterSchema>;
export type TablePagination = z.infer<typeof TablePaginationSchema>;
export type TableSearch = z.infer<typeof TableSearchSchema>;
export type TableResponse<T extends z.ZodType> = z.infer<typeof TableResponseSchema<T>>;
