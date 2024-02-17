import React, { CSSProperties, PropsWithChildren, useEffect } from "react";
import Footer from "./Footer";
import { NextSeo } from "next-seo";
import { Box, Container, Divider, Stack } from "@mui/material";
import { APP_NAME } from "@/constants";
import Header from "./Header";
import Size from "@/components/layout/size";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { useDispatch } from "react-redux";
import { setTableSettings } from "@/components/overview/table/tableSlice";
import { initialTableConfig } from "@/components/overview/table/useTableConfig";
import SnackbarComponent from "@/components/layout/Snackbar";

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
  const dispatch = useDispatch();

  // init table config to allow fetching later
  useEffect(() => {
    dispatch(setTableSettings(initialTableConfig));
  }, []);

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
