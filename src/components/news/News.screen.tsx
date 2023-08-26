import useGetNews from "@/api/feed/useGetNews";
import logger from "@/core/logger";
import { useEffect, useMemo, useState } from "react";
import NewsItem from "./item";
import { Box, Button, Fab, Typography, Pagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/router";
import DeleteDialog from "./DeleteDialog";
import { deleteNews } from "@/api/feed/deleteNews";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useSnackbarComponent } from "../layout/Snackbar";

const fabStyle = {
  position: 'sticky',
  bottom: 16,
  right: 16,
};

export type Props = {
  page?: number,
};

const NewsScreen: React.FC<Props> = ({ page }) => {
  const [newsItemIdToDelete, setNewsItemIdToDelete] = useState<number | string | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const router = useRouter();
  const { displaySuccess, displayError } = useSnackbarComponent();
  const { request, response } = useGetNews(page);

  const deleteDialogOpen = useMemo(() => newsItemIdToDelete !== undefined, [newsItemIdToDelete]);

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

  const showInvalidPageNumberScreen = useMemo(() => {
    if (pageCount === undefined) {
      return currentPageValue <= 0;
    }
    return currentPageValue <= 0 || currentPageValue > pageCount;
  }, [currentPageValue, pageCount]);

  const showNoNewsYetScreen = useMemo(() => {
    if (showInvalidPageNumberScreen) {
      return false;
    }
    return news === undefined || news.length === 0;
  }, [news, showInvalidPageNumberScreen]);

  useEffect(() => {
    logger.debug(response);
  }, [response]);

  const goToNewsCreationSite = () => router.push("/news/create");

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => router.push(`/news?p=${value}`);

  const handleOnDelete = (newsId: number | string) => setNewsItemIdToDelete(newsId);

  const handleDeleteDialogCancel = () => setNewsItemIdToDelete(undefined);

  const handleDeleteDialogDelete = () => {
    if (isDeleting || newsItemIdToDelete === undefined) {
      return;
    }
    const idAsNumber = (typeof newsItemIdToDelete === "string")? parseInt(newsItemIdToDelete, 10) : newsItemIdToDelete;
    if (isNaN(idAsNumber)) {
      return;
    }
    setIsDeleting(true);
    deleteNews(idAsNumber, accessToken, refreshToken, dispatch)
      .then(() => {
        displaySuccess("News-Eintrag wurde gelöscht")
        setNewsItemIdToDelete(undefined);
        request();
      })
      .catch(() => displayError("News-Eintrag konnte nicht gelöscht werden"))
      .finally(() => setIsDeleting(false));
  };

  const newsItemToDelete = useMemo(() => {
    if (news === undefined) {
      return undefined;
    }
    return news.find((_news) => _news.id === newsItemIdToDelete);
  }, [news, newsItemIdToDelete]);

  return (
    <p>
      <Typography variant="h3" align="center">News</Typography>
      {news && news.map((_newsItem, i) => (
        <NewsItem
          key={i}
          headline={_newsItem.headline || ""}
          creatorName={_newsItem.creatorName || ""}
          textValue={_newsItem.text || ""}
          image={_newsItem.image || ""}
          link={_newsItem.link || ""}
          id={_newsItem.id || -1}
          onDelete={handleOnDelete} />
      ))}
      {newsItemToDelete !== undefined &&
        <DeleteDialog
          open={deleteDialogOpen}
          onCancel={handleDeleteDialogCancel}
          onDelete={handleDeleteDialogDelete}
          isLoading={isDeleting}>
          <NewsItem
            headline={newsItemToDelete.headline || ""}
            creatorName={newsItemToDelete.creatorName || ""}
            textValue={newsItemToDelete.text || ""}
            image={newsItemToDelete.image || ""}
            link={newsItemToDelete.link || ""}
            id={newsItemToDelete.id || -1}
            showEditButton={false} />
        </DeleteDialog>
      }
      {!showNoNewsYetScreen && !showInvalidPageNumberScreen &&
        <Box sx={{ display: "flex", justifyContent: "flex-end " }}>
          <Pagination page={currentPageValue} count={pageCount} onChange={handlePagination} />
        </Box>
      }
      {!showNoNewsYetScreen && !showInvalidPageNumberScreen && (
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
      {showInvalidPageNumberScreen && (
        <>
          <Typography variant="h4" align="center">
            Ungültige Seite: {currentPageValue}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" aria-label="Gehe zur News-Erstellen Seite" onClick={() => router.push("/news?p=1")}>
              Zu Seite 1
            </Button>
          </Box>
        </>
      )}
    </p>
  );
};

export default NewsScreen;