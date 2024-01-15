import React, { useCallback, useEffect, useMemo, useState } from "react";
import useActivateUser from "@/api/users/useActivateUser";
import useDeactivateUser from "@/api/users/useDeactivateUser";
import logger from "@/core/logger";
import { MenuItem } from "@mui/material";
import { Props } from "@/components/overview/users/cells/MoreActionsButton";
import ActionConfirmer from "@/components/overview/users/cells/ActionConfirmer";

type VerifyProps = Pick<Props, "enabled" | "id"> & {
  handleClose: () => void;
  handleSuccess: (() => void) | (() => Promise<void>);
};
const Verify: React.FC<VerifyProps> = ({
  enabled,
  handleClose,
  handleSuccess,
  id,
}) => {
  const { request: activateUser, response: activateUserResponse } =
    useActivateUser({ id });
  const { request: deactivateUserRequest, response: deactivateUserResponse } =
    useDeactivateUser({ id });

  const [open, setOpen] = useState(false);

  const handleOnClick = useCallback(async () => {
    if (enabled) {
      await deactivateUserRequest();
    } else {
      await activateUser();
    }
    await handleSuccess();
  }, [activateUser, enabled, deactivateUserRequest]);

  const displayText = useMemo(
    () => (enabled ? "Entverifizieren" : "Verifizieren"),
    [enabled],
  );

  useEffect(() => {
    if (activateUserResponse) {
      logger.log("activate user success");
    }
  }, [activateUserResponse]);

  useEffect(() => {
    if (deactivateUserResponse) {
      logger.log("deactivate user success");
    }
  }, [deactivateUserResponse]);

  const close = useCallback(() => {
    handleClose();
    setOpen(false);
  }, [handleClose]);

  return (
    <ActionConfirmer
      active={open}
      onOk={async () => {
        await handleOnClick();
        close();
      }}
      onClose={close}
      okText={displayText}
      closeText="Abbrechen"
      title={`${displayText} bestätigen`}
      text={`Bitte bestätigen Sie die Aktion "${displayText}".`}
    >
      <MenuItem onClick={() => setOpen(true)}>{displayText}</MenuItem>{" "}
    </ActionConfirmer>
  );
};

export default Verify;
