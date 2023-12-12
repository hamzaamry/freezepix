import React, { useState, useRef } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import admin from "../../Assets/jpg/admin.jpg";

const UploadPic = () => {
  const [userPhoto, setUserPhoto] = useState(admin);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setUserPhoto(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const userData = {
    lastName: "Amri",
    dateNaissance: "12/03/2002",
    phone: 28585858,
    adresse: "Tunisie",
  };

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        margin: "8px",
        padding: "1rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center the content horizontally
        justifyContent: "center", // Center the content vertically
      }}
    >
      <img
        src={userPhoto}
        alt="admin"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <CardContent style={{ padding: "2rem 5rem 1rem", textAlign: "center" }}>
        <Typography variant="h5">{userData.lastName}</Typography>

        <input
          type="file"
          accept="image/*"
          id="upload-photo"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
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
            onClick={handleImportClick}
            style={{
              marginTop: "20px",
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "0.5rem 2.5rem",
            }}
          >
            Importer
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UploadPic;
