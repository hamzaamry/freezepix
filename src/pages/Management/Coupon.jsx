import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Container, ButtonContainer, StyledButton } from '../../shared/StyledComponents';

const Coupon = () => {

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/Signin');
    }
  }, [token, navigate]); 

  const [codes, setCodes] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [couponToUpdate, setCouponToUpdate] = useState(null);
  const [newCouponData, setNewCouponData] = useState({
    code: '',
    dateDebuit: '',
    dateFin: '',
    percentReduce: '',
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddCoupon = async () => {
    try {
      await axios.post('http://localhost:5000/api/code/addCode', newCouponData);
      setAddDialogOpen(false);
      fetchData();
      toast.success("Nouveau coupon ajouté avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.error("Erreur lors de l'ajout du coupon :", e.message);
      toast.error("Erreur lors de l'ajout du coupon. Veuillez réessayer.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const cancelAddCoupon = () => {
    setAddDialogOpen(false);
    setNewCouponData({
      code: '',
      dateDebuit: '',
      dateFin: '',
      percentReduce: '',
    });
  }


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/code/getAllCode');
      if (response.data.success) {
        setCodes(response.data.allCodeCooperations);
      } else {
        console.error('Erreur lors de la récupération des données :', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCoupon = async (codesId) => {
    setCouponToDelete(codesId);
    setDeleteDialogOpen(true);
  }

  const confirmDeleteCoupon = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/code/deletcode/${couponToDelete}`);
      setDeleteDialogOpen(false);
      fetchData();
      toast.success("Coupon supprimé avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.error("Erreur lors de la suppression du coupon :", e.message);
      toast.error("Erreur lors de la suppression du coupon. Veuillez réessayer.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const cancelDeleteCoupon = () => {
    setDeleteDialogOpen(false);
    setCouponToDelete(null);
  }

  const handleUpdateCoupon = (code) => {
    setCouponToUpdate(code);
    setUpdateDialogOpen(true);
  }

  const confirmUpdateCoupon = async (updatedCouponData) => {
    try {
      await axios.put(`http://localhost:5000/api/code/updateCode/${couponToUpdate._id}`, updatedCouponData);
      setUpdateDialogOpen(false);
      fetchData();
      toast.success("Coupon mis à jour avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.error("Erreur lors de la mise à jour du coupon :", e.message);
      toast.error("Erreur lors de la mise à jour du coupon. Veuillez réessayer.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const cancelUpdateCoupon = () => {
    setUpdateDialogOpen(false);
    setCouponToUpdate(null);
  }

  return (
    <div>
      <Container>
        <h2>Gestion des coupons</h2>
        <ButtonContainer>
          <StyledButton
            variant="contained"
            type="submit"
            onClick={() => setAddDialogOpen(true)}
          >
            Ajouter
          </StyledButton>
        </ButtonContainer>
      </Container>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Date Debut</TableCell>
              <TableCell>Date Fin</TableCell>
              <TableCell>Percent Reduce</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codes.map(code => (
              <TableRow key={code._id}>
                <TableCell>{code.code}</TableCell>
                <TableCell>{code.dateDebuit}</TableCell>
                <TableCell>{code.dateFin}</TableCell>
                <TableCell>{code.percentReduce}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteCoupon(code._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleUpdateCoupon(code)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Boîte de dialogue de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onClose={cancelDeleteCoupon}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer ce coupon ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCoupon} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDeleteCoupon} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>



       {/* Boîte de dialogue de mise à jour des données */}
       <Dialog open={updateDialogOpen} onClose={cancelUpdateCoupon}>
        <DialogTitle>Modifier le coupon</DialogTitle>
        <DialogContent>
          <TextField
            label="Nouveau code"
            value={couponToUpdate ? couponToUpdate.code : ''}
            onChange={(e) => setCouponToUpdate({ ...couponToUpdate, code: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Date début"
            value={couponToUpdate ? couponToUpdate.dateDebuit : ''}
            onChange={(e) => setCouponToUpdate({ ...couponToUpdate, dateDebuit: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Date fin"
            value={couponToUpdate ? couponToUpdate.dateFin : ''}
            onChange={(e) => setCouponToUpdate({ ...couponToUpdate, dateFin: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Percent Reduce"
            value={couponToUpdate ? couponToUpdate.percentReduce : ''}
            onChange={(e) => setCouponToUpdate({ ...couponToUpdate, percentReduce: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelUpdateCoupon} color="primary">
            Annuler
          </Button>
          <Button onClick={() => confirmUpdateCoupon(couponToUpdate)} color="primary">
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>


        {/* Boîte de dialogue d'ajout de nouveau coupon */}
        <Dialog open={addDialogOpen} onClose={cancelAddCoupon}>
        <DialogTitle>Ajouter un nouveau coupon</DialogTitle>
        <DialogContent>
          <TextField
            label="Code"
            value={newCouponData.code}
            onChange={(e) => setNewCouponData({ ...newCouponData, code: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Date début"
            value={newCouponData.dateDebuit}
            onChange={(e) => setNewCouponData({ ...newCouponData, dateDebuit: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Date fin"
            value={newCouponData.dateFin}
            onChange={(e) => setNewCouponData({ ...newCouponData, dateFin: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Percent Reduce"
            value={newCouponData.percentReduce}
            onChange={(e) => setNewCouponData({ ...newCouponData, percentReduce: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAddCoupon} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddCoupon} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Coupon;
