import { useState } from "react";
import { prescriptionApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";

export const useGetPrescription = () => {
  const [data, setData] = useState<GetPrescriptionResponseV2 | undefined>(
    undefined,
  );

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const fetch = async (prescriptionId: number) => {
    const response = await handleFn(
      async () =>
        await prescriptionApi.api.v2PrescriptionsDetail(prescriptionId, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );

    setData(response?.data);

    return response?.data;
  };

  return {
    ...apiStates,
    fetch,
    data,
  };
};
