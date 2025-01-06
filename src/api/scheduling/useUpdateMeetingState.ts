import { getApi, schedulingApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { Dispatch } from "redux";
import logger from "@/core/logger";
import { useState } from "react";

const useUpdateMeetingState = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const request = async (id: number, state?: string) => {
    try {
      setIsLoading(true);
      await updateMeetingState(
        { id, state },
        accessToken,
        refreshToken,
        dispatch,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { request, isLoading };
};

export const updateMeetingState = async (
  { id, state }: { id: number; state?: string },
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  if (id === undefined) {
    logger.error("useGetPrescriptions:::id is undefined");
    return;
  }

  const endpoint =
    state === "ACCEPTED"
      ? schedulingApi.api.v1MeetingAcceptCenterPartialUpdate
      : schedulingApi.api.v1MeetingRejectCenterPartialUpdate;

  await endpoint(id, {
    ...(await getApi(accessToken, refreshToken, dispatch)),
  });
};

export default useUpdateMeetingState;
