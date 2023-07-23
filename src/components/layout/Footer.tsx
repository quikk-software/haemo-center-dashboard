import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { theme } from "../../theme";
import Size from "@/components/layout/size";
import { COMPANY_LEGAL_NAME } from "@/constants";

const Footer = () => {
  return (
    <Box style={{ flexShrink: 0 }}>
      <Box
        textAlign="center"
        bgcolor={theme.palette.grey[100]}
        pt={Size.MEDIUM}
        pb={Size.MEDIUM}
      >
        <Container>
          <Typography variant="caption" display="block">
            © {new Date().getFullYear()} {COMPANY_LEGAL_NAME} - Alle Rechte
            vorbehalten.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
