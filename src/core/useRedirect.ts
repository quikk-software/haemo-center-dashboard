import { useRouter } from "next/router";
import logger from "@/core/logger";

const useRedirect = () => {
  const router = useRouter();
  const { query, push } = router;

  const redirectParam = query["redirect"];
  const redirectTo = typeof redirectParam === "string" ? redirectParam : "/";

  return {
    redirect: async () => {
      logger.debug("redirecting to", redirectTo);
      await push(redirectTo);
    },
    redirectUrl: redirectTo,
  };
};

export default useRedirect;
