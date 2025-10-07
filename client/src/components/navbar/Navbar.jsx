import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
const {currentUser} = useContext(AuthContext)


  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="./logo.png" alt=""></img>
          <span>AgwEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={ currentUser.avatar || "/noavatar.jpg"}
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile"  className="profile">
            <div className="notification">3</div>
            <span>Profile</span></Link>
          </div>
        ) : (
          <>
            <a href="login">Sign In</a>
            <a href="/register" className="register">
              Sign Up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img src="/menu.png" onClick={() => setOpen(!open)}></img>
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
