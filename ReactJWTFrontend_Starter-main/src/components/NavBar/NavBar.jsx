import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "darksalmon",
            }}
          >
            <b>TackleTask</b>
          </Link>
        </li>
        <li className="calendar">
          <Link
            to="/calendar"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>My Calendar</b>
          </Link>
        </li>
        <li className="tasks">
          <Link to="/tasks" style={{ textDecoration: "none", color: "white" }}>
            <b>My Tasks</b>
          </Link>
        </li>
        <li className="journal">
          <Link
            to="/journal"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>My Journal</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
