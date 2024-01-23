import React, { useState, useEffect } from "react";
import { Card, styled, Typography, FormControl, Select, MenuItem, InputLabel, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledDiv, StyledButton, FrameContainer , FrameText , Frames} from "../../shared/StyledComponents"



const generatePhotoFrame = (dimensions, onDelete) => {
  const [width, height] = dimensions.split("*");

  const PhotoFrame = styled(Card)({
    width: `${width}rem`,
    height: `${height}rem`,
    border: "5px solid #000",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  });
  return (
    <PhotoFrame onClick={onDelete}>
      <FrameText variant="body2">{dimensions}</FrameText>
    </PhotoFrame>
  );
};

const TailleImage = () => {
  const [dataImage, setDataImage] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTailleId, setSelectedTailleId] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/taille/getAllTaille"
        );
        setDataImage(response.data.taille[0].Product);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!token) {
      navigate("/Signin");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const filteredData = selectedCity
    ? dataImage.filter((item) => item.city === selectedCity)
    : dataImage;

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDeleteClick = (tailleId) => {
    setSelectedTailleId(tailleId);
    setOpenDialog(true);
  };
/*
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/taille/deleteTaille/${selectedTailleId}`);
      setOpenDialog(false);
      // Refresh data after deletion
      fetchData();
      toast.success('Frame deleted successfully!');
    } catch (error) {
      console.error("Error deleting data:", error);
      setOpenDialog(false);
      // Show error toast
      toast.error('Error deleting frame.');
    }
  };
  
*/
  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/taille/getAllTaille"
      );
      setDataImage(response.data.taille[0].Product);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <StyledDiv>
        <h2>Gestion des tailles des Images</h2>
        <StyledButton
          variant="contained"
          //onClick={handleAddAdminClick}
          type="submit"
        >
          Ajouter
        </StyledButton>
      </StyledDiv>
      <FormControl sx={{ width: "10rem" }}>
        <InputLabel id="city-select-label">Select City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <MenuItem value="">All Cities</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
          <MenuItem value="Tunisia">Tunisia</MenuItem>
          <MenuItem value="other">Autre</MenuItem>
        </Select>
      </FormControl>

      <FrameContainer>
        {filteredData.map((city) => (
          <div key={city._id} mb={5}>
            {city.types.map((type) => (
              <Frames key={type._id} >
                {generatePhotoFrame(type.Taille, () => handleDeleteClick(type._id))}
              </Frames>
            ))}
          </div>
        ))}
      </FrameContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button /* onClick={handleDeleteConfirm} */ color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default TailleImage;
