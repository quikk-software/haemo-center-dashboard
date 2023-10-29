import { GridColDef } from "@mui/x-data-grid";
import { GetPrescriptionResponse } from "@/@types/prescription";

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
  ];
