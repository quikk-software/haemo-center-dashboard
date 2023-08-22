import { getApi, feedApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { ListNewsResponse } from "@/@types/feed";

const useGetNews = (page: number | undefined) => {
  const pageNumber = (page === undefined || page <= 0 )? 1 : page;

  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<ListNewsResponse>();

  const request = useCallback(async () => {
    const response = await feedApi.api.v1NewsList(
      {
        pageNumber
      },
      {
        ...(await getApi(accessToken, refreshToken, dispatch)),
      },
    );
    setResponse(response.data);
  }, [accessToken, dispatch, refreshToken, pageNumber]);

  return { request, response };
};

export default useGetNews;
