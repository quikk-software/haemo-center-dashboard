import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";
import logger from "@/core/logger";

// Apply this to all columns
const columnMapper = (c: GridColDef): GridColDef => ({ ...c, flex: 1 });

export const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1" },
  { field: "col2", headerName: "Column 2" },
  {
    field: "status",
    headerName: "Status",
    valueGetter: (params: GridValueGetterParams) => {
      const { verified, inactive } = params.row;
      return inactive ? "Inaktiviert" : verified ? "Verifiziert" : "Ausstehend";
    },
    renderCell: (params: GridRenderCellParams) => {
      const { verified, inactive } = params.row;

      return (
        <Chip
          color={inactive ? "error" : verified ? "success" : "info"}
          label={
            inactive ? "Inaktiviert" : verified ? "Verifiziert" : "Ausstehend"
          }
          key={`${params.id}-chip`}
        />
      );
    },
  },
  {
    field: "action",
    headerName: "Aktion",
    valueGetter: (params: GridValueGetterParams) => {
      const { verified, inactive } = params.row;
      return inactive ? "Inaktiviert" : verified ? "Verifiziert" : "Ausstehend";
    },
    renderCell: (params: GridRenderCellParams) => {
      const { verified, inactive } = params.row;

      return (
        <Button
          color={inactive ? "error" : verified ? "success" : "info"}
          variant="outlined"
          onClick={() => logger.debug(params)}
          key={`${params.id}-button`}
        >
          Click
        </Button>
      );
    },
  },
].map(columnMapper);
