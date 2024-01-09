import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const navigate = useNavigate();

  // Définition de la fonction handleDeleteAdmin avant son utilisation
  const handleDeleteAdmin = async (adminId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteadmin/${adminId}`
      );
      toast.success("Admin supprimé avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });

      // Actualisez la liste des administrateurs après la suppression
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAll"
      );
      const adminsWithIds = response.data.map((admin, index) => ({
        ...admin,
        id: index + 1,
      }));
      setAdmins(adminsWithIds);
    } catch (error) {
      console.error("Error deleting admin:", error.message);
      toast.error(
        "Erreur lors de la suppression de l'admin. Veuillez réessayer.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };

  const handleUpdateAdmin = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/${selectedAdmin._id}`, {
        name: selectedAdmin.name,
        email: selectedAdmin.email,
      });

      toast.success("Admin mis à jour avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });

      // Actualisez la liste des administrateurs après la mise à jour
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAll"
      );
      const adminsWithIds = response.data.map((admin, index) => ({
        ...admin,
        id: index + 1,
      }));
      setAdmins(adminsWithIds);

      // Réinitialisez l'état selectedAdmin
      setSelectedAdmin(null);
    } catch (error) {
      console.error("Error updating admin:", error.message);
      toast.error(
        "Erreur lors de la mise à jour de l'admin. Veuillez réessayer.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 300, editable: true },
    { field: "password", headerName: "Password", width: 250, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 100,

      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditAdmin(params.row)}>
            <EditIcon style={{ cursor: "pointer", marginRight: 8 }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteAdmin(params.row._id)}>
            <DeleteIcon style={{ cursor: "pointer" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getAll"
        );
        const adminsWithIds = response.data.map((admin, index) => ({
          ...admin,
          id: index + 1,
        }));

        setAdmins(adminsWithIds);
      } catch (error) {
        console.error("Error fetching admins:", error.message);
        toast.error(
          "Erreur lors du chargement des administrateurs. Veuillez réessayer.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
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
        sx={{ ml: 10, mb: 3, flex: 1, fontSize: "15px" }}
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
      {selectedAdmin && (
        <div>
          <TextField
            label="Nouveau nom"
            value={selectedAdmin.name}
            onChange={(e) =>
              setSelectedAdmin({ ...selectedAdmin, name: e.target.value })
            }
            style={{
              margin:'1rem'
            }}
          />
          <TextField
            label="Nouveau email"
            value={selectedAdmin.email}
            onChange={(e) =>
              setSelectedAdmin({ ...selectedAdmin, email: e.target.value })
            }
            style={{
              margin:'1rem'
            }}
          />
          <Button    style={{
              margin:'1rem'
            }} onClick={handleUpdateAdmin}>Enregistrer</Button>
        </div>
      )}

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
