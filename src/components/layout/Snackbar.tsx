import React, { PropsWithChildren, useCallback } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { setSnackbarState } from "./snackbarSlice";

export const useSnackbarComponent = () => {
  const dispatch = useDispatch();

  const displayWarning = useCallback(
    (message: string) => {
      dispatch(
        setSnackbarState({
          open: true,
          message,
          severity: "warning" as AlertColor,
        }),
      );
    },
    [dispatch],
  );

  const displayError = useCallback(
    (message: string) => {
      dispatch(
        setSnackbarState({
          open: true,
          message,
          severity: "error" as AlertColor,
        }),
      );
    },
    [dispatch],
  );

  const displaySuccess = useCallback(
    (message: string) => {
      dispatch(
        setSnackbarState({
          open: true,
          message,
          severity: "success" as AlertColor,
        }),
      );
    },
    [dispatch],
  );

  return { displayWarning, displayError, displaySuccess };
};

const SnackbarComponent: React.FC<PropsWithChildren<Record<never, any>>> = ({
  children,
}) => {
  const { snackbarState } = useSelector((store: Store) => store.snackbar);
  const dispatch = useDispatch();

  const snackbarOrigin = {
    vertical: "bottom",
    horizontal: "center",
  } as SnackbarOrigin;
  const autoHideDuration = 4000; // ms

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbarState({ ...snackbarState, open: false }));
  };

  return (
    <Snackbar
      anchorOrigin={snackbarOrigin}
      open={snackbarState.open}
      autoHideDuration={autoHideDuration}
      onClose={handleCloseSnackbar}
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
