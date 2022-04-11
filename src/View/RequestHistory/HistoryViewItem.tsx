import { historyDataProps } from "./types";
import * as React from 'react';
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { WatchLaterRounded, CheckBoxRounded } from "@mui/icons-material";
import { Grid, Box, Typography } from "@mui/material";

const HistoryViewItem: React.FC<historyDataProps> = ({index,lastIndexValue, requesID, templateName, userName, createdAt, status, updatedURLs, failedURLs, approvedBy,}) => {

  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary" sx={{ flex: '0 0 auto' }}>
        <Box sx={{
          width: "185px",
        }}>
          {createdAt}
        </Box>

      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot sx={{ height: "1rem", width: "1rem" }} />
       {index!==lastIndexValue &&
        <TimelineConnector sx={{ height: "7rem", margin: "-11px" }} />}
      </TimelineSeparator>

      <TimelineContent>
        <Grid container spacing={3} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Grid item lg >
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              {updatedURLs} URL's updated.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1.5 }}>
              {approvedBy ?
                `Approved By : ${approvedBy}`
                : failedURLs !== "0" ?
                  `${failedURLs} URL's failed`
                  : ""
              }

            </Typography>

          </Grid>
          <Grid item lg={2}>{requesID}</Grid>
          <Grid item lg={3} >{templateName}</Grid>
          <Grid item lg={2}>{userName}</Grid>
          <Grid item lg={1}>
            {status === "Waiting" ?
              <WatchLaterRounded sx={{ color: "orange", fontSize: "2rem" }} />
              : status === "Released" ?
                <CheckBoxRounded sx={{ color: "green", fontSize: "2rem" }} />
                : " "
            }
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  )
}
export default HistoryViewItem