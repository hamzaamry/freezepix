import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import { useNavigate } from 'react-router-dom';

import SearchIcon from "@mui/icons-material/Search";

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
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleAddAdminClick = () => {
    navigate("/addAdmin");
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.Name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Admin Panel</h2>

        <Box
          style={{
            display: "flex",
            height: "3rem",
          }}
        >
          <Button
            variant="contained"
            onClick={handleAddAdminClick}
            type="submit"
            style={{
              transition: "box-shadow 0.3s",
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
            sx={{ "&:hover": { boxShadow: "0 0 8px 2px #000000" } }}
          >
            Ajouter un Admin
          </Button>
        </Box>
      </Box>

    
        <TextField
          placeholder="Search"
          variant="outlined"
          sx={{ ml: 10, mb:3 , flex: 1, fontSize: "15px" }}
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="button">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
  

      <Box
        display="flex"
        sx={{
          height: 500,
          width: "90%",
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Admin;