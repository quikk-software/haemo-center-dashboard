import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import logger from "@/core/logger";
import BaseSelector from "@/components/overview/table/selector/BaseSelector";

type Props = {
  id: string;
  verified: boolean;
};

const VerifiedSelector: React.FC<Props> = ({ id, verified }) => {
  const handleChange = (event: SelectChangeEvent) => {
    logger.debug(`verified: ${id}`, event.target.value as unknown as boolean);
  };

  return (
    <BaseSelector
      handleChange={(e) => {
        logger.debug(e);
      }}
      id={id}
      isSelectorActive={verified}
      options={[
        {
          title: "Verifizieren",
          value: "true",
        },
        { title: "Entverifizieren", value: "false" },
      ]}
    />
  );
};

export default VerifiedSelector;
