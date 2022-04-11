import { ArrowDropDown, ArrowRight, SvgIconComponent, ViewCompactRounded } from "@mui/icons-material";
import { TreeItem, TreeView } from '@mui/lab';
import { Box, Divider, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../_contexts";


const SideNav: React.FC = () => {
  const { isDarkMode } = useThemeContext()

  return (
    <Box>
      <Toolbar >
        Propacity
      </Toolbar>
      <Divider />
      <TreeView
        defaultCollapseIcon={<ArrowDropDown />}
        defaultExpandIcon={<ArrowRight />}
      >
        <AssideLink nodeId="1" to="/" text="User" Icon={ViewCompactRounded} />
      </TreeView>
    </Box>
  );
};

export default SideNav;

type assideLinkProps = {
  nodeId: string,
  to: string,
  text: string,
  Icon?: SvgIconComponent
}
const AssideLink: React.FC<assideLinkProps> = ({ nodeId, to, text, Icon }) => {
  const navigate = useNavigate();
  return (
    <TreeItem nodeId={nodeId} label={
      <Box sx={{ display: 'flex', alignItems: 'center', py: 1, fontSize: '1.15em' }}>
        {Icon && <Icon sx={{ mr: 1 }} />} {text}
      </Box>
    } onClick={() => { navigate(to) }} sx={{ mt: 0.5 }} />
  )
}