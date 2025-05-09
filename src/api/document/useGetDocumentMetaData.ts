import { useState } from "react";
import { documentApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { GetDocumentResponse } from "@/@types/document";

export const useGetDocumentMetaData = () => {
  const [data, setData] = useState<GetDocumentResponse | undefined>(undefined);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const fetch = async (documentId: string) => {
    const response = await handleFn(
      async () =>
        await documentApi.api.v1DocumentsMetadataList(documentId, {
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
