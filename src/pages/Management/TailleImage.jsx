import React, { useState, useEffect } from "react";
import { Card, styled, Typography, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const generatePhotoFrame = (dimensions) => {
  const [width, height] = dimensions.split("*");

  const PhotoFrame = styled(Card)({
    width: `${width}rem`,
    height: `${height}rem`,
    border: "5px solid #000",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  });

  const FrameText = styled(Typography)({
    position: "absolute",
    bottom: "0.5rem",
    right: "0.5rem",
    color: "#000",
  });

  return (
    <PhotoFrame>
      <FrameText variant="body2">{dimensions}</FrameText>
    </PhotoFrame>
  );
};

const TailleImage = () => {
  const [dataImage, setDataImage] = useState([]);
  const [selectedCity, setSelectedCity] = useState(''); 
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/taille/getAllTaille');
        setDataImage(response.data.taille[0].Product);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!token) {
      navigate('/Signin');
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const filteredData = selectedCity
    ? dataImage.filter(item => item.city === selectedCity)
    : dataImage;

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <>
      <h2>
        Gestion des tailles des Images
      </h2>

      <FormControl sx={{ width: '10rem' }} >
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

      <div style={{display: 'flex' , padding:'2rem' }}>
        {filteredData.map((city) => (
          <div key={city._id} mb={5} >
            {city.types.map((type) => (
              <div key={type._id} mb={5} style={{padding:'3rem'}}>
                {generatePhotoFrame(type.Taille)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TailleImage;
