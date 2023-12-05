import React from "react";
import type { FunctionComponent } from "react";
import MenuCard from "@/components/admin/MenuCard";

const Index: FunctionComponent = () => {
  return (
    <MenuCard
      title="Zentrum anlegen"
      description="Anlegen von Zentren für die Hemmo App"
      linkText="anlegen"
      link="/admin/create-center"
    />
  );
};

export default Index;
