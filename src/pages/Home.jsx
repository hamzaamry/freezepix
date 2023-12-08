import React from 'react'
import CustomCard from '../components/Statistics/CustomCard'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; 
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import GroupIcon from '@mui/icons-material/Group';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Box display='flex' justifyContent="space-between" >
      <CustomCard title="BUDGET" icon={<MonetizationOnIcon />} color="#2196F3" value="$24k" />
       <CustomCard title="TOTAL CUSTOMERS" icon={<GroupIcon />}  color="#2196F3" value="1.6k" />
       <CustomCard title="TASK PROGRESS" icon={<TaskAltIcon />} color="#2196F3" value="75%" />
       <CustomCard title="TOTAL PROFITS" icon={<EuroSymbolIcon />} color="#2196F3" value="$15k" />
      </Box>


    <Box>
    <Box>
        
    </Box>
    <Box>
      
    </Box>

    </Box>
     
       
    </div>
  )
}

export default Home