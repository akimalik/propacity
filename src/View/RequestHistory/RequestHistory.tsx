import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import HistoryViewItem from "./HistoryViewItem"
import { getHistoryList } from "./history.api"
import { TemplateSkeletonList } from "../../_skeletons";
import { historyDataProps } from "./types"
import { useOutletContext } from "react-router-dom";
import { Timeline } from "@mui/lab";

const RequestHistory: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [historyData, setHistoryData] = useState<historyDataProps[]>([])
  const [searchHistoryData, setSearchHistotyData] = useState<historyDataProps[]>();
  const { setPageName } = useOutletContext<any>()

  useEffect(() => {
    getHistoryList().then(({ data1 }) => {
      setHistoryData(data1)
      setSearchHistotyData(data1)
      setLoading(false)
    })
    setPageName("History")
  }, [])

  const searchTemplate = (val: string) => {
    let newSerchData1 = historyData.filter(({ templateName }: historyDataProps) => templateName.toLowerCase().includes(val.toLowerCase()));
    setSearchHistotyData(newSerchData1)
  };

  return (
    <>
      <Box sx={{ mx: ['auto'] }}>
        <Box sx={{ mx: ['auto'], marginBottom: "2rem" }}>
          <TextField id="outlined-basic" onChange={e => {
            searchTemplate(e.target.value)
          }} style={{ width: "100%" }} label="Search Templetes" variant="outlined" />
        </Box>


        {isLoading ? <TemplateSkeletonList /> :
          <Timeline position="right">
            {searchHistoryData && searchHistoryData.map((props, index) => (
              <HistoryViewItem key={index} index={index} lastIndexValue={searchHistoryData.length-1} {...props} />
            ))}
          </Timeline>
        }

      </Box>
    </>
  )
}
export default RequestHistory