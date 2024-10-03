import { Store } from "@/redux";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreatorName,
  setHeadline,
  setText,
  setImage,
  setLink,
  dataURLToImage,
  imageToDataURL,
} from "./newsSlice";
import NewsItem from "./item";
import { postNews } from "@/api/feed/usePostNews";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUsers } from "@/api/users/useGetUsers";
import React from "react";
import { GetUserResponse, ListUsersResponse } from "@/@types/user";
import { useSnackbarComponent } from "../layout/Snackbar";
import useLanguage from "@/i18n/useLanguage";
import NewsTypeCheckboxGroup from "@/components/news/NewsTypeCheckboxGroup";
import { CENTER_ROLE } from "@/auth/auth.constants";
import AssignCenterToNews from "@/components/news/AssignCenterToNews";
import { assignCenterToNews } from "@/api/feed/useAssignCenterToNews";

const NewsCreateScreen: React.FC = () => {
  const [isCreatingNews, setIsCreatingNews] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState<GetUserResponse[]>([]);

  const {
    headline,
    creatorName,
    text,
    image,
    link,
    isSponsored,
    isAdmin,
    centers,
  } = useSelector((store: Store) => store.news);
  const { accessToken, refreshToken, roles } = useSelector(
    (s: Store) => s.auth,
  );
  const query = "role:professional";
  const userPageSize = 20;
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useLanguage();
  const { displaySuccess, displayWarning, displayError } =
    useSnackbarComponent();

  const allowedFileTypes = ["image/jpeg", "image/png"];

  const fetchAllUsers = useCallback(async () => {
    let fetchedUsers: GetUserResponse[] = [];
    let currentPageNumber = 0;
    let finished = false;
    let fetchedData: ListUsersResponse | undefined = undefined;
    while (!finished) {
      fetchedData = await getUsers(
        { query, pageSize: userPageSize, pageNumber: currentPageNumber },
        accessToken,
        refreshToken,
        dispatch,
      );
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      displayWarning(t("news:msg.noFileSelected"));
      return;
    }
    const file = event.target.files[0];
    if (!allowedFileTypes.includes(file.type)) {
      displayWarning(t("news:msg.unsupportedImageFormat"));
      return;
    }
    if (file.size > 5000000) {
      displayWarning(t("news:msg.imageFileTooLarge"));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file); // convert to base64
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
      displayError(t("news:msg.imageCouldNotBeProcessed"));
    };
  };

  const handleCreateNews = () => {
    if (image === undefined) {
      displayWarning(t("news:msg.imageEmpty"));
      return;
    }
    if (link === undefined || link === "") {
      displayWarning(t("news:msg.linkEmpty"));
      return;
    }
    if (creatorName === undefined || creatorName === "") {
      displayWarning(t("news:msg.creatorNameEmpty"));
      return;
    }
    if (headline === undefined || headline === "") {
      displayWarning(t("news:msg.headlineEmpty"));
      return;
    }
    if (text === undefined || text === "") {
      displayWarning(t("news:msg.textEmpty"));
      return;
    }
    if (isCreatingNews) {
      return;
    }
    setIsCreatingNews(true);
    postNews(
      {
        image: image.data,
        imageMIMEType: image.mIMEType,
        headline: headline || "",
        text: text || "",
        creatorName: creatorName || "",
        link: link || "",
        isSponsored,
        isAdmin,
        centers,
      },
      accessToken,
      refreshToken,
      dispatch,
    )
      .then(async (response) => {
        for await (const center of centers) {
          assignCenterToNews(
            {
              newsId: response.data.newsId,
              centerId: center.centerId,
              centerName: center.centerName,
            },
            accessToken,
            refreshToken,
            dispatch,
          ).catch(() => displayError(t("news:msg.error")));
        }
        if (response.status === 201 && response.data.newsId !== undefined) {
          displaySuccess(t("news:msg.newsCreationSuccess"));
          await router.push(`/news/edit/${response.data?.newsId}`);
        } else {
          displayError(
            t("news:msg.errorWithStatusCode", { statusCode: response.status }),
          );
        }
      })
      .catch(() => displayError(t("news:msg.error")))
      .finally(() => setIsCreatingNews(false));
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack>
            <TextField
              id="headline"
              sx={{ margin: 1 }}
              label={t("news:headlineFieldLabel")}
              variant="standard"
              disabled={isCreatingNews}
              onChange={(e) => dispatch(setHeadline(e.target.value))}
            />
            <Autocomplete
              id="creator"
              sx={{ margin: 1 }}
              options={users}
              getOptionLabel={(option: GetUserResponse | string) => {
                if (typeof option === "string") {
                  return option;
                }
                return `${option.firstName} ${option.lastName}`;
              }}
              freeSolo
              disabled={isCreatingNews}
              loading={isLoadingUsers}
              onInputChange={(_event, newInputValue) =>
                dispatch(setCreatorName(newInputValue))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("news:creatorNameFieldLabel")}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isLoadingUsers ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              renderOption={(props, option: GetUserResponse) => (
                <li {...props}>
                  <Typography>{`${option.firstName} ${option.lastName}`}</Typography>
                  <Typography
                    sx={{ "font-style": "italic", ml: 2 }}
                  >{`@${option.alias}`}</Typography>
                </li>
              )}
            />
            <TextField
              id="link"
              sx={{ margin: 1 }}
              label={t("news:linkFieldLabel")}
              variant="standard"
              disabled={isCreatingNews}
              onChange={(e) => dispatch(setLink(e.target.value))}
            />
            <TextField
              sx={{ margin: 1 }}
              multiline
              minRows={3}
              id="content"
              label={t("news:textFieldLabel")}
              variant="standard"
              disabled={isCreatingNews}
              onChange={(e) => dispatch(setText(e.target.value))}
            />
          </Stack>
          <Stack sx={{ margin: 2 }} direction="row" spacing={2}>
            <Button
              variant="contained"
              disabled={isCreatingNews}
              component="label"
            >
              {image
                ? t("news:imageChangeButton")
                : t("news:imageSelectButton")}
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            <Button
              variant="contained"
              disabled={isCreatingNews}
              onClick={handleCreateNews}
            >
              {t("news:createButton")}
            </Button>
            <NewsTypeCheckboxGroup
              isSponsored={isSponsored}
              isAdmin={isAdmin}
              userIsCenter={roles.includes(CENTER_ROLE)}
            />
          </Stack>
          <Stack sx={{ margin: 2 }} direction="row" spacing={2}>
            <AssignCenterToNews initialCenters={[]} />
          </Stack>
        </CardContent>
      </Card>
      <Typography sx={{ marginTop: 2 }}>{t("news:newsAppearance")}</Typography>
      <NewsItem
        headline={headline || ""}
        creatorName={creatorName || ""}
        textValue={text || ""}
        image={imageToDataURL(image) !== "" ? imageToDataURL(image) : undefined}
        showEditButton={false}
        link={link || ""}
        openInNewTab
      />
      <Typography variant="body2" sx={{ "font-style": "italic" }}>
        {t("news:linkEditorBehavior")}
      </Typography>
    </>
  );
};

export default NewsCreateScreen;
