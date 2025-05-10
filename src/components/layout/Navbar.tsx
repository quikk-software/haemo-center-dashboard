import * as React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import Link from "@/components/common/Link";
import Size from "@/components/layout/size";
import logo from "@/assets/hemmo.svg";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import { ADMIN_ROLE } from "@/auth/auth.constants";

const HEIDELBERG_CENTER_ID = "1a134951-17fd-4ad1-a97f-6e063decfc1a";

const Navbar: React.FC = () => {
  const theme = useTheme();

  const { roles, userId } = useSelector((s: Store) => s.auth);

  return (
    <Typography variant="h6">
      <Stack direction="row" spacing={Size.LARGE} alignItems="center">
        <Link href="/">
          <Stack justifyContent="center" alignItems="center">
            <img
              src={logo}
              // @ts-ignore
              height={theme.spacing(3)}
            />
          </Stack>
        </Link>
        <Link href="/todos">To Do&apos;s</Link>
        <Link href="/users">Nutzer</Link>
        {userId !== HEIDELBERG_CENTER_ID ? (
          <Link href="/meetings">Termine</Link>
        ) : null}
        <Link href="/prescriptions">Rezepte</Link>
        <Link href="/chats">Chats</Link>
        <Link href="/news">News</Link>
        {roles.includes(ADMIN_ROLE) && <Link href="/admin">Admin</Link>}
      </Stack>
    </Typography>
  );
};

export default Navbar;
