import { getApi, prescriptionApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { Dispatch } from "redux";

const useDeletePrescription = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const request = async (id: number) => {
    await deletePrescription(id, accessToken, refreshToken, dispatch);
  };

  return { request };
};

export const deletePrescription = async (
  id: number,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  await prescriptionApi.api.v1PrescriptionsCenterDelete(id, {
    ...(await getApi(accessToken, refreshToken, dispatch)),
  });
};

export default useDeletePrescription;
