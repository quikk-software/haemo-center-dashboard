import React, { PropsWithChildren } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
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
      <MUILink {...externalHrefProps} {...muiLinkProps} underline="hover">
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
