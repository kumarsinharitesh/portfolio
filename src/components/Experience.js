import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const projects = [
    {
      title: "Library Management System",
      description: "Developed a Library Management System in Python with MySQL, enabling book issuance, returns, and admin panel for managing records.",
      techStack: ["Python", "MySQL"],
      link: "https://github.com/kumarsinharitesh/Library-Management-System"
    },
    {
      title: "Netflix UI Clone",
      description: "Created a responsive Netflix UI Clone using HTML, CSS, and JavaScript, replicating the front-end design.",
      techStack: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/kumarsinharitesh/Netflix-UI-Clone"
    },
    {
      title: "Banking Application",
      description: "Developed a Command-line banking application using Java and JDBC with MySQL for account management and transactions.",
      techStack: ["Java", "JDBC", "MySQL"],
      link: "https://github.com/kumarsinharitesh/Banking-Application"
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-title-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Projects
          </motion.h2>
        </div>
        <div className="experience-content">
          <div className="experience-list full-width">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="experience-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.techStack.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                  <FaGithub /> View on GitHub
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 