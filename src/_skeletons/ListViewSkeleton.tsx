import { Card, CardContent, Grid, Skeleton, Typography, Box } from "@mui/material"

const ListViewSkeleton = () =>
  <Card>
    <CardContent>
      <Typography variant="h3"  width={200}>
        <Skeleton />
      </Typography>
      <Box sx={{display:"flex",alignItem:"center"}}>
      <Typography variant="h3"  width={800}>
        <Skeleton />
      </Typography>
      <Typography variant="h3" mx={[5]}
        width={200}>
        <Skeleton />
      </Typography>
      </Box> 
    </CardContent>
  </Card >


const ListViewSkeletonList: React.FC = () => {
  return (
    <>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
      <Grid item lg={12} ><ListViewSkeleton /></Grid>
    </>
  )
}
export default ListViewSkeletonList