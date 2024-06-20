import React from "react";
import "./login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (inputs.username === "" || inputs.password === "") {
        setErr("Invalid username or password");
      } else {
        await login(inputs);
        navigate("/");
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
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
          />
        </div>
      </div>
      {err && <div className="error">{err}</div>}
      <div className="submit-container">
        <div className={"submit gray"} onClick={() => navigate("/register")}>
          Sing Up
        </div>
        <div className={"submit"} onClick={handleLogin}>
          Log In
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
