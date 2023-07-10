import type { Page } from "./routes.types";
import errorPages from "@/routes/errorPages";

const pages: Page[] = [
  {
    title: "Zentrumsübersicht",
    pathname: "/",
    description: "Beschreibung",
  },
  ...errorPages,
];

export default pages;
