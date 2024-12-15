import { getApi, prescriptionApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { Dispatch } from "redux";
import { setPrescriptions } from "@/components/todo/todoSlice";

export type PrescriptionQuery = {
  isAccepted?: boolean;
  sort?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};

const useListAllPrescriptionsV2 = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const request = async (query: PrescriptionQuery) => {
    const data = await listAllPrescriptionsV2(
      query,
      accessToken,
      refreshToken,
      dispatch,
    );

    dispatch(setPrescriptions(data.prescriptions));
  };

  return { request };
};

export const listAllPrescriptionsV2 = async (
  query: PrescriptionQuery,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const res =
    await prescriptionApi.api.v2PrescriptionsCenterAllPrescriptionsList(query, {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    });
  return res.data;
};

export default useListAllPrescriptionsV2;
