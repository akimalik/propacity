import { Box, CssBaseline, Divider, Drawer, FormHelperText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav, TopNav } from '../Components';


const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageName, setPageName] = useState('')
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(isMdBreakpoint || !mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopNav drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} pageName={pageName} />
      <Box
        component="aside"
        sx={isMdBreakpoint ? { width: drawerWidth, flexShrink: 0 } : {}}
        aria-label="side-nav folders"
      >
        <Drawer
          variant={isMdBreakpoint ? "permanent" : "temporary"}
          open={isMdBreakpoint || mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <SideNav />
          <Divider sx={{ mt: 'auto' }} />
          <Box component={`footer`} sx={{ px: 2, py: 1, textAlign: 'center', backgroundColor: '#e1e1e1' }}>
            <Typography component={'strong'} variant="h6" color="text.primary" sx={{ display: 'block', fontWeight: '700', fontSize: '1.5rem' }}> Propacity</Typography>
            <FormHelperText component={'strong'} color="text.secondary" sx={{ color: `rgba(0, 0, 0, 0.8)` }}> © 2022</FormHelperText>
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={theme => {
          return ({
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            ...(theme.palette.mode === 'light' ? { backgroundColor: '#E7EBF0' } : {})
          })
        }}
      >
        <Toolbar />
        <Outlet context={{ setPageName }} />
      </Box>
    </Box>
  );
}

export default DashboardLayout