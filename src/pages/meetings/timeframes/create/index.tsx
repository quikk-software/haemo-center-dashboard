import React from "react";
import { Grid, Typography } from "@mui/material";
import TimeframeDetails from "@/components/overview/meetings/TimeframeDetails";

const CreateTimeFramePage: React.FunctionComponent = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Zeitfenster anlegen</Typography>
      </Grid>
      <Grid item xs={12}>
        <TimeframeDetails />
      </Grid>
    </Grid>
  );
};

export default CreateTimeFramePage;
