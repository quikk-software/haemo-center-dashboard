import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";

export type Props = {
  headline: string;
  creatorName: string;
  textValue: string;
  image: string | undefined;
  link: string;
  showEditButton?: boolean;
  openInNewTab?: boolean;
  id?: string;
};
const NewsItem: React.FC<Props> = ({ headline, creatorName, textValue, image, link, showEditButton, openInNewTab, id }) => {
  const router = useRouter();
  
  const imageDataURL = useMemo(() => {
    if (image === undefined || image === null || image === "") {
      return undefined;
    }
    if (image?.startsWith("data:") || image?.startsWith("blob:")) {
      return image;
    }
    return `data:image/jpeg;base64,${image}`;
  }, [image]);

  const onFollowLink = () => {
    if (openInNewTab === true) {
      window.open(link, "_blank");
    } else {
      router.push(link);
    }
  };

  return (
  <Card sx={{ m: 2 }}>
    <CardContent>
      {imageDataURL !== undefined && (
        <CardMedia sx={{ height: 250 }} image={imageDataURL} />
      )}
      <Typography variant="h4" gutterBottom>{headline}</Typography>
      <Typography display="inline" sx={{ "font-style": "italic" }}>Autor: </Typography>
      <Typography display="inline">{creatorName}</Typography><br/>
      <br/>
      {textValue.split("\n").map((_textPart, i) => {
        if (_textPart === "") {
          return (<br key={i}></br>);
        }
        return (<Typography key={i} variant="body2" color="text.secondary">{_textPart}</Typography>);
      })}
      <CardActions>
        <Button size="small" onClick={onFollowLink}>Mehr lesen</Button>
        {showEditButton !== false && id !== undefined && (
          <Button size="small" onClick={() => router.push(`/news/edit/${id}`)}>Bearbeiten</Button>
        )}
      </CardActions>
    </CardContent>
  </Card>
)};

export default NewsItem;