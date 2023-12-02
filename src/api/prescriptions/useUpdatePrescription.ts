import { getApi, prescriptionApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import { PatchPrescriptionRequest } from "@/@types/prescription";

const useUpdatePrescription = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (prescription: PatchPrescriptionRequest) => {
      await updatePrescription(
        prescription,
        accessToken,
        refreshToken,
        dispatch,
      );
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const updatePrescription = async (
  prescription: PatchPrescriptionRequest,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  // TODO: usePagination verwenden für die Params!
  await prescriptionApi.api.v1PrescriptionsPartialUpdate(prescription, {
    ...(await getApi(accessToken, refreshToken, dispatch)),
  });
};

export default useUpdatePrescription;
