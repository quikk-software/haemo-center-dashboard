import { schedulingApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";

export const useDeleteTimeFrame = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const mutate = async (timeFrameId: number) => {
    await handleFn(
      async () =>
        await schedulingApi.api.v2TimeFramesDelete(timeFrameId, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );
  };

  return {
    ...apiStates,
    mutate,
  };
};
