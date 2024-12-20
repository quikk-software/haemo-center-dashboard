import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter();
  const { query } = router;

  const redirectParam = query["redirect"];
  const redirectTo =
    typeof redirectParam === "string" ? redirectParam : "/todos";

  return {
    // Taken from Query Parameter `redirect`. Defaults to "/", if no `redirect` Query Parameter is provided.
    redirectUrl: redirectTo,
  };
};

export default useRedirect;
