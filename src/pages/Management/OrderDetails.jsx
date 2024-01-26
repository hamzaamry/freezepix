import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
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
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [CreationDate , setCreationDate ] = useState("")
  const [userDetails , setUserDetails ] = useState([])
  const [PanierData , setPanierData ] = useState([])
  const [orderData , setOrderData ] = useState([])
  const [currency , setCurrency] = useState("")

  const { orderId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
    try{
      const response = await axios.get(`http://localhost:5000/api/order/getPanierById/${orderId}`)
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

const handleOpenPDF = () => {
  const pdf = new jsPDF();
  pdf.addImage(Black, 'PNG', pdf.internal.pageSize.width - 50, 10, 20, 20);

  pdf.setFontSize(16);
  const factureText = "Facture";
  const factureTextWidth = pdf.getStringUnitWidth(factureText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
  const centerX = (pdf.internal.pageSize.width - factureTextWidth) / 2;
  pdf.text(factureText, centerX, 30);

  pdf.setFontSize(12);

  pdf.text(`Date: ${CreationDate}`, 10, 40);
  pdf.text(`Nom: ${userDetails.name}`, 10, 55);
  pdf.text(`Téléphone: ${userDetails.phone}`, 10, 70);
  pdf.text(`Email: ${userDetails.email}`, 10, 85);
  pdf.text(`Adresse: ${userDetails.adresse}`, 10, 100);
  pdf.text("Produits Achetés:", 10, 120);

  PanierData.Orders && PanierData.Orders.forEach((order, index) => {
    const yPosition = 140 + index * 60; 
    pdf.text(`Produit ${index + 1}:`, 10, yPosition);
    pdf.text(`   N° Commande: ${order.NumCommande}`, 20, yPosition + 10);
    pdf.text(`   Taille: ${order.taille} ${order.currency}`, 20, yPosition + 20);
    pdf.text(`   Prix: ${order.prixFinalSansTax} ${order.currency}`, 20, yPosition + 30);
  });

  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url);
};

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
          <option value="choose Status">Choisir le statut</option>
          <option value="Awaiting Confirmation">En attente de confirmation</option>
          <option value="Available for Printing">Disponible pour l'impression</option>
          <option value="Available for Shipping">Disponible pour l'expédition</option>
          <option value="In Delivery">En cours de livraison</option>
          <option value="Delivered">Commande livrée</option>
          <option value="Order Refused">Commande refusée</option>
          <option value="Order Paid">Commande payée</option>
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
                <StyledTableCell>N° Commande</StyledTableCell>
                <StyledTableCell>Quantité</StyledTableCell>
                <StyledTableCell>Taille</StyledTableCell>
                <StyledTableCell>Prix Sans Tax</StyledTableCell>
              </StyledTableRow>

              {PanierData.Orders && PanierData.Orders.map((order) => (
                <TableRow key={order.idOrder}>
                  <TableCell> <StyledText> {order.NumCommande} </StyledText> </TableCell>
                  <TableCell>  <StyledText> {order.qunaitity} </StyledText> </TableCell>
                  <TableCell>  <StyledText>  {order.taille} </StyledText></TableCell>
                  <TableCell> <StyledText> {order.prixFinalSansTax} {order.currency} </StyledText> </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
          {PanierData.Orders && PanierData.Orders.length > 0 && (
            <TotalCost>
              <StyledText>Sous-total : {PanierData.prixOfOllOderByUser} {PanierData.Orders[0].currency}</StyledText> 
              <StyledText>Frais de livraison : {PanierData.fraisTansport} {PanierData.Orders[0].currency}</StyledText>
              <StyledText>Total général : {PanierData.prixOfOllOderByUser + PanierData.fraisTansport} {PanierData.Orders[0].currency}</StyledText>
              <StyledText>Statut : {PanierData.isPaid ? "Paiement effectué" : "Paiement en attente"}</StyledText>
            </TotalCost>
          )}
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
