import React, { useCallback, useMemo } from "react";
import { Divider } from "@mui/material";
import logger from "@/core/logger";
import useGetUsers from "@/api/users/useGetUsers";
import useTableConfig from "@/components/overview/table/useTableConfig";
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

  const { pageNumber, pageSize, query } = useTableConfig(true);

  const { request } = useGetUsers({ pageNumber, pageSize, query });

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
