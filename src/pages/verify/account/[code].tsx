"use client";

import React, { useEffect, useState } from "react";
import useVerifyAccount from "@/api/users/useVerifyAccount";
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";
import { GetServerSidePropsContext } from "next";
import {
  Alert,
  AlertTitle,
  Box,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import useQuery from "@/utils/useQuery";

type Props = {};

enum State {
  SUCCESS = "success",
  FAILURE = "warning",
  ERROR = "error",
}

const reponseStateText: Record<State, { title: string; text: string }> = {
  [State.SUCCESS]: {
    title: "Account verifiziert",
    text: "Die Verifizierung war erfolgreich!",
  },
  [State.FAILURE]: {
    title: "Account nicht verifiziert",
    text: "Die Verifizierung war nicht erfolgreich. Bitte kontaktiere deine Praxis für mehr Informationen.",
  },
  [State.ERROR]: {
    title: "Fehler",
    text: "Bei der Verifizierung ist ein Fehler aufgetreten.",
  },
};
const AccountVerifyCodePage: React.FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [responseState, setResponseState] = useState<undefined | State>(
    undefined,
  );
  const theme = useTheme();
  const code = useQuery("code");

  const { request, response } = useVerifyAccount({ code });

  useEffect(() => {
    request();
  }, [code]);

  useEffect(() => {
    switch (response) {
      case true:
        setResponseState(State.SUCCESS);
        break;
      case false:
        setResponseState(State.FAILURE);
        break;
      default:
        setResponseState(State.ERROR);
        break;
    }
    setIsLoading(false);
  }, [response]);

  return (
    <NoSSR>
      <>
        <Typography variant="h4" color={theme.palette.text.primary}>
          Account Verifizierung
        </Typography>
        {isLoading && responseState !== undefined ? (
          <>
            <LinearProgress />
            <Typography color={theme.palette.text.primary}>
              Dein Account wird bestätigt.
            </Typography>
            <Box
              style={{
                padding: theme.spacing(1),
                backgroundColor: theme.palette.grey[100],
                fontSize: theme.spacing(8),
                textAlign: "center",
              }}
            >
              {code}
            </Box>
          </>
        ) : (
          <Alert severity={responseState}>
            <AlertTitle>
              {reponseStateText[responseState ?? State.ERROR].title}
            </AlertTitle>
            {reponseStateText[responseState ?? State.ERROR].text}
          </Alert>
        )}
      </>
    </NoSSR>
  );
};

export default AccountVerifyCodePage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { slug } = context.query;
  const sanitizedSlug = Array.isArray(slug) ? slug[0] : (slug ?? null);
  return { props: { slug: sanitizedSlug } };
};
