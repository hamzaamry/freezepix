import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { StyledText, StyledCardValues } from '../../shared/StyledComponents';


const CustomCard = ({ title, icon, value, color }) => {

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '8px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', margin: '10px', padding:'8px' }}>
      <CardHeader
        avatar={<Avatar style={{ backgroundColor: color }} >{icon}</Avatar>}
        title={<StyledText>{title}</StyledText>} 
      />
      <CardContent>
          <StyledCardValues> {value} </StyledCardValues>
      </CardContent>
    </div>
  );
};

export default CustomCard;
