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
  { code: 'CODE123', discount: 0.1 },
  { code: 'DISCOUNT50', discount: 0.5 },
  // Ajoutez d'autres données selon vos besoins
];

const Coupon = () => {
  const [data, setData] = useState(initialData);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [editedCoupon, setEditedCoupon] = useState({});
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
  });

  const handleDelete = (index) => {
    setSelectedCoupon(data[index]);
    setOpenDeleteDialog(true);
  };

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setEditedCoupon({ ...coupon });
    setOpenEditDialog(true);
  };

  const handleAdd = () => {
    setNewCoupon({
      code: '',
      discount: '',
    });
    setOpenAddDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setOpenAddDialog(false);
  };

  const handleUpdateCoupon = () => {
    const newData = data.map((coupon) =>
      coupon === selectedCoupon ? { ...coupon, ...editedCoupon } : coupon
    );
    setData(newData);
    setOpenEditDialog(false);
  };

  const handleDeleteCoupon = () => {
    const newData = data.filter((coupon) => coupon !== selectedCoupon);
    setData(newData);
    setOpenDeleteDialog(false);
  };

  const handleAddCoupon = () => {
    const newData = [...data, newCoupon];
    setData(newData);
    setOpenAddDialog(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Gestion des Codes de Remise :</h2>
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
              <TableCell>Code</TableCell>
              <TableCell>Remise</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.discount}</TableCell>
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

      {/* Dialog for editing coupon */}
      <Dialog open={openEditDialog} onClose={handleDialogClose}>
        <DialogTitle>Modifier le Code de Remise</DialogTitle>
        <DialogContent>
          <TextField
            label="Code"
            value={editedCoupon.code || ''}
            onChange={(e) => setEditedCoupon({ ...editedCoupon, code: e.target.value })}
            fullWidth
          />
          <TextField
            label="Remise"
            value={editedCoupon.discount || ''}
            onChange={(e) => setEditedCoupon({ ...editedCoupon, discount: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUpdateCoupon} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for deleting coupon */}
      <Dialog open={openDeleteDialog} onClose={handleDialogClose}>
        <DialogTitle>Supprimer le Code de Remise</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer le code de remise {selectedCoupon.code}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteCoupon} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding new coupon */}
      <Dialog open={openAddDialog} onClose={handleDialogClose}>
        <DialogTitle>Ajouter un Code de Remise</DialogTitle>
        <DialogContent>
          <TextField
            label="Code"
            value={newCoupon.code || ''}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
            fullWidth
          />
          <TextField
            label="Remise"
            value={newCoupon.discount || ''}
            onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddCoupon} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Coupon;
