import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/Statistics/CustomCard'
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

  //vente par jour
  const [DailySales, setDailySales]=useState(null)
  const [totalUsers, setTotalUsers]=useState()
  const [notDeliveredOrders, setNotDeliveredOrders]=useState()
  const [totalBudget, setTotalBudget]=useState()

  useEffect(() => {
    if (!token) {
      navigate('/Signin');
    } else {
      const fetchData = async () => {
        try {
          const dailySalesResponse = await VenteParJour();
          console.log(dailySalesResponse.data.count)
          setDailySales(dailySalesResponse.data.count);
          console.log("daily sales : " , DailySales)



          const notDeliveredOrdersResponse = await NotDeliveredOrders();
          console.log(notDeliveredOrdersResponse.data.count)
          setNotDeliveredOrders(notDeliveredOrdersResponse.data.count);
          console.log( "notDeliveredOrders" , notDeliveredOrders)
         

  

          const totalBudgetResponse = await TotalBudget();
          const totalUsersResponse = await TotalUsers();
        
          //setTotalUsers(totalUsersResponse.data);
          
          //setTotalBudget(totalBudgetResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [token, navigate]); 


  return (
    <div>
      <Box display="flex" >
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
