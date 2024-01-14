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
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Coupon = () => {
  const [codes, setCodes] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    type: '',
    data: {},
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/code/getAllCode');
      if (response.data.success) {
        setCodes(response.data.allCodeCooperations);
      } else {
        console.error('Error fetching data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDialogClose = () => {
    setDialog({ open: false, type: '', data: {} });
  };

  const handleDelete = (codeId) => {
    setDialog({ open: true, type: 'delete', data: { codeId } });
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:5000/api/code/deleteCode/${dialog.data.codeId}`)
      .then(response => {
        if (response.data.success) {
          setCodes(codes.filter(code => code._id !== dialog.data.codeId));
        } else {
          console.error('Error deleting code:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error deleting code:', error);
      })
      .finally(() => {
        handleDialogClose();
      });
  };

  const handleEdit = (code) => {
    setDialog({ open: true, type: 'edit', data: { code, editedCode: { ...code } } });
  };

  const handleEditSave = () => {
    if (dialog.data && dialog.data.code && dialog.data.editedCode) {
      axios.put(`http://localhost:5000/api/code/updateCode/${dialog.data.code._id}`, dialog.data.editedCode)
        .then(response => {
          if (response.data.success) {
            setCodes(codes.map(code => (code._id === dialog.data.code._id ? response.data.updatedCode : code)));
          } else {
            console.error('Error updating code:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error updating code:', error);
        })
        .finally(() => {
          handleDialogClose();
        });
    } else {
      console.error('Invalid dialog data, code, or editedCode.');
      handleDialogClose();
    }
  };
  

  const handleAddDialogOpen = () => {
    setDialog({ open: true, type: 'add', data: { newCode: { code: '', dateDebuit: '', dateFin: '', percentReduce: 0 } } });
  };

  const handleAddDialogSave = () => {
    axios.post('http://localhost:5000/api/code/addCode', dialog.data.newCode)
      .then(response => {
        if (response.data.success) {
          setCodes([...codes, response.data.newCode]);
        handleDialogClose();
        //window.location.reload();
        } else {
          console.error('Error adding code:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error adding code:', error);
      })
      .finally(() => {
        handleDialogClose();
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDialog(prev => ({
      ...prev,
      data: {
        ...prev.data,
        editedCode: {
          ...prev.data.editedCode,
          [name]: value,
        },
      },
    }));
  };

  const handleNewCodeInputChange = (e) => {
    const { name, value } = e.target;
    setDialog(prev => ({
      ...prev,
      data: {
        ...prev.data,
        newCode: {
          ...prev.data.newCode,
          [name]: value,
        },
      },
    }));
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Gestion des coupons</h2>
        <Box
          style={{
            display: "flex",
            height: "3rem",
          }}
        >
          <Button
            variant="contained"
            onClick={handleAddDialogOpen}
            type="submit"
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
                  <IconButton onClick={() => handleDelete(code._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(code)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialog.open} onClose={handleDialogClose}>
        <DialogTitle>{dialog.type === 'add' ? 'Ajouter un nouveau code' : 'Edit Code'}</DialogTitle>
        <DialogContent>
          {dialog.type === 'add' || (dialog.type === 'edit' && dialog.data.code) ? (
            <>
              <TextField
                label="Code"
                name="code"
                value={dialog.type === 'add' ? dialog.data.newCode.code : dialog.data.editedCode.code}
                onChange={dialog.type === 'add' ? handleNewCodeInputChange : handleInputChange}
                fullWidth
              />
              <TextField
                label="Date Debut"
                name="dateDebuit"
                type="date"
                value={dialog.type === 'add' ? dialog.data.newCode.dateDebuit : dialog.data.editedCode.dateDebuit}
                onChange={dialog.type === 'add' ? handleNewCodeInputChange : handleInputChange}
                fullWidth
              />
              <TextField
                label="Date Fin"
                name="dateFin"
                type="date"
                value={dialog.type === 'add' ? dialog.data.newCode.dateFin : dialog.data.editedCode.dateFin}
                onChange={dialog.type === 'add' ? handleNewCodeInputChange : handleInputChange}
                fullWidth
              />
              <TextField
                label="Percent Reduce"
                name="percentReduce"
                type="number"
                value={dialog.type === 'add' ? dialog.data.newCode.percentReduce : dialog.data.editedCode.percentReduce}
                onChange={dialog.type === 'add' ? handleNewCodeInputChange : handleInputChange}
                fullWidth
              />
            </>
          ) : (
            <Typography>No code selected</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          {dialog.type === 'add' ? (
            <Button onClick={handleAddDialogSave}>Save</Button>
          ) : (
            <Button onClick={handleEditSave}>Save</Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={dialog.open && dialog.type === 'delete'} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this code?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Coupon;
