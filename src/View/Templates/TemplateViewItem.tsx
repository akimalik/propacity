import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { templateListProps } from "./types";

const TemplateViewItem: React.FC<templateListProps> = ({ albumId,
  id,
  thumbnailUrl,
  title,
  url, }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [csvData, setCsvData] = useState<any>([[]])


  return (
    <>
      <Card sx={{ maxWidth: 345 }} key={id}>
        <a href={url} target="_blank">

          <CardMedia
            component="img"
            height="140"
            image={thumbnailUrl}
            alt={title}
          />
        </a>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
export default TemplateViewItem