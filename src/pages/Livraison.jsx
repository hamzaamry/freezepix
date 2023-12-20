import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  tn  from '../Assets/tn.png'
import {
  Typography,
  CardContent,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box ,
  TextField,
  Grid,
} from '@mui/material';
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  width: '30%',
  height: '50%',
  borderRadius: 12,
  background: "linear-gradient(to right, #0F2027, #203A43, #2C5364)", 
  boxShadow: "0 8px 10px rgba(0, 0, 0, 0.25)",
  transition: "transform 0.3s ease-in-out",
  color:'white',
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

const Livraison = () => {
  const [livraisons, setLivraisons] = useState([]);
  const [editingLivraison, setEditingLivraison] = useState(null);
  const [editFraisTransport, setEditFraisTransport] = useState('');
  const [editCurrency, setEditCurrency] = useState('');
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newFraisTransport, setNewFraisTransport] = useState('');
  const [newCurrency, setNewCurrency] = useState('');

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/livraison/getAlllivraison');
        setLivraisons(response.data.livraisons);
      } catch (error) {
        console.error('Error fetching livraisons:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (livraisonId) => {
    setDeleteConfirmationDialog(livraisonId);
  };

  const confirmDelete = async () => {
    try {
      const response = await Axios.delete(`http://localhost:5000/api/livraison/deletlivraison/${deleteConfirmationDialog}`);

      if (response.data.success) {
        setLivraisons((prevLivraisons) =>
          prevLivraisons.filter((livraison) => livraison._id !== deleteConfirmationDialog)
        );
        toast.success(`Livraison ${deleteConfirmationDialog} deleted successfully!`);
      } else {
        toast.error(`Failed to delete Livraison ${deleteConfirmationDialog}`);
      }

      setDeleteConfirmationDialog(null);
    } catch (error) {
      console.error('Error deleting Livraison:', error.message);
    }
  };
  const cancelDelete = () => {
    setDeleteConfirmationDialog(null);
  };

  const handleEdit = (livraison) => {
    setEditingLivraison(livraison);
    setEditFraisTransport(livraison.fraisTransport);
    setEditCurrency(livraison.currency);
  };

  const handleSave = async () => {
    try {
      const response = await Axios.put(`http://localhost:5000/api/livraison/updatelivraison/${editingLivraison._id}`, {
        fraisTransport: editFraisTransport,
        currency: editCurrency,
      });

      if (response.data.success) {
        toast.success(`Livraison ${editingLivraison._id} updated successfully!`);
        setLivraisons((prevLivraisons) =>
          prevLivraisons.map((livraison) =>
            livraison._id === editingLivraison._id
              ? { ...livraison, fraisTransport: editFraisTransport, currency: editCurrency }
              : livraison
          )
        );
        setEditingLivraison(null);
        setEditFraisTransport('');
        setEditCurrency('');
      }   
    } catch (error) {
      console.error('Error updating Livraison:', error.message);
    }
  };

  const handleClose = () => {
    setEditingLivraison(null);
    setEditFraisTransport('');
    setEditCurrency('');
  };

  const handleAddLivraison = async () => {
    try {
        await Axios.post('http://localhost:5000/api/livraison/addlivraison', {
        fraisTransport: newFraisTransport,
        currency: newCurrency,
      });
      setAddDialogOpen(false);
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la livraison :', error.message);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/livraison/getAlllivraison');
        setLivraisons(response.data.livraisons);
      } catch (error) {
        console.error('Error fetching livraisons:', error.message);
      }
    };
  
    fetchData();
  }, [livraisons]); 
  
  return (
    <Box padding="2rem" display='flex' flexDirection='column' gap={1}>
      <div  >
      <Button onClick={handleAddClick} variant="contained" color="primary">
        Ajouter
      </Button>
      </div>

      <Grid container spacing={0} >
      <StyledCardContainer>
  
      {livraisons.map((livraison) => (
    

      
      <StyledCard  key={livraison._id} style={{ margin: '15px' }} >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <img src={tn} alt='tn' width='15%' />
          </div>
          <div>
          <IconButton
            color="primary"
            aria-label="edit"
            style={{ color: 'white' }}
            onClick={() => handleEdit(livraison)}
          >
            <EditIcon color='white' />
          </IconButton>

          <IconButton
  color="secondary"
  aria-label="delete"
  style={{ color: 'white' }}
  onClick={() => handleDelete(livraison._id)}
>
  <DeleteIcon />
</IconButton>

          </div>
        </div  >
        <Typography marginTop="-1.5rem" variant="h6">Frais de transport: {livraison.fraisTransport} </Typography>
        <Typography marginBottom="2.5rem"  variant="subtitle1"> Currency: {livraison.currency}</Typography>
        <hr/>
        <Typography variant="subtitle2">Date de création: {livraison.createdAt}</Typography>
      </CardContent>
    </StyledCard>


      ))}
    </StyledCardContainer>
</Grid>
        <Box>

        </Box>



      {/* Edit Dialog */}
      <Dialog open={editingLivraison !== null} onClose={handleClose}>

        <DialogTitle>Edit Livraison</DialogTitle>
        <DialogContent>
          <TextField
            label="Frais de transport"
            variant="outlined"
            fullWidth
            value={editFraisTransport}
            onChange={(e) => setEditFraisTransport(e.target.value)}
          />
          <TextField
            label="Currency"
            variant="outlined"
            fullWidth
            value={editCurrency}
            onChange={(e) => setEditCurrency(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>



          {/* Delete Confirmation Dialog */}
       <Dialog open={deleteConfirmationDialog !== null} onClose={cancelDelete}>

        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette carte ?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="secondary">
            Non
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
  <DialogTitle>Ajouter Livraison</DialogTitle>
  <DialogContent>
    <TextField
      label="Frais de transport"
      variant="outlined"
      fullWidth
      value={newFraisTransport}
      onChange={(e) => setNewFraisTransport(e.target.value)}
    />
    <TextField
      label="Currency"
      variant="outlined"
      fullWidth
      value={newCurrency}
      onChange={(e) => setNewCurrency(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setAddDialogOpen(false)} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleAddLivraison} color="primary">
      Add
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default Livraison;
