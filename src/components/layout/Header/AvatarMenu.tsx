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
import useLanguage from "@/i18n/useLanguage";

type Props = Pick<MenuProps, "open" | "onClose" | "anchorEl">;

const AvatarMenu: React.FC<Props> = ({ open, onClose, anchorEl }) => {
  const { handleLogout } = useAuth();
  const { t } = useLanguage();

  return (
    <Menu open={open} onClose={onClose} anchorEl={anchorEl}>
      <MenuList>
        <LanguageSelector />
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("auth:logout")}</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
