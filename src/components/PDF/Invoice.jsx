import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Title,
  StyledText,
  TotalCost,
  StyledTableCell,
  StyledTableRow,
} from "../../shared/StyledComponents";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton } from "@mui/material";
import ReactToPrint from "react-to-print";
import Black from "../../Assets/logo/Black.png";

const Invoice = () => {
  const componentRef = useRef(null);
  const location = useLocation();

  const [CreationDate, setCreationDate] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [PanierData, setPanierData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [currency, setCurrency] = useState("");
  const [imageProducts, setImageProducts] = useState();
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const { invoiceData } = location.state;

    setCreationDate(invoiceData.CreationDate);
    setUserDetails(invoiceData.userDetails);
    setPanierData(invoiceData.PanierData);
    setOrderData(invoiceData.orderData);
    setCurrency(invoiceData.PanierData.currency);
    setImageProducts(invoiceData.imageProducts);

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    setTodayDate(formattedDate);
  }, [location.state]);

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <IconButton>
            <PrintIcon style={{ color: "black", fontSize: "40px" }} />
          </IconButton>
        )}
        content={() => componentRef.current}
        documentTitle={`INVOICE`}
      />

      <div
        ref={componentRef}
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "3rem",
          border: "1px solid #ccc",
          margin: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <img width="200rem" src={Black} alt="logo" />
            <Title>Freezepix</Title>
          </div>
          <Title>Invoice</Title>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
            }}
          >
            Invoice Details
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "2rem",
              padding: "3rem",
            }}
          >
            <div>
              <div
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Bill To:
              </div>
              <div>
                <StyledText>
                  {" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Client Name:{" "}
                  </span>{" "}
                  {userDetails.name}{" "}
                </StyledText>
                <StyledText>
                  {" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Client adress:{" "}
                  </span>{" "}
                  {userDetails.email}{" "}
                </StyledText>
                <StyledText>
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    postal Code :{" "}
                  </span>{" "}
                  {PanierData.shippingAddress?.[0]?.postalCode}
                </StyledText>
                <StyledText>
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    city:{" "}
                  </span>{" "}
                  {PanierData.shippingAddress?.[0]?.city}
                </StyledText>
              </div>
            </div>

            <div>
              <StyledText>
                {" "}
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {" "}
                  invoice code:{" "}
                </span>{" "}
                <div> {PanierData._id} </div>
              </StyledText>
              <StyledText>
                {" "}
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {" "}
                  Invoice Creation Date:{" "}
                </span>{" "}
                <div>{todayDate} </div>{" "}
              </StyledText>
            </div>
          </div>
        </div>
        <Title>Produits Achetés:</Title>
        <TableContainer>
          <Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>N° Commande</StyledTableCell>
                <StyledTableCell>Quantité</StyledTableCell>
                <StyledTableCell>Taille</StyledTableCell>
                <StyledTableCell>Prix Sans Tax</StyledTableCell>
              </StyledTableRow>

              {PanierData.Orders &&
                PanierData.Orders.map((order) => (
                  <TableRow key={order.idOrder}>
                    <TableCell>
                      {" "}
                      <StyledText> {order.NumCommande} </StyledText>{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <StyledText> {order.qunaitity} </StyledText>{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <StyledText> {order.taille} </StyledText>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <StyledText>
                        {" "}
                        {order.prixFinalSansTax} {order.currency}{" "}
                      </StyledText>{" "}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <div style={{ textAlign: "right" }}>
            {PanierData.Orders && PanierData.Orders.length > 0 && (
              <TotalCost>
                <StyledText>
                  {" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Sous-total :{" "}
                  </span>{" "}
                  {PanierData.prixOfOllOderByUser}{" "}
                  {PanierData.Orders[0].currency}
                </StyledText>
                <StyledText>
                  {" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Frais de livraison :{" "}
                  </span>{" "}
                  {PanierData.fraisTansport} {PanierData.Orders[0].currency}
                </StyledText>
                <StyledText>
                  {" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Total général :{" "}
                  </span>{" "}
                  {PanierData.prixOfOllOderByUser +
                    PanierData.fraisTansport}{" "}
                  {PanierData.Orders[0].currency}
                </StyledText>
                <StyledText>
                  {" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Statut :{" "}
                  </span>{" "}
                  {PanierData.isPaid
                    ? "Paiement effectué"
                    : "Paiement en attente"}
                </StyledText>
              </TotalCost>
            )}
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default Invoice;
