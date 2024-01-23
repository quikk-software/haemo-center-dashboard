import * as React from "react";
import {Stack, Typography, useTheme} from "@mui/material";
import Link from "@/components/common/Link";
import Size from "@/components/layout/size";
import logo from "@/assets/hemmo.svg";
import {useSelector} from "react-redux";
import {Store} from "@/redux";
import {ADMIN_ROLE} from "@/auth/auth.constants";

const Navbar: React.FC = () => {
    const theme = useTheme();

    const {roles} = useSelector((s: Store) => s.auth);

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
                <Link href="/users">Nutzer</Link>
                <Link href="/news">News</Link>
                {roles.includes(ADMIN_ROLE) && <Link href="/admin">Admin</Link>}
            </Stack>
        </Typography>
    );
};

export default Navbar;
