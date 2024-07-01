import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <button className="site-title" onClick={() => navigate("/")}>
        Numerandom
      </button>
      <ul>
        {currentUser ? (
          <>
            <li>
              <img
                className="userphoto"
                draggable="false"
                src={currentUser.userphoto}
                alt=""
              />
            </li>
            <li>
              <div className="username">Hello, {currentUser.username}</div>
            </li>
          </>
        ) : (
          <></>
        )}
        {currentUser ? (
          <li>
            <div
              className="login_button"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </div>
          </li>
        ) : (
          <li>
            <div className="login_button" onClick={() => navigate("/login")}>
              Login/Sing Up
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
