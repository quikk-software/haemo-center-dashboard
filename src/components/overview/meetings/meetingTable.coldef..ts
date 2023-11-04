import { GridColDef } from "@mui/x-data-grid";
import { GetMeetingResponse } from "@/@types/scheduling";

export const createColumns: () => GridColDef<GetMeetingResponse>[] = () => [
  { field: "id", alias: "" },
  { field: "timeFrameId", alias: "" },
  { field: "doctorUserId", alias: "" },
  { field: "date", alias: "" },
  { field: "startTime", alias: "" },
  { field: "endTime", alias: "" },
  { field: "state", alias: "" },
];
