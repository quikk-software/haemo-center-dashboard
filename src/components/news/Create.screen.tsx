import { Store } from "@/redux";
import { Alert, AlertColor, Button, Card, CardContent, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorName, setHeadline, setText, setImage, setLink, dataURLToImage, imageToDataURL } from "./newsSlice";
import NewsItem from "./item";
import { postNews } from "@/api/feed/usePostNews";
import { useState } from "react";
import { useRouter } from "next/router";
import { SnackbarOrigin } from "notistack";

const NewsCreateScreen: React.FC = () => {
  const [snackbarState, setSnackbarState] = useState({ open: false, message: "", severity: "info" as AlertColor });
  const [isCreatingNews, setIsCreatingNews] = useState(false);

  const { headline, creatorName, text, image, link } = useSelector((store: Store) => store.news);
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const allowedFileTypes = ["image/jpeg", "image/png"];

  const displayWarning = (message: string) => {
    setSnackbarState({
      open: true,
      message,
      severity: "warning" as AlertColor
    });
  }

  const displayError = (message: string) => {
    setSnackbarState({
      open: true,
      message,
      severity: "error" as AlertColor
    });
  }

  const displaySuccess = (message: string) => {
    setSnackbarState({
      open: true,
      message,
      severity: "success" as AlertColor
    });
  }

  const handleFileUpload = (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
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

  const handleCreateNews = () => {
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
    if (isCreatingNews) {
      return;
    }
    setIsCreatingNews(true);
    postNews({
      image: image.data,
      imageMIMEType: image.mIMEType,
      headline: headline || "",
      text: text || "",
      creatorName: creatorName || "",
      link: link || "",
    }, accessToken, refreshToken, dispatch)
    .then((response) => {
      if (response.status === 201 && response.data.newsId !== undefined) {
        displaySuccess("News erfolgreich erstellt!");
        router.push(`/news/edit/${response.data?.newsId}?msg=${encodeURIComponent("News erfolgreich erstellt!")}`)
      } else {
        displayError(`Something went wrong (${response.status})`)
      }
    })
    .catch(() => displayError("Something went wrong"))
    .finally(() => setIsCreatingNews(false));
  }

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  const snackbarOrigin = { vertical: "bottom", horizontal: "center" } as SnackbarOrigin;

  return (
    <>
      <Card>
        <CardContent>
          {image !== undefined && imageToDataURL(image) !== "" && (
            <img src={imageToDataURL(image)} />
          )}
          <TextField
            id="headline"
            sx={{ display: 'block', margin: 1 }}
            label="Titel"
            variant="standard"
            helperText={(headline === undefined || headline === "") ? "Pflichtfeld" : ""}
            disabled={isCreatingNews}
            onChange={(e) => dispatch(setHeadline(e.target.value))} />
          <TextField
            id="creator"
            sx={{ display: 'block', margin: 1 }}
            label="Autor"
            variant="standard"
            helperText={(creatorName === undefined || creatorName === "") ? "Pflichtfeld" : ""}
            disabled={isCreatingNews}
            onChange={(e) => dispatch(setCreatorName(e.target.value))} />
          <TextField
            id="link"
            sx={{ display: 'block', margin: 1 }}
            label="Link"
            variant="standard"
            helperText={(link === undefined || link === "") ? "Pflichtfeld" : ""}
            disabled={isCreatingNews}
            onChange={(e) => dispatch(setLink(e.target.value))} />
          <TextField
            sx={{ margin: 1 }}
            multiline
            minRows={3}
            id="content"
            label="Content"
            variant="standard"
            helperText={(text === undefined || text === "") ? "Pflichtfeld" : ""}
            disabled={isCreatingNews}
            onChange={(e) => dispatch(setText(e.target.value))} />
          <Stack sx={{ "margin": 2}} direction="row" spacing={2}>
            <Button variant="contained" disabled={isCreatingNews} component="label">
              {image? "Bild ändern" : "Bild auswählen"}
              <input type="file" hidden onChange={handleFileUpload}/>
            </Button>
            <Button variant="contained" disabled={isCreatingNews} onClick={handleCreateNews}>
              News erstellen
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Typography sx={{ marginTop: 2}}>Diese News werden in Feeds so aussehen:</Typography>
      <NewsItem
        headline={headline || ""}
        creatorName={creatorName || ""}
        textValue={text || ""}
        image={(imageToDataURL(image) !== "")? imageToDataURL(image) : undefined}
        showEditButton={false}
        link={link || ""}
        openInNewTab />
      <Typography variant="body2" sx={{ "font-style": "italic" }}>
        Links werden nur von diesem Editor aus in einem neuen Tab geöffnet.
      </Typography>
      <Snackbar
        anchorOrigin={snackbarOrigin}
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity} sx={{ width: '100%' }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewsCreateScreen;
