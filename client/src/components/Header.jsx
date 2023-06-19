import React from "react";
import "./Header.css";
import LoginModal from "./LoginModal";
const Header = ({ setUser, user }) => {
  return (
    <div className="header-container">
      <h1>Hackathon</h1>
      {!user && (
        <div className="login">
          <LoginModal setUser={setUser} />
          <span> Login </span>
        </div>
      )}
    </div>
  );
};

export default Header;
