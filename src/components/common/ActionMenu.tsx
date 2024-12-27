import { IconButton, Menu } from "@mui/material";
import { Edit } from "@mui/icons-material";
import React, { PropsWithChildren, useCallback, useMemo } from "react";

const ActionMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Edit />
      </IconButton>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
        {children}
      </Menu>
    </>
  );
};

export default ActionMenu;
