import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetMeetingResponse } from "@/@types/scheduling";
import ActionMenu from "@/components/common/ActionMenu";
import ViewAppointment from "@/components/overview/meetings/ViewAppointment";
import {
  MEETING_STATES,
  meetingTranslations,
} from "@/components/overview/meetings/meeting.types";
import logger from "@/core/logger";
import { getTimeFormat } from "@/dayjs";

export const createColumns: () => GridColDef<GetMeetingResponse>[] = () =>
  [
    // { field: "id", headerName: "" },
    // { field: "timeFrameId", headerName: "" },
    // { field: "doctorUserId", headerName: "" },
    {
      field: "date",
      headerName: "Datum",
      type: "date",
      valueGetter: ({ value }: { value: any }) => value && new Date(value),
    },
    {
      field: "startTime",
      headerName: "Beginn",
      valueGetter: ({ value }: { value: any }) => getTimeFormat(value),
    },
    {
      field: "endTime",
      headerName: "Ende",
      valueGetter: ({ value }: { value: any }) => getTimeFormat(value),
    },
    {
      type: "singleSelect",
      valueOptions: MEETING_STATES,
      field: "state",
      headerName: "Stand",
      valueGetter: (params: GridRenderCellParams<GetMeetingResponse>) => {
        // @ts-ignore
        return meetingTranslations[params.row.state];
      },
      renderCell: (params: GridRenderCellParams<GetMeetingResponse>) => {
        // @ts-ignore
        return meetingTranslations[params.row.state];
      },
    },
    {
      field: "actions",
      type: "actions",
      renderCell: (params: GridRenderCellParams<GetMeetingResponse>) => {
        const { id } = params.row;

        return (
          <ActionMenu>
            <ViewAppointment id={String(id)} />
          </ActionMenu>
        );
      },
    },
  ].map((coldef) => {
    const colAddition = { filterable: false, sortable: false, minWidth: 250 };
    if (coldef.field === "date") {
      colAddition.sortable = true;
    }
    if (coldef.field === "state") {
      colAddition.filterable = true;
      logger.log("filter state");
    }
    if (coldef.field === "actions") {
      colAddition.minWidth = 50;
    }
    return { ...coldef, ...colAddition };
  });
