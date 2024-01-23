import React, { useState, useEffect } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container , ButtonContainer , StyledButton, StyledSearchTextField, StyledTextField, DataGridContainer } from "../../shared/StyledComponents";

const Admin = () => {
  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const navigate = useNavigate();
  const handleDeleteAdmin = async (adminId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteadmin/${adminId}`
      );
      toast.success("Admin supprimé avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });

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
        phone: selectedAdmin.phone,
      });

      toast.success("Admin mis à jour avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });

      const response = await axios.get(
        "http://localhost:5000/api/admin/getAll"
      );
      const adminsWithIds = response.data.map((admin, index) => ({
        ...admin,
        id: index + 1,
      }));
      setAdmins(adminsWithIds);
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
    {
      field: "photo",
      headerName: "Photo",
      width: 80,
      editable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="profil"
          style={{ width: "45px", height: "45px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 300, editable: true },
    { field: "phone", headerName: "phone", width: 200, editable: true },
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
      <Container>
        <h2>Admin Panel</h2>
        <ButtonContainer >
          <StyledButton
            variant="contained"
            onClick={handleAddAdminClick}
            type="submit"
            >
            Ajouter un Admin
          </StyledButton>
        </ButtonContainer>
      </Container>
      <StyledSearchTextField
        placeholder="Rechercher"
        variant="outlined"
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
          <StyledTextField
            label="Nouveau nom"
            value={selectedAdmin.name}
            onChange={(e) =>
              setSelectedAdmin({ ...selectedAdmin, name: e.target.value })
            }
          />
          <StyledTextField
            label="Nouveau email"
            value={selectedAdmin.email}
            onChange={(e) =>
              setSelectedAdmin({ ...selectedAdmin, email: e.target.value })
            }
          />
          <StyledTextField
            label="Nouveau numero"
            value={selectedAdmin.phone}
            onChange={(e) =>
              setSelectedAdmin({ ...selectedAdmin, phone: e.target.value })
            }
          />
            <StyledButton 
              onClick={handleUpdateAdmin}
              variant="contained"
            >
              Enregistrer
            </StyledButton>
        </div>
      )}

      <DataGridContainer >
        <DataGrid
          rows={filteredAdmins}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </DataGridContainer>
    </div>
  );
};

export default Admin;
