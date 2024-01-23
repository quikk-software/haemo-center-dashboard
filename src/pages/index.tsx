import React, { useEffect } from "react";
import { Typography, useTheme } from "@mui/material";
import DashboardCard from "@/components/dashboard/DashboardCard";
import useGetUsers from "@/api/users/useGetUsers";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useTableConfig from "@/components/overview/table/useTableConfig";
import DashboardRow from "@/components/dashboard/DashboardRow";

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
          />,
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
