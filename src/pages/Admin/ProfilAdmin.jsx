import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

import ProfilCard from "../../components/Profile/ProfilCard";
import UploadPic from "../../components/Profile/UploadPic";

const ProfilAdmin = () => {
  
  return (
    <Box  >
      <Box display="flex" justifyContent='space-between' >
        <UploadPic />
        <ProfilCard />
      </Box>
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
            Save
          </Button>
        </Box>
    </Box>
  );
};

export default ProfilAdmin;
