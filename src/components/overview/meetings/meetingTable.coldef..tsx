import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetMeetingResponse } from "@/@types/scheduling";
import ActionMenu from "@/components/common/ActionMenu";
import ViewAppointment from "@/components/overview/meetings/ViewAppointment";

export const createColumns: () => GridColDef<GetMeetingResponse>[] = () => [
  { field: "id", alias: "" },
  { field: "timeFrameId", alias: "" },
  { field: "doctorUserId", alias: "" },
  { field: "date", alias: "" },
  { field: "startTime", alias: "" },
  { field: "endTime", alias: "" },
  { field: "state", alias: "" },
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
