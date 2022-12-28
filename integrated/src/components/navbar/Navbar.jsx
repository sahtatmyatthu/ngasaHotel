import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faBell, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img src="" alt="" />
          <span className="logo">Hotel Pyin Oo Lwin</span>
        </Link>
        
        {user ? (
          <div  className="navItems">
           <FontAwesomeIcon icon={faBell} className="navIcon" />
            <FontAwesomeIcon icon={faGear} className="navIcon" />
            <FontAwesomeIcon icon={faUser} className="navIcon" />
            <p>
           
              {user.username}{" "}
              <button onClick={handleLogout} className="navButton">
                Logout
              </button>{" "}
            </p>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={handleLogin} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
