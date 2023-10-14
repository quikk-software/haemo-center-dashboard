import React, { useCallback, useMemo } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Size from "@/components/layout/size";
import Link from "@/components/common/Link";
import useRedirect from "@/core/useRedirect";
import useAuth from "@/components/auth/useAuth";
import { setPassword, setUsername } from "@/components/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import useLanguage from "@/i18n/useLanguage";

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { redirectUrl } = useRedirect();
  const { password, username } = useSelector((store: Store) => store.auth);

  const { handleLogin } = useAuth();

  const isUsernameAndPasswordProvided = useMemo(
    () => password.length > 0 && username.length > 0,
    [username, password],
  );

  const handleLoginButtonClick = useCallback(
    () => handleLogin(username, password),
    [username, password],
  );

  const handleEnterPress = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isUsernameAndPasswordProvided && e.key === "Enter") {
        e.stopPropagation();
        return handleLoginButtonClick();
      }
    },
    [isUsernameAndPasswordProvided],
  );

  const { t } = useLanguage();

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
        {t("auth:loginTitle")}
      </Typography>
      <Box sx={{ mt: Size.SMALL }}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          onChange={(e) => dispatch(setUsername(e.target.value))}
          InputProps={{
            onKeyPress: (e) => handleEnterPress(e),
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => dispatch(setPassword(e.target.value))}
          InputProps={{
            onKeyPress: handleEnterPress,
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: Size.MEDIUM, mb: Size.SMALL }}
          onClick={handleLoginButtonClick}
          disabled={!isUsernameAndPasswordProvided}
        >
          {t("auth:login")}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href="/auth/forgot-password"
              muiLinkProps={{ variant: "body2" }}
            >
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginScreen;
