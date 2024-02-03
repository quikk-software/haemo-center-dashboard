import React, { useCallback, useEffect } from "react";
import useTableConfig from "@/components/overview/table/useTableConfig";
import useGetUsers from "@/api/users/useGetUsers";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/prescriptions/prescriptionTable.coldef";
import useGetAllPrescriptions from "@/api/prescriptions/useGetAllPrescriptions";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useResolveSchedulingProfessionalName } from "@/api/scheduling/useResolveSchedulingUserName";

const PrescriptionOverview: React.FC = () => {
  const {
    tableSettings: {
      pageSize,
      pageNumber,
      hasNextPage,
      hasPreviousPage,
      count,
    },
  } = useSelector((state: Store) => state.table);

  const { request } = useGetAllPrescriptions();
  const { request: resolveName } = useResolveSchedulingProfessionalName();
  const { allPrescriptions } = useSelector(
    (store: Store) => store.prescriptions,
  );

  useEffect(() => {
    request({ pageSize, pageNumber });
  }, []);

  return (
    <Table
      rows={allPrescriptions}
      // @ts-ignore
      columns={createColumns((resolveName) => request()) ?? []}
      title={"Übersicht Rezepte"}
      onPaginationModelChange={(model, details) =>
        request({ pageSize: model.pageSize, pageNumber: model.page })
      }
    />
  );
};

export default PrescriptionOverview;
