import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaCode } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.a
            className="footer-logo-link"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="footer-logo">
              <FaCode />
            </div>
          </motion.a>
          
          <motion.div 
            className="contact-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="contact-item">
              <div className="icon-container">
                <FaEnvelope />
              </div>
              <a href="mailto:sinha.raju.rk@gmail.com">sinha.raju.rk@gmail.com</a>
            </div>
            <div className="contact-item">
              <div className="icon-container">
                <FaPhone />
              </div>
              <a href="tel:+91-9835858465">+91-9835858465</a>
            </div>
          </motion.div>
          
          <motion.div 
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="https://github.com/kumarsinharitesh" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/kumarsinharitesh" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </motion.div>
          
          <motion.div 
            className="copyright"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>&copy; {new Date().getFullYear()} Ritesh Kumar Sinha. All rights reserved.</p>
          </motion.div>
          
          <motion.div 
            className="footer-divider"
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer; 