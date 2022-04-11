import { Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material"

const TemplateSkeleton = () =>
  <Card>
    <CardContent>
      <Typography variant="h3">
        <Skeleton />
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={23} height={23} />
        <Skeleton variant="circular" width={23} height={23} sx={{ ml: 'auto', mr: 2 }} />
        <Skeleton variant="circular" width={23} height={23} />
      </Box>
    </CardContent>
  </Card >


const TemplateSkeletonList: React.FC = () => {
  return (
    <>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
      <Grid item xs={12} md={6} ><TemplateSkeleton /></Grid>
    </>
  )
}
export default TemplateSkeletonList