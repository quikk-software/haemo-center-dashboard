import { getApi, prescriptionApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import {
  setAllPrescriptions,
  setPrescription,
} from "@/components/overview/prescriptions/prescriptionSlice";
import logger from "@/core/logger";
import { setTableSettings } from "@/components/overview/table/tableSlice";

export type PrescriptionQuery = {
  isAccepted?: boolean;
  // sort by createdAt
  sort?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};

const useGetPrescription = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (id: number) => {
      const res = await getPrescription(
        id,
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        dispatch(setPrescription(res));
      }
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const getPrescription = async (
  id: number,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const res = await prescriptionApi.api.v1PrescriptionsDetail(id, {
    ...(await getApi(accessToken, refreshToken, dispatch)),
  });
  logger.debug("result", res.data);
  return res.data;
};

export default useGetPrescription;
