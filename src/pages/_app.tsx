import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Page from "@/components/layout/Page";
import pages from "@/routes";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "@/redux";
import ErrorBoundary from "@/components/core/ErrorBoundary";
import AuthGuard from "@/components/auth/AuthGuard";
import LoadingGuard from "@/components/layout/LoadingGuard";
import LocalizedThemeProvider from "@/components/i18n/LocalizedThemeProvider";
import "../i18n";
import SnackbarComponent from "@/components/layout/Snackbar";
import useCurrentPage from "@/routes/useCurrentPage";

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  const { title, description, __dangerousPageSpecificStyling } =
    useCurrentPage();
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <LocalizedThemeProvider>
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
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <LoadingGuard>
            <AuthGuard>
              <SnackbarComponent>
                <Page
                  title={title}
                  description={description}
                  styleOverwrite={__dangerousPageSpecificStyling}
                >
                  <Component {...pageProps} />
                </Page>
              </SnackbarComponent>
            </AuthGuard>
          </LoadingGuard>
        </LocalizedThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
