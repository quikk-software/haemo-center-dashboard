import { Store } from "@/redux";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorName, setHeadline, setText, setImage } from "./newsSlice";
import NewsItem from "./item";

const NewsCreateScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { headline, creatorName, text, image } = useSelector((store: Store) => store.news);

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
            label="Headline"
            variant="standard"
            onChange={(e) => dispatch(setHeadline(e.target.value))} />
          <TextField
            id="creator"
            sx={{ display: 'block' }}
            label="Creator"
            variant="standard"
            onChange={(e) => dispatch(setCreatorName(e.target.value))} />
          <TextField
            multiline
            minRows={3}
            id="content"
            label="Content"
            variant="standard"
            onChange={(e) => dispatch(setText(e.target.value))} />
          <Button variant="contained" component="label">
            Bild auswählen
            <input type="file" hidden onChange={handleFileUpload}/>
          </Button>
          <Button variant="contained">
            News erstellen
          </Button>
        </CardContent>
      </Card>
      <Typography>Deine News werden in Feeds so aussehen:</Typography>
      <NewsItem headline={headline || ""} creatorName={creatorName || ""} textValue={text || ""} image={image? URL.createObjectURL(image) : undefined}></NewsItem>
    </>
  );
};

export default NewsCreateScreen;