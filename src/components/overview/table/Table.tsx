import React from "react";
import { View } from "./table.types";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import Size from "@/components/layout/size";
import { theme } from "@/theme";
import { columns } from "@/components/overview/table/table.coldef";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World", verified: false, inactive: false },
  {
    id: 2,
    col1: "DataGridPro",
    col2: "is Awesome",
    verified: true,
    inactive: false,
  },
  { id: 3, col1: "MUI", col2: "is Amazing", verified: false, inactive: false },
  { id: 4, col1: "Hello", col2: "World", verified: false, inactive: false },
  {
    id: 5,
    col1: "DataGridPro",
    col2: "is Awesome",
    verified: true,
    inactive: false,
  },
  { id: 6, col1: "MUI", col2: "is Amazing", verified: false, inactive: false },
  { id: 7, col1: "Hello", col2: "World", verified: false, inactive: false },
  {
    id: 8,
    col1: "DataGridPro",
    col2: "is Awesome",
    verified: true,
    inactive: false,
  },
  { id: 9, col1: "MUI", col2: "is Amazing", verified: false, inactive: false },
  { id: 10, col1: "Hello", col2: "World", verified: true, inactive: true },
  {
    id: 11,
    col1: "DataGridPro",
    col2: "is Awesome",
    verified: true,
    inactive: true,
  },
  { id: 12, col1: "MUI", col2: "is Amazing", verified: true, inactive: true },
];

export type Props = {
  type: View;
};
const Table: React.FC<Props> = ({ type }) => {
  return (
    <Stack direction="column" spacing={Size.SMALL}>
      <Typography variant="h4" color={theme.palette.text.primary}>
        Übersicht: {type}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ m: Size.MEDIUM }}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Stack>
  );
};

export default Table;
