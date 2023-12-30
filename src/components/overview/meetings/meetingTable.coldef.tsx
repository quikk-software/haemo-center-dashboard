import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetMeetingResponse } from "@/@types/scheduling";
import ActionMenu from "@/components/common/ActionMenu";
import ViewAppointment from "@/components/overview/meetings/ViewAppointment";
import { GetPrescriptionResponse } from "@/@types/prescription";
import { meetingTranslations } from "@/components/overview/meetings/meeting.types";
import { MeetingState } from "@/components/overview/meetings/meetingSlice";

export const createColumns: () => GridColDef<GetMeetingResponse>[] = () => [
  // { field: "id", headerName: "" },
  // { field: "timeFrameId", headerName: "" },
  // { field: "doctorUserId", headerName: "" },
  { field: "date", headerName: "Datum" },
  { field: "startTime", headerName: "Beginn" },
  { field: "endTime", headerName: "Ende" },
  {
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
    headerName: "Aktionen",
    renderCell: (params: GridRenderCellParams<GetMeetingResponse>) => {
      const { id } = params.row;

      return (
        <ActionMenu>
          <ViewAppointment id={String(id)} />
        </ActionMenu>
      );
    },
  },
];
