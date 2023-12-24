import React from 'react';
import {
  Typography,
  CardContent,
  Card,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { styled } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledCard = styled(Card)({
  width: '30%',
  height: '25%',
  borderRadius: 12,
  background: "linear-gradient(to right, #0F2027, #203A43, #2C5364)",
  boxShadow: "0 8px 10px rgba(0, 0, 0, 0.25)",
  transition: "transform 0.3s ease-in-out",
  color: 'white',
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledCardContainer = styled(Box)({
  display: 'flex',
  gap: '1%',
  flexDirection: 'row', // Organise les cartes horizontalement
  flexWrap: 'wrap',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Tax = () => {
  return (
    <Box padding="2rem" display='flex' flexDirection='column' gap={1} >

        <h2>
            Gestion de Tax
        </h2>

        <Box
          style={{
            display: "flex",
            height: "3rem",
          }}
        >
        <Button
            variant="contained"
            type="submit"
            style={{
              transition: "box-shadow 0.3s",
              backgroundColor: "#000000",
              color: "#ffffff",
              width:'20%'
            }}
            sx={{ "&:hover": { boxShadow: "0 0 8px 2px #000000" } }}
          >
            Ajouter
          </Button>

          </Box>

      <StyledCardContainer>
        {/* Exemple de carte statique 1 */}
        <StyledCard style={{ margin: '15px' }}>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography  variant="h6">City: Example City 1</Typography>
              <ButtonContainer>
                <IconButton color="primary" aria-label="edit" style={{ color: 'white' }}>
                  <EditIcon color='white' />
                </IconButton>
                <IconButton color="secondary" aria-label="delete" style={{ color: 'white' }}>
                  <DeleteIcon />
                </IconButton>
              </ButtonContainer>
            </div>
            <Typography variant="subtitle1">Shipping Province: Example Province 1</Typography>
            <Typography variant="subtitle1">Tax Type: Example Type 1</Typography>
            <Typography marginBottom="2.5rem" variant="subtitle1">Tax Rate: 10%</Typography>
            <hr />
            <Typography variant="subtitle2">Date de création: 2023-01-01</Typography>
          </CardContent>
        </StyledCard>

        {/* Exemple de carte statique 2 */}
        <StyledCard style={{ margin: '15px' }}>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">City: Example City 2</Typography>
              <ButtonContainer>
                <IconButton color="primary" aria-label="edit" style={{ color: 'white' }}>
                  <EditIcon color='white' />
                </IconButton>
                <IconButton color="secondary" aria-label="delete" style={{ color: 'white' }}>
                  <DeleteIcon />
                </IconButton>
              </ButtonContainer>
            </div>
            <Typography variant="subtitle1">Shipping Province: Example Province 2</Typography>
            <Typography variant="subtitle1">Tax Type: Example Type 2</Typography>
            <Typography marginBottom="2.5rem" variant="subtitle1">Tax Rate: 15%</Typography>
            <hr />
            <Typography variant="subtitle2">Date de création: 2023-02-01</Typography>
          </CardContent>
        </StyledCard>
      </StyledCardContainer>
    </Box>
  );
};

export default Tax;
