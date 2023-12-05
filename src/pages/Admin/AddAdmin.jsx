import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const AddAdmin = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("BACKEND_API_ENDPOINT", adminData);
      console.log("Admin Added Successfully:", response.data);
    } catch (error) {
      console.error("Error Adding Admin:", error.message);
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
