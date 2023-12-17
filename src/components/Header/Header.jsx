import React from "react";
import { Box, IconButton} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import White from "../../Assets/logo/White.png";


const Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      style={{
        backgroundColor: "#000",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
 
        <Link to="/home" style={{ textDecoration: "none" }}>
          <img
            src={White}
            alt="Logo"
            style={{ maxWidth: "100%", maxHeight: "45px", marginLeft: "2rem" }}
          />
        </Link>

      {/* ICONS */}
      <Box display="flex" style={{ marginRight: "1rem" }}>
        <IconButton>
          <NotificationsIcon style={{ color: "white", fontSize: "30px" }} />
        </IconButton>

        <Link to="/ProfilAdmin">
          <IconButton>
            <AccountCircleIcon style={{ color: "white", fontSize: "30px" }} />
          </IconButton>
        </Link>

      </Box>
    </Box>
  );
};

export default Header;
