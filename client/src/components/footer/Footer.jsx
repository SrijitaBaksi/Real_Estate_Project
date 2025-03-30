import React from "react";
import "./Footer.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
 
  return (
    
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>UrbanEstate</h3>
          <p>Your trusted real estate partner.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/List">Properties</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} UrbanEstate. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
