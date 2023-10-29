import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { GetUserResponse } from "@/@types/user";
import Link from "@/components/common/Link";
import MoreActionsButton from "@/components/overview/users/cells/MoreActionsButton";

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
    valueGetter: (params: GridRenderCellParams<GetUserResponse>) => {
      return params.row.blocked ? "Ja" : "Nein";
    },
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      return params.row.blocked ? "Ja" : "Nein";
    },
  },
  {
    field: "enabled",
    headerName: "Verifiziert",
    valueGetter: (params: GridRenderCellParams<GetUserResponse>) => {
      return params.row.enabled ? "Ja" : "Nein";
    },
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      return params.row.enabled ? "Ja" : "Nein";
    },
  },
  {
    field: "actions",
    headerName: "Aktionen",
    renderCell: (params: GridRenderCellParams<GetUserResponse>) => {
      const { enabled, id, blocked } = params.row;

      return (
        <MoreActionsButton
          enabled={!!enabled}
          blocked={!!blocked}
          id={id ?? ""}
        />
      );
    },
  },
];
