import React from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import White from "../../Assets/logo/White.png";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      style={{
        backgroundColor: "#000",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box display="flex">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <img
            src={White}
            alt="Logo"
            style={{ maxWidth: "100%", maxHeight: "50px", marginLeft: "1rem" }}
          />
        </Link>

        <Box display="flex" backgroundColor="#a3a2a2" borderRadius="5px" ml={5}>
          <InputBase sx={{ ml: 3, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 2 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

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

        <IconButton>
          <SettingsIcon style={{ color: "white", fontSize: "30px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
