import { Store } from "@/redux";
import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorName, setHeadline, setText, setImage, setLink } from "./newsSlice";
import NewsItem from "./item";
import { postNews } from "@/api/feed/usePostNews";

const NewsCreateScreen: React.FC = () => {
  const { headline, creatorName, text, image, link } = useSelector((store: Store) => store.news);
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const allowedFileTypes = ["image/jpeg", "image/png"];

  const handleFileUpload = (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (!allowedFileTypes.includes(file.type)) {
      // TODO: inform the user about this
      return;
    }
    dispatch(setImage(file));
  }

  const handleCreateNews = () => {
    if (image === undefined) {
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);  // convert to base64
    reader.onload = () => {
      if (typeof reader.result === "object") {
        return;
      }
      const readerResult: string | undefined = reader.result;
      postNews({
        image: readerResult?.slice(23),
        headline: headline || "",
        text: text || "",
        creatorName: creatorName || "",
        link: link || "",
      }, accessToken, refreshToken, dispatch)
      .then((response) => {
        if (response.status === 201) {
          // TODO: inform user
        }
      });
    };
  }

  return (
    <>
      <Card>
        <CardContent>
          {image !== undefined && (
            <img src={URL.createObjectURL(image)} />
          )}
          <TextField
            id="headline"
            sx={{ display: 'block' }}
            label="Titel"
            variant="standard"
            onChange={(e) => dispatch(setHeadline(e.target.value))} />
          <TextField
            id="creator"
            sx={{ display: 'block' }}
            label="Autor"
            variant="standard"
            onChange={(e) => dispatch(setCreatorName(e.target.value))} />
          <TextField
            id="link"
            sx={{ display: 'block' }}
            label="Link"
            variant="standard"
            onChange={(e) => dispatch(setLink(e.target.value))} />
          <TextField
            multiline
            minRows={3}
            id="content"
            label="Content"
            variant="standard"
            onChange={(e) => dispatch(setText(e.target.value))} />
          <Stack sx={{ "margin": 2}} direction="row" spacing={2}>
            <Button variant="contained" component="label">
              {image? "Bild ändern" : "Bild auswählen"}
              <input type="file" hidden onChange={handleFileUpload}/>
            </Button>
            <Button variant="contained" onClick={handleCreateNews}>
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
        image={image? URL.createObjectURL(image) : undefined}
        showEditButton={false}
        link={link || ""}
        openInNewTab />
      <Typography variant="body2" sx={{ "font-style": "italic" }}>
        Links werden nur von diesem Editor aus in einem neuen Tab geöffnet.
      </Typography>
    </>
  );
};

export default NewsCreateScreen;
