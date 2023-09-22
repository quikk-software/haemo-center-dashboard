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
import BlockedSelector from "@/components/overview/table/selector/BlockedSelector";
import VerifiedSelector from "@/components/overview/table/selector/VerifiedSelector";

// Apply this to all columns
function columnMapper<T extends GridValidRowModel>(
  c: GridColDef<T>,
): GridColDef<T> {
  return { ...c, flex: 1 };
}

export const createColumns: (
  reset: () => void,
) => GridColDef<GetUserResponse>[] = (reset) =>
  [
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
        const { blocked, id } = params.row;

        if (id === undefined) {
          return <>-</>;
        }

        return (
          <BlockedSelector id={id} blocked={!!blocked} onSuccess={reset} />
        );
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

        return (
          <VerifiedSelector id={id} enabled={!!enabled} onSuccess={reset} />
        );
      },
    },
    // @ts-ignore
  ].map((c) => columnMapper(c));
