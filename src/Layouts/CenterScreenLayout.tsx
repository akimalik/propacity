import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Img } from "../Components"
type props = {}

const CenterScreenLayout: React.FC<props> = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: "center",
          alignItems: "flex-start",
          padding: ['5% 15px'],
          backgroundColor: '#f8f8fa'
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>

          <Outlet />
        </Box>
      </Box>
    </>
  )
}
export default CenterScreenLayout
