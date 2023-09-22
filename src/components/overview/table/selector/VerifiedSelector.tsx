import React, { useCallback, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import logger from "@/core/logger";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import useBlockUser from "@/api/users/useBlockUser";
import useUnblockUser from "@/api/users/useUnblockUser";
import useActivateUser from "@/api/users/useActivateUser";
import useDeactivateUser from "@/api/users/useDeactivateUser";

type Props = {
  id: string;
  enabled: boolean;
  onSuccess: () => void;
};

const VerifiedSelector: React.FC<Props> = ({ id, enabled, onSuccess }) => {
  const { request: activteUser, response: activateUserResponse } =
    useActivateUser({ id });
  const { request: deactivateUserRequest, response: deactivateUserResponse } =
    useDeactivateUser({ id });

  const handleOnClick = useCallback(() => {
    if (enabled) {
      deactivateUserRequest();
    } else {
      activteUser();
    }
  }, [activteUser, enabled, deactivateUserRequest]);

  useEffect(() => {
    if (activateUserResponse) {
      onSuccess();
    }
  }, [activateUserResponse]);

  useEffect(() => {
    if (deactivateUserResponse) {
      onSuccess();
    }
  }, [deactivateUserResponse]);

  return (
    <Stack direction="row" spacing={1}>
      <Alert severity={enabled ? "success" : "warning"}>
        {enabled ? "Ja" : "Nein"}
      </Alert>
      <Button
        color={enabled ? "warning" : "success"}
        variant="contained"
        size="small"
        onClick={handleOnClick}
      >
        {enabled ? "Verifizierung aufheben" : "Verifizieren"}
      </Button>
    </Stack>
  );
};

export default VerifiedSelector;
