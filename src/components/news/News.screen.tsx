import useGetNews from "@/api/feed/useGetNews";
import logger from "@/core/logger";
import { useEffect, useMemo } from "react";
import NewsItem from "./item";
import { Box, Button, Fab, Typography, Pagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/router";

const fabStyle = {
  position: 'sticky',
  bottom: 16,
  right: 16,
};

export type Props = {
  page?: number,
};

const NewsScreen: React.FC<Props> = ({ page }) => {
  const router = useRouter();
  const { request, response } = useGetNews(page);

  useEffect(() => {
    request();
  }, [request]);

  const currentPageValue = useMemo(() => {
    if (page === undefined) {
      return 1;
    }
    return page;
  }, [page]);

  const news = useMemo(() => {
    if (response === undefined) {
      return undefined;
    }
    return response.news;
  }, [response]);

  const pageCount = useMemo(() => {
    if (response === undefined) {
      return 1;
    }
    return response.totalPages;
  }, [response]);

  const showNoNewsYetScreen = useMemo(() => {
    return news === undefined || news.length === 0;
  }, [news]);

  useEffect(() => {
    logger.debug(response);
  }, [response]);

  const goToNewsCreationSite = () => router.push("/news/create");

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => router.push(`/news?p=${value}`);

  return (
    <p>
      <Typography variant="h3" align="center">News</Typography>
      {news && news.map((_newsItem) => (
        <NewsItem
          headline={_newsItem.headline || ""}
          creatorName={_newsItem.creatorName || ""}
          textValue={_newsItem.text || ""}
          image={_newsItem.image || ""}
          link={_newsItem.link}
          id={_newsItem.id} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end " }}>
        <Pagination page={currentPageValue} count={pageCount} onChange={handlePagination} />
      </Box>
      {!showNoNewsYetScreen && (
        <Fab
          sx={fabStyle}
          color="primary"
          variant="extended"
          aria-label="add"
          onClick={goToNewsCreationSite}
        >
          <AddIcon sx={{ mr: 1 }}/>
          Neue News erstellen
        </Fab>
      )}
      {showNoNewsYetScreen && (
        <>
          <Typography variant="h4" align="center">
            Es gibt noch keine News
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" aria-label="Gehe zur News-Erstellen Seite" onClick={goToNewsCreationSite}>
              News erstellen
            </Button>
          </Box>
        </>
      )}
    </p>
  );
};

export default NewsScreen;