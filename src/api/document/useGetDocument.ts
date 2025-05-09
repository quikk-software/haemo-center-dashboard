import { documentApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";

export const useGetDocument = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const fetch = async (documentId: string) => {
    const response = await handleFn(
      async () =>
        await documentApi.api.v1DocumentsDetail(documentId, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );

    return response;
  };

  return {
    ...apiStates,
    fetch,
  };
};
