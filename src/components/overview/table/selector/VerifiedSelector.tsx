import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import logger from "@/core/logger";
import { Alert } from "@mui/material";
import { Id } from "@/components/overview/table/selector/Selector.types";

type Props = {
  id: Id;
  verified: boolean;
};

const VerifiedSelector: React.FC<Props> = ({ id, verified }) => {
  if (id === undefined) {
    return <>Fehler beim lesen der Daten</>;
  }
  const handleChange = (event: SelectChangeEvent) => {
    logger.debug(`verified: ${id}`, event.target.value as unknown as boolean);
  };

  return <Alert severity={verified ? "success" : "warning"} />;
};

export default VerifiedSelector;
