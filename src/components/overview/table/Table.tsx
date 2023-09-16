import React, { useEffect } from "react";
import { View } from "./table.types";
import { DataGridPro as DataGrid } from "@mui/x-data-grid-pro";
import { Stack, Typography } from "@mui/material";
import Size from "@/components/layout/size";
import { theme } from "@/theme";
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "@/components/overview/table/table.constants";
import useTableConfig from "@/components/overview/table/useTableConfig";
import useGetUsers from "@/api/users/useGetUsers";
import logger from "@/core/logger";
import { columns } from "@/components/overview/table/table.coldef";

export type Props = {
  type: View;
};
const Table: React.FC<Props> = ({ type }) => {
  const {
    handlePaginationModelChange,
    handleFilterModelChange,
    pageNumber,
    pageSize,
    query,
  } = useTableConfig(type);

  const { request, response } = useGetUsers({ query, pageSize, pageNumber });

  useEffect(() => {
    request();
  }, [query, pageSize, pageNumber]);

  useEffect(() => {
    logger.debug(response);
  }, [response]);

  return (
    <Stack direction="column" spacing={Size.SMALL}>
      <Typography variant="h4" color={theme.palette.text.primary}>
        Übersicht: {type}
      </Typography>
      <DataGrid
        rows={response ?? []}
        columns={columns}
        sx={{ m: Size.MEDIUM }}
        initialState={{
          pagination: { paginationModel: { pageSize: DEFAULT_PAGE_SIZE } },
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        checkboxSelection
        disableRowSelectionOnClick
        onPaginationModelChange={handlePaginationModelChange}
        onFilterModelChange={handleFilterModelChange}
      />
    </Stack>
  );
};

export default Table;
