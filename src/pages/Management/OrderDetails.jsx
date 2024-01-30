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
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [CreationDate , setCreationDate ] = useState("")
  const [userDetails, setUserDetails] = useState({});
  const [PanierData , setPanierData ] = useState([])
  const [orderData , setOrderData ] = useState([])
  const [currency , setCurrency] = useState("")
  const[imageProducts , setImageProducts] = useState()

  const { orderId } = useParams();

  
  const [status, setStatus] = useState("");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const updateStatus = async () => {
      try {
        let apiUrl = "";

        switch (status) {
          case "Awaiting Confirmation":
            apiUrl = `http://localhost:5000/api/order/updateIsenAttendComfirmation/${orderId}`;
            break;
          case "Available for Printing":
            apiUrl = `http://localhost:5000/api/order/DisponibleInpression/${orderId}`;
            break;
          case "Available for Shipping":
            apiUrl = `http://localhost:5000/api/order/DispoExpedition/${orderId}`;
            break;
          case "In Delivery":
            apiUrl = `http://localhost:5000/api/order/UpdateEncours/${orderId}`;
            break;
          case "Delivered":
            apiUrl = `http://localhost:5000/api/order/updateIsDelivred/${orderId}`;
            break;
          case "Order Refused":
            apiUrl = `http://localhost:5000/api/order/updateIsCanceled/${orderId}`;
            break;
          case "Order Paid":
            apiUrl = `http://localhost:5000/api/order/updateIsPaid/${orderId}`;
            break;
          default:
            break;
        }

        // Si une URL est définie, effectuez la requête PUT
        if (apiUrl) {
          const response = await axios.put(apiUrl);
          console.log(response.data);
          toast.success('Statut mis à jour avec succès !', { position: toast.POSITION.TOP_RIGHT });

        }
      } catch (error) {
        console.error('Error updating status:', error);
        toast.error('Erreur lors de la mise à jour du statut.', { position: toast.POSITION.TOP_RIGHT });

      }
    };

    if (status !== "choose Status") {
      updateStatus();
    }
  }, [status, orderId]);


  useEffect(() => {
    const fetchData = async () => {
    try{
      const response = await axios.get(`http://localhost:5000/api/order/getPanierById/${orderId}`)
      setPanierData(response.data.panier)
      setUserDetails(response.data.panier.userId)
      setOrderData(response.data.panier.Orders)
      setCurrency(response.data.panier.Orders[0].currency)
      const rawDate = new Date(response.data.panier.createdAt);
      const formattedDate = `${rawDate.getDate()}/${rawDate.getMonth() + 1}/${rawDate.getFullYear()} ${rawDate.getHours()}:${rawDate.getMinutes()}`;
      setCreationDate(formattedDate);
      setImageProducts(response.data.imageProducts)
      console.log(imageProducts)
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }
  if (!token) {
    navigate('/Signin');
  } else {
    fetchData();
  }
}, [token, navigate, orderId]);

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

  // Informations sur le client
  pdf.text(`Nom: ${PanierData.shippingAddress[0].name}`, 10, 55);
  pdf.text(`Téléphone: ${PanierData.shippingAddress[0].phone}`, 10, 70);
  pdf.text(`Email: ${userDetails.email}`, 10, 85);
  pdf.text(`Adresse:`, 10, 100);
  pdf.text(`   ${PanierData.shippingAddress[0].address1}`, 20, 110);
  pdf.text(`   ${PanierData.shippingAddress[0].address2}`, 20, 120);
  pdf.text(`   Code Postal: ${PanierData.shippingAddress[0].postalCode}`, 20, 130);

  // Produits achetés
  pdf.text("Produits Achetés:", 10, 160);
  PanierData.Orders && PanierData.Orders.forEach((order, index) => {
    const yPosition = 180 + index * 40;
    pdf.text(`Produit ${index + 1}:`, 10, yPosition);
    pdf.text(`   N° Commande: ${order.NumCommande}`, 20, yPosition + 10);
    pdf.text(`   Taille: ${order.taille} ${order.currency}`, 20, yPosition + 20);
    pdf.text(`   Prix: ${order.prixFinalSansTax} ${order.currency}`, 20, yPosition + 30);
  });

  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url);
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
                Address: {PanierData.shippingAddress && PanierData.shippingAddress.length > 0 ? PanierData.shippingAddress[0].address1 : "non spécifié"}
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

      <div>
      <StyledText>Produits Achetés:</StyledText>
      <div>
       
            {imageProducts &&
              imageProducts[0].map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Product ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginBottom: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  //onClick={} 
                />
              ))}
          </div>
      </div>
    </OrderTableContainer>
      </div>
  );
};

export default OrderDetails;
