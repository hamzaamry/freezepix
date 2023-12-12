import React , { useState } from 'react'
import { Box, IconButton, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import admin from '../../Assets/jpg/admin.jpg';

const Item = ({ title, to, icon, selected, setSelected }) => {

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <MenuItem
      active={selected === title}
      style={{
        color: '#a3a2a2',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  </Link>
  );
};

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `gray !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{
              margin: "10px 0 15px 0",
              color: "gray",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <img
                  alt="profile-user"
                  width="50px"
                  height="50px"
                  src={admin}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="15px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Dashboard"
              to="/home"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="gestion des admins"
              to="/Admin"
              icon={<PeopleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="gestion des livraisons"
              to="/GestionUser"
              icon={<PeopleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Profile"
              to="/ProfilAdmin"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default SideBar