import React from "react";
import type { FunctionComponent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "src/components/common/Link";

interface MenuCardProps {
  title: string;
  description?: string;
  link: string;
  linkText: string;
}

const MenuCard: FunctionComponent<MenuCardProps> = ({
  title,
  description,
  link,
  linkText,
}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </CardContent>
      <CardActions>
        <Link href={link}>
          <Button size="small">{linkText}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MenuCard;
