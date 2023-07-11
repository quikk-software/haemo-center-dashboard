import React, { CSSProperties, PropsWithChildren } from "react";
import Footer from "./Footer";
import { NextSeo } from "next-seo";
import { Box, Container } from "@mui/material";
import { APP_NAME } from "@/constants";
import Header from "./Header";
import Sizes from "@/components/layout/sizes";

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
      <Header />
      <Container
        style={{
          flex: "1 0 auto",
          ...styleOverwrite,
        }}
      >
        <Box pt={Sizes.MEDIUM} pb={Sizes.MEDIUM} style={styleOverwrite}>
          {children}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Page;
