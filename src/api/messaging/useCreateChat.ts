import { messagingApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { PostChatRequestV2 } from "@/@types/messaging";

export const useCreateChat = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const mutate = async (chat: PostChatRequestV2) => {
    await handleFn(
      async () =>
        await messagingApi.api.v2ChatsCreate(chat, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );
  };

  return {
    ...apiStates,
    mutate,
  };
};

export default useCreateChat;
