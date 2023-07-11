import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { theme } from "../../theme";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { APP_NAME } from "@/constants";
import Sizes from "@/components/layout/sizes";
import Link from "@/components/common/Link";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <AppBar
        sx={{
          backgroundColor: theme.palette.grey[100],
        }}
        elevation={0}
      >
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h3" color={theme.palette.text.primary}>
              <Link href="/">{APP_NAME.toUpperCase()}</Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </header>
  );
};

export default Header;
