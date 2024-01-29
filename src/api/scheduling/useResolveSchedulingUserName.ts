import { getApi, prescriptionApi, schedulingApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import {
  setPrescriptionPatientName,
  setPrescriptionProfessionalName,
} from "@/components/overview/prescriptions/prescriptionSlice";
import logger from "@/core/logger";

export const useResolveSchedulingPatientName = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (id: string) => {
      const res = await resolveName(
        { id },
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        dispatch(
          setPrescriptionPatientName(`${res.firstName} ${res.lastName}`),
        );
      }
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const useResolveSchedulingProfessionalName = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (id: string) => {
      const res = await resolveName(
        { id },
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        dispatch(
          setPrescriptionProfessionalName(`${res.firstName} ${res.lastName}`),
        );
      }
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const resolveName = async (
  { id }: { id: string },
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  if (id === undefined) {
    logger.error("useGetPrescriptions:::id is undefined");
    return;
  }
  const res = await schedulingApi.api.v1SchedulingUsersCenterDetail(
    Number(id),
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  logger.debug(res.data);
  return res.data;
};
