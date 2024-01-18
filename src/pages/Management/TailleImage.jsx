import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  styled,
  Box,
} from "@mui/material";
import axios from "axios";

const StyledCard = styled(Card)({
  width: 250,
  height: 200,
  padding: 10,
  marginBottom: 10,
  border: "1px solid #ccc",
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const TailleImage = () => {
  const [tailleData, setTailleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/taille/getAllTaille"
        );
        setTailleData(response.data);
      } catch (error) {
        console.error("Error fetching taille data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="5rem"
      >
        <Grid container spacing={3}>
          {tailleData &&
            tailleData.success &&
            tailleData.taille.map((taille) => (
              <Grid item key={taille._id} xs={12} sm={4} md={4} lg={4}>
                {taille.Product.map((product) => (
                  <Grid item xs={12} key={product._id}>
                    {product.types.map((type) => (
                      <StyledCard key={type._id}>
                        <CardContent>
                          <Typography variant="h6">
                            Taille: {type.Taille}
                          </Typography>
                          <Typography>
                            {`City: ${product.city}, Price: ${type.price} ${type.currency}`}
                          </Typography>
                        </CardContent>
                      </StyledCard>
                    ))}
                  </Grid>
                ))}
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default TailleImage;
