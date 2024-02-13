import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        setUserData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

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

  const [openDialog, setOpenDialog] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePasswordChange = async () => {
    try {
      await axios.post(`http://localhost:5000/api/admin/updatePassword/${userId}`, {
        password,
        confirmPassword,
      });

      toast.success('Mot de passe a été changé avec succès!', {
        position: toast.POSITION.TOP_CENTER,
      });

      handleCloseDialog();
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe :", error);
      toast.error("Erreur lors du changement de mot de passe. Veuillez réessayer.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
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

      <Box>
        <Button onClick={handleOpenDialog} variant="outlined" style={{ marginTop: '10px' }}>
          Modifier le mot de passe
        </Button>
      </Box>

      {/* Boîte de dialogue pour modifier le mot de passe */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modifier le mot de passe</DialogTitle>
        <DialogContent>
          <TextField
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <TextField
            label="Confirmer mot de passe"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handlePasswordChange} variant="contained" color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilCard;
