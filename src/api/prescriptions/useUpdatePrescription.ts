import { prescriptionApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";
import { PatchPrescriptionRequest } from "@/@types/prescription";

export const useUpdatePrescription = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const mutate = async (prescription: PatchPrescriptionRequest) => {
    await handleFn(
      async () =>
        await prescriptionApi.api.v1PrescriptionsCenterPartialUpdate(
          prescription,
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );
  };

  return {
    ...apiStates,
    mutate,
  };
};
