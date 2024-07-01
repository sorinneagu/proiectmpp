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
import { useCallback } from "react";
import axios from "axios";

function AnnounceView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [announce, setAnnounce] = useState(null);
  const [reviews, setReviews] = useState([]);
  const handleAddReview = () => {
    navigate("/announce/" + id + "/review");
  };
  const handleEdit = () => {
    navigate("/announce/edit/" + id);
  };
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this review?")) {
        await axios.delete("http://localhost:5000/api/announces/" + id, {
          withCredentials: true,
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchAnnounce = async (e) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/announces/" + id
        );
        if (response.data.length === 0) {
          navigate("/notfound");
        }
        setAnnounce(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnnounce();
  }, [id, navigate]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews?idannounce=${id}`
      );
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <>
      <Navbar />
      {!announce ? (
        <>Loading...</>
      ) : (
        <div className="announceview">
          <div className="annnounceview-header">
            <img className="announceview-image" src={announce.images} alt="" />
          </div>
          <div className="announceview-content">
            <div className="announceview-title">{announce.title}</div>
            <div className="announceview-description">
              {announce.description}
            </div>
            <div className="annouceview-rating">
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <Rating
                  className="cart-item-rating"
                  name="read-only"
                  value={parseFloat(announce.rating)}
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
            <div className="announceview-postedby">
              <div className="postedby">Posted by: {announce.username}</div>
            </div>
            {currentUser && currentUser.idusers === announce.idusers ? (
              <div className="announceview-buttons">
                <button className="announceview-button" onClick={handleDelete}>
                  Delete
                </button>
                <button className="announceview-button" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            ) : (
              <></>
            )}
            {currentUser ? (
              <button className="announceview-button" onClick={handleAddReview}>
                Add Review
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="announceview-ratings">
            <ul>
              {reviews.map((review) => (
                <li className="list" key={review.idreviews}>
                  <Review review={review} fetchReviews={fetchReviews} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default AnnounceView;
