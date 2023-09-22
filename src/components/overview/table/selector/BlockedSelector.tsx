import React, { useCallback, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import logger from "@/core/logger";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import useBlockUser from "@/api/users/useBlockUser";
import useUnblockUser from "@/api/users/useUnblockUser";

type Props = {
  id: string;
  blocked: boolean;
  onSuccess: () => void;
};

const BlockedSelector: React.FC<Props> = ({ id, blocked, onSuccess }) => {
  const { request: blockUserRequest, response: blockUserResponse } =
    useBlockUser({ id });
  const { request: unblockUserRequest, response: unblockUserResponse } =
    useUnblockUser({ id });

  const handleOnClick = useCallback(() => {
    if (blocked) {
      unblockUserRequest();
    } else {
      blockUserRequest();
    }
  }, [blockUserRequest, blocked, unblockUserRequest]);

  useEffect(() => {
    if (blockUserResponse) {
      onSuccess();
    }
  }, [blockUserResponse]);

  useEffect(() => {
    if (unblockUserResponse) {
      onSuccess();
    }
  }, [unblockUserResponse]);

  return (
    <Stack direction="row" spacing={1}>
      <Alert severity={blocked ? "error" : "success"}>
        {blocked ? "Ja" : "Nein"}
      </Alert>
      <Button
        color={blocked ? "success" : "error"}
        variant="contained"
        size="small"
        onClick={handleOnClick}
      >
        {blocked ? "Blockierung aufheben" : "Blockieren"}
      </Button>
    </Stack>
  );
};

export default BlockedSelector;
