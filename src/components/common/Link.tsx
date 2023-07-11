import React, { PropsWithChildren } from "react";
// eslint-disable-next-line no-restricted-imports
import NextLink, { LinkProps as NextLinkProps } from "next/link";
// eslint-disable-next-line no-restricted-imports
import { Link as MUILink, LinkProps as MUILinkProps } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export type Props = {
  href: string;
  displayText?: string;
  muiLinkProps?: MUILinkProps;
  nextLinkProps?: NextLinkProps;
  hideIcon?: boolean;
};
const Link: React.FC<PropsWithChildren<Props>> = ({
  href,
  children,
  displayText,
  nextLinkProps,
  muiLinkProps,
  hideIcon = false,
}) => {
  const isExternal = !href.startsWith("/");

  const externalHrefProps = {
    rel: isExternal ? "noopener noreferrer" : undefined,
    target: isExternal ? "_blank" : undefined,
  };

  return (
    // @ts-ignore
    <NextLink
      {...externalHrefProps}
      href={href}
      passHref
      {...nextLinkProps}
      style={{ textDecoration: "none" }}
    >
      <MUILink
        {...externalHrefProps}
        {...muiLinkProps}
        underline="hover"
        component="span"
      >
        {displayText ?? children}
        {isExternal && !hideIcon && (
          <>
            {" "}
            <OpenInNewIcon fontSize="inherit" />
          </>
        )}
      </MUILink>
    </NextLink>
  );
};

export default Link;
