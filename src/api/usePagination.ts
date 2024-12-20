import { useState } from "react";

export const usePagination = (
  initialPageNumber: number = 1,
  initialPageSize: number = 20,
) => {
  const [count, setCount] = useState<number>(0);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(initialPageNumber);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  const handlePaginationPayload = (payload: any) => {
    console.log({ payload });
    setCount(payload?.count ?? 0);
    setHasPreviousPage(payload?.hasPreviousPage ?? false);
    setHasNextPage(payload?.hasNextPage ?? false);
    setPageNumber(payload?.pageNumber ?? initialPageNumber);
    setPageSize(payload?.pageSize ?? initialPageSize);
  };

  const reset = () => {
    setCount(0);
    setHasPreviousPage(false);
    setHasNextPage(true);
    setPageNumber(initialPageNumber);
    setPageSize(initialPageSize);
  };

  return {
    handlePaginationPayload,
    count,
    hasPreviousPage,
    hasNextPage,
    pageNumber,
    pageSize,
    reset,
  };
};
