import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilCard = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const [userData, setUserData] = useState(() => {
    try {
      const storedUserData = localStorage.getItem('userData');
      return storedUserData ? JSON.parse(storedUserData) : null;
    } catch (error) {
      console.error("Erreur lors de la lecture des données depuis le localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/getOne/${userId}`);
        console.log("Réponse de l'API pour obtenir les données :", response)
        setUserData(response.data);

        // Stocker les données dans le localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));
      } catch (error) {
        // Gérer les erreurs de requête
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    // Vérifier si l'utilisateur est authentifié avant de récupérer les données
    if (isAuthenticated) {
      fetchData();
    } else {
      navigate('/Signin');
    }
  }, [isAuthenticated, navigate, userId]);

  const profilData = {
    lastName: userData?.lastName || "",
    dateNaissance: userData?.dateNaissance || "",
    phone: userData?.phone || "",
    adresse: userData?.adresse || "",
  };

  return (
    <Box
      style={{
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        margin: "8px",
        padding: "1rem 3rem",
      }}
    >
      <Typography variant="h5">Profil</Typography>
      <Typography variant="subtitle1">Les informations peuvent être modifiées</Typography>
      <Box>
        <TextField
          label="Nom de famille"
          value={profilData.lastName}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={!isAuthenticated} 
        />
        <TextField
          label="Téléphone"
          value={profilData.phone}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={!isAuthenticated}
        />
        <TextField
          label="Adresse"
          value={profilData.adresse}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={!isAuthenticated}
        />
      </Box>
    </Box>
  );
};

export default ProfilCard;
