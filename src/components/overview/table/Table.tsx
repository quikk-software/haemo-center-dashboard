import { removeMuiLicenseMissing } from "@/components/overview/table/table.utils";
import Size from "@/components/layout/size";
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "@/components/overview/table/table.constants";
import { Stack, Typography } from "@mui/material";
import {
  DataGridProProps,
  DataGridPro as DataGrid,
} from "@mui/x-data-grid-pro";
import React from "react";
import { theme } from "@/theme";

type Props = { title: string } & Pick<DataGridProProps, "rows" | "columns">;

const Table: React.FC<Props> = ({ rows, columns, title }) => {
  return (
    <Stack direction="column" spacing={Size.SMALL}>
      <Typography variant="h4" color={theme.palette.text.primary}>
        {title}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        onStateChange={removeMuiLicenseMissing}
        // @ts-ignore
        sx={{ m: Size.MEDIUM }}
        initialState={{
          pagination: { paginationModel: { pageSize: DEFAULT_PAGE_SIZE } },
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        checkboxSelection
        disableRowSelectionOnClick
        // onFilterModelChange={handleFilterModelChange}
        slots={{
          noRowsOverlay: () => (
            <Stack height="30vh" alignItems="center" justifyContent="center">
              No rows in DataGrid
            </Stack>
          ),
          noResultsOverlay: () => (
            <Stack height="30vh" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          ),
        }}
      />
    </Stack>
  );
};

export default Table;
