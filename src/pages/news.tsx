import React, { useMemo } from "react";
import NewsScreen from "@/components/news/News.screen";
import { useRouter } from "next/router";

const News: React.FC = () => {
  const router = useRouter();

  const page = useMemo(() => {
    if (router.query.p === undefined || typeof router.query.p === "object") {
      return undefined;
    }
    const pageNumber = parseInt(router.query.p, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      return undefined;
    }
    return pageNumber;
  }, [router.query.p]);

  return <NewsScreen page={page} />;
};

export default News;