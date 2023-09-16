import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import logger from "@/core/logger";

type Props = {
  id: string;
  isSelectorActive: boolean;
  options: { title: string; value: string }[];
  handleChange: (e: SelectChangeEvent) => void;
};

const BaseSelector: React.FC<Props> = ({
  id,
  isSelectorActive,
  options,
  handleChange,
}) => {
  return (
    <Select onChange={handleChange} value={String(isSelectorActive)}>
      {options.map(({ value, title }, i) => (
        <MenuItem value={String(value)} key={i}>
          {title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default BaseSelector;
