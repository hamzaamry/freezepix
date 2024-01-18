import React, { useState } from "react";
import { Box, IconButton, Typography, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import admin from "../../Assets/jpg/admin.jpg";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton
        selected={selected === title}
        onClick={() => setSelected(title)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </Link>
  );
};

const SubItem = ({ title, icon, selected, setSelected, to }) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton
        sx={{ pl: 4 }}
        selected={selected === title}
        onClick={() => setSelected(title)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </Link>
  );
};
const SideBar = () => {
  const [settingsOption, setSettingsOption] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [openSettings, setOpenSettings] = useState(true);

  const handleSettingsClick = () => {
    setSettingsOption((prev) => (prev === "" ? "settings" : ""));
    setOpenSettings(!openSettings);
  };

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

        <Box display="flex" justifyContent="flex-end" alignItems="center" p={3}>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuIcon />
          </IconButton>
        </Box>

        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            marginLeft: '0.5rem'
          }}
        >
          <Item
            title="Dashboard"
            to="/home"
            icon={<HomeIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <ListItemButton onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Paramètres" />
            {openSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>

          <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <SubItem
                title="gestion des admins"
                icon={<PeopleIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"/Admin"}
              />
              <SubItem
                title="gestion des clients"
                icon={<ContactsIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"/Customers"}
              />
              <SubItem
                title="gestion des livraisons"
                icon={<LocalShippingIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"/Livraison"}
              />
              <SubItem
                title="gestion des coupons"
                icon={<DiscountIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"/Coupon"}
              />
              <SubItem
                title="gestion des taxes"
                icon={<SearchOffIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"/Tax"}
              />
              <SubItem
                title="gestion taille d'image"
                icon={<AspectRatioIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"/TailleImage"}
              />
            </List>
          </Collapse>

          <Item
            title="Profil"
            to="/ProfilAdmin"
            icon={<AccountCircleIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </List>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
