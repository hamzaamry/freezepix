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
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);


  // Définition de la fonction handleDeletecustomer avant son utilisation
  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteadmin/${customerId}`
      );
      toast.success("client supprimé avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });

      // Actualisez la liste des administrateurs après la suppression
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAll"
      );
      const customersWithIds = response.data.map((customer, index) => ({
        ...customer,
        id: index + 1,
      }));
      setCustomers(customersWithIds);
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

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/${selectedCustomer._id}`, {
        name: selectedCustomer.name,
        email: selectedCustomer.email,
      });

      toast.success("customer mis à jour avec succès!", {
        position: toast.POSITION.TOP_CENTER,
      });

      // Actualisez la liste des administrateurs après la mise à jour
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAll"
      );
      const customersWithIds = response.data.map((customer, index) => ({
        ...customer,
        id: index + 1,
      }));
      setCustomers(customersWithIds);

      // Réinitialisez l'état selectedAdmin
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Error updating customer:", error.message);
      toast.error(
        "Erreur lors de la mise à jour de l'admin. Veuillez réessayer.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
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
          <IconButton onClick={() => handleEditCustomer(params.row)}>
            <EditIcon style={{ cursor: "pointer", marginRight: 8 }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteCustomer(params.row._id)}>
            <DeleteIcon style={{ cursor: "pointer" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getAll"
        );
        const customersWithIds = response.data.map((customer, index) => ({
          ...customer,
          id: index + 1,
        }));

        setCustomers(customersWithIds);
      } catch (error) {
        console.error("Error fetching customers:", error.message);
        toast.error(
          "Erreur lors du chargement des clients. Veuillez réessayer.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    };

    fetchCustomers();
  }, []);


  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>customer Panel</h2>
       
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

      {selectedCustomer && (
        <div>
          <TextField
            label="Nouveau nom"
            value={selectedCustomer.name}
            onChange={(e) =>
              setSelectedCustomer({ ...selectedCustomer, name: e.target.value })
            }
            style={{
              margin:'1rem'
            }}
          />
          <TextField
            label="Nouveau email"
            value={selectedCustomer.email}
            onChange={(e) =>
              setSelectedCustomer({ ...selectedCustomer, email: e.target.value })
            }
            style={{
              margin:'1rem'
            }}
          />
          <Button    style={{
              margin:'1rem'
            }} onClick={handleUpdateCustomer}>Enregistrer</Button>
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
          rows={filteredCustomers}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Customers