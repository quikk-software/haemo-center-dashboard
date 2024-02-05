import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/meetings/meetingTable.coldef";

import logger from "@/core/logger";
import useGetAllMeetings from "@/api/scheduling/useGetAllMeetings";
import {
  setMeetingTableFilter,
  setMeetingTableSort,
} from "@/components/overview/meetings/meetingSlice";

const MeetingOverview: React.FC = () => {
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
  const { request } = useGetAllMeetings();
  const { allMeetings, meetingTableFilter, meetingTableSort } = useSelector(
    (store: Store) => store.meetings,
  );

  const reloadData = useCallback(
    (sort: "asc" | "desc" | undefined = undefined) =>
      request({ pageSize, pageNumber, sort }),
    [pageSize, pageNumber],
  );

  useEffect(() => {
    // Leerer String, damit yup keine faxen macht
    request({ pageSize, pageNumber, state: "" });

    return () => {
      dispatch(setMeetingTableSort());
      dispatch(setMeetingTableFilter(""));
    };
  }, []);

  return (
    <Table
      rows={allMeetings}
      // @ts-ignore
      columns={createColumns((resolveName) => request()) ?? []}
      title={"Übersicht Termine"}
      onPaginationModelChange={(model, details) => {
        request({
          pageSize: model.pageSize,
          pageNumber: model.page,
          sort: meetingTableSort,
          state: meetingTableFilter,
        });
      }}
      onSortModelChange={(model) => {
        const sort = model.find((m) => m.field === "date")?.sort ?? undefined;
        dispatch(setMeetingTableSort(sort));
        request({
          pageSize,
          pageNumber,
          sort,
          state: meetingTableFilter,
        });
      }}
      onFilterModelChange={(model) => {
        logger.debug({ model });
        const state = model.items.find((i) => i.field === "state")?.value ?? "";

        logger.debug({ state });
        dispatch(setMeetingTableFilter(state));
        request({
          pageSize,
          pageNumber,
          sort: meetingTableSort,
          state,
        });
      }}
    />
  );
};

export default MeetingOverview;
