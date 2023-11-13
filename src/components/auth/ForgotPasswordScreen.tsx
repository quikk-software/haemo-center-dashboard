import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Size from "@/components/layout/size";
import Link from "@/components/common/Link";
import logger from "@/core/logger";
import { useSnackbarComponent } from "@/components/layout/Snackbar";
import useResetPassword from "../../api/users/useResetPassword";
import { useRouter } from "next/router";

const ForgotPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const router = useRouter();
  const { request } = useResetPassword();

  const { displaySuccess, displayWarning, displayError } =
    useSnackbarComponent();

  const isDisabled = useMemo(() => {
    return (
      password === "" || repeatPassword === "" || password !== repeatPassword
    );
  }, [password, repeatPassword]);

  const onSubmit = useCallback(async () => {
    const verificationCode = router.query.verificationCode as string;
    if (!verificationCode) {
      displayWarning(
        "Bestätigungscode nicht vorhanden. Bitte öffnen Sie den Link aus Ihrer Mail erneut.",
      );
      return;
    }
    try {
      await request(verificationCode, password);
      displaySuccess(
        "Ihr Passwort wurde erfolgreich geändert. Kehren Sie zur App zurück und nutzen Sie Ihr neues Passwort für die Anmeldung.",
      );
    } catch (err) {
      logger.error({ err });
      displayError(
        "Bei dem Zurücksetzen Ihres Passworts ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      );
    }
  }, [logger, request, router.query, password]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1 0",
      }}
    >
      <Typography component="h1" variant="h5">
        Neues Passwort vergeben
      </Typography>
      <Box sx={{ mt: Size.SMALL }}>
        <TextField
          margin="normal"
          fullWidth
          label="Neues Passwort"
          autoFocus
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Neues Passwort wiederholen"
          value={repeatPassword}
          type="password"
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: Size.MEDIUM, mb: Size.SMALL }}
          onClick={() => {
            onSubmit();
          }}
          disabled={isDisabled}
        >
          Passwort zurücksetzen
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/auth/login" muiLinkProps={{ variant: "body2" }}>
              Zur Anmeldung
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPasswordScreen;
