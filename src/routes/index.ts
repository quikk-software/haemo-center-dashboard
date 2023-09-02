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
  {
    title: "News",
    pathname: "/news",
    description: "News anlegen und bearbeiten",
  },
  {
    title: "News anlegen",
    pathname: "/news/create",
    description: "News anlegen",
  },
  {
    title: "News Editor",
    pathname: "/news/edit/[id]",
    description: "News bearbeiten",
  },
  ...errorPages,
] as const;

export default pages;
