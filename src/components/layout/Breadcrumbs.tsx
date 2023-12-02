import React from "react";
import Link from "@/components/common/Link";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import useCurrentPage from "@/routes/useCurrentPage";
import { APP_NAME } from "@/constants";
import { breadcrumbConfig } from "@/routes";

const Breadcrumbs: React.FC = () => {
  const { pathname } = useCurrentPage();

  const breadcrumbs = breadcrumbConfig.find((b) => b[0].pathname === pathname)!;

  return (
    <MuiBreadcrumbs>
      <Link href="/">{APP_NAME}</Link>
      {breadcrumbs.reverse().map((b, i) =>
        i === breadcrumbs.length - 1 ||
        b.pathname.includes("[") ||
        b.pathname.includes("]") ? (
          <Typography color="text.primary">{b.title}</Typography>
        ) : (
          <Link href={b.pathname} key={i}>
            {b.title}
          </Link>
        ),
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
