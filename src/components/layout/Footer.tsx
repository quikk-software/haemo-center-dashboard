import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { theme } from "../../theme";
import Size from "@/components/layout/size";
import { COMPANY_LEGAL_NAME } from "@/constants";
import Link from "@/components/common/Link";

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
          <Typography variant="caption" display="inline">
            <Link href="https://www.iatro.de/impressum">Impressum</Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
