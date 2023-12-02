import {Store} from "@/redux";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    setCreatorName,
    setHeadline,
    setText,
    setImage,
    setLink,
    imageDataAndMIMETypeToImage,
    dataURLToImage,
    imageToDataURL,
    setIsSponsored,
    setIsAdmin, setNewsCenters,
} from "./newsSlice";
import NewsItem from "./item";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useGetNewsItem from "@/api/feed/useGetNewsItem";
import logger from "@/core/logger";
import {patchNews} from "@/api/feed/patchNews";
import {useSnackbarComponent} from "../layout/Snackbar";
import useLanguage from "@/i18n/useLanguage";
import {CENTER_ROLE} from "@/auth/auth.constants";
import NewsTypeCheckboxGroup from "@/components/news/NewsTypeCheckboxGroup";
import {assignCenterToNews} from "@/api/feed/useAssignCenterToNews";
import AssignCenterToNews from "@/components/news/AssignCenterToNews";

export type Props = {
    id?: string;
};

const NewsEditScreen: React.FC<Props> = ({id}) => {
    const [isEditingNews, setIsEditingNews] = useState(false);

    const {headline, creatorName, text, image, link, isSponsored, isAdmin, centers} =
        useSelector((store: Store) => store.news);
    const {accessToken, refreshToken, roles} = useSelector(
        (s: Store) => s.auth,
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const {t} = useLanguage();
    const {displaySuccess, displayWarning, displayError} =
        useSnackbarComponent();
    const idNumber: number = id === undefined ? NaN : parseInt(id, 10);
    const {request, response} = useGetNewsItem(idNumber);

    const allowedFileTypes = ["image/jpeg", "image/png"];

    useEffect(() => {
        if (!Number.isNaN(idNumber)) {
            request();
        }
    }, [request, idNumber]);

    useEffect(() => {
        logger.debug(response);
        if (!Number.isNaN(idNumber)) {
            dispatch(setHeadline(response?.headline || ""));
            dispatch(setCreatorName(response?.creatorName || ""));
            dispatch(setText(response?.text || ""));
            dispatch(setLink(response?.link || ""));
            dispatch(setIsSponsored(response?.isSponsored ?? false));
            dispatch(setIsAdmin(response?.isAdmin ?? false));
            dispatch(setNewsCenters(response ? response.centers.map(center => ({
                centerId: center.centerId,
                centerName: center.centerName
            })) : []));
            if (response?.image && response?.imageMIMEType) {
                dispatch(
                    setImage(
                        imageDataAndMIMETypeToImage(response.image, response.imageMIMEType),
                    ),
                );
            }
        }
    }, [response, idNumber, dispatch]);

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
            displayWarning(t("msgImageFileTooLarge"));
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

    const handleEditNews = () => {
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
        if (isEditingNews) {
            return;
        }
        setIsEditingNews(true);
        patchNews(
            {
                newsId: idNumber,
                image: image.data,
                imageMIMEType: image.mIMEType,
                headline: headline || "",
                text: text || "",
                creatorName: creatorName || "",
                link: link || "",
                isSponsored,
                isAdmin,
                centers
            },
            accessToken,
            refreshToken,
            dispatch,
        )
            .then(async (response) => {
                if (response.status === 204) {
                    displaySuccess(t("news:msg.newsUpdateSuccess"));
                } else {
                    displayError(
                        t("news:msg.errorWithStatusCode", {statusCode: response.status}),
                    );
                }
            })
            .catch((e) => {
                displayError(t("news:msg.error"))
            })
            .finally(() => setIsEditingNews(false));
    };

    if (id === undefined || Number.isNaN(idNumber)) {
        return (
            <>
                <Typography align="center">{t("news:newsEntryNotFound")}</Typography>
                <Box display="flex" justifyContent="center">
                    <Button
                        aria-label={t("news:backToNewsOverviewAriaLabel")}
                        onClick={() => router.push("/news")}
                    >
                        {t("news:backToNewsOverviewButton")}
                    </Button>
                </Box>
            </>
        );
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Stack>
                        <TextField
                            id="headline"
                            sx={{margin: 1}}
                            value={headline}
                            defaultValue={headline}
                            label={t("news:headlineFieldLabel")}
                            variant="standard"
                            disabled={isEditingNews}
                            onChange={(e) => dispatch(setHeadline(e.target.value))}
                        />
                        <TextField
                            id="creator"
                            sx={{margin: 1}}
                            value={creatorName}
                            defaultValue={creatorName}
                            label={t("news:creatorNameFieldLabel")}
                            variant="standard"
                            disabled={isEditingNews}
                            onChange={(e) => dispatch(setCreatorName(e.target.value))}
                        />
                        <TextField
                            id="link"
                            sx={{margin: 1}}
                            value={link}
                            defaultValue={link}
                            label={t("news:linkFieldLabel")}
                            variant="standard"
                            disabled={isEditingNews}
                            onChange={(e) => dispatch(setLink(e.target.value))}
                        />
                        <TextField
                            sx={{margin: 1}}
                            value={text}
                            defaultValue={text}
                            multiline
                            minRows={3}
                            id="content"
                            label={t("news:textFieldLabel")}
                            variant="standard"
                            disabled={isEditingNews}
                            onChange={(e) => dispatch(setText(e.target.value))}
                        />
                    </Stack>
                    <Stack sx={{margin: 2}} direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            disabled={isEditingNews}
                            component="label"
                        >
                            {image
                                ? t("news:imageChangeButton")
                                : t("news:imageSelectButton")}
                            <input type="file" hidden onChange={handleFileUpload}/>
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isEditingNews}
                            onClick={handleEditNews}
                        >
                            {t("news:updateButton")}
                        </Button>
                        <NewsTypeCheckboxGroup
                            isSponsored={isSponsored}
                            isAdmin={isAdmin}
                            userIsCenter={roles.includes(CENTER_ROLE)}
                        />
                    </Stack>
                    <Stack sx={{margin: 2}} direction="row" spacing={2}>
                        <AssignCenterToNews initialCenters={centers}/>
                    </Stack>
                </CardContent>
            </Card>
            <Typography sx={{marginTop: 2}}>{t("news:newsAppearance")}</Typography>
            <NewsItem
                headline={headline || ""}
                creatorName={creatorName || ""}
                textValue={text || ""}
                image={imageToDataURL(image) !== "" ? imageToDataURL(image) : undefined}
                showEditButton={false}
                link={link || ""}
                openInNewTab
            />
            <Typography variant="body2" sx={{"font-style": "italic"}}>
                {t("news:linkEditorBehavior")}
            </Typography>
        </>
    );
};

export default NewsEditScreen;
