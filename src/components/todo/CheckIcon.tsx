import React from "react";
import { Check } from "@mui/icons-material";
import { theme } from "@/theme";

interface CheckIconProps {
  disabled?: boolean;
  callback?: () => void;
}

const CheckIcon: React.FunctionComponent<CheckIconProps> = ({
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
          : theme.palette.success.main,
        borderRadius: "100%",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Check
        sx={{
          color: theme.palette.primary.contrastText,
          padding: "2px",
        }}
      />
    </div>
  );
};

export default CheckIcon;
