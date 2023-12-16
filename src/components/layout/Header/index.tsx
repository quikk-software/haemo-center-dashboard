import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { theme } from "../../../theme";
import { Box, NoSsr, Stack, Typography } from "@mui/material";
import { APP_NAME } from "@/constants";
import Link from "@/components/common/Link";
import useAuth from "@/components/auth/useAuth";
import { useEffect } from "react";
import Avatar from "@/components/layout/Header/Avatar";
import { hasPageBeenMounted } from "@/core/utils";
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";
import Size from "@/components/layout/size";
import Navbar from "@/components/layout/Navbar";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const Index = () => {
  const { isLoggedIn, username, getUserData } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: theme.palette.grey[100],
        }}
        elevation={0}
        suppressHydrationWarning
      >
        <Container suppressHydrationWarning>
          <Toolbar
            disableGutters
            style={{ justifyContent: "space-between" }}
            suppressHydrationWarning
          >
            <Navbar />
            <NoSSR>
              {isLoggedIn && hasPageBeenMounted() ? (
                <Avatar alt={username} suppressHydrationWarning src="" />
              ) : (
                <></>
              )}
            </NoSSR>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />
    </Box>
  );
};

export default Index;
