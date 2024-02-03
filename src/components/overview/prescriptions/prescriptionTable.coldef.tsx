import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetPrescriptionResponse } from "@/@types/prescription";
import ActionMenu from "@/components/common/ActionMenu";
import ViewPrescription from "@/components/overview/prescriptions/ViewPrescription";

type NameResolveFn = ({ id }: { id: string }) => Promise<string>;
export const createColumns: (
  resolveName: NameResolveFn,
) => GridColDef<GetPrescriptionResponse>[] = (resolveName: NameResolveFn) => [
  { field: "createdAt", headerName: "Erstellt am" },
  {
    field: "patientId",
    headerName: "",
    valueGetter: (params: GridRenderCellParams<GetPrescriptionResponse>) => {
      return "test test";
    },
  },
  { field: "professionalId", headerName: "" },
  { field: "bodyWeight", headerName: "Gewicht" },
  { field: "bodyHeight", headerName: "Größe" },
  { field: "preparation", headerName: "Zubereitung" },
  { field: "dosage", headerName: "Dosis" },
  { field: "dosageUnit", headerName: "Dosis Einheit" },
  { field: "risk", headerName: "Risiko" },
  {
    field: "isAccepted",
    headerName: "Freigegeben",
    valueGetter: (params: GridRenderCellParams<GetPrescriptionResponse>) => {
      return params.row.isAccepted ? "Ja" : "Nein";
    },
    renderCell: (params: GridRenderCellParams<GetPrescriptionResponse>) => {
      return params.row.isAccepted ? "Ja" : "Nein";
    },
  },
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
