import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/Statistics/CustomCard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; 
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Box } from '@mui/material';
import Orders from '../components/Statistics/Orders';
import { VenteParJour, TotalUsers, NotDeliveredOrders, TotalBudget } from '../components/Statistics/Api.js';

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // State variables
  const [DailySales, setDailySales] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [notDeliveredOrders, setNotDeliveredOrders] = useState([]);
  const [totalBudget, setTotalBudget] = useState([]);

  // Fetch data when token changes
  useEffect(() => {
    if (!token) 
      navigate('/Signin');
    else {
      fetchData();
    }
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const dailySalesData = await VenteParJour();
      setDailySales(dailySalesData.count.toString());
  
      const totalUsersData = await TotalUsers();
      setTotalUsers(totalUsersData.count.toString());
  
      const notDeliveredOrdersData = await NotDeliveredOrders();
      setNotDeliveredOrders(notDeliveredOrdersData.count.toString());
  
      const totalBudgetData = await TotalBudget();
      console.log( "totalBudgetData", totalBudgetData)
      //setTotalBudget(totalBudgetData.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div>
      <Box display="flex" >
        <CustomCard
          title="BUDGET TOTAL "
          icon={<MonetizationOnIcon />}
          color="#2196F3"
          value={totalBudget}
          style={{ flex: 1, minWidth: 100, maxWidth: 300, margin: '0 10px 20px' }}
        />
        <CustomCard
          title="TOTAL DES UTILISATEURS"
          icon={<GroupIcon />}
          color="#2196F3"
          value={totalUsers}
          style={{ flex: 1, minWidth: 100, maxWidth: 300, margin: '0 10px 20px' }}
        />
        <CustomCard
          title="VENTE PAR JOUR"
          icon={<HowToRegIcon />}
          color="#2196F3"
          value={DailySales}
          style={{ flex: 1, minWidth: 100, maxWidth: 100, margin: '0 10px 20px' }}
        />
         <CustomCard
          title="NOMBRE DE COMMANDES NON LIVRÉES"
          icon={<EuroSymbolIcon />}
          color="#2196F3"
          value={notDeliveredOrders}
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
