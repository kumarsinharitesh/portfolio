import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="about-content"
        >
          <h2>About Me</h2>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>
              Hi, I'm Ritesh Kumar Sinha, a passionate Full Stack Developer with a strong foundation in computer science.
              Currently pursuing my B.Tech in Computer Science, I'm constantly exploring new
              technologies and frameworks to build innovative solutions.
            </p>
            <p>
              My journey in software development began with a curiosity about how things work,
              which has evolved into a deep passion for creating efficient and user-friendly
              applications. I believe in writing clean, maintainable code and following best
              practices in software development.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or working on personal projects that challenge me to learn
              and grow as a developer.
            </p>
          </motion.div>

          <motion.div
            className="experience-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Positions and Responsibilities</h3>
            
            <div className="position-item">
              <div className="position-header">
                <h4>Core Member</h4>
                <span className="period">Sept 2024 - Present</span>
              </div>
              <p className="organization">Google Developer Groups</p>
              <ul>
                <li>Video Editing & Designing: Creating visual content for events and social media</li>
                <li>Working on Tech projects and Event Organizing</li>
              </ul>
            </div>
            
            <div className="position-item">
              <div className="position-header">
                <h4>Programming Member</h4>
                <span className="period">Oct 2024 - Present</span>
              </div>
              <p className="organization">Hackhound</p>
              <ul>
                <li>Learning Data Structures & Algorithms with C++</li>
                <li>Enhancing problem-solving skills and solving DSA Problems</li>
              </ul>
            </div>

            <div className="position-item">
              <div className="position-header">
                <h4>Organizing Team</h4>
                <span className="period">Oct 2023 - Present</span>
              </div>
              <p className="organization">NSS</p>
              <ul>
                <li>Event Organization & Management, Leadership & Teamwork</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="extracurricular-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>Extra-Curricular Activities</h3>
            <ul className="activities-list">
              <li>Photography</li>
              <li>Video Editing</li>
              <li>Designer</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 