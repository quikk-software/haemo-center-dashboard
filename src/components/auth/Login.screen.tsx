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

const LoginScreen: React.FC = () => {
  const handleSubmit = () => {
    console.log("sheesh!");
  };

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
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: Sizes.SMALL }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: Sizes.MEDIUM, mb: Sizes.SMALL }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" muiLinkProps={{ variant: "body2" }}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/signup" muiLinkProps={{ variant: "body2" }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginScreen;
