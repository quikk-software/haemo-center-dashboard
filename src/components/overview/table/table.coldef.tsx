import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";
import logger from "@/core/logger";
import { GetUserResponse } from "@/@types/user";
import Link from "@/components/common/Link";
import BlockedSelector from "@/components/overview/table/selector/BlockedSelector";
import VerifiedSelector from "@/components/overview/table/selector/VerifiedSelector";

// Apply this to all columns
const columnMapper = (c: GridColDef): GridColDef => ({ ...c, flex: 1 });

export const columns: GridColDef<GetUserResponse>[] = [
  { field: "alias", headerName: "Alias" },
  { field: "firstName", headerName: "Vorname" },
  { field: "lastName", headerName: "Nachname" },
  {
    field: "birthDay",
    headerName: "Geburtstag",
    valueGetter: (params: GridValueGetterParams<GetUserResponse>) => {
      const { birthDay } = params.row;
      if (!birthDay) {
        return "keine Angabe";
      }
      return new Date(birthDay).toLocaleDateString();
    },
  },
  {
    field: "email",
    headerName: "E-Mail Adresse",
    renderCell: (params: GridValueGetterParams<GetUserResponse>) => {
      const { email } = params.row;

      return <Link href={`mailto:${email}`}>{email}</Link>;
    },
  },
  {
    field: "phone",
    headerName: "Telefonnummer",
    renderCell: (params: GridValueGetterParams<GetUserResponse>) => {
      const { phoneNumber } = params.row;

      return <Link href={`tel:${phoneNumber}`}>{phoneNumber}</Link>;
    },
  },
  {
    field: "blocked",
    headerName: "Blockiert",
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      return (
        <BlockedSelector id={params.row.id} blocked={params.row.blocked} />
      );
    },
  },
  {
    field: "blocked",
    headerName: "Blockiert",
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      return (
        <VerifiedSelector id={params.row.id} verified={params.row.blocked} />
      );
    },
  },
].map(columnMapper);
