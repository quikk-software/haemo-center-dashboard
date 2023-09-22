import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import logger from "@/core/logger";
import { Alert } from "@mui/material";
import { Id } from "@/components/overview/table/selector/Selector.types";

type Props = {
  id: Id;
  blocked: boolean;
};

const BlockedSelector: React.FC<Props> = ({ id, blocked }) => {
  if (id === undefined) {
    return <>Fehler beim lesen der Daten</>;
  }
  const handleChange = (event: SelectChangeEvent) => {
    logger.debug(`blocked: ${id}`, event.target.value as unknown as boolean);
  };

  return <Alert severity={blocked ? "error" : "success"} />;
};

export default BlockedSelector;
