import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetPrescriptionResponse } from "@/@types/prescription";
import ActionMenu from "@/components/common/ActionMenu";
import ViewPrescription from "@/components/overview/prescriptions/ViewPrescription";

export const createColumns: () => GridColDef<GetPrescriptionResponse>[] = () =>
  [
    {
      field: "createdAt",
      headerName: "Erstellt am",
      type: "dateTime",
      valueGetter: ({ value }: { value: any }) => value && new Date(value),
    },
    {
      field: "bodyWeight",
      headerName: "Gewicht",
      filterable: false,
      sortable: false,
    },
    { field: "bodyHeight", headerName: "Größe" },
    { field: "preparation", headerName: "Zubereitung" },
    { field: "dosage", headerName: "Dosis" },
    { field: "dosageUnit", headerName: "Dosis Einheit" },
    { field: "risk", headerName: "Risiko" },
    {
      type: "boolean",
      field: "isAccepted",
      headerName: "Freigegeben",
      valueGetter: (params: GridRenderCellParams<GetPrescriptionResponse>) => {
        return params.row.isAccepted;
      },
      renderCell: (params: GridRenderCellParams<GetPrescriptionResponse>) => {
        return params.row.isAccepted ? "Ja" : "Nein";
      },
    },
    {
      field: "actions",
      type: "actions",
      renderCell: (params: GridRenderCellParams<GetPrescriptionResponse>) => {
        const { id } = params.row;

        return (
          <ActionMenu>
            <ViewPrescription id={String(id)} />
          </ActionMenu>
        );
      },
    },
  ].map((coldef) => {
    const colAddition = { filterable: false, sortable: false };
    if (coldef.field === "createdAt") {
      colAddition.sortable = true;
    }
    if (coldef.field === "isAccepted") {
      colAddition.filterable = true;
    }
    return { ...coldef, ...colAddition };
  });
