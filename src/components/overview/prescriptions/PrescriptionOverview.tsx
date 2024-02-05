import React, { useCallback, useEffect } from "react";
import useTableConfig from "@/components/overview/table/useTableConfig";
import useGetUsers from "@/api/users/useGetUsers";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/prescriptions/prescriptionTable.coldef";
import useGetAllPrescriptions from "@/api/prescriptions/useGetAllPrescriptions";
import {
  GridColDef,
  GridPaginationModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useResolveSchedulingProfessionalName } from "@/api/scheduling/useResolveSchedulingUserName";
import {
  setPrescriptionTableFilter,
  setPrescriptionTableSort,
} from "@/components/overview/prescriptions/prescriptionSlice";
import logger from "@/core/logger";
import {
  setMeetingTableFilter,
  setMeetingTableSort,
} from "@/components/overview/meetings/meetingSlice";

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

  const dispatch = useDispatch();
  const { request } = useGetAllPrescriptions();
  const { allPrescriptions, prescriptionTableFilter, prescriptionTableSort } =
    useSelector((store: Store) => store.prescriptions);

  const reloadData = useCallback(
    (sort: "asc" | "desc" | undefined = undefined) =>
      request({ pageSize, pageNumber, sort }),
    [pageSize, pageNumber],
  );

  useEffect(() => {
    request({ pageSize, pageNumber });

    return () => {
      dispatch(setPrescriptionTableSort());
      dispatch(setPrescriptionTableFilter());
    };
  }, []);

  return (
    <Table
      rows={allPrescriptions}
      // @ts-ignore
      columns={createColumns((resolveName) => request()) ?? []}
      title={"Übersicht Rezepte"}
      onPaginationModelChange={(model, details) => {
        request({
          pageSize: model.pageSize,
          pageNumber: model.page,
          sort: prescriptionTableSort,
          isAccepted: prescriptionTableFilter,
        });
      }}
      onSortModelChange={(model) => {
        const sort =
          model.find((m) => m.field === "createdAt")?.sort ?? undefined;
        dispatch(setPrescriptionTableSort(sort));
        request({
          pageSize,
          pageNumber,
          sort,
          isAccepted: prescriptionTableFilter,
        });
      }}
      onFilterModelChange={(model) => {
        logger.debug({ model });
        const isAcceptedFilter = model.items.find(
          (i) => i.field === "isAccepted",
        )?.value;
        const isAccepted =
          isAcceptedFilter === "" || isAcceptedFilter === undefined
            ? undefined
            : Boolean(isAcceptedFilter === "true");
        logger.debug({ isAccepted });
        dispatch(setPrescriptionTableFilter(isAccepted));
        request({
          pageSize,
          pageNumber,
          sort: prescriptionTableSort,
          isAccepted,
        });
      }}
    />
  );
};

export default PrescriptionOverview;
