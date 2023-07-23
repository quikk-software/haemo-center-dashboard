import React, { PropsWithChildren, useState } from "react";
import {
  Avatar as MUIAvatar,
  AvatarProps,
  IconButton,
  NoSsr,
} from "@mui/material";
import AvatarMenu from "@/components/layout/Header/AvatarMenu";

type Props = {} & AvatarProps;

const Avatar: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NoSsr>
      <IconButton onClick={handleOpen}>
        <MUIAvatar {...rest}>{children}</MUIAvatar>
      </IconButton>
      <AvatarMenu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
      />
    </NoSsr>
  );
};

export default Avatar;
