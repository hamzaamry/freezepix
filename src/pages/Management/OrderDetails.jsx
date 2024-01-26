import React, { useState, useEffect } from "react";
import { Button, Typography, IconButton } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  Black  from "../../Assets/logo/Black.png"
import { StyledButton, Title, OrderContainer, StyledDate, StyledSelect, OrderTableContainer, OrderElements, OrderElement, OrderTypography, StyledTableRow, StyledTableCell , StyledElement, OrderTable, TotalCost , StyledText } from "../../shared/StyledComponents"
import jsPDF from 'jspdf';
import axios from "axios";

  const handleOpenPDF = () => {
    const pdf = new jsPDF();
    pdf.addImage(Black, 'PNG', pdf.internal.pageSize.width - 50, 10, 20, 20);

   pdf.setFontSize(16);
   const factureText = "Facture";
   const factureTextWidth = pdf.getStringUnitWidth(factureText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
   const centerX = (pdf.internal.pageSize.width - factureTextWidth) / 2;
   pdf.text(factureText, centerX, 30);

    pdf.setFontSize(12);
    pdf.text('Date: 05 December 2023', 10, 60);
    pdf.text('Nom: Amri Hamza', 10, 75);
    pdf.text('Telephone: +216 92 221 937', 10, 90);
    pdf.text('Address1: karatchi street, Bardo, Tunis', 10, 110);
    pdf.text('Address2: Manouba', 10, 125);
    pdf.text('Code Postale: 5000', 10, 140);
    pdf.text('Prix unitaire: 26.00 DT', 10, 160);
    pdf.text('Quantité: x3', 10, 175);
    pdf.text('Frais de livraison: 7.00 DT', 10, 190);
    pdf.text('Taxes: 1.36 DT', 10, 205);
    pdf.text('Totale : 30.00 DT', 10, 220);

    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url);
  };


const OrderDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [CreationDate , setCreationDate ] = useState("")
  const [userDetails , setUserDetails ] = useState([])
  //const [formattedDate, setFormattedDate] = useState("")
  const [PanierData , setPanierData ] = useState([])
  const [orderData , setOrderData ] = useState([])

  const [currency , setCurrency] = useState("")

 
  useEffect(() => {
    const fetchData = async () => {
    try{
      const response = await axios.get("http://localhost:5000/api/order/getPanierById/65ac0e270c0846c4df78cf93")

      setPanierData(response.data.panier)
      setUserDetails(response.data.panier.userId)
      setCreationDate(response.data.panier.createdAt)
      setOrderData(response.data.panier.Orders)
      setCurrency(response.data.panier.Orders[0].currency)


    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }
  if (!token) {
    navigate('/Signin');
  } else {
    fetchData();
  }
}, [token, navigate]);

  const [status, setStatus] = useState("");



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


        {/* ////// Date /////// */}
        <div style={{ display: 'flex' }} >
          <StyledDate>
        <CalendarTodayIcon />
        {CreationDate}
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
          <IconButton style={{ color: "white" }} onClick={handleOpenPDF} >
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
              <StyledText>Nom: {userDetails.name}</StyledText>
              <StyledText>Email: {userDetails.email}</StyledText>
            </StyledElement>

          </OrderElement>
          <OrderElement>


            <div>
              <IconButton style={{ backgroundColor: "#000" }} >
                <LocalShippingIcon style={{ fontSize: "35px", color: "#fff" }} />
              </IconButton>
            </div>


            {/* ////// Order Info ///// */}

            <StyledElement>
              <OrderTypography>
                Order Info
              </OrderTypography>
              <StyledText>Methode de paiment: {PanierData.paymentMethod} </StyledText>
              <StyledText>Total: {PanierData.prixOfOllOderByUser} {currency}</StyledText>
              <StyledText> {PanierData.isPaid ? "payé" : "non payé"}  </StyledText>  

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
              <StyledText>
                Address:  {PanierData.shippingAddress && PanierData.shippingAddress.length > 0 ? PanierData.shippingAddress : "non spécifié"} 
              </StyledText>
              <StyledText> {PanierData.Encours ? "Livraison en cours" : ""}  </StyledText>  
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
      </div>
  );
};

export default OrderDetails;
