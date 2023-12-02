import React, { useEffect } from "react";
import useTableConfig from "@/components/overview/table/useTableConfig";
import useGetUsers from "@/api/users/useGetUsers";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/users/userTable.coldef";

const UserTable: React.FC = () => {
  const {
    handlePaginationModelChange,
    // handleFilterModelChange,
    pageNumber,
    pageSize,
    query,
  } = useTableConfig();

  const { request } = useGetUsers({ query, pageSize, pageNumber });
  const { users } = useSelector((store: Store) => store.userOverview);

  useEffect(() => {
    request();
  }, [query, pageSize, pageNumber]);

  return (
    <Table
      rows={users}
      // @ts-ignore
      columns={createColumns(() => request()) ?? []}
      title={"Übersicht Nutzer:innen"}
    />
  );
};

export default UserTable;
