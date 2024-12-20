import React from "react";
import { Alert, AlertColor, Snackbar, SnackbarOrigin } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { setSnackbarState } from "./snackbarSlice";

export const useSnackbarComponent = () => {
  const dispatch = useDispatch();

  const displayWarning = (message: string) => {
    dispatch(
      setSnackbarState({
        open: true,
        message,
        severity: "warning" as AlertColor,
      }),
    );
  };

  const displayError = (message: string) => {
    dispatch(
      setSnackbarState({
        open: true,
        message,
        severity: "error" as AlertColor,
      }),
    );
  };

  const displaySuccess = (message: string) => {
    dispatch(
      setSnackbarState({
        open: true,
        message,
        severity: "success" as AlertColor,
      }),
    );
  };

  return { displayWarning, displayError, displaySuccess };
};

const SnackbarComponent: React.FunctionComponent = () => {
  const { snackbarState } = useSelector((store: Store) => store.snackbar);
  const dispatch = useDispatch();

  const snackbarOrigin = {
    vertical: "bottom",
    horizontal: "center",
  } as SnackbarOrigin;
  const autoHideDuration = 4000; // ms

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event) => {
    dispatch(setSnackbarState({ ...snackbarState, open: false }));
  };

  return (
    <Snackbar
      anchorOrigin={snackbarOrigin}
      open={snackbarState.open}
      autoHideDuration={autoHideDuration}
      onClose={handleCloseSnackbar}
      disableWindowBlurListener
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
