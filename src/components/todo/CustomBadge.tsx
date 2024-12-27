import React, { PropsWithChildren } from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -14,
    top: 12,
    padding: "0 4px",
  },
}));

interface CustomBadgeProps {
  label: any;
}

const CustomBadge: React.FunctionComponent<
  CustomBadgeProps & PropsWithChildren
> = ({ label, children }) => {
  return (
    <StyledBadge badgeContent={label} color="primary">
      {children}
    </StyledBadge>
  );
};

export default CustomBadge;
