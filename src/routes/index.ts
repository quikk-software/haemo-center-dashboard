import type { Page } from "./routes.types";
import errorPages from "@/routes/errorPages";
import { center } from "@/routes/routes.styles";

const pages: readonly Page[] = [
  {
    title: "Zentrumsübersicht",
    pathname: "/",
    description: "Beschreibung",
  },
  {
    title: "Anmeldung",
    pathname: "/auth/login",
    description: "Beschreibung",
    __dangerousPageSpecificStyling: center,
  },
  ...errorPages,
] as const;

export default pages;
