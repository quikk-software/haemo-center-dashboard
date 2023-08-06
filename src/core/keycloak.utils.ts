import { GridFilterModel } from "@mui/x-data-grid";
import { Unpacked } from "@/core/types";

const buildKeyValuePair = (pair: Unpacked<GridFilterModel["items"]>) => {
  // Do not build filter for that key if value is not set
  if (pair.value === undefined || pair.value === "") {
    return "";
  }
  return `"${pair.field}":"${pair.value}"`;
};

const buildKeyCloakQueryString = (filter: GridFilterModel["items"]) =>
  filter.reduce(
    (acc, cur) =>
      `${acc}${acc.length === 0 ? "" : " "}${buildKeyValuePair(cur)}`,
    "",
  );

export default buildKeyCloakQueryString;
