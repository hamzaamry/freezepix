import React, { useState, useEffect } from "react";
import { Button, Typography, IconButton } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Table, TableBody, TableCell, TableContainer, TableRow,  Dialog, DialogContent, DialogActions } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import  Black  from "../../Assets/logo/Black.png"



const Facture = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <div style={{ 
        padding: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' ,
        border: "2px solid #000",
        width: '25rem',
        height:'50rem'
        }}>
        
        <div style={{ marginBottom: '16px' }}>
          <img
            src={Black}
            alt="Logo"
            style={{ width: '150px', height: 'auto' }}
          />
        </div>

        <Typography
                  fontFamily="DM sans"
            fontSize="20px"
            fontWeight="700"
            lineHeight="50px"
            marginBottom="1.5rem"
          >
            Facture
          </Typography>

        <DialogContent>
      
            <p>Date: 05 December 2023</p>
            <p> Nom: Amri Hamza </p>
            <p>Telephone: +216 92 221 937 </p>
            <hr />
            <p> Address1: karatchi street, Bardo, Tunis </p>
            <p> Address2: Manouba </p>
            <p> Code Postale: 5000 </p>
            <hr />
            <p>Prix unitaire: 26.00 DT</p>
            <p>Quantité: x3</p>
            <p>Frais de livraison: 7.00 DT</p>
            <p>Taxes: 1.36 DT</p>
             <h4>Totale : <span color="green"> 30.00 DT </span></h4>
        </DialogContent>

     
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};




const OrderDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/Signin');
    }
  }, [token, navigate]); 

  const [status, setStatus] = useState("");
  const [factureOpen, setFactureOpen] = useState(false);

  const handleFactureClose = () => {
    setFactureOpen(false);
  };

  const handleFactureOpen = () => {
    setFactureOpen(true);
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
    const [livreClicked, setLivreClicked] = useState(false);
    const handleLivreClick = () => {
      setLivreClicked(true);
    };
  return (
    <div>
      <h2>Order Details</h2>
      <div style={{ marginBottom: '2rem' }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: 'black', 
            color: 'white', 
            textDecoration: 'none', 
            padding: '10px 20px', 
            borderRadius: '1px',
            cursor: 'pointer',
          }}
          component={Link} 
          to="/Home"
        >
          Retour
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 0px 0px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <div style={{ display: 'flex' }} >
        <CalendarTodayIcon />
        <Typography
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "500",
                    marginLeft: '1rem'
                }}
              >
               Dec 12 2021 
              </Typography>
        </div>
         
        <div>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              fontSize: "14px",
              marginLeft: "8px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <option value="choose Status">choose Status</option>
            <option value="Awaiting Payment">Awaiting Payment</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Confirmed">Confirmed</option>
          </select>
          <IconButton style={{ color: "white" }} onClick={handleFactureOpen} >
            <PrintIcon />
          </IconButton>
        </div>
      </div>

      <div
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#dce0e5",
          
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: '4rem',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div>
                <IconButton style={{ backgroundColor: "#000" }}>
                    <PersonIcon style={{ fontSize: "35px", color: "#fff" }} />
                </IconButton>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: '2rem'
              }}
            >
              <Typography
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "700",
           
                }}
              >
                Client
              </Typography>
              <Typography>userName</Typography>
              <Typography>user@example.com</Typography>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div>
              <IconButton style={{ backgroundColor: "#000" }} >
                <LocalShippingIcon style={{ fontSize: "35px", color: "#fff" }} />
              </IconButton>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: '2rem'
              }}
            >
              <Typography
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "700",
            
                }}
              >
                Order Info
              </Typography>
              <Typography>shipping : CountryName</Typography>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              
            }}
          >
            <div>
              <IconButton style={{ backgroundColor: "#000" }} >
                <PlaceIcon style={{ fontSize: "35px", color: "#fff" }} />
              </IconButton>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: '2rem'
              }}
            >
              <Typography
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "700",
                }}
              >
                Deliver To
              </Typography>
              <Typography>Address: Arusha</Typography>
              <Typography>P.O Box Arusha Tz 1234</Typography>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '2rem' }}>

        <TableContainer>
          <Table>
            <TableBody>

            <TableRow style={{ borderBottom: '2px solid black' }}>
                <TableCell style={{fontSize: "18px" , fontWeight:'bold'}}>Produit</TableCell>
                <TableCell style={{fontSize: "18px" , fontWeight:'bold'}} >Prix unitaire</TableCell>
                <TableCell style={{fontSize: "18px" , fontWeight:'bold'}} >Quantité</TableCell>
                <TableCell style={{fontSize: "18px" , fontWeight:'bold'}} >Total</TableCell>
              </TableRow>

              <TableRow >
                <TableCell>test1</TableCell>
                <TableCell>7,00 €</TableCell>
                <TableCell>4</TableCell>
                <TableCell>28,00 €</TableCell>
              </TableRow>


              <TableRow >
                <TableCell>test2</TableCell>
                <TableCell>25,00 €</TableCell>
                <TableCell>3</TableCell>
                <TableCell>75,00 €</TableCell>
              </TableRow>

              <TableRow >
                <TableCell>test3</TableCell>
                <TableCell>100,00 €</TableCell>
                <TableCell>1</TableCell>
                <TableCell>100,00 €</TableCell>
              </TableRow>


            </TableBody>
          </Table>
          <div style={{marginTop: '1rem', padding:'1rem' }} >
                    <Typography>Subtotal: 203.00 €</Typography> 
                    <Typography>Shipping cost: 10.00 €</Typography>
                    <Typography>Grand total: 213.00 € </Typography>
                    <Typography>Status: payment Done </Typography>
                </div>
        </TableContainer>
               

        <div style={{ marginLeft: '2rem' }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: livreClicked ? 'green' : 'black', 
              color: 'white',
            }}
            onClick={handleLivreClick}
          >
            {livreClicked ? "Livré" : "Marquer comme livré"} 
            
          </Button>
        </div>
      </div>
    </div>
    <Facture open={factureOpen} handleClose={handleFactureClose} />

      </div>

  );
};

export default OrderDetails;
