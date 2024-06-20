import "./announceview.css";
import Navbar from "../../components/navbar/navbar.js";
import Review from "../../components/review/review.js";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AnnounceView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [announce, setAnnounce] = useState([]);
  const [reviews, setReviews] = useState([]);
  console.log(currentUser);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/announces/" + id
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAnnounce = async (e) => {
      try {
        // e.preventDefault();
        const response = await axios.get(
          "http://localhost:5000/api/announces/" + id
        );
        setAnnounce(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnnounce();
  }, []);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/reviews?idannounce=${id}`
        );
        setReviews(response.data);
        console.log(reviews[0].idreviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="announceview">
        <div className="annnounceview-header">
          <img className="announceview-image" src={announce.images} alt="" />
        </div>
        <div className="announceview-content">
          <div className="announceview-title">{announce.title}</div>
          <div className="announceview-description">{announce.description}</div>
          <div classname="annouceview-rating">
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
                <p className="rating-number">{announce.rating}</p>
              </Box>
            </Box>
          </div>
          <div className="announceview-price">10 $</div>
          <div className="announceview-buttons">
            <button className="announceview-button" onClick={handleDelete}>
              Delete
            </button>
            <button className="announceview-button">Edit</button>
          </div>
        </div>
        <div className="announceview-ratings">
          <ul>
            <li className="list">
              {reviews.map((review) => (
                <div key={review.idreviews}>
                  <Review idannounce={review.idannounces} />
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AnnounceView;
