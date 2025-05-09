import { messagingApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { PostChatMessageRequest } from "@/@types/messaging";

export const useCreateChatMessage = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const mutate = async (chatMessage: PostChatMessageRequest) => {
    const response = await handleFn(
      async () =>
        await messagingApi.api.v2ChatMessagesCreate(chatMessage, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );

    return response.data;
  };

  return {
    ...apiStates,
    mutate,
  };
};

export default useCreateChatMessage;
