import { useRouter } from "next/router";
import pages from "@/routes/index";
import { useMemo } from "react";

const useCurrentPage = () => {
  const router = useRouter();
  const currentPage = useMemo(
    () => pages.find((page) => page.pathname === router.pathname)!,
    [pages, router],
  );
  return currentPage;
};

export default useCurrentPage;
