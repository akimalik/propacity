import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Badge, Box, Button, FormHelperText, Link, Popover, styled, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginLogout } from "../../View/UserAccess/userAccess.api";
import { useAuth } from "../../_contexts";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const UserProfile: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { currentUser: { name, email } } = useAuth()
  const { logout } = useLoginLogout()
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogOut = () => {
    logout()
    navigate("/")
  }

  return (
    <>
      <Button onClick={handleClick} style={{ color: "white" }}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          style={{ marginRight: "6px" }}
        >
          <Avatar alt={name} src="/static/images/avatar/1.jpg" sx={{ height: "1.75rem", width: "1.75rem" }} />
        </StyledBadge>
        {name}
        <KeyboardArrowDownIcon />
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        style={{ minWidth: "20rem", top: "15px", left: "-15px" }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{
          pt: [2],
          px: [2]
        }}>
          <Typography component={'h4'} variant="h6">{name}</Typography>
          <FormHelperText><Link href={`emailto:${email}`} >{email}</Link></FormHelperText>
        </Box>
        <Button variant="outlined" color="info" sx={{ m: [2], mt: [4] }} onClick={() => { handleLogOut() }}>LogOut</Button>
      </Popover>
    </>
  );
};

export default UserProfile;
