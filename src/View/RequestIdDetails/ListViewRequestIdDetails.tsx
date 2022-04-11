import { RemoveRedEyeRounded } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { requestDetailsDataProps } from "./type";

type props = requestDetailsDataProps & { requestStatus: "REQUESTED" | "SUBMITTED" | "APPROVED" }

const ListViewRequestIdDetails: React.FC<props> = ({
  status,
  prodPath,
  stagingPath,
  message,
  requestStatus
}) => {

  return (
    <Card sx={{ display: 'flex' }}>
      <CardContent sx={{ flex: 1 }}>
        {requestStatus === "APPROVED" ? <Typography variant="body2" color="text.primary" sx={{ wordBreak: 'break-all' }}>{prodPath}</Typography> : <Typography variant="body2" color="text.primary" sx={{ wordBreak: 'break-all' }}>{stagingPath}</Typography>}
        {!stagingPath && message && <Typography variant="body2" color="text.error">{message}</Typography>}
      </CardContent>
      <CardActions sx={{ px: 2 }}>
        {status === 'Failed' ? <Typography variant="body1" color="text.error" sx={{ wordBreak: 'break-all' }}>{status}</Typography> : <>
          <Button variant="contained" target={`_blank`} href={`${process.env.REACT_APP_StagingPreviewUrl}${stagingPath}`} ><RemoveRedEyeRounded sx={{ mr: 1 }} /> Staging</Button>
          {requestStatus === "APPROVED" && <Button variant="contained" target={`_blank`} href={`${process.env.REACT_APP_ProductionPreviewUrl}${prodPath}`} ><RemoveRedEyeRounded sx={{ mr: 1 }} /> Production</Button>}
        </>}
      </CardActions>
    </Card>
  )
}
export default ListViewRequestIdDetails