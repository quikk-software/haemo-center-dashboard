import { Store } from "@/redux";
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorName, setHeadline, setText, setImage, setLink, imageDataAndMIMETypeToImage, dataURLToImage, imageToDataURL } from "./newsSlice";
import NewsItem from "./item";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useGetNewsItem from "@/api/feed/useGetNewsItem";
import logger from "@/core/logger";
import { patchNews } from "@/api/feed/patchNews";
import { useSnackbarComponent } from "../layout/Snackbar";

export type Props = {
  id?: string;
}

const NewsEditScreen: React.FC<Props> = ({ id }) => {
  const [isEditingNews, setIsEditingNews] = useState(false);

  const { headline, creatorName, text, image, link } = useSelector((store: Store) => store.news);
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { displaySuccess, displayWarning, displayError } = useSnackbarComponent();
  const idNumber: number = id === undefined ? NaN : parseInt(id, 10);
  const { request, response } = useGetNewsItem(idNumber);

  const allowedFileTypes = ["image/jpeg", "image/png"];

  useEffect(() => {
    if (!Number.isNaN(idNumber)) {
      request();
    }
  }, [request, idNumber, headline]);

  useEffect(() => {
    logger.debug(response);
    if (!Number.isNaN(idNumber)) {
      dispatch(setHeadline(response?.headline || ""));
      dispatch(setCreatorName(response?.creatorName || ""));
      dispatch(setText(response?.text || ""));
      dispatch(setLink(response?.link || ""));
      if (response?.image && response?.imageMIMEType) {
        dispatch(setImage(imageDataAndMIMETypeToImage(response.image, response.imageMIMEType)));
      }
    }
  }, [response, idNumber, dispatch]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      displayWarning("Keine Datei ausgewählt");
      return;
    }
    const file = event.target.files[0];
    if (!allowedFileTypes.includes(file.type)) {
      displayWarning("Kein unterstützes Bildformat");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);  // convert to base64
    reader.onload = () => {
      if (typeof reader.result === "object") {
        return;
      }
      const readerResult: string | undefined = reader.result;
      const image = dataURLToImage(readerResult || "");
      if (image !== undefined) {
        dispatch(setImage(image));
      }
    };
    reader.onerror = () => {
      displayError("Bild konnte nicht verarbeitet werden");
    };
  }

  const handleEditNews = () => {
    if (image === undefined) {
      displayWarning("Bild erforderlich");
      return;
    }
    if (link === undefined || link === "") {
      displayWarning("Link erforderlich");
      return;
    }
    if (creatorName === undefined || creatorName === "") {
      displayWarning("Autor erforderlich");
      return;
    }
    if (headline === undefined || headline === "") {
      displayWarning("Titel erforderlich");
      return;
    }
    if (text === undefined || text === "") {
      displayWarning("Inhalt erforderlich");
      return;
    }
    if (isEditingNews) {
      return;
    }
    setIsEditingNews(true);
    patchNews({
      newsId: idNumber,
      image: image.data,
      imageMIMEType: image.mIMEType,
      headline: headline || "",
      text: text || "",
      creatorName: creatorName || "",
      link: link || "",
    }, accessToken, refreshToken, dispatch)
    .then((response) => {
      if (response.status === 200) {
        displaySuccess("News erfolgreich bearbeitet!");
      } else {
        displayError(`Something went wrong (${response.status})`)
      }
    })
    .catch(() => displayError("Something went wrong"))
    .finally(() => setIsEditingNews(false));
  }

  if (id === undefined || Number.isNaN(idNumber)) {
    return (
      <>
        <Typography align="center">
            News-Eintrag nicht gefunden
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button aria-label="Zur News-Übersicht zurückgehen" onClick={() => router.push("/news")}>
            Zur News-Übersicht zurück
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          {image !== undefined && imageToDataURL(image) !== "" && (
            // see create screen for additional info
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageToDataURL(image)} alt="News Bild" />
          )}
          <TextField
            id="headline"
            sx={{ display: 'block', margin: 1 }}
            value={headline}
            label="Titel"
            variant="standard"
            helperText={(headline === undefined || headline === "") ? "Pflichtfeld" : ""}
            disabled={isEditingNews}
            onChange={(e) => dispatch(setHeadline(e.target.value))} />
          <TextField
            id="creator"
            sx={{ display: 'block', margin: 1 }}
            value={creatorName}
            label="Autor"
            variant="standard"
            helperText={(creatorName === undefined || creatorName === "") ? "Pflichtfeld" : ""}
            disabled={isEditingNews}
            onChange={(e) => dispatch(setCreatorName(e.target.value))} />
          <TextField
            id="link"
            sx={{ display: 'block', margin: 1 }}
            value={link}
            label="Link"
            variant="standard"
            helperText={(link === undefined || link === "") ? "Pflichtfeld" : ""}
            disabled={isEditingNews}
            onChange={(e) => dispatch(setLink(e.target.value))} />
          <TextField
            sx={{ margin: 1 }}
            value={text}
            multiline
            minRows={3}
            id="content"
            label="Content"
            variant="standard"
            helperText={(text === undefined || text === "") ? "Pflichtfeld" : ""}
            disabled={isEditingNews}
            onChange={(e) => dispatch(setText(e.target.value))} />
          <Stack sx={{ "margin": 2}} direction="row" spacing={2}>
            <Button variant="contained" disabled={isEditingNews} component="label">
              {image? "Bild ändern" : "Bild auswählen"}
              <input type="file" hidden onChange={handleFileUpload}/>
            </Button>
            <Button variant="contained" disabled={isEditingNews} onClick={handleEditNews}>
              News bearbeiten
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Typography sx={{ marginTop: 2}}>Diese News werden in Feeds so aussehen:</Typography>
      <NewsItem
        headline={headline || ""}
        creatorName={creatorName || ""}
        textValue={text || ""}
        image={(imageToDataURL(image) !== "" )? imageToDataURL(image) : undefined}
        showEditButton={false}
        link={link || ""}
        openInNewTab />
      <Typography variant="body2" sx={{ "font-style": "italic" }}>
        Links werden nur von diesem Editor aus in einem neuen Tab geöffnet.
      </Typography>
    </>
  );
};

export default NewsEditScreen;
