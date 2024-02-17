import React, { useEffect } from "react";
import useTableConfig from "@/components/overview/table/useTableConfig";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/centers/centerTable.coldef";
import useGetCenters from "@/api/centers/useGetCenters";

const CenterTable: React.FC = () => {
  const {
    handlePaginationModelChange,
    // handleFilterModelChange,
    pageNumber,
    pageSize,
    query,
  } = useTableConfig(true);

  const { request } = useGetCenters({ pageSize, pageNumber });
  const { centers } = useSelector((store: Store) => store.centerOverview);

  useEffect(() => {
    request();
  }, [query, pageSize, pageNumber]);

  return (
    <Table
      rows={centers}
      // @ts-ignore
      columns={createColumns(() => request()) ?? []}
      title={"Übersicht Zentren"}
      paginationMode="client"
    />
  );
};

export default CenterTable;
