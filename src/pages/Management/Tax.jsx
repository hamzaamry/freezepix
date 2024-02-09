import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, StyledButton, ButtonContainer } from "../../shared/StyledComponents"


const Tax = () => {

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/Signin');
    }
  }, [token, navigate]); 
  
  const [taxData, setTaxData] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTaxData, setNewTaxData] = useState({
    city: '',
    shippingProvince: '',
    taxType: '',
    taxRate: '',
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [TaxToDelete, setTaxToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tax/getAllTax');

      if (response.data.success) {
        const countries = response.data.tax.flatMap(taxItem => taxItem.Country);
        setTaxData(countries);
      } else {
        console.error('Erreur lors de la récupération des données :', response.data.message);
      }
    } catch (e) {
      console.error('Erreur lors de la récupération des données :', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewTaxData({
      city: '',
      shippingProvince: '',
      taxType: '',
      taxRate: '',
    });
  };

  const handleConfirmAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/tax/addTax', {
        Country: [newTaxData],
      });
        setAddDialogOpen(false);
        fetchData();
        toast.success('Nouvelles informations fiscales ajoutées avec succès!', {
          position: toast.POSITION.TOP_CENTER,
        });

    } catch (e) {
      console.error("Erreur lors de l'ajout des informations fiscales :", e.message);
      toast.error("Erreur lors de l'ajout des informations fiscales. Veuillez réessayer.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };



  const handleDeleteClick = (taxId) => {
    setTaxToDelete(taxId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setTaxToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tax/deletTax/${TaxToDelete}`);
      setDeleteDialogOpen(false);
      fetchData();
      toast.success('Taxe supprimée avec succès!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.error("Erreur lors de la suppression de la taxe :", e.message);
      toast.error("Erreur lors de la suppression de la taxe. Veuillez réessayer.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <Container>
        <h2>Gestion des taxes</h2>
        <ButtonContainer
        >
          <StyledButton
            variant="contained"
            onClick={handleAddClick}
          >
            Ajouter
          </StyledButton>
        </ButtonContainer>
      </Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>Shipping Province</TableCell>
              <TableCell>Tax Type</TableCell>
              <TableCell>Tax Rate</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxData.map((country) => (
              <TableRow key={country._id}>
                <TableCell>{country.city}</TableCell>
                <TableCell>{country.ShippingProvince}</TableCell>
                <TableCell>{country.TaxType}</TableCell>
                <TableCell>{country.TaxRate}</TableCell>
                <TableCell>
                 <IconButton> 
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(country._id)} >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Boîte de dialogue d'ajout de nouvelle taxe */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Ajouter une nouvelle taxe</DialogTitle>
        <DialogContent>
          <TextField
            label="City"
            value={newTaxData.city}
            onChange={(e) => setNewTaxData({ ...newTaxData, city: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Shipping Province"
            value={newTaxData.shippingProvince}
            onChange={(e) => setNewTaxData({ ...newTaxData, shippingProvince: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tax Type"
            value={newTaxData.taxType}
            onChange={(e) => setNewTaxData({ ...newTaxData, taxType: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tax Rate"
            value={newTaxData.taxRate}
            onChange={(e) => setNewTaxData({ ...newTaxData, taxRate: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmAdd} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>


       {/* Boîte de dialogue de confirmation de suppression */}
       <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cette taxe ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Tax;
