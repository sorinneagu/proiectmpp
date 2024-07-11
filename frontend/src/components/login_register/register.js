import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        inputs.username === "" ||
        inputs.password === "" ||
        inputs.email === ""
      ) {
        setErr("Please fill all the fields");
      } else {
        await axios.post("http://localhost:5000/api/auth/register", inputs);
        navigate("/login");
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data
          ? err.response.data
          : "An unexpected error occurred";
      setErr(errorMessage);
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sing Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          ></input>
        </div>
      </div>
      {err && <div className="error">{err}</div>}
      <div className="submit-container">
        <div className={"submit"} onClick={handleClick}>
          Sing Up
        </div>
        <div className={"submit gray"} onClick={() => navigate("/login")}>
          Login
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
