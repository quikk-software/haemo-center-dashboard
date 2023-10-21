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
import { createColumns } from "@/components/overview/table/table.coldef";
import { removeMuiLicenseMissing } from "@/components/overview/table/table.utils";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";

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

  const dispatch = useDispatch();

  const { request } = useGetUsers({ query, pageSize, pageNumber });
  const { users } = useSelector((store: Store) => store.userOverview);

  useEffect(() => {
    request();
  }, [query, pageSize, pageNumber]);

  return (
    <Stack direction="column" spacing={Size.SMALL}>
      <Typography variant="h4" color={theme.palette.text.primary}>
        Übersicht: {type}
      </Typography>
      <DataGrid
        onStateChange={removeMuiLicenseMissing}
        rows={users}
        // @ts-ignore
        columns={createColumns(() => request()) ?? []}
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
