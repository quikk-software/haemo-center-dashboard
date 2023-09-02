import React, { useMemo } from "react";
import NewsEditScreen from "@/components/news/Edit.screen";
import { useRouter } from "next/router";

const News: React.FC = () => {
  const router = useRouter();

  const id = useMemo(() => {
    if (router.query.id === undefined) {
        return undefined;
    }
    if (typeof router.query.id === "object") {
        return undefined;
    }
    return router.query.id;
  }, [router.query.id]);

  return <NewsEditScreen id={id} />;
};

export default News;