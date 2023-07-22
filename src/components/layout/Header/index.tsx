import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { theme } from "../../../theme";
import { Typography } from "@mui/material";
import { APP_NAME } from "@/constants";
import Link from "@/components/common/Link";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import useAuth from "@/components/auth/useAuth";
import { useEffect } from "react";
import Avatar from "@/components/layout/Header/Avatar";

const Index = () => {
  const { isLoggedIn, username, getUserData } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header>
      <AppBar
        sx={{
          backgroundColor: theme.palette.grey[100],
        }}
        elevation={0}
      >
        <Container>
          <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
            <Typography variant="h3" color={theme.palette.text.primary}>
              <Link href="/">
                {APP_NAME} <VaccinesIcon fontSize="inherit" />
              </Link>
            </Typography>
            {isLoggedIn && <Avatar alt={username}>{username}</Avatar>}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </header>
  );
};

export default Index;
