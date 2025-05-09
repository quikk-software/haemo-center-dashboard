import { useState } from "react";
import { messagingApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";
import { GetChatResponseV2 } from "@/@types/messaging";

export const useListChats = () => {
  const [data, setData] = useState<GetChatResponseV2[]>([]);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const fetch = async (userId: string) => {
    const response = await handleFn(
      async () =>
        await messagingApi.api.v2ChatsList(
          {
            userId,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response.data?.chats ?? []);

    return response.data?.chats ?? [];
  };

  return {
    ...apiStates,
    fetch,
    data,
  };
};
