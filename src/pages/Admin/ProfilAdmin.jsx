import React from "react";
import { Box, Button } from "@mui/material";

import ProfilCard from "../../components/Profile/ProfilCard";
import UploadPic from "../../components/Profile/UploadPic";

const ProfilAdmin = () => {
  return (
    <Box  >
      <Box display="flex" justifyContent='space-between' >
        <UploadPic />
        <ProfilCard />
      </Box>
     
    </Box>
  );
};

export default ProfilAdmin;
