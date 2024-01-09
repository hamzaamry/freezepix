import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Dialog as ConfirmDialog,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Tax = () => {
  const [taxData, setTaxData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTax, setSelectedTax] = useState({});
  const [updatedCity, setUpdatedCity] = useState('');
  const [updatedShippingProvince, setUpdatedShippingProvince] = useState('');
  const [updatedTaxType, setUpdatedTaxType] = useState('');
  const [updatedTaxRate, setUpdatedTaxRate] = useState('');

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tax/getAllTax')
      .then(response => {
        setTaxData(response.data.tax[0].Country);
      })
      .catch(error => {
        console.error('Error fetching tax data:', error);
      });
  }, []);

  const handleEditClick = (country) => {
    setSelectedTax(country);
    setUpdatedCity(country.city);
    setUpdatedShippingProvince(country.ShippingProvince);
    setUpdatedTaxType(country.TaxType);
    setUpdatedTaxRate(country.TaxRate);
    setOpenEditDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleUpdate = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteClick = (country) => {
    setSelectedTax(country);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    // Perform the delete logic here using axios or your preferred method
    // After a successful delete, close the dialog and refresh the data
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <h2>Gestion de Tax</h2>
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
            {taxData.map(country => (
              <TableRow key={country._id}>
                <TableCell>{country.city}</TableCell>
                <TableCell>{country.ShippingProvince}</TableCell>
                <TableCell>{country.TaxType}</TableCell>
                <TableCell>{country.TaxRate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(country)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(country)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
      <Dialog open={openEditDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Tax Information</DialogTitle>
        <DialogContent>
          <TextField
            label="City"
            value={updatedCity}
            onChange={(e) => setUpdatedCity(e.target.value)}
          />
          <TextField
            label="Shipping Province"
            value={updatedShippingProvince}
            onChange={(e) => setUpdatedShippingProvince(e.target.value)}
          />
          <TextField
            label="Tax Type"
            value={updatedTaxType}
            onChange={(e) => setUpdatedTaxType(e.target.value)}
          />
          <TextField
            label="Tax Rate"
            value={updatedTaxRate}
            onChange={(e) => setUpdatedTaxRate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the tax information for {selectedTax.city}, {selectedTax.ShippingProvince}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </ConfirmDialog>
    </div>
  );
}

export default Tax;
