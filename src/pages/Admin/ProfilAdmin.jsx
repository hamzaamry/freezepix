import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const ProfilAdmin = () => {
  const [adminData, setAdminData] = useState({
    image: null,
    password: "",
    name: "",
    lastName: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAdminData((prevData) => ({ ...prevData, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfilAdminSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append("image", adminData.image);
      formData.append("password", adminData.password);
      formData.append("name", adminData.name);
      formData.append("lastName", adminData.lastName);
      formData.append("phone", adminData.phone);

      const response = await axios.post("BACKEND_API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Admin Updated Successfully:", response.data);
    } catch (error) {
      console.error("Error Updating Admin:", error.message);
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
      <h2>Manage Account</h2>
      <form onSubmit={handleProfilAdminSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={adminData.password}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={adminData.name}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={adminData.lastName}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Phone"
          variant="outlined"
          name="phone"
          value={adminData.phone}
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
            Update Account
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfilAdmin;
