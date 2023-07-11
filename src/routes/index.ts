import type { Page } from "./routes.types";
import errorPages from "@/routes/errorPages";

const pages: Page[] = [
  {
    title: "Zentrumsübersicht",
    pathname: "/",
    description: "Beschreibung",
  },
  {
    title: "Anmeldung",
    pathname: "/auth/login",
    description: "Beschreibung",
  },
  {
    title: "Registrierung",
    pathname: "/auth/signup",
    description: "Beschreibung",
  },
  ...errorPages,
];

export default pages;
