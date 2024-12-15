import React, { useCallback, useEffect, useMemo } from "react";
import { Divider } from "@mui/material";
import logger from "@/core/logger";
import useGetUsers from "@/api/users/useGetUsers";
import useTableConfig from "@/components/overview/table/useTableConfig";
import Verify from "@/components/overview/users/cells/Verify";
import Block from "@/components/overview/users/cells/Block";
import ViewPrescriptions from "@/components/overview/users/cells/ViewPrescriptions";
import ViewAppointments from "@/components/overview/users/cells/ViewAppointments";
import ActionMenu from "@/components/common/ActionMenu";
import { useDispatch } from "react-redux";
import { setUsers } from "@/components/overview/users/userOverviewSlice";

export type Props = {
  id: string;
  blocked: boolean;
  enabled: boolean;
};

const MoreActionsButton: React.FC<Props> = ({ id, blocked, enabled }) => {
  const [_anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const { pageNumber, pageSize, query } = useTableConfig(true);

  const { request, response } = useGetUsers({ pageNumber, pageSize, query });

  useEffect(() => {
    dispatch(setUsers(response));
  }, [response]);

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
