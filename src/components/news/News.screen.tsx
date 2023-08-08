import useGetNews from "@/api/feed/useGetNews";
import logger from "@/core/logger";
import { useEffect, useMemo } from "react";
import NewsItem from "./item";

const NewsScreen: React.FC = () => {
  const { request, response } = useGetNews();

  useEffect(() => {
    request();
  }, []);

  const news = useMemo(() => {
    if (response === undefined) {
      return undefined;
    }
    return response.news;
  }, [response])

  useEffect(() => {
    logger.debug(response);
  }, [response]);

  return (
    <p>
      News:
      {news && news.map((_newsItem) => (
        <NewsItem
          headline={_newsItem.headline || ""}
          creatorName={_newsItem.creatorName || ""}
          textValue={_newsItem.text || ""}
          image={_newsItem.image || ""} />
      ))}
    </p>
  );
};

export default NewsScreen;