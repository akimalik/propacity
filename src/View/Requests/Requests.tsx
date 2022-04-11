import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TemplateSkeletonList } from "../../_skeletons/index";
import RequestItemsView from "./RequestItemsView";
import { useApiTemplateRequests } from "./Requests.api";
import { requestsDataProps } from "./types";

const Requests: React.FC = () => {
  const { userId } = useParams()
  const { response, isLoading, fetch } = useApiTemplateRequests()

  useEffect(() => {

    fetch({
      params: {
        userId: userId
      }
    })
  }, [])


  return (
    <Box>
      <Grid container spacing={5}>
        {response && response.map((data: requestsDataProps, i: number) => (
          <Grid key={i} item xs={12} md={6}>
            <RequestItemsView {...data} />
          </Grid>
        ))}
        {isLoading && <TemplateSkeletonList />}
      </Grid>
    </Box>
  )
}
export default Requests