import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useWebContext } from "../../_contexts";
import { requestsDataProps } from "./types";


const RequestItemsView: React.FC<requestsDataProps> = ({ id, userId, title }) => {
  const { notification } = useWebContext()
  return (
    <Card sx={{ position: 'relative' }}>

      <CardActionArea sx={(theme => ({
        height: "5.5rem",
        backgroundColor: (theme.palette.mode === 'light' ? "#f5f5f5" : "#646464")
      }))} >
        <Link to={`/users/${userId}/albums/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

          <CardContent sx={{ pb: 0 }}>
            <Typography variant="h6" sx={{ cursor: "pointer" }} component="div">
              {title}
            </Typography>
            <Box sx={{ mb: 0, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ mb: 0 }} color="text.secondary">User Id: {userId}</Typography>
            </Box>
          </CardContent>
        </Link>

      </CardActionArea>
    </Card>
  )
}
export default RequestItemsView