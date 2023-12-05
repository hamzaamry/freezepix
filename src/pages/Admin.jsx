import React from 'react';
import { Box, IconButton , Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
const columns = [
  { field: 'id', headerName: 'ID', width: 90, },
  {
    field: 'Name',
    headerName: 'Name',
    width: 200,
    editable: true,

  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
    
  },
  {
    field: 'password',
    headerName: 'Password',
    width: 250,
    editable: true,
    
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => (
      <div>
        <IconButton>
          <EditIcon style={{ cursor: 'pointer', marginRight: 8 }} />
        </IconButton>
        <IconButton>
          <DeleteIcon style={{ cursor: 'pointer' }} />
        </IconButton>
      </div>
    ),
    
  },
];

const rows = [
  { id: 1, Name: 'Jon', email: 'jon@example.com', password: 'password123' },
  { id: 2, Name: 'Cersei', email: 'cersei@example.com', password: 'queen123' },
  { id: 3, Name: 'Jaime', email: 'jaime@example.com', password: 'kingslayer' },
  { id: 4, Name: 'Arya', email: 'arya@example.com', password: 'needle' },
  { id: 5, Name: 'Daenerys', email: 'daenerys@example.com', password: 'dragons123' },
  { id: 6, Name: 'Melisandre', email: 'melisandre@example.com', password: 'redpriestess' },
  { id: 7, Name: 'Ferrara', email: 'ferrara@example.com', password: 'swordfish' },
  { id: 8, Name: 'Rossini', email: 'rossini@example.com', password: 'opera123' },
  { id: 9, Name: 'Harvey', email: 'harvey@example.com', password: 'lawyer65' },
];

const Admin = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <Box sx={{ height: 350, width: '80%', margin: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '8rem' // 100% of the viewport height
      }}
    >
        <Button
        variant="contained"
        type="submit"
        style={{ marginTop: '20px', transition: 'box-shadow 0.3s', backgroundColor: '#000000', color: '#ffffff' }}
        sx={{ '&:hover': { boxShadow: '0 0 10px 3px #000000' } }}
      >
        Ajouter un Admin
      </Button>

      </Box>
    </div>
  );
};

export default Admin;
