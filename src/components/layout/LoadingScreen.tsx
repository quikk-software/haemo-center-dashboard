import { Box, Typography } from "@mui/material";
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography>Lädt...</Typography>
    </Box>
  );
};

export default LoadingScreen;
