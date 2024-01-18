import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <div className="card-header">
        <Typography
          variant="h5"
          style={{ fontFamily: "sans-serif", marginBottom: "1rem" }}
        >
          Dernières commandes
        </Typography>
      </div>

      <Link to="/orderDetails" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            transition: "background-color 0.3s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f0f0f0";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "initial";
          }}
        >
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              John Doe
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              john.doe@example.com
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              $100
            </Typography>
          </div>

          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              10/03/2023 10:23 AM
            </Typography>
          </div>

          <div
            style={{
              borderRadius: "8px",
              padding: "6px",
              backgroundColor: "#71f505",
            }}
          >
            <Typography
              variant="body1"
              style={{ fontFamily: "sans-serif", color: "#2d6103" }}
            >
              Payé
            </Typography>
          </div>
        </div>
      </Link>

      <hr style={{ width: "100%", borderTop: "1px solid #ddd" }} />

      <Link to="/orderDetails" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            transition: "background-color 0.3s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f0f0f0";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "initial";
          }}
        >
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              John Doe
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              john.doe@example.com
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              $100
            </Typography>
          </div>

          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              10/03/2023 10:23 AM
            </Typography>
          </div>
          <div
            style={{
              borderRadius: "8px",
              padding: "6px",
              backgroundColor: "#71f505",
            }}
          >
            <Typography
              variant="body1"
              style={{ fontFamily: "sans-serif", color: "#2d6103" }}
            >
              Payé
            </Typography>
          </div>
        </div>
      </Link>

      <hr style={{ width: "100%", borderTop: "1px solid #ddd" }} />

      <Link to="/orderDetails" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            transition: "background-color 0.3s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f0f0f0";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "initial";
          }}
        >
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              John Doe
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              john.doe@example.com
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              $100
            </Typography>
          </div>

          <div>
            <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>
              10/03/2023 10:23 AM
            </Typography>
          </div>
          <div
            style={{
              borderRadius: "8px",
              padding: "6px",
              backgroundColor: "#71f505",
            }}
          >
            <Typography
              variant="body1"
              style={{ fontFamily: "sans-serif", color: "#2d6103" }}
            >
              Payé
            </Typography>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Orders;
