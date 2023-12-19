import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Typography,
  CardContent,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const Livraison = () => {
  const [livraisons, setLivraisons] = useState([]);
  const [editingLivraison, setEditingLivraison] = useState(null);
  const [editFraisTransport, setEditFraisTransport] = useState('');
  const [editCurrency, setEditCurrency] = useState('');

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
    Axios.delete(`http://localhost:5000/api/livraison/deletlivraison/${livraisonId}`)
      .then((response) => {
        if (response.data.success) {
          setLivraisons((prevLivraisons) =>
            prevLivraisons.filter((livraison) => livraison._id !== livraisonId)
          );
          toast.success(`Livraison ${livraisonId} deleted successfully!`);
        } else {
          toast.error(`Failed to delete Livraison ${livraisonId}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting Livraison:', error.message);
      });
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
      } else {
        toast.error(`Failed to update Livraison ${editingLivraison._id}`);
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

  return (
    <>
      {livraisons.map((livraison) => (
        <Card
          key={livraison._id}
          style={{
            width: '30%',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '16px',
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Frais de transport: {livraison.fraisTransport}
            </Typography>
            <Typography variant="h7" color="text.secondary">
              Currency: {livraison.currency}
            </Typography>
            <br />
            <Typography variant="h7" color="text.secondary">
              Date création: {livraison.createdAt}
            </Typography>
          </CardContent>
          <div>
            <IconButton color="primary" onClick={() => handleEdit(livraison)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleDelete(livraison._id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Card>
      ))}

      {/* Edit Dialog */}
      <Dialog open={Boolean(editingLivraison)} onClose={handleClose}>
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
    </>
  );
};

export default Livraison;
