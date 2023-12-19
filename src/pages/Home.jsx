import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomCard from '../components/Statistics/CustomCard'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; 
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import GroupIcon from '@mui/icons-material/Group';
import { Box } from '@mui/material';

const Home = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Signin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <CustomCard
          title="TOTAL BUDGET"
          icon={<MonetizationOnIcon />}
          color="#2196F3"
          value="$24k"
        />
        <CustomCard
          title="TOTAL CUSTOMERS"
          icon={<GroupIcon />}
          color="#2196F3"
          value="1.6k"
        />
        <CustomCard
          title="TOTAL ADMINS"
          icon={<TaskAltIcon />}
          color="#2196F3"
          value="7"
        />
        <CustomCard
          title="TOTAL PROFITS"
          icon={<EuroSymbolIcon />}
          color="#2196F3"
          value="$15k"
        />
      </Box>

      <Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </div>
  );
}

export default Home