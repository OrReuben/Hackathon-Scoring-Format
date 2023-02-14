import React from "react";
import cyberpro from "../assets/Cyberpro.png";
import atidim from "../assets/lohamim_lahaytek.png";
import './Header.css'
const Header = () => {
  return (
    <div className="header-container">
      <img src={cyberpro} alt="cyberpro" />
      <h1>Hackathon - November</h1>
      <img src={atidim} alt="atidim" />
    </div>
  );
};

export default Header;
