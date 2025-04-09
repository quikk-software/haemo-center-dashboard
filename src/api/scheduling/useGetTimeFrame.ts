import { useState } from "react";
import { schedulingApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { GetTimeFrameResponse } from "@/@types/scheduling";

export const useGetTimeFrame = () => {
  const [data, setData] = useState<GetTimeFrameResponse | undefined>(undefined);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const fetch = async (timeFrameId: number) => {
    const response = await handleFn(
      async () =>
        await schedulingApi.api.v2TimeFramesDetail(timeFrameId, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );

    setData(response?.data);

    return response?.data;
  };

  return {
    ...apiStates,
    fetch,
    data,
  };
};
