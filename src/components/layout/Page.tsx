import React, { CSSProperties, PropsWithChildren } from "react";
import Footer from "./Footer";
import { NextSeo } from "next-seo";
import { Box, Container } from "@mui/material";
import { APP_NAME } from "@/constants";
import Index from "./Header";
import Size from "@/components/layout/size";

type PageProps = {
  title: string;
  description: string;
  styleOverwrite?: CSSProperties;
};

const Page: React.FC<PropsWithChildren<PageProps>> = ({
  title,
  description,
  styleOverwrite = {},
  children,
}) => {
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={`%s - ${APP_NAME}`}
      />
      <Index />
      <Container
        style={{
          flex: "1 0 auto",
          ...styleOverwrite,
        }}
      >
        <Box pt={Size.MEDIUM} pb={Size.MEDIUM} style={styleOverwrite}>
          {children}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Page;
