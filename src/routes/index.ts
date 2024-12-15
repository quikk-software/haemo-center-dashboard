import type { Page } from "./routes.types";
import { BreadcrumbConfig } from "./routes.types";
import errorPages from "@/routes/errorPages";
import { center } from "@/routes/routes.styles";

const flattenPages = (pages: Page[]) => {
  const flattenedPages: Page[] = [];
  pages.forEach((p) => {
    flattenedPages.push(p);
    if (p.children) {
      flattenedPages.push(...flattenPages(p.children));
    }
  });
  return flattenedPages;
};

const createBreadcrumbConfig = (
  pages: Page[],
  parent: BreadcrumbConfig[] = [],
): BreadcrumbConfig[][] => {
  const bcConfig: BreadcrumbConfig[][] = [];
  flattenPages(pages).forEach((p) => {
    if (p.children) {
      bcConfig.push(
        ...createBreadcrumbConfig(p.children, [
          { pathname: p.pathname, title: p.title },
          ...parent,
        ]),
      );
    }
    bcConfig.push([{ pathname: p.pathname, title: p.title }, ...parent]);
  });
  return bcConfig;
};

const pages: Page[] = [
  {
    title: "Startseite",
    pathname: "/",
    description: "Startseite",
  },
  {
    title: "News",
    pathname: "/news",
    description: "News anlegen und bearbeiten",
    children: [
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
    ],
  },
  {
    title: "Übersicht Rezepte",
    pathname: "/prescriptions",
    description: "Übersicht Rezepte",
  },
  {
    title: "Übersicht Termine",
    pathname: "/meetings",
    description: "Übersicht Termine",
  },
  {
    title: "To Do's",
    pathname: "/todos",
    description: "Übersicht To Do's",
  },
  {
    title: "Übersicht Nutzer",
    pathname: "/users",
    description: "Übersicht Nutzer",
    children: [
      {
        title: "Rezepte einsehen",
        pathname: "/prescriptions/user/[id]",
        description: "Rezepte einsehen",
        children: [
          {
            title: "Rezept",
            pathname: "/prescriptions/[id]",
            description: "Rezept",
          },
        ],
      },
      {
        title: "Termine einsehen",
        pathname: "/meetings/user/[id]",
        description: "Termine einsehen",
        children: [
          {
            title: "Termin",
            pathname: "/meetings/[id]",
            description: "Termin",
          },
        ],
      },
    ],
  },
  {
    title: "Administration",
    pathname: "/admin",
    description: "Administrative Funktionen",
    children: [
      {
        title: "Zentrum anlegen",
        pathname: "/admin/create-center",
        description: "Zentrum anlegen",
      },
      {
        title: "Zentren anzeigen",
        pathname: "/admin/view-centers",
        description: "Zentren anzeigen",
      },
    ],
  },
  {
    title: "Anmeldung",
    pathname: "/auth/login",
    description: "Beschreibung",
    __dangerousPageSpecificStyling: center,
  },
  {
    title: "Passwort vergessen",
    pathname: "/auth/forgot-password",
    description: "Passwort vergessen",
    __dangerousPageSpecificStyling: center,
  },
  {
    title: "Passwort zurücksetzen",
    pathname: "/auth/reset-password",
    description: "Passwort zurücksetzen",
    __dangerousPageSpecificStyling: center,
  },
  {
    title: "Account Verifizierung",
    pathname: "/verify/account/[code]",
    description: "Account Verifizieren",
  },
  ...errorPages,
];

export default flattenPages(pages);
export const breadcrumbConfig = createBreadcrumbConfig(pages);
