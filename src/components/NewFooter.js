import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaCode } from 'react-icons/fa';
import './NewFooter.css';

const NewFooter = () => {
  return (
    <footer className="new-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-logo">
            <FaCode className="logo-icon" />
          </div>
          
          <div className="contact-section">
            <div className="contact-row">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <a href="mailto:sinha.raju.rk@gmail.com">sinha.raju.rk@gmail.com</a>
            </div>
            <div className="contact-row">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <a href="tel:+91-9835858465">+91-9835858465</a>
            </div>
          </div>
          
          <div className="social-section">
            <a 
              href="https://github.com/kumarsinharitesh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/kumarsinharitesh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        
        <div className="copyright-section">
          &copy; {new Date().getFullYear()} Ritesh Kumar Sinha. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default NewFooter; 