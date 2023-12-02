import React, { CSSProperties, PropsWithChildren } from "react";
import Footer from "./Footer";
import { NextSeo } from "next-seo";
import { Box, Container, Divider, Stack } from "@mui/material";
import { APP_NAME } from "@/constants";
import Header from "./Header";
import Size from "@/components/layout/size";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

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
        <Stack>
          <Box pt={Size.MEDIUM} pb={Size.MEDIUM} style={styleOverwrite}>
            <Breadcrumbs />
          </Box>
          <Divider />
          <Box pt={Size.MEDIUM} pb={Size.MEDIUM} style={styleOverwrite}>
            {children}
          </Box>
        </Stack>
      </Container>
      <Footer />
    </Box>
  );
};

export default Page;
