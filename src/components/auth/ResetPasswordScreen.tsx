import React, { useCallback, useState } from "react";
import type { FunctionComponent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Size from "@/components/layout/size";
import usePasswordReset from "@/api/users/usePasswordReset";
import { useSnackbarComponent } from "@/components/layout/Snackbar";

const ResetPasswordScreen: FunctionComponent = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);

  const { request } = usePasswordReset();
  const { displaySuccess, displayError } = useSnackbarComponent();

  const handlePasswordReset = useCallback(async () => {
    if (email === undefined) {
      return;
    }
    try {
      await request(email);
      displaySuccess("Sie erhalten eine E-Mail mit weiteren Anweisungen.");
    } catch (e) {
      displayError(
        `Beim Zurücksetzen des Passworts ist ein Fehler aufgetreten: ${
          e.error?.detail ?? "Keine Fehlermeldung vorhanden"
        }`,
      );
    }
  }, [request, email, displaySuccess, displayError]);

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
        Passwort über E-Mail zurücksetzen
      </Typography>
      <Box sx={{ mt: Size.SMALL }} gap={Size.Large}>
        <TextField
          margin="normal"
          fullWidth
          label="E-Mail"
          autoFocus
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => handlePasswordReset()}
        >
          Passwort zurücksetzen
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPasswordScreen;
