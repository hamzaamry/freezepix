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
import { FactureContainer, StyledButton, Title, OrderContainer, StyledDate, StyledSelect, OrderTableContainer, OrderElements, OrderElement, OrderTypography, StyledTableRow, StyledTableCell , StyledElement, OrderTable, TotalCost } from "../../shared/StyledComponents"


const Facture = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <FactureContainer>
        <div style={{ marginBottom: '16px' }}>
          <img
            src={Black}
            alt="Logo"
            style={{ width: '150px', height: 'auto' }}
          />
        </div>
          <OrderTypography >
            Facture
          </OrderTypography>

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
      </FactureContainer>
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
      <Title>Order Details</Title>
      <div style={{ marginBottom: '2rem' }}>
        <StyledButton
          variant="contained"
          component={Link} 
          to="/Home"
        >
          Retour
        </StyledButton>
      </div>

      <OrderContainer>
        <div style={{ display: 'flex' }} >
        <CalendarTodayIcon />
        <StyledDate>
            Dec 12 2021 
        </StyledDate>
        </div>
         
        <div>
          <StyledSelect
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="choose Status">choose Status</option>
            <option value="Awaiting Payment">Awaiting Payment</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Confirmed">Confirmed</option>
          </StyledSelect>
          <IconButton style={{ color: "white" }} onClick={handleFactureOpen} >
            <PrintIcon />
          </IconButton>
        </div>
      </OrderContainer>

      <OrderTableContainer >
        <OrderElements>
          <OrderElement>
            <div>
                <IconButton style={{ backgroundColor: "#000" }}>
                    <PersonIcon style={{ fontSize: "35px", color: "#fff" }} />
                </IconButton>
            </div>

            <StyledElement>
              <OrderTypography>
                Client
              </OrderTypography>
              <Typography>userName</Typography>
              <Typography>user@example.com</Typography>
            </StyledElement>
          </OrderElement>
          <OrderElement>
            <div>
              <IconButton style={{ backgroundColor: "#000" }} >
                <LocalShippingIcon style={{ fontSize: "35px", color: "#fff" }} />
              </IconButton>
            </div>

            <StyledElement>
              <OrderTypography>
                Order Info
              </OrderTypography>
              <Typography>shipping : CountryName</Typography>
            </StyledElement>
          </OrderElement>

          <OrderElement>
            <div>
              <IconButton style={{ backgroundColor: "#000" }} >
                <PlaceIcon style={{ fontSize: "35px", color: "#fff" }} />
              </IconButton>
            </div>

            <StyledElement>
              <OrderTypography>
                Deliver To
              </OrderTypography>
              <Typography>Address: Arusha</Typography>
              <Typography>P.O Box Arusha Tz 1234</Typography>
            </StyledElement>
          </OrderElement>
        </OrderElements>

        <OrderTable>

        <TableContainer>
          <Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>Produit</StyledTableCell>
                <StyledTableCell>Prix unitaire</StyledTableCell>
                <StyledTableCell>Quantité</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
              </StyledTableRow>

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
          <TotalCost>
                    <Typography>Subtotal: 203.00 €</Typography> 
                    <Typography>Shipping cost: 10.00 €</Typography>
                    <Typography>Grand total: 213.00 € </Typography>
                    <Typography>Status: payment Done </Typography>
          </TotalCost>
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
      </OrderTable>
    </OrderTableContainer>
    <Facture open={factureOpen} handleClose={handleFactureClose} />
      </div>
  );
};

export default OrderDetails;
