// import Navbar from "../../components/navbar/navbar.js";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";
// import axios from "axios";

// function AddReview() {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(AuthContext);
//   const [inputs, setInputs] = useState({
//     rating: "",
//     review: "",
//     idusers: currentUser ? currentUser.idusers : null,
//   });
//   const [err, setErr] = useState(null);
//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };
//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       if (inputs.rating === "" || inputs.review === "") {
//         setErr("Please fill all the fields");
//       } else if (isNaN(inputs.review) || inputs.review <= 0) {
//         setErr("Price must be a positive number");
//       } else {
//         inputs.review = parseFloat(inputs.review);
//         await axios.post("http://localhost:5000/api/reviews", inputs, {
//           withCredentials: true,
//         });
//         navigate("/");
//       }
//     } catch (err) {
//       console.log(err);
//       setErr(JSON.stringify(err.response.data));
//     }
//   };

//   return (
//     <>
//       {currentUser === null ? (
//         <>
//           <Navbar />
//           <h1>Not Authorised!</h1>
//         </>
//       ) : (
//         <>
//           <Navbar />
//           <div className="container">
//             <div className="header">
//               <div className="text">Add Review</div>
//               <div className="underline"></div>
//             </div>
//             <div className="inputs">
//               <div className="input">
//                 <input
//                   type="text"
//                   placeholder="rating"
//                   name="rating"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input">
//                 <input
//                   type="text"
//                   placeholder="review"
//                   name="review"
//                   onChange={handleChange}
//                 />
//               </div>
//               {/* <div className="input">
//                 <input
//                   type="price"
//                   placeholder="price"
//                   name="price"
//                   onChange={handleChange}
//                 />
//               </div> */}
//             </div>
//             {err && <div className="error">{err}</div>}
//             <div className="submit-container">
//               <div className={"submit"} onClick={handleClick}>
//                 Add Review
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
// export default AddReview;
const AddReview = () => {
  return <div>blahblahblah</div>;
};

export default AddReview;
