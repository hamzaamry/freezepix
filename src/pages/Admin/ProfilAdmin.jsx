import React from "react";
import { Box } from "@mui/material";
import ProfilCard from "../../components/Profile/ProfilCard";
import UploadPic from "../../components/Profile/UploadPic";
import { Container } from "../../shared/StyledComponents"

const ProfilAdmin = () => {
  return (
    <Box  >
      <Container>
        <UploadPic />
        <ProfilCard />
      </Container>
     
    </Box>
  );
};

export default ProfilAdmin;
