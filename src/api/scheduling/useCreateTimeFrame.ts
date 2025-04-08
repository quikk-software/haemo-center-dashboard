import { schedulingApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { PostTimeFrameRequestV2 } from "@/@types/scheduling";

export const useCreateTimeFrame = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const mutate = async (timeFrame: PostTimeFrameRequestV2) => {
    await handleFn(
      async () =>
        await schedulingApi.api.v2TimeFramesCreate(timeFrame, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );
  };

  return {
    ...apiStates,
    mutate,
  };
};
