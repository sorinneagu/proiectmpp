import Navbar from "../../components/navbar/navbar.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";

function EditReview() {
  const { idannounce, id } = useParams();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    rating: "",
    review: "",
    idreviews: id ? parseInt(id) : null, // Ensure id is not null, undefined or an empty string,
    idusers: currentUser ? currentUser.idusers : null,
  });
  const [err, setErr] = useState(null);
  const handleRating = (e) => {
    e.preventDefault();
    setInputs((prev) => ({
      ...prev,
      rating: e.target.value,
    }));
    setValue(e.target.value);
  };
  const handleChange = (e, newValue) => {
    e.preventDefault();
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (inputs.rating === "" || inputs.review === "") {
        setErr("Please fill all the fields");
      } else if (isNaN(inputs.rating) || inputs.rating <= 0) {
        setErr("Rating has to be between 1-5");
      } else {
        await axios.put("http://localhost:5000/api/reviews/" + id, inputs, {
          withCredentials: true,
        });
        navigate("/announce/" + idannounce);
      }
    } catch (err) {
      console.log(err);
      setErr(JSON.stringify(err.response.data));
    }
  };

  return (
    <>
      {currentUser === null ? (
        <>
          <Navbar />
          <h1>Not Authorised!</h1>
        </>
      ) : (
        <>
          <Navbar />
          <div className="container">
            <div className="header">
              <div className="text">Edit Review</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              <div className="input">
                <input
                  type="text"
                  placeholder="review"
                  name="review"
                  onChange={handleChange}
                />
              </div>
              <div className="rating">
                <Rating
                  size="large"
                  name="rating"
                  value={+value}
                  onChange={handleRating}
                />
              </div>
            </div>
            {err && <div className="error">{err}</div>}
            <div className="submit-container">
              <div className={"submit"} onClick={handleClick}>
                Edit Review
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default EditReview;
