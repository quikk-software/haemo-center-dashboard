import { getApi, prescriptionApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";

type Props = {
  id: string;
};

const useGetPrescriptions = ({ id }: Props) => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(async () => {
    // const res = await prescriptionApi.api.;
    setResponse(true);
  }, [accessToken, dispatch, refreshToken]);

  return { request, response };
};

export const activateUser = async (
  { id }: Props,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  // const res = await prescriptionApi.api.;
  // return res.data;
  return true;
};

export default useGetPrescriptions;
