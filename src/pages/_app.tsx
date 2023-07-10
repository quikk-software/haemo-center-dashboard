import type { AppProps } from "next/app";
import * as React from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Page from "@/components/layout/Page";
import pages from "@/routes";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "@/redux";

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  const router = useRouter();
  const currentPage = pages.find((page) => page.pathname === router.pathname)!;
  const { title, description } = currentPage;

  return (
    <Provider store={store}>
      <CssBaseline />
      <style jsx global>
        {`
          #__next > div {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      </style>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Page title={title} description={description}>
        <Component {...pageProps} />
      </Page>
    </Provider>
  );
};

export default MyApp;
