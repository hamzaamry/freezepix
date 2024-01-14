import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAdmin = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/admin/ajouterAdmin", adminData);
      console.log("Admin Added Successfully:", response.data);

      setAdminData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      toast.success('Admin ajouté avec succès! ' + response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

    } catch (error) {
      console.error("Error Adding Admin:", error.message);
      toast.error('Erreur lors de l\'ajout de l\'admin. Veuillez réessayer.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <h2>Ajouter un Admin</h2>
      <form onSubmit={handleAddAdminSubmit}>
        <TextField
          required
          label="Name"
          variant="outlined"
          name="name"
          value={adminData.name}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          required
          label="Email"
          variant="outlined"
          name="email"
          value={adminData.email}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          required
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={adminData.password}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Rôle</InputLabel>
          <Select
            label="Rôle"
            name="role"
            value={adminData.role}
            onChange={handleInputChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="SuperAdmin">Super Admin</MenuItem>
          </Select>
        </FormControl>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "5rem",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            style={{
              marginTop: "20px",
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
          >
            Ajouter
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddAdmin;
