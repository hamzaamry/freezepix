import React, { useState, useEffect } from "react";
import { Box, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200, editable: true },
  { field: 'email', headerName: 'Email', width: 300, editable: true },
  { field: 'password', headerName: 'Password', width: 250, editable: true },
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

const Admin = () => {
  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/getAll");
        const adminsWithIds = response.data.map((admin, index) => ({ ...admin, id: index + 1 }));
        setAdmins(adminsWithIds);
      } catch (error) {
        console.error("Error fetching admins:", error.message);
        toast.error('Erreur lors du chargement des administrateurs. Veuillez réessayer.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
  
    fetchAdmins();
  }, []);

  
  const handleAddAdminClick = () => {
    navigate("/addAdmin");
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchText.toLowerCase())
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
        placeholder="Rechercher"
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
          rows={filteredAdmins}
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
