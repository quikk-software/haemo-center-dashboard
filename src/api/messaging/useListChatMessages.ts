import { useState } from "react";
import { messagingApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";
import { usePagination } from "@/api/usePagination";
import { ListChatMessagesResponseV2 } from "@/@types/messaging";

export const useListChatMessages = ({
  pageNumber = 1,
  pageSize = 20,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const [data, setData] = useState<ListChatMessagesResponseV2["chatMessages"]>(
    [],
  );

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();
  const pagination = usePagination(pageNumber, pageSize);

  const fetch = async (
    chatId: string,
    lastMessageCount: number,
    customPageNumber?: number,
    customPageSize?: number,
  ) => {
    const response = await handleFn(
      async () =>
        await messagingApi.api.v2ChatMessagesList(
          {
            chatId,
            lastMessageCount,
            pageNumber: customPageNumber ?? pagination.pageNumber,
            pageSize: customPageSize ?? pagination.pageSize,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response.data?.chatMessages ?? []);

    pagination.handlePaginationPayload(response?.data);

    return {
      meetings: response.data?.chatMessages ?? [],
      count: response.data.count,
    };
  };

  return {
    ...apiStates,
    ...pagination,
    fetch,
    data,
  };
};
