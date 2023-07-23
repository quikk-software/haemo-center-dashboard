import { Language } from "@/i18n/i18n.types";
import { deDE, enUS } from "@mui/material/locale";
import { deDE as gridDE, enUS as gridUS } from "@mui/x-data-grid";

const muiLocales: Record<Language, any> = {
  [Language.EN]: { ...enUS, ...gridUS },
  [Language.DE]: { ...deDE, ...gridDE },
};

export default muiLocales;
