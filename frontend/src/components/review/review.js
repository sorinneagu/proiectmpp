import "./review.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Review = ({ review, fetchReviews }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await axios
        .delete("http://localhost:5000/api/reviews/" + review.idreviews, {
          withCredentials: true,
        })
        .then((response) => {
          fetchReviews();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleEdit = () => {
    navigate(`/announce/${review.idannounces}/review/edit/${review.idreviews}`);
  };

  return (
    <>
      {review ? (
        <div className="review">
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
                    paddingLeft: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
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
                    <p className="rating-number">{review.rating}</p>
                  </Box>
                </Box>
              </div>
              {currentUser && currentUser.idusers === review.idusers ? (
                <div className="review-footer">
                  <button className="review-button" onClick={handleEdit}>
                    Edit
                  </button>
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
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Review;
