import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetPrescriptionResponse } from "@/@types/prescription";
import { GetMeetingResponse } from "@/@types/scheduling";
import ActionMenu from "@/components/common/ActionMenu";
import ViewPrescription from "@/components/overview/prescriptions/ViewPrescription";

export const createColumns: () => GridColDef<GetPrescriptionResponse>[] =
  () => [
    { field: "id", alias: "" },
    { field: "patientId", alias: "" },
    { field: "professionalId", alias: "" },
    { field: "bodyWeight", alias: "" },
    { field: "bodyHeight", alias: "" },
    { field: "preparation", alias: "" },
    { field: "dosage", alias: "" },
    { field: "dosageUnit", alias: "" },
    { field: "risk", alias: "" },
    { field: "isAccepted", alias: "" },
    {
      field: "actions",
      headerName: "Aktionen",
      renderCell: (params: GridRenderCellParams<GetPrescriptionResponse>) => {
        const { id } = params.row;

        return (
          <ActionMenu>
            <ViewPrescription id={String(id)} />
          </ActionMenu>
        );
      },
    },
  ];
