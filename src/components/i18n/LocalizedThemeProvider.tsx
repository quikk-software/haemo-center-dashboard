import React, { PropsWithChildren, useMemo } from "react";
import { theme } from "@/theme";
import { ThemeProvider, createTheme } from "@mui/material";
import muiLocales from "@/components/i18n/mui.translations";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useLanguage from "@/i18n/useLanguage";

const LocalizedThemeProvider: React.FC<
  PropsWithChildren<Record<never, any>>
> = ({ children }) => {
  const { language } = useLanguage();

  const localizedTheme = useMemo(
    () => createTheme(theme, muiLocales[language]),
    [language],
  );

  return <ThemeProvider theme={localizedTheme}>{children}</ThemeProvider>;
};

export default LocalizedThemeProvider;
