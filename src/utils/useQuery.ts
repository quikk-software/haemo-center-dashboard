import { useRouter } from "next/router";

const useQuery = (param: string) => {
  const router = useRouter();
  const paramValue = router.query[param];
  const sanitizedParamValue =
    typeof paramValue === "string"
      ? paramValue
      : Array.isArray(paramValue)
      ? paramValue[0]
      : "";

  return sanitizedParamValue;
};

export default useQuery;
