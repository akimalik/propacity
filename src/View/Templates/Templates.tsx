import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TemplateSkeletonList } from "../../_skeletons";
import { useApiAlbumRequest } from "./templates.api";
import TemplateViewItem from "./TemplateViewItem";

const Templates: React.FC = () => {
  const { albumId } = useParams()
  const { response, isLoading, fetch } = useApiAlbumRequest()
  useEffect(() => {

    fetch({
      params: {
        albumId: albumId
      }
    })
  }, [])

  return (
    <Box sx={{ mx: ['auto'] }}>
      <Grid container spacing={5}>
        {isLoading ? <TemplateSkeletonList /> :
          response && response.map((items: any, i: number) => (
            <Grid key={i} item xs={12} md={6} lg={4} >
              <TemplateViewItem {...items} />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
export default Templates