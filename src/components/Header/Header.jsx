import React from "react";
import White from '../../Assets/logo/White.png'

import { Box, IconButton } from "@mui/material";

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      style={{
        backgroundColor: '#000',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', 
      }}
    >
      <img src={White} alt="Logo" style={{ maxWidth: '100%', maxHeight: '50px', marginLeft: '2rem' }} />
      {/* ICONS */}
      <Box display="flex" style={{ marginRight: '2rem' }}>
        <IconButton>
          <NotificationsIcon style={{ color: 'white', fontSize: '30px' }} />
        </IconButton>
        <IconButton>
          <AccountCircleIcon style={{ color: 'white', fontSize: '30px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
