import React from "react";
import { Card, Grid, Typography, useTheme } from "@mui/material";
import size from "@/components/layout/size";
import DashboardCard from "@/components/dashboard/DashboardCard";

type Props = {
  content: React.ReactNode[];
  title: string;
};
const DashboardRow: React.FC<Props> = ({ title, content }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        padding: theme.spacing(size.MEDIUM),
        backgroundColor: theme.palette.grey.A100,
      }}
    >
      <Grid container spacing={size.MEDIUM}>
        <Grid item xs={12}>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
        </Grid>
        {content.map((c) => (
          <Grid key={c!.toString()} item xs={12} sm={6} md={4} lg={3}>
            {c}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default DashboardRow;
