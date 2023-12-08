import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const ProfilCard = () => {
  const profilData = {
    lastName: "Amri",
    dateNaissance: "12/03/2002",
    phone: 28585858,
    adresse: "Tunisie ",
  };

  return (
    <Box
      style={{
        borderRadius: "10px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        margin: "8px",
        padding: "1rem 2rem",
      }}
    >
      <Typography variant="h4">Profil</Typography>
      <Typography variant="h6">The information can be edited </Typography>
      <Box>
        <TextField
          label="Nom de famille"
          value={profilData.lastName}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Date de naissance"
          value={profilData.dateNaissance}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Téléphone"
          value={profilData.phone}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Adresse"
          value={profilData.adresse}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default ProfilCard;
