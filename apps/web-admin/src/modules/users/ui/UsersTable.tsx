import { DataGrid } from "@org/data-grid";
import { FC } from "react";

type UsersTableProps = object;

export const UsersTable: FC<UsersTableProps> = () => {
  // const tableProps = useDataGridSource({
  //   queryKey: ["test"],
  //   queryFn: async () => {
  //     return {
  //       items: [],
  //       pagination: {
  //         page: 1,
  //         pageSize: 20,
  //         total: 0,
  //         totalPages: 1,
  //       },
  //     };
  //   },
  // });

  return <DataGrid data={[]} columns={[]}></DataGrid>;
};
