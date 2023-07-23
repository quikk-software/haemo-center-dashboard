import de from "./de";
import en from "./en";
import { Language } from "@/i18n/i18n.types";
import { Translation } from "@/i18n/translation.types";

const translations: Record<Language, Translation> = {
  en,
  de,
};

export default translations;
