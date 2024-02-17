import React, { useEffect } from "react";
import useGetUsers from "@/api/users/useGetUsers";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useTableConfig from "@/components/overview/table/useTableConfig";
import Link from "@/components/common/Link";
import { ADMIN_ROLE } from "@/auth/auth.constants";
import { Stack, Typography } from "@mui/material";
import DashboardRow from "@/components/dashboard/DashboardRow";
import DashboardCard from "@/components/dashboard/DashboardCard";
import MenuCard from "@/components/admin/MenuCard";

const Homepage: React.FC = () => {
  const {
    handlePaginationModelChange,
    // handleFilterModelChange,
    pageNumber,
    pageSize,
    query,
  } = useTableConfig();

  const { request } = useGetUsers({ query, pageSize, pageNumber });
  const { users } = useSelector((store: Store) => store.userOverview);

  useEffect(() => {
    request();
  }, [query, pageSize, pageNumber]);

  return (
    <Stack direction="column" spacing={3}>
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
