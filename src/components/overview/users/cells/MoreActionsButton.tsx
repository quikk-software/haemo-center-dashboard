import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
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
import Verify from "@/components/overview/users/cells/Verify";
import Block from "@/components/overview/users/cells/Block";
import ViewPrescriptions from "@/components/overview/users/cells/ViewPrescriptions";
import ViewAppointments from "@/components/overview/users/cells/ViewAppointments";
import ActionMenu from "@/components/common/ActionMenu";

export type Props = {
  id: string;
  blocked: boolean;
  enabled: boolean;
};

const MoreActionsButton: React.FC<Props> = ({ id, blocked, enabled }) => {
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
    <ActionMenu>
      <ViewAppointments id={id} />
      <ViewPrescriptions id={id} />
      <Divider />
      <Verify
        enabled={enabled}
        handleClose={handleClose}
        id={id}
        handleSuccess={async () => {
          await request();
          logger.log("erfolgreich: activate");
        }}
      />
      <Block
        blocked={blocked}
        handleClose={handleClose}
        id={id}
        handleSuccess={async () => {
          await request();
          logger.log("erfolgreich: block");
        }}
      />
    </ActionMenu>
  );
};

export default MoreActionsButton;
