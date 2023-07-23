import React from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  type MenuProps,
} from "@mui/material";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "@/components/auth/useAuth";
import LanguageSelector from "@/components/i18n/LanguageSelector";

type Props = Pick<MenuProps, "open" | "onClose" | "anchorEl">;

const AvatarMenu: React.FC<Props> = ({ open, onClose, anchorEl }) => {
  const { handleLogout } = useAuth();

  return (
    <Menu open={open} onClose={onClose} anchorEl={anchorEl}>
      <MenuList>
        <LanguageSelector />
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Abmelden</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
