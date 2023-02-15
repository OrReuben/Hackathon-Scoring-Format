import React from 'react'
import cyberpro from "../assets/Cyberpro.png";
import atidim from "../assets/lohamim_lahaytek.png";
import arrow from "../assets/Arrow.jpeg";
import ARDC from "../assets/ARDC.jpeg";
import Cyberllinium from "../assets/Cyberllinium.jpeg";
import Misrad from "../assets/Misrad_habitahon.jpeg";
import ReferHer from "../assets/ReferHer.jpeg";
import Tennis from "../assets/Tennis.jpeg";
import NewAtidim from "../assets/NewAtidim.png";

import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-container'>
        <h1>In Collaboration With</h1>
        <div className='img-container'>
      <img src={cyberpro} alt="cyberpro" />
      <img src={atidim} alt="atidim" />
      <img src={arrow} alt="arrow" />
      <img src={ARDC} alt="ARDC" />
      <img src={Cyberllinium} alt="Cyberllinium" />
      <img src={Misrad} alt="Misrad" />
      <img src={ReferHer} alt="ReferHer" />
      <img src={Tennis} alt="Tennis" />
      <img src={NewAtidim} alt="NewAtidim" />
        </div>

    </div>
  )
}

export default Footer