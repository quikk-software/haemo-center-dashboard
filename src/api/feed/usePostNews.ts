import { getApi, feedApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { PostNewsResponse } from "@/@types/feed";
import { Dispatch } from "redux";

export type PostNewsProps = {
  image?: string;
  headline: string;
  text: string;
  creatorName: string;
  link: string;
};

export const postNews = async ({ image, headline, text, creatorName, link }: PostNewsProps, accessToken: string | null, refreshToken: string | null, dispatch: Dispatch) => {
  const response = await feedApi.api.v1NewsCreate(
    { image, headline, text, creatorName, link },
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  return response;
};

const usePostNews = ({ image, headline, text, creatorName, link }: PostNewsProps) => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<PostNewsResponse>();

  const request = useCallback(async () => {
    const response = await feedApi.api.v1NewsCreate(
      { image, headline, text, creatorName, link },
      {
        ...(await getApi(accessToken, refreshToken, dispatch)),
      },
    );
    setResponse({ id: response.data.id });
  }, [accessToken, dispatch, image, headline, text, creatorName, link, refreshToken]);

  return { request, response };
};

export default usePostNews;
