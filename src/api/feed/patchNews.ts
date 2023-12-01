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
  isSponsored?: boolean;
  isAdmin?: boolean;
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
    isSponsored,
    isAdmin,
  }: PatchNewsProps,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const response = await feedApi.api.v1NewsPartialUpdate(
    {
      newsId,
      image,
      imageMIMEType,
      headline,
      text,
      creatorName,
      link,
      isSponsored,
      isAdmin,
    },
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  return response;
};
