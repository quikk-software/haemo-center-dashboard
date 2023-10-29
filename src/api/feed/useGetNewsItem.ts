import { getApi, feedApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { GetNewsResponse } from "@/@types/feed";

const useGetNewsItem = (id: number) => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<GetNewsResponse>();

  const request = useCallback(async () => {
    const response = await feedApi.api.v1NewsDetail(id, {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    });
    setResponse(response.data);
  }, [accessToken, dispatch, refreshToken, id]);

  return { request, response };
};

export default useGetNewsItem;
