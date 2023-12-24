import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomCard from '../components/Statistics/CustomCard'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; 
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Box } from '@mui/material';

const Home = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const navigate = useNavigate();

 /* useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Signin');
    }
  }, [isAuthenticated, navigate]);
*/
  return (
    <div>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <CustomCard
          title="BUDGET TOTAL "
          icon={<MonetizationOnIcon />}
          color="#2196F3"
          value="$24k"
          style={{ flex: 1, minWidth: 200, maxWidth: 300, margin: '0 10px 20px' }}
        />
        <CustomCard
          title="TOTAL DES UTILISATEURS"
          icon={<GroupIcon />}
          color="#2196F3"
          value="1.6k"
          style={{ flex: 1, minWidth: 200, maxWidth: 300, margin: '0 10px 20px' }}
        />
        <CustomCard
          title="VENTE PAR JOUR"
          icon={<HowToRegIcon />}
          color="#2196F3"
          value="150"
          style={{ flex: 1, minWidth: 200, maxWidth: 300, margin: '0 10px 20px' }}
        />
         <CustomCard
          title="NOMBRE DE COMMANDES NON LIVRÉES"
          icon={<EuroSymbolIcon />}
          color="#2196F3"
          value="21"
          style={{ flex: 1, minWidth: 200, maxWidth: 300, margin: '0 10px 20px' }}
        />
      </Box>

      <Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </div>
  );
}

export default Home;
