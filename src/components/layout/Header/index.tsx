import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { theme } from "../../../theme";
import { Box, NoSsr, Typography } from "@mui/material";
import { APP_NAME } from "@/constants";
import Link from "@/components/common/Link";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import useAuth from "@/components/auth/useAuth";
import { useEffect } from "react";
import Avatar from "@/components/layout/Header/Avatar";
import { hasPageBeenMounted } from "@/core/utils";
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";

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
            <Typography
              variant="h3"
              color={theme.palette.text.primary}
              suppressHydrationWarning
            >
              <Link href="/">
                {APP_NAME} <VaccinesIcon fontSize="inherit" />
              </Link>
            </Typography>
            <NoSSR>
              {isLoggedIn && hasPageBeenMounted() ? (
                <Avatar alt={username} suppressHydrationWarning>
                  {getInitials(username)}
                </Avatar>
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
