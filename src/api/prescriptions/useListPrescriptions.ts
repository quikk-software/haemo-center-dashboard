import { useState } from "react";
import { prescriptionApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";
import { usePagination } from "@/api/usePagination";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";

export const useListPrescriptions = ({
  pageNumber = 1,
  pageSize = 20,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const [data, setData] = useState<GetPrescriptionResponseV2[]>([]);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();
  const pagination = usePagination(pageNumber, pageSize);

  const fetch = async (
    customIsAccepted?: boolean,
    customSort?: "asc" | "desc",
    customPageNumber?: number,
    customPageSize?: number,
  ) => {
    const response = await handleFn(
      async () =>
        await prescriptionApi.api.v2PrescriptionsCenterAllPrescriptionsList(
          {
            pageNumber: customPageNumber ?? pagination.pageNumber,
            pageSize: customPageSize ?? pagination.pageSize,
            sort: customSort,
            isAccepted: customIsAccepted,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response.data?.prescriptions ?? []);

    pagination.handlePaginationPayload(response?.data);

    return response.data?.prescriptions ?? [];
  };

  return {
    ...apiStates,
    ...pagination,
    fetch,
    data,
  };
};
