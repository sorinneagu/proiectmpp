import React, { useEffect } from "react";
import "./card.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  const [card, setCard] = useState([]);
  useEffect(() => {
    const fetchAllCards = async (e) => {
      try {
        // e.preventDefault();
        const response = await axios.get("http://localhost:5000/api/announces");
        setCard(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCards();
  }, []);
  return (
    <div className="card" data-testid="card-component">
      {card.map((announce) => (
        <div
          key={announce.idannounces}
          className="card-item"
          onClick={() => navigate("/announce/" + announce.idannounces)}
        >
          <div className="card-item-header">
            <img draggable="false" src={announce.images} alt="Announcement" />
          </div>
          <div className="card-item-content">
            <div className="card-item-title">
              <h1>{announce.title}</h1>
            </div>
            <div className="card-item-body">
              <div className="card-item-rating">
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center", // Add this line to align content in center
                  }}
                >
                  <Rating
                    className="cart-item-rating"
                    name="read-only"
                    value={announce.rating}
                    precision={0.1}
                    readOnly
                    size="large"
                  />
                  <Box
                    sx={{
                      m1: 2,
                      fontSize: 24,
                      marginLeft: 1,
                      userSelect: "none",
                    }}
                  >
                    {announce.rating}
                  </Box>
                </Box>
              </div>
              <p>{announce.price}$</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Card;
