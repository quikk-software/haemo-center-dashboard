import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  languageResolverForReactCountryFlag,
  languageResolverInNativeLanguage,
  Language,
} from "@/i18n/i18n.types";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  Typography,
} from "@mui/material";
import { getEnumKeys } from "@/core/types";
import { ContentCopy, Language as LanguageIcon } from "@mui/icons-material";
import ReactCountryFlag from "react-country-flag";
import logger from "@/core/logger";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/components/i18n/i18nSlice";
import { Store } from "@/redux";

const languageKeys = getEnumKeys(Language);
const allLanguages = languageKeys.map((k) => Language[k]);

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((s: Store) => s.i18n);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const allLanguagesExcludingCurrent = useMemo(
    () => allLanguages.filter((l) => l !== language),
    [language],
  );

  const handleOpen = (event: React.BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: Language) => {
    dispatch(setLanguage(language));
    handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <LanguageIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          {languageResolverInNativeLanguage[language]}
        </ListItemText>
      </MenuItem>
      <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
        <MenuList>
          {allLanguagesExcludingCurrent.map((l) => {
            return (
              <MenuItem key={l} onClick={() => handleLanguageSelect(l)}>
                <ListItemIcon>
                  <ReactCountryFlag
                    countryCode={languageResolverForReactCountryFlag[l]}
                    svg
                  />
                </ListItemIcon>
                <ListItemText>
                  {languageResolverInNativeLanguage[l]}
                </ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default LanguageSelector;
