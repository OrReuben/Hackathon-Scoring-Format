import React from "react";
import './Header.css'
import LoginModal from "./LoginModal";
const Header = ({setUser}) => {
  return (
    <div className="header-container">
      <h1>Hackathon - November</h1>
      <div className="login">
        <LoginModal setUser = {setUser} />
       <span> Login </span>
      </div>
    </div>
  );
};

export default Header;
