import React, { useCallback, useEffect, useMemo, useState } from "react";
import useBlockUser from "@/api/users/useBlockUser";
import useUnblockUser from "@/api/users/useUnblockUser";
import logger from "@/core/logger";
import { MenuItem } from "@mui/material";
import { Props } from "@/components/overview/users/cells/MoreActionsButton";
import ActionConfirmer from "@/components/overview/users/cells/ActionConfirmer";

type BlockProps = Pick<Props, "blocked" | "id"> & {
  handleClose: () => void;
  handleSuccess: (() => void) | (() => Promise<void>);
};
const Block: React.FC<BlockProps> = ({
  blocked,
  handleClose,
  handleSuccess,
  id,
}) => {
  const { request: blockUserRequest, response: blockUserResponse } =
    useBlockUser({ id });
  const { request: unblockUserRequest, response: unblockUserResponse } =
    useUnblockUser({ id });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (blockUserResponse) {
      logger.log("block user success");
    }
  }, [blockUserResponse]);

  useEffect(() => {
    if (unblockUserResponse) {
      logger.log("unblock user success");
    }
  }, [unblockUserResponse]);

  const handleOnClick = useCallback(async () => {
    if (blocked) {
      await unblockUserRequest();
    } else {
      await blockUserRequest();
    }
    await handleSuccess();
  }, [blockUserRequest, blocked, unblockUserRequest]);

  const displayText = useMemo(
    () => (blocked ? "Entblockieren" : "Blockieren"),
    [blocked],
  );

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
      okText="Blockieren"
      closeText="Abbrechen"
      title={`${displayText} bestätigen`}
      text={`Bitte bestätigen Sie die Aktion "${displayText}".`}
    >
      <MenuItem onClick={() => setOpen(true)}>{displayText}</MenuItem>
    </ActionConfirmer>
  );
};

export default Block;
