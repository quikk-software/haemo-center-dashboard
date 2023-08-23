import { Store } from "@/redux";
import { Alert, AlertColor, Autocomplete, Button, Card, CardContent, CircularProgress, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorName, setHeadline, setText, setImage, setLink, dataURLToImage, imageToDataURL } from "./newsSlice";
import NewsItem from "./item";
import { postNews } from "@/api/feed/usePostNews";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SnackbarOrigin } from "notistack";
import { getUsers } from "@/api/users/useGetUsers";
import React from "react";
import { GetUserResponse, ListUsersResponse } from "@/@types/user";

const NewsCreateScreen: React.FC = () => {
  const [snackbarState, setSnackbarState] = useState({ open: false, message: "", severity: "info" as AlertColor });
  const [isCreatingNews, setIsCreatingNews] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState<GetUserResponse[]>([]);

  const { headline, creatorName, text, image, link } = useSelector((store: Store) => store.news);
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const query = "role:professional";
  const userPageSize = 20;
  const dispatch = useDispatch();
  const router = useRouter();

  const allowedFileTypes = ["image/jpeg", "image/png"];

  const fetchAllUsers = useCallback(async () => {
    let fetchedUsers: GetUserResponse[] = [];
    let currentPageNumber = 0;
    let finished = false;
    let fetchedData: ListUsersResponse | undefined = undefined;
    while (!finished) {
      fetchedData = await getUsers({ query, pageSize: userPageSize, pageNumber: currentPageNumber }, accessToken, refreshToken, dispatch);
      currentPageNumber++;
      finished = fetchedData.users.length === 0;
      fetchedUsers = fetchedUsers.concat(fetchedData.users);
    }
    return fetchedUsers;
  }, [accessToken, refreshToken, dispatch]);

  useEffect(() => {
    fetchAllUsers()
      .then((fetchedUsers) => setUsers(fetchedUsers))
      .finally(() => setIsLoadingUsers(false));
  }, [fetchAllUsers]);

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
            // The Next.js Image component provides better image loading which makes no difference for data URLs
            // also this requires specifying width and height (for data URLs at least) up front
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageToDataURL(image)} alt="News Bild" />
          )}
          <Stack>
            <TextField
              id="headline"
              sx={{  margin: 1 }}
              label="Titel"
              variant="standard"
              disabled={isCreatingNews}
              onChange={(e) => dispatch(setHeadline(e.target.value))} />
            <Autocomplete
              id="creator"
              sx={{ margin: 1 }}
              options={users?.map((_user) => `${_user.firstName} ${_user.lastName}`)}
              freeSolo
              onInputChange={(_event, newInputValue) => dispatch(setCreatorName(newInputValue))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Autor"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isLoadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }} />
              )}
              />
            <TextField
              id="link"
              sx={{ margin: 1 }}
              label="Link"
              variant="standard"
              disabled={isCreatingNews}
              onChange={(e) => dispatch(setLink(e.target.value))} />
            <TextField
              sx={{ margin: 1 }}
              multiline
              minRows={3}
              id="content"
              label="Inhalt"
              variant="standard"
              disabled={isCreatingNews}
              onChange={(e) => dispatch(setText(e.target.value))} />
          </Stack>
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
