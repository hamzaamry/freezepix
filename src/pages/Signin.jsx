import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Black from "../Assets/logo/Black.png";

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
            borderRadius: '20px'
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
          <form>
            <TextField
              label="email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "20px", transition: "box-shadow 0.3s" }}
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
