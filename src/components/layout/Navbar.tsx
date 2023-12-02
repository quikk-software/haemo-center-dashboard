import * as React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import Link from "@/components/common/Link";
import Size from "@/components/layout/size";
import logo from "@/assets/hemmo.svg";

const Navbar: React.FC = () => {
  const theme = useTheme();

  return (
    <Typography variant="h6">
      <Stack direction="row" spacing={Size.LARGE} alignItems="center">
        <Link href="/">
          <img
            src={logo}
            // @ts-ignore
            height={theme.spacing(3)}
          />
        </Link>
        <Link href="/users">Nutzer</Link>
        <Link href="/news">News</Link>
      </Stack>
    </Typography>
  );
};

export default Navbar;
