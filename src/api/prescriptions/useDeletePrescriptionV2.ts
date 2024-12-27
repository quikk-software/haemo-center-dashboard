import { prescriptionApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";

export const useDeletePrescriptionV2 = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const mutate = async (
    prescriptionId: number,
    triggerNotification: boolean,
  ) => {
    await handleFn(
      async () =>
        await prescriptionApi.api.v2PrescriptionsCenterDelete(
          prescriptionId,
          {
            triggerNotification,
          },
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
