import { getApi, feedApi } from "@/@types";
import { Dispatch } from "redux";

export type PatchNewsProps = {
  newsId: number;
  image?: string;
  imageMIMEType?: string;
  headline?: string;
  text?: string;
  creatorName?: string;
  link?: string;
};

export const patchNews = async (
  {
    newsId,
    image,
    imageMIMEType,
    headline,
    text,
    creatorName,
    link,
  }: PatchNewsProps,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const response = await feedApi.api.v1NewsPartialUpdate(
    { newsId, image, imageMIMEType, headline, text, creatorName, link },
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  return response;
};
