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
    <>
      <DashboardRow
        title="Nutzer"
        content={[
          <Link href="/users" key="/users">
            <DashboardCard
              key={1}
              content={
                <>
                  <Typography variant="h5" component="div">
                    {users.length} Nutzer
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    gefunden
                  </Typography>
                </>
              }
            />
          </Link>,
          <DashboardCard
            key={2}
            content={
              <>
                <Typography variant="h5" component="div">
                  {users.filter((u) => !u.enabled).length} Verifizierungen
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  ausstehend
                </Typography>
              </>
            }
          />,
        ]}
      />
    </>
  );
};

export default Homepage;
