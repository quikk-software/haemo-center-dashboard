import { getApi, feedApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { ListNewsResponse } from "@/@types/feed";

const useGetNews = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<ListNewsResponse>();

  const request = useCallback(async () => {
    const response = await feedApi.api.v1NewsList(
      {
        ...(await getApi(accessToken, refreshToken, dispatch)),
      },
    );
    setResponse(response.data);
  }, [accessToken, dispatch, refreshToken]);

  return { request, response };
};

export default useGetNews;
