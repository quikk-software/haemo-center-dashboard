import React, { useState } from "react";
import { TableConfig, View } from "@/components/overview/table/table.types";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY,
} from "@/components/overview/table/table.constants";
import { GridPaginationModel } from "@mui/x-data-grid";
import buildKeyCloakQueryString from "@/core/keycloak.utils";

export const initialTableConfig: TableConfig = {
  query: DEFAULT_QUERY,
  pageNumber: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_PAGE_SIZE,
};

const getFilterForType = (type: View) =>
  buildKeyCloakQueryString([
    { field: "role", value: type, operator: "equals" },
  ]);

const useTableConfig = () => {
  const [tableConfig, setTableConfig] = useState(initialTableConfig);

  // const updateQuery = (filter: GridFilterModel) => {
  //   const query = buildKeyCloakQueryString(filter.items);
  //   logger.log("query", query);
  //   setTableConfig((tableConfig) => ({ ...tableConfig, query }));
  // };

  const updatePageNumber = (pageNumber: number) => {
    setTableConfig((tableConfig) => ({ ...tableConfig, pageNumber }));
  };

  const updatePageSize = (pageSize: number) => {
    setTableConfig((tableConfig) => ({ ...tableConfig, pageSize }));
  };

  const handlePaginationModelChange = (
    paginationModel: GridPaginationModel,
  ) => {
    updatePageNumber(paginationModel.page);
    updatePageSize(paginationModel.pageSize);
  };

  // const handleFilterModelChange = (filterModel: GridFilterModel) => {
  //   updateQuery(filterModel);
  // };

  return {
    ...tableConfig,
    handlePaginationModelChange,
    // handleFilterModelChange,
  };
};

export default useTableConfig;
