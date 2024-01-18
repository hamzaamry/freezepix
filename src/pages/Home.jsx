import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/Statistics/CustomCard'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; 
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Box } from '@mui/material';
import Orders from '../components/Statistics/Orders';

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/Signin');
    }
  }, [token, navigate]); 


  return (
    <div>
      <Box display="flex" flexWrap="wrap">
        <CustomCard
          title="BUDGET TOTAL "
          icon={<MonetizationOnIcon />}
          color="#2196F3"
          value="$24k"
          style={{ flex: 1, minWidth: 100, maxWidth: 300, margin: '0 10px 20px' }}
        />
        <CustomCard
          title="TOTAL DES UTILISATEURS"
          icon={<GroupIcon />}
          color="#2196F3"
          value="1.6k"
          style={{ flex: 1, minWidth: 100, maxWidth: 300, margin: '0 10px 20px' }}
        />
        <CustomCard
          title="VENTE PAR JOUR"
          icon={<HowToRegIcon />}
          color="#2196F3"
          value="150"
          style={{ flex: 1, minWidth: 100, maxWidth: 100, margin: '0 10px 20px' }}
        />
         <CustomCard
          title="NOMBRE DE COMMANDES NON LIVRÉES"
          icon={<EuroSymbolIcon />}
          color="#2196F3"
          value="21"
          style={{ flex: 1, minWidth: 100, maxWidth: 100, margin: '0 10px 20px' }}
        />
      </Box>

      <Box>
        <Box> <Orders /> </Box>
      </Box>
    </div>
  );
}

export default Home;
