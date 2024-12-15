import React, { useEffect } from "react";
import useTableConfig from "@/components/overview/table/useTableConfig";
import useGetUsers from "@/api/users/useGetUsers";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/users/userTable.coldef";

const UserTable: React.FC = () => {
  const { pageNumber, pageSize, query } = useTableConfig(true);

  const { request, response } = useGetUsers({ query, pageSize, pageNumber });

  useEffect(() => {
    request();
  }, [query, pageSize, pageNumber]);

  return (
    <Table
      rows={response}
      // @ts-ignore
      columns={createColumns(() => request()) ?? []}
      title={"Übersicht Nutzer"}
      paginationMode="client"
    />
  );
};

export default UserTable;
