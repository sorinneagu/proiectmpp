import "./review.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Review = ({ idannounce }) => {
  const { currentUser } = useContext(AuthContext);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await axios
        .delete("http://localhost:5000/api/reviews/" + review.idreviews, {
          withCredentials: true,
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reviews?idannounce=" + idannounce
        );
        setReview(response.data[0]);
        console.log(review.idreviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      {review ? (
        <div className="review">
          <div className="review-container">
            <div className="review-container">
              <div className="review-header">
                <img className="user-photo" src={review.userphoto} alt="" />
                <div className="user-name">{review.username}</div>
              </div>
              <div className="review-content">
                <div className="review-text">
                  <p>{review.review}</p>
                </div>
                <div className="review-rating">
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
                      value={review.rating}
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
                      {review.rating}
                    </Box>
                  </Box>
                </div>
                {currentUser && currentUser.idusers === review.idusers ? (
                  <div className="review-footer">
                    <button className="review-button">Edit</button>
                    <button className="review-button">Update</button>
                    <button className="review-button" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div> // Add this line to return empty div
      )}
    </>
  );
};

export default Review;
