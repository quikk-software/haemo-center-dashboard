import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { GetCenterUserResponse } from "@/@types/user";
import Link from "@/components/common/Link";

export const createColumns: () => GridColDef<GetCenterUserResponse>[] = () =>
  // @ts-ignore
  [
    { field: "businessLocationNumber", headerName: "Betriebsstättennummer" },
    { field: "centerName", headerName: "Zentrumsname" },
    { field: "alias", headerName: "Benutzername" },
    {
      field: "email",
      headerName: "E-Mail Adresse",
      // @ts-ignore
      renderCell: (params: GridValueGetterParams<GetCenterUserResponse>) => {
        const { email } = params.row;

        return <Link href={`mailto:${email}`}>{email}</Link>;
      },
      valueGetter: (params: GridValueGetterParams<GetCenterUserResponse>) => {
        const { email } = params.row;
        return email;
      },
    },
    {
      field: "ansprechpartner",
      headerName: "Ansprechpartner",
      renderCell: (params: GridRenderCellParams<GetCenterUserResponse>) => {
        const { firstName, lastName } = params.row;
        return `${firstName} ${lastName}`;
      },
      valueGetter: (params: GridValueGetterParams<GetCenterUserResponse>) => {
        const { firstName, lastName } = params.row;
        return `${firstName} ${lastName}`;
      },
    },
    {
      field: "adresse",
      headerName: "Adresse",
      renderCell: (params: GridRenderCellParams<GetCenterUserResponse>) => {
        const { city, country, street, houseNumber, zipCode } = params.row;
        return `${street} ${houseNumber}, ${zipCode} ${city}, ${country}`;
      },
      valueGetter: (params: GridValueGetterParams<GetCenterUserResponse>) => {
        const { city, country, street, houseNumber, zipCode } = params.row;
        return `${street} ${houseNumber}, ${zipCode} ${city}, ${country}`;
      },
    },
    { field: "latitude", headerName: "Längengrad" },
    { field: "longitude", headerName: "Breitengrad" },
  ];
