import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export type Props = {
  headline: string;
  creatorName: string;
  textValue: string;
  image: string | undefined;
};
const NewsItem: React.FC<Props> = ({ headline, creatorName, textValue, image }) => (
  <Card>
    <CardContent>
      {image !== undefined && (
        <CardMedia sx={{ height: 250 }} image={image} />
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
);

export default NewsItem;