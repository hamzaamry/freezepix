import React, { useState, useRef, useEffect } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import axios from "axios"; 
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const UploadPic = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState();
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file && file.size <= MAX_FILE_SIZE) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        setUserPhoto(e.target.result);

        try {
          await axios.put(`http://localhost:5000/api/admin/uploadImage/${userId}`, {
            photo: e.target.result, 
          });
          const response = await axios.get(`http://localhost:5000/api/admin/getOne/${userId}`);
          setUserData(response.data);

        } catch (error) {
          console.error("Erreur lors de la mise à jour de la photo de profil :", error);
        }
      };
      reader.readAsDataURL(file);
    }  else {
      console.error("La taille du fichier est trop importante.");
    }
  };
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const fetchData = async () => {

    try {
      const response = await axios.get(`http://localhost:5000/api/admin/getOne/${userId}`);

      console.log( "////////// upload pic photo ////////// " ,  response.data.photo)

        setUserPhoto(response.data.photo);
        setUserData(response.data); 

      }catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    }

    if (isAuthenticated) {
      fetchData();
    } else if (isAuthenticated === false) {
      navigate('/Signin');
    }


  }, [isAuthenticated, navigate, userId]); 

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        margin: "8px",
        padding: "1rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        <Typography variant="h5">{userData && userData.lastName}</Typography>

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
