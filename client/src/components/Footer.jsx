import React from "react";
import cyberpro from "../assets/Cyberpro.png";
import atidim from "../assets/lohamim_lahaytek.png";
import Misrad from "../assets/HaAgaf.png";
import NewAtidim from "../assets/NewAtidim.png";
import IDF from "../assets/IDF_new.png";
import Galim from "../assets/Galim.png";

import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer-container">
      <h1>In Collaboration With</h1>
      <div className="img-container">
        <img src={cyberpro} alt="cyberpro" />
        <img src={NewAtidim} alt="NewAtidim" />
        <img src={atidim} alt="atidim" />
        <img src={IDF} alt="IDF" />
        <img src={Galim} alt="ARDC" />
        <img src={Misrad} alt="Misrad" />
      </div>
    </div>
  );
};

export default Footer;
