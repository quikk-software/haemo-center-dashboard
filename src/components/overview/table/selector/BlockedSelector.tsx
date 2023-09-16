import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import logger from "@/core/logger";
import BaseSelector from "@/components/overview/table/selector/BaseSelector";

type Props = {
  id: string;
  blocked: boolean;
};

const BlockedSelector: React.FC<Props> = ({ id, blocked }) => {
  const handleChange = (event: SelectChangeEvent) => {
    logger.debug(`blocked: ${id}`, event.target.value as unknown as boolean);
  };

  return (
    <BaseSelector
      handleChange={(e) => {
        logger.debug(e);
      }}
      id={id}
      isSelectorActive={blocked}
      options={[
        {
          title: "Blockieren",
          value: "true",
        },
        { title: "Entblockieren", value: "false" },
      ]}
    />
  );
};

export default BlockedSelector;
