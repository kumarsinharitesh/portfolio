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

          {/* Work Experience Section */}
          <motion.div
            className="experience-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Work Experience</h3>

            <div className="position-item">
              <div className="position-header">
                <h4>Information Technology Intern</h4>
                <span className="period">Oct 2025 - Dec 2025</span>
              </div>
              <p className="organization">
                Food Safety and Standards Authority of India (FSSAI)
              </p>
              <ul>
                <li>Managed and maintained databases using Excel and PostgreSQL</li>
                <li>Assisted in web development using HTML, CSS, JavaScript, and React</li>
              </ul>
            </div>

            <div className="position-item">
              <div className="position-header">
                <h4>Conversational Data Analyst Intern</h4>
                <span className="period">Sept 2025 - Oct 2025</span>
              </div>
              <p className="organization">
                VOIS & VI (Edunet Foundation – AICTE)
              </p>
              <ul>
                <li>Analyzed conversational datasets to derive meaningful insights</li>
                <li>Built LLM-based analytical solutions for conversational data</li>
              </ul>
            </div>

            <div className="position-item">
              <div className="position-header">
                <h4>SDE Intern</h4>
                <span className="period">Aug 2025 - Sept 2025</span>
              </div>
              <p className="organization">Bluestock</p>
              <ul>
                <li>Performed database operations using PostgreSQL</li>
                <li>Contributed to front-end development using HTML, CSS, and JavaScript</li>
              </ul>
            </div>
          </motion.div>

          {/* Extra-Curricular Section (unchanged) */}
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
