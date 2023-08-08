import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMemo } from "react";

export type Props = {
  headline: string;
  creatorName: string;
  textValue: string;
  image: string | undefined;
};
const NewsItem: React.FC<Props> = ({ headline, creatorName, textValue, image }) => {
  const imageDataURL = useMemo(() => {
    if (image === undefined || image === null || image === "") {
      return undefined;
    }
    if (image?.startsWith("data:")) {
      return image;
    }
    return `data:image/jpeg;base64,${image}`;
  }, [image]);

  return (
  <Card>
    <CardContent>
      {imageDataURL !== undefined && (
        <CardMedia sx={{ height: 250 }} image={imageDataURL} />
      )}
      <Typography>{headline}</Typography>
      <Typography display="inline">From: </Typography>
      <Typography display="inline">{creatorName}</Typography><br/>
      <br/>
      {textValue.split("\n").map((_textPart, i) => {
        if (_textPart === "") {
          return (<br key={i}></br>);
        }
        return (<Typography key={i}>{_textPart}</Typography>);
      })}
    </CardContent>
  </Card>
)};

export default NewsItem;