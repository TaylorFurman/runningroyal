
import React from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";


  
const Footer = () => {
  return (
      <div className="footerStyle">
        <h2>Run Royale</h2>
        <ul className="footerLinks">
            <li><Link  to="/">Home</Link></li>
            <li><Link  to="/about">About</Link></li>
            <li><Link  to="/dashboard">Dashboard</Link></li>
            <li><a href="https://github.com/TaylorFurman/runningroyal">Frontend</a></li>
            <li><a href="https://github.com/TaylorFurman/runningroyalbackend">Backend</a></li>
        </ul>
    </div>
  );
};
export default Footer;