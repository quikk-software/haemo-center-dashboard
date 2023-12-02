import {getApi, feedApi} from "@/@types";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/redux";
import {useCallback, useState} from "react";
import {PostNewsResponse} from "@/@types/feed";
import {Dispatch} from "redux";
import {CenterNews} from "@/components/news/newsSlice";

export type PostNewsProps = {
    image?: string;
    imageMIMEType?: string;
    headline: string;
    text: string;
    creatorName: string;
    link: string;
    isSponsored: boolean;
    isAdmin: boolean;
    centers: CenterNews[];
};

export const postNews = async (
    {
        image,
        imageMIMEType,
        headline,
        text,
        creatorName,
        link,
        isSponsored,
        isAdmin,
        centers
    }: PostNewsProps,
    accessToken: string | null,
    refreshToken: string | null,
    dispatch: Dispatch,
) => {
    const response = await feedApi.api.v1NewsCreate(
        {
            image,
            imageMIMEType,
            headline,
            text,
            creatorName,
            link,
            isSponsored,
            isAdmin,
            centers
        },
        {
            ...(await getApi(accessToken, refreshToken, dispatch)),
        },
    );
    return response;
};

const usePostNews = ({
                         image,
                         imageMIMEType,
                         headline,
                         text,
                         creatorName,
                         link,
                     }: PostNewsProps) => {
    const {accessToken, refreshToken} = useSelector((s: Store) => s.auth);
    const dispatch = useDispatch();

    const [response, setResponse] = useState<PostNewsResponse>();

    const request = useCallback(async () => {
        const response = await feedApi.api.v1NewsCreate(
            {image, imageMIMEType, headline, text, creatorName, link},
            {
                ...(await getApi(accessToken, refreshToken, dispatch)),
            },
        );
        setResponse({newsId: response.data.newsId});
    }, [
        accessToken,
        dispatch,
        image,
        imageMIMEType,
        headline,
        text,
        creatorName,
        link,
        refreshToken,
    ]);

    return {request, response};
};

export default usePostNews;
