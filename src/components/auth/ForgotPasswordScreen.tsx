import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Size from "@/components/layout/size";
import Link from "@/components/common/Link";
import logger from "@/core/logger";
import { useSnackbarComponent } from "@/components/layout/Snackbar";
const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const { displaySuccess, displayWarning, displayError } =
    useSnackbarComponent();
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
        Password zurücksetzen
      </Typography>
      <Box sx={{ mt: Size.SMALL }}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: Size.MEDIUM, mb: Size.SMALL }}
          onClick={() => {
            logger.log(email);
            displaySuccess(
              "Falls diese E-Mail Adresse bei uns im System existiert, bekommst du einen Link zum Zurücksetzen des Passworts zugeschickt",
            );
          }}
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
