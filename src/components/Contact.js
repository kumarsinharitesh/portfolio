import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="contact-content"
        >
          <div className="section-title-container">
            <h2 className="section-title">Get in Touch</h2>
          </div>
          <div className="contact-text">
            <p>
              If you have any questions, project proposals, or would like to discuss potential collaborations, 
              please feel free to reach out. I'm always open to exploring new opportunities.
            </p>
            <p>
              You can contact me using any of the options in the footer below.
            </p>
            <motion.div
              className="cta-button-container"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a 
                href="https://github.com/kumarsinharitesh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button"
              >
                View My Work
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 