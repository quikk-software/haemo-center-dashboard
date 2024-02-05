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
  GridCallbackDetails,
  GridSortModel,
} from "@mui/x-data-grid-pro";
import React, { useCallback, useEffect, useMemo } from "react";
import { theme } from "@/theme";
import logger from "@/core/logger";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  initialState,
  setTableSettings,
} from "@/components/overview/table/tableSlice";
import { Store } from "@/redux";
import { initialTableConfig } from "@/components/overview/table/useTableConfig";

type Props = { title: string } & Pick<
  DataGridProProps,
  | "rows"
  | "columns"
  | "onPaginationModelChange"
  | "onSortModelChange"
  | "onFilterModelChange"
  | "paginationMode"
>;

const Table: React.FC<Props> = ({
  rows,
  columns,
  title,
  onPaginationModelChange,
  onSortModelChange,
  onFilterModelChange,
  paginationMode = "server",
}) => {
  const dispatch = useDispatch();

  const { tableSettings } = useSelector((state: Store) => state.table);

  const handlePaginationChange = useCallback(
    (model: GridPaginationModel, details: GridCallbackDetails) => {
      const { pageSize, page } = model;
      logger.log("pagination", model);
      dispatch(
        setTableSettings({ ...tableSettings, pageSize, pageNumber: page }),
      );

      if (onPaginationModelChange) {
        onPaginationModelChange(model, details);
      }
    },
    [onPaginationModelChange],
  );

  const handleSortChange = useCallback(
    (model: GridSortModel, details: GridCallbackDetails) => {
      logger.log("sort", model);

      if (onSortModelChange) {
        onSortModelChange(model, details);
      }
    },
    [onSortModelChange],
  );

  const handleFilterChange = useCallback(
    (model: GridFilterModel, details: GridCallbackDetails) => {
      logger.log("filter", model);

      if (onFilterModelChange) {
        onFilterModelChange(model, details);
      }
    },
    [onFilterModelChange],
  );

  const { count, pageSize, pageNumber, hasPreviousPage, hasNextPage } =
    tableSettings;

  useEffect(() => {
    dispatch(setTableSettings(initialTableConfig));
    return () => {
      dispatch(setTableSettings(initialTableConfig));
    };
  }, []);

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
        onPaginationModelChange={handlePaginationChange}
        onSortModelChange={handleSortChange}
        onFilterModelChange={handleFilterChange}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
          pinnedColumns: { right: ["actions"] },
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        pagination
        paginationMode={paginationMode}
        filterMode={paginationMode}
        sortingMode={paginationMode}
        rowsLoadingMode={paginationMode}
        rowCount={paginationMode === "server" ? count : undefined}
        autoHeight
      />
    </Stack>
  );
};

export default Table;
