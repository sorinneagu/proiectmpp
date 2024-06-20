import Navbar from "../../components/navbar/navbar.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditAnnounce() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    iduser: currentUser ? currentUser.iduser : null,
  });
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        inputs.title === "" ||
        inputs.description === "" ||
        inputs.price === ""
      ) {
        setErr("Please fill all the fields");
      } else if (isNaN(inputs.price) || inputs.price <= 0) {
        setErr("Price must be a positive number");
      } else {
        inputs.price = parseFloat(inputs.price);
        await axios.put("http://localhost:5000/api/announces/" + id, inputs, {
          withCredentials: true,
        });
        navigate("/");
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
              <div className="text">Edit Announce</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              <div className="input">
                <input
                  type="text"
                  placeholder="title"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <input
                  type="price"
                  placeholder="price"
                  name="price"
                  onChange={handleChange}
                />
              </div>
            </div>
            {err && <div className="error">{err}</div>}
            <div className="submit-container">
              <div className={"submit"} onClick={handleClick}>
                Edit Announce
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default EditAnnounce;
