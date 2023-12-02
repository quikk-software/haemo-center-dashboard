import {getApi, feedApi} from "@/@types";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/redux";
import {useCallback, useState} from "react";
import {Dispatch} from "redux";

export type CenterNewsProps = {
    newsId: number;
    centerId: string;
    centerName: string;
};

export const assignCenterToNews = async (
    {
        newsId,
        centerId,
        centerName
    }: CenterNewsProps,
    accessToken: string | null,
    refreshToken: string | null,
    dispatch: Dispatch,
) => {
    const response = await feedApi.api.v1NewsAssignCenterCreate(
        {
            newsId,
            centerId,
            centerName
        },
        {
            ...(await getApi(accessToken, refreshToken, dispatch)),
        },
    );
    return response;
};

const useAssignCenterToNews = ({
                                   newsId, centerId
                               }: CenterNewsProps) => {
    const {accessToken, refreshToken} = useSelector((s: Store) => s.auth);
    const dispatch = useDispatch();

    const request = useCallback(async () => {
        await feedApi.api.v1NewsAssignCenterCreate(
            {newsId, centerId},
            {
                ...(await getApi(accessToken, refreshToken, dispatch)),
            },
        );
    }, [
        newsId,
        centerId,
        accessToken,
        dispatch,
        refreshToken,
    ]);

    return {request};
};

export default useAssignCenterToNews;
