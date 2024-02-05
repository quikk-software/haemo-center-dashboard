import { getApi, prescriptionApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import { setAllPrescriptions } from "@/components/overview/prescriptions/prescriptionSlice";
import logger from "@/core/logger";
import { setTableSettings } from "@/components/overview/table/tableSlice";

export type PrescriptionQuery = {
  isAccepted?: boolean;
  // sort by createdAt
  sort?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};

const useGetAllPrescriptions = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (query: PrescriptionQuery) => {
      const res = await getAllPrescriptions(
        // Prisma ist kacke und fängt bei 1 an...
        query ? { ...query, pageNumber: (query.pageNumber ?? 0) + 1 } : {},
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        const { prescriptions, ...rest } = res;
        dispatch(setAllPrescriptions(prescriptions));
        dispatch(
          setTableSettings({
            ...rest,
            // Prisma ist kacke und fängt bei 1 an...
            pageNumber: res.pageNumber ? res.pageNumber - 1 : 0,
          }),
        );
        // dispatch(setTableSettings(rest));
      }
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const getAllPrescriptions = async (
  query: PrescriptionQuery,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const res =
    await prescriptionApi.api.v1PrescriptionsCenterAllPrescriptionsList(query, {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    });
  logger.debug("result", res.data);
  return res.data;
};

export default useGetAllPrescriptions;
