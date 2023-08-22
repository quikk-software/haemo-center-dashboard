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

  const msg = useMemo(() => {
    if (router.query.msg === undefined || typeof router.query.msg === "object") {
      return undefined;
    }
    return decodeURIComponent(router.query.msg);
  }, [router.query.msg]);

  return <NewsEditScreen id={id} msg={msg} />;
};

export default News;