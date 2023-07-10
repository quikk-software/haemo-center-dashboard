import type { Page } from "./routes.types";

const errorPages: Page[] = [
  {
    title: "Fehler",
    pathname: "/404",
    description: "Die aufgerufene Seite ist nicht erreichbar.",
  },
  {
    title: "Fehler",
    pathname: "/500",
    description: "Es ist ein Fehler aufgetreten.",
  },
  {
    title: "Fehler",
    pathname: "/_error",
    description: "Es ist ein Fehler aufgetreten.",
  },
];

export default errorPages;
