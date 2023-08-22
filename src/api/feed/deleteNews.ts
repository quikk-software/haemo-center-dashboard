import { getApi, feedApi } from "@/@types";
import { Dispatch } from "redux";

export const deleteNews = async (newsId: number, accessToken: string | null, refreshToken: string | null, dispatch: Dispatch) => {
  const response = await feedApi.api.v1NewsDelete(
    newsId,
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  return response;
};
