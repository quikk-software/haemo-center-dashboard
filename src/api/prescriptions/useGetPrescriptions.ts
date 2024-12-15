import { getApi, prescriptionApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import { setPrescriptions } from "@/components/overview/prescriptions/prescriptionSlice";
import logger from "@/core/logger";

const useGetPrescriptions = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = async (id: string) => {
    try {
      const res = await getPrescriptions(
        { id },
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        dispatch(setPrescriptions(res.prescriptions));
      }
    } catch {
      dispatch(setPrescriptions([]));
    }
  };

  return { request, response };
};

export const getPrescriptions = async (
  { id }: { id: string },
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  if (id === undefined) {
    logger.error("useGetPrescriptions:::id is undefined");
    return;
  }
  const res = await prescriptionApi.api.v1PrescriptionsUserDetail(
    id,
    {},
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  logger.debug(res.data);
  if (res.status >= 400) {
    return;
  }
  return res.data;
};

export default useGetPrescriptions;
