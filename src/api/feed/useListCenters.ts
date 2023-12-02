import {getApi, userApi} from "@/@types";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/redux";
import {useCallback, useState} from "react";
import {ListCenterUsersResponse} from "@/@types/user";

const useListCenters = () => {
    const pageNumber = 0;

    const {accessToken, refreshToken} = useSelector((s: Store) => s.auth);
    const dispatch = useDispatch();

    const [response, setResponse] = useState<ListCenterUsersResponse["centers"]>([]);

    const request = useCallback(async () => {
        const response = await userApi.api.v1UsersCentersList(
            {
                pageNumber,
                pageSize: 999,
            },
            {
                ...(await getApi(accessToken, refreshToken, dispatch)),
            },
        );
        setResponse(response.data.centers ?? []);
    }, [accessToken, dispatch, refreshToken, pageNumber]);

    return {request, response};
};

export default useListCenters;
