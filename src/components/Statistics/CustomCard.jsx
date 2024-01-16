import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';



const CustomCard = ({ title, icon, value, color }) => {

  return (
    <Card style={{ borderRadius: '8px' ,  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', margin: '8px' , padding: '0.5rem 0.5rem' }} >
      <CardHeader
        avatar={<Avatar style={{ backgroundColor: color }} >{icon}</Avatar>}
        title={title}
      />
      <CardContent>
        <Typography variant="h4" color="textSecondary" component="p">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
