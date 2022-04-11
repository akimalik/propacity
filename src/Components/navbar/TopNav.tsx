import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Switch, Toolbar, Typography } from "@mui/material";
import { useThemeContext } from "../../_contexts";

type props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  pageName?: string
};
const TopNav: React.FC<props> = ({ drawerWidth, handleDrawerToggle, pageName }) => {
  const { setDarkMode, isDarkMode } = useThemeContext()
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <Menu />
        </IconButton>

        <Typography variant="h6" noWrap component="div">{pageName}</Typography>

        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Box style={{ display: "flex", alignItems: "center", height: "100%", marginRight: 5 }}>
            {isDarkMode ? <DarkMode /> : <LightMode />}
            <Switch title={isDarkMode ? 'Dark' : 'Light'} onClick={() => { setDarkMode(!isDarkMode) }} defaultChecked color="default" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
