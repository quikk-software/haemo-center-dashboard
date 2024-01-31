import {getApi, schedulingApi} from "@/@types";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/redux";
import {useCallback, useState} from "react";
import {Dispatch} from "redux";
import {MeetingState} from "@/components/overview/meetings/meetingSlice";
import logger from "@/core/logger";

const useUpdateMeetingState = () => {
    const {accessToken, refreshToken} = useSelector((s: Store) => s.auth);
    const dispatch = useDispatch();

    const [response, setResponse] = useState<boolean | undefined>(undefined);

    const request = useCallback(
        async (id: string, state: MeetingState) => {
            await updateMeetingState(
                {id, state},
                accessToken,
                refreshToken,
                dispatch,
            );
        },
        [accessToken, dispatch, refreshToken],
    );

    return {request, response};
};

export const updateMeetingState = async (
    {id, state}: { id: string; state: MeetingState },
    accessToken: string | null,
    refreshToken: string | null,
    dispatch: Dispatch,
) => {
    if (id === undefined) {
        logger.error("useGetPrescriptions:::id is undefined");
        return;
    }

    const endpoint =
        String(state) === "ACCEPTED"
            ? schedulingApi.api.v1MeetingAcceptCenterPartialUpdate
            : schedulingApi.api.v1MeetingRejectCenterPartialUpdate;

    // TODO: usePagination verwenden für die Params!
    await endpoint(Number(id), {
        ...(await getApi(accessToken, refreshToken, dispatch)),
    });
};

export default useUpdateMeetingState;
