import {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Alert, Button, Chip } from "@mui/material";
import logger from "@/core/logger";
import { GetUserResponse } from "@/@types/user";
import Link from "@/components/common/Link";
import BlockedDisplay from "@/components/overview/table/rowdisplay/BlockedDisplay";
import VerifiedDisplay from "@/components/overview/table/rowdisplay/VerifiedDisplay";
import Action from "@/components/overview/table/rowdisplay/Action";

export const createColumns: (
  reset: () => void,
) => GridColDef<GetUserResponse>[] = (reset) => [
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
    // @ts-ignore
    renderCell: (params: GridValueGetterParams<GetUserResponse>) => {
      const { email } = params.row;

      return <Link href={`mailto:${email}`}>{email}</Link>;
    },
  },
  {
    field: "phone",
    headerName: "Telefonnummer",
    // @ts-ignore
    renderCell: (params: GridValueGetterParams<GetUserResponse>) => {
      const { phoneNumber } = params.row;

      return <Link href={`tel:${phoneNumber}`}>{phoneNumber}</Link>;
    },
  },
  {
    field: "blocked",
    headerName: "Blockiert",
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      const { blocked, id } = params.row;

      if (id === undefined) {
        return <>-</>;
      }

      return <BlockedDisplay id={id} blocked={!!blocked} onSuccess={reset} />;
    },
  },
  {
    field: "enabled",
    headerName: "Verifiziert",
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      const { enabled, id } = params.row;

      if (id === undefined) {
        return <>-</>;
      }

      return <VerifiedDisplay id={id} enabled={!!enabled} onSuccess={reset} />;
    },
  },
  {
    field: "actions",
    headerName: "Aktionen",
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      const { enabled, id, blocked } = params.row;

      return <Action enabled={!!enabled} blocked={!!blocked} id={id ?? ""} />;
    },
  },
];
