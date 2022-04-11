import { AccessTimeFilledRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "../../_contexts";
import { ListViewSkeletonList } from "../../_skeletons";
import ListViewRequestIdDetails from "./ListViewRequestIdDetails";
import { useApiRequestApproval, useApiRequestDetail, useApiRequestSubmit } from "./RequestIdDetails.api";
import { requestDetailsDataProps } from "./type";


const RequestIdDetails: React.FC = () => { // remove default value
  const { setPageName } = useOutletContext<any>()
  const { requestId } = useParams()
  const [templateData, setTemplateData] = useState<requestDetailsDataProps[]>()
  const { isLoading, requestInfo, requestDataList } = useApiRequestDetail(`${requestId}`)
  const [requestStatus, setRequestStatus] = useState<string>()
  const [creationDate, setCreationDate] = useState<number>()
  const { fetchSubmitRequest, isSendingRequest } = useApiRequestSubmit(`${requestId}`, setRequestStatus)
  const { fetchApprovalRequest, isApprovingRequest } = useApiRequestApproval(`${requestId}`, setRequestStatus)
  const { isRole } = useAuth()
  const [successStatus, setSuccessStatus] = useState(true)
  const [FailedStatus, setFailedStatus] = useState(true)

  let date = !!creationDate ? new Date(creationDate) : new Date()

  function handleFilter() {
    requestDataList && setTemplateData(requestDataList.filter(item => {
      if (successStatus && item.status === 'Success') {
        return true
      }
      if (FailedStatus && item.status === 'Failed') {
        return true
      }
      return false
    }))
  }

  useEffect(() => {
    requestDataList && setTemplateData(requestDataList)
    if (requestInfo) {
      setCreationDate(requestInfo.creationDate)
      setRequestStatus(requestInfo.status)
    }
  }, [requestDataList, requestInfo])

  useEffect(() => {
    handleFilter()
  }, [successStatus, FailedStatus])

  useEffect(() => {
    setPageName(`Requests : ${requestId}`)
  })

  return (
    <Box>
      <Paper sx={{ py: [1], px: [2], mb: [3] }}>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={12} md={6}>
            <Typography component={'div'} variant="h6" color="text.primary" sx={{ wordBreak: 'break-all' }}>
              Created at: {!!creationDate && <Typography component={'em'} variant="h6" color="text.secondary"> {date.toDateString()}, {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</Typography>}
            </Typography>
          </Grid>
          {requestStatus === 'REQUESTED' &&
            <Grid item xs={12} md={3} lg={2}>
              <FormControlLabel control={<Checkbox checked={successStatus} color="success" onChange={() => { setSuccessStatus(!successStatus) }} />} label="Success" />
              <FormControlLabel control={<Checkbox checked={FailedStatus} color="error" onChange={() => { setFailedStatus(!FailedStatus) }} />} label="Failed" />
            </Grid>
          }
          <Grid item>
            {requestStatus === 'REQUESTED' && (
              <LoadingButton loading={isSendingRequest} onClick={() => { fetchSubmitRequest() }} variant="contained" color="secondary" sx={{ width: '100%' }}>
                Send for release
              </LoadingButton>
            )}
            {isRole('CREATOR') && requestStatus === 'SUBMITTED' && (
              <AccessTimeFilledRounded color="warning" sx={{ fontSize: "2.5rem" }} />
            )}
            {isRole('PUBLISHER') && requestStatus === 'SUBMITTED' && (
              <LoadingButton loading={isApprovingRequest} onClick={() => { fetchApprovalRequest() }} variant="contained" color="success" sx={{ width: '100%' }}>
                Release
              </LoadingButton>
            )}
            {isRole('PUBLISHER') && requestStatus === 'APPROVED' &&
              <Typography component={'div'} variant="h6" color="text.primary" sx={{ textAlign: 'right' }}>
                Created By: <Typography component={'em'} variant="h6" color="text.secondary"> {requestInfo && requestInfo.createdby}</Typography>
              </Typography>
            }
            {isRole('CREATOR') && requestStatus === 'APPROVED' &&
              <Typography component={'div'} variant="h6" color="text.primary" sx={{ textAlign: 'right' }}>
                Published By: <Typography component={'em'} variant="h6" color="text.secondary"> {requestInfo && requestInfo.lastUpdatedby}</Typography>
              </Typography>
            }
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {isLoading ?
          <ListViewSkeletonList />
          :
          templateData && templateData.map((props: any, i: number) => (
            <Grid key={i} item lg={12}>
              <ListViewRequestIdDetails {...props} requestStatus={requestStatus} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
export default RequestIdDetails