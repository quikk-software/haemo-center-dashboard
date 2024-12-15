import React from "react";
import { Clear } from "@mui/icons-material";
import { theme } from "@/theme";

interface DeclineIconProps {
  disabled?: boolean;
  callback?: () => void;
}

const DeclineIcon: React.FunctionComponent<DeclineIconProps> = ({
  disabled = false,
  callback,
}) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }
    callback && callback();
  };

  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        backgroundColor: disabled
          ? theme.palette.action.disabledBackground
          : theme.palette.error.main,
        borderRadius: "100%",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Clear
        sx={{
          color: theme.palette.primary.contrastText,
          padding: "2px",
        }}
      />
    </div>
  );
};

export default DeclineIcon;
