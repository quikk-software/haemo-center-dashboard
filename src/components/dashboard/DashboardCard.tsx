import React from "react";
import { Card, CardContent } from "@mui/material";

type Props = {
  content: React.ReactNode;
};

const DashboardCard: React.FC<Props> = ({ content }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default DashboardCard;
