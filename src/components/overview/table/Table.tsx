import React from "react";
import { View } from "./table.types";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import Sizes from "@/components/layout/sizes";
import { theme } from "@/theme";
import { columns } from "@/components/overview/table/table.coldef";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

export type Props = {
  type: View;
};
const Table: React.FC<Props> = ({ type }) => {
  return (
    <Stack direction="column" spacing={Sizes.SMALL}>
      <Typography variant="h4" color={theme.palette.text.primary}>
        Übersicht: {type}
      </Typography>
      <DataGrid rows={rows} columns={columns} />
    </Stack>
  );
};

export default Table;
