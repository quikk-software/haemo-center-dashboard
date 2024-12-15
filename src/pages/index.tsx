import React from "react";
import { Stack } from "@mui/material";
import MenuCard from "@/components/admin/MenuCard";

const Homepage: React.FunctionComponent = () => {
  return (
    <Stack direction="column" spacing={3}>
      <MenuCard
        title="To Do's anzeigen"
        description="Alle offenen To Do's anzeigen"
        linkText="To Do's anzeigen"
        link="/todos"
      />
      <MenuCard
        title="Nutzer anzeigen"
        description="Alle Nutzer für dieses Zentrum anzeigen"
        linkText="Nutzer anzeigen"
        link="/users"
      />
      <MenuCard
        title="Termine anzeigen"
        description="Alle Termine für dieses Zentrum anzeigen"
        linkText="Termine anzeigen"
        link="/meetings"
      />
      <MenuCard
        title="Rezepte anzeigen"
        description="Alle Rezepte für dieses Zentrum anzeigen"
        linkText="Rezepte anzeigen"
        link="/prescriptions"
      />
    </Stack>
  );
};

export default Homepage;
