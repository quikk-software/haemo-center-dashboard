import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentApi, getApi } from "@/@types";
import { useApiStates } from "@/api/useApiStates";
import { Store } from "@/redux";

export const useCreateDocument = () => {
  const [data, setData] = useState<
    { id?: string; contentType?: string } | undefined
  >(undefined);

  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const dispatch = useDispatch();

  const { handleFn, ...apiStates } = useApiStates();

  const mutate = async (
    allowedUserIds: string[],
    document: { base64: string; type: string; name: string },
  ) => {
    const response = await handleFn(
      async () =>
        await documentApi.api.v1DocumentsCreate(
          {
            file: document.base64,
            contentType: document.type,
            fileName: document.name,
            allowedUserIds,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response?.data);

    return response?.data;
  };

  return { ...apiStates, mutate, data };
};
