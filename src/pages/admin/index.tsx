import React from "react";
import type { FunctionComponent } from "react";
import MenuCard from "@/components/admin/MenuCard";
import { Stack } from "@mui/material";

const Index: FunctionComponent = () => {
  return (
    <Stack direction="column" spacing={3}>
      <MenuCard
        title="Zentrum anlegen"
        description="Anlegen von Zentren für die Hemmo App"
        linkText="anlegen"
        link="/admin/create-center"
      />
      <MenuCard
        title="Zentren anzeigen"
        description="Anzeigen aller Zentren in der Hemmo App"
        linkText="anzeigen"
        link="/admin/view-centers"
      />
    </Stack>
  );
};

export default Index;
