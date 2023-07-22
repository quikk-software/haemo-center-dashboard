import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Sizes from "@/components/layout/sizes";
import Link from "@/components/common/Link";
import useRedirect from "@/core/useRedirect";
import useAuth from "@/components/auth/useAuth";
import { setPassword, setUsername } from "@/components/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { redirectUrl } = useRedirect();
  const { password, username } = useSelector((store: Store) => store.auth);

  const { handleLogin } = useAuth(username, password);

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
        Sign in
      </Typography>
      <Box sx={{ mt: Sizes.SMALL }}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: Sizes.MEDIUM, mb: Sizes.SMALL }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/forgot-password" muiLinkProps={{ variant: "body2" }}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginScreen;
