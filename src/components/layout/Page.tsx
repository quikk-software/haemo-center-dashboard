import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import { NextSeo } from "next-seo";
import { Box, Container } from "@mui/material";
import { APP_NAME } from "@/constants";

type PageProps = {
  title: string;
  description: string;
};

const Page: React.FC<PropsWithChildren<PageProps>> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={`%s - ${APP_NAME}`}
      />
      <Container style={{ flex: "1 0 auto" }}>
        <Box>{children}</Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Page;
