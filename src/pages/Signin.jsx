import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Black from "../Assets/logo/Black.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Faites la requête Axios pour le login ici
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      // Si la connexion est réussie, vous pouvez afficher la réponse ou effectuer d'autres actions
      console.log("Login successful:", response.data);

      // Naviguez vers Dashboard après une connexion réussie
      navigate("/home");
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Gérez les erreurs de connexion ici
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Paper
          elevation={20}
          style={{
            padding: "30px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <img
              src={Black}
              alt="Logo"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </div>
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSignIn}>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                marginTop: "20px",
                transition: "box-shadow 0.3s",
              }}
              sx={{ "&:hover": { boxShadow: "0 0 10px 3px #000000" } }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default Signin;
