import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import useBlockUser from "@/api/users/useBlockUser";
import useUnblockUser from "@/api/users/useUnblockUser";
import useActivateUser from "@/api/users/useActivateUser";
import useDeactivateUser from "@/api/users/useDeactivateUser";
import logger from "@/core/logger";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useGetUsers from "@/api/users/useGetUsers";
import { initialTableConfig } from "@/components/overview/table/useTableConfig";

type Props = {
  id: string;
  blocked: boolean;
  enabled: boolean;
};

type BlockedActionProps = Pick<Props, "blocked" | "id"> & {
  handleClose: () => void;
  handleSuccess: () => void;
};
const BlockAction: React.FC<BlockedActionProps> = ({
  blocked,
  handleClose,
  handleSuccess,
  id,
}) => {
  const { request: blockUserRequest, response: blockUserResponse } =
    useBlockUser({ id });
  const { request: unblockUserRequest, response: unblockUserResponse } =
    useUnblockUser({ id });

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

  const handleOnClick = useCallback(() => {
    if (blocked) {
      unblockUserRequest();
    } else {
      blockUserRequest();
    }
    handleSuccess();
  }, [blockUserRequest, blocked, unblockUserRequest]);

  const displayText = useMemo(
    () => (blocked ? "Entblockieren" : "Blockieren"),
    [blocked],
  );
  return (
    <MenuItem
      onClick={() => {
        handleOnClick();
        handleClose();
      }}
    >
      {displayText}
    </MenuItem>
  );
};

type VerifyActionProps = Pick<Props, "enabled" | "id"> & {
  handleClose: () => void;
  handleSuccess: () => void;
};
const VerifyAction: React.FC<VerifyActionProps> = ({
  enabled,
  handleClose,
  handleSuccess,
  id,
}) => {
  const { request: activateUser, response: activateUserResponse } =
    useActivateUser({ id });
  const { request: deactivateUserRequest, response: deactivateUserResponse } =
    useDeactivateUser({ id });

  const handleOnClick = useCallback(() => {
    if (enabled) {
      deactivateUserRequest();
    } else {
      activateUser();
    }
    handleSuccess();
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

  return (
    <MenuItem
      onClick={() => {
        handleOnClick();
        handleClose();
      }}
    >
      {displayText}
    </MenuItem>
  );
};

const Action: React.FC<Props> = ({ id, blocked, enabled }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const { request } = useGetUsers(initialTableConfig);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
        <BlockAction
          blocked={blocked}
          handleClose={handleClose}
          id={id}
          handleSuccess={() => {
            request();
            logger.log("erfolgreich: block");
          }}
        />
        <VerifyAction
          enabled={enabled}
          handleClose={handleClose}
          id={id}
          handleSuccess={() => {
            request();
            logger.log("erfolgreich: activate");
          }}
        />
      </Menu>
    </>
  );
};

export default Action;
