import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Title, StyledText } from "../../shared/StyledComponents";

const Orders = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/order/GetAllDataPanier")
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (!token) {
      navigate('/Signin');
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const handleOrderClick = (orderId) => {
    navigate(`/orderDetails/${orderId}`);
  };

  return (
    <div
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <div className="card-header">
        <Title>Dernières commandes</Title>
      </div>

      {orders.map(order => (
        <div
          key={order._id}
          onClick={() => handleOrderClick(order._id)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2rem",
            transition: "background-color 0.3s",
            cursor: "pointer",
            alignItems: "center",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f0f0f0";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "initial";
          }}
        >
          <div>
            <StyledText>{order.userId.name}</StyledText>
          </div>
          <div>
            <StyledText>{order.userId.email}</StyledText>
          </div>
          <div>
            <StyledText>{order.createdAt}</StyledText>
          </div>
          <div>
            <StyledText>${order.prixOfOllOderByUser || 0}</StyledText>
          </div>
          <div>
            <StyledText>{order.isPaid ? "payé" : "non payé"}</StyledText>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
