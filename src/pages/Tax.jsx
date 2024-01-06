import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const initialData = [
  { city: 'Paris', province: 'Île-de-France', type: 'VAT', rate: 0.2 },
  { city: 'Marseille', province: 'Provence-Alpes-Côte d\'Azur', type: 'GST', rate: 0.15 },
  // Ajoutez d'autres données selon vos besoins
];

const Tax = () => {
  const [data, setData] = useState(initialData);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedTax, setSelectedTax] = useState({});
  const [editedTax, setEditedTax] = useState({});
  const [newTax, setNewTax] = useState({
    city: '',
    province: '',
    type: '',
    rate: '',
  });

  const handleDelete = (index) => {
    setSelectedTax(data[index]);
    setOpenDeleteDialog(true);
  };

  const handleEdit = (tax) => {
    setSelectedTax(tax);
    setEditedTax({ ...tax });
    setOpenEditDialog(true);
  };

  const handleAdd = () => {
    setNewTax({
      city: '',
      province: '',
      type: '',
      rate: '',
    });
    setOpenAddDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setOpenAddDialog(false);
  };

  const handleUpdateTax = () => {
    const newData = data.map((tax) =>
      tax === selectedTax ? { ...tax, ...editedTax } : tax
    );
    setData(newData);
    setOpenEditDialog(false);
  };

  const handleDeleteTax = () => {
    const newData = data.filter((tax) => tax !== selectedTax);
    setData(newData);
    setOpenDeleteDialog(false);
  };

  const handleAddTax = () => {
    const newData = [...data, newTax];
    setData(newData);
    setOpenAddDialog(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Gestion de Tax :</h2>
        <Box
          style={{
            display: "flex",
            height: "3rem",
          }}
        >
          <Button
            variant="contained"
            onClick={handleAdd}
            style={{
              transition: "box-shadow 0.3s",
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
            sx={{ "&:hover": { boxShadow: "0 0 8px 2px #000000" } }}
          >
            Ajouter
          </Button>
        </Box>
      </Box>
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
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.province}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.rate}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for editing tax */}
      <Dialog open={openEditDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Tax</DialogTitle>
        <DialogContent>
          <TextField
            label="City"
            value={editedTax.city || ''}
            onChange={(e) => setEditedTax({ ...editedTax, city: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
          <TextField
            label="Shipping Province"
            value={editedTax.province || ''}
            onChange={(e) => setEditedTax({ ...editedTax, province: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
          <TextField
            label="Tax Type"
            value={editedTax.type || ''}
            onChange={(e) => setEditedTax({ ...editedTax, type: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
          <TextField
            label="Tax Rate"
            value={editedTax.rate || ''}
            onChange={(e) => setEditedTax({ ...editedTax, rate: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTax} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for deleting tax */}
      <Dialog open={openDeleteDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete Tax</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer la taxe pour {selectedTax.city}, {selectedTax.province}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteTax} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding new tax */}
      <Dialog open={openAddDialog} onClose={handleDialogClose}>
        <DialogTitle>Ajouter une Taxe</DialogTitle>
        <DialogContent>
          <TextField 
            label="City"
            value={newTax.city || ''}
            onChange={(e) => setNewTax({ ...newTax, city: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
          <TextField
            label="Shipping Province"
            value={newTax.province || ''}
            onChange={(e) => setNewTax({ ...newTax, province: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
          <TextField
            label="Tax Type"
            value={newTax.type || ''}
            onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
          <TextField
            label="Tax Rate"
            value={newTax.rate || ''}
            onChange={(e) => setNewTax({ ...newTax, rate: e.target.value })}
            fullWidth
            style={{ marginBottom: '1rem' , marginTop: '1rem' }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddTax} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tax;
