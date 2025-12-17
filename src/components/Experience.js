import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
 const projects = [
  {
    title: "Mood-based Music System with Gesture Control",
    description:
      "Developed an AI-powered system that detects facial expressions to predict user mood and automatically plays suitable Spotify playlists. Integrated gesture controls such as pause and resume using Mediapipe.",
    techStack: ["Python", "OpenCV", "TensorFlow", "Mediapipe", "Spotify API"],
    link: "https://github.com/kumarsinharitesh/Mood-Based-Music-Player-with-Gesture-Control"
  },
  {
    title: "Friday – Personal AI Assistant",
    description:
      "Built a voice-based personal AI assistant capable of handling automation tasks, answering queries, and performing personalized user commands.",
    techStack: ["Python", "Speech Recognition", "Automation"],
    link: "https://github.com/kumarsinharitesh/Friday-Assistant"
  },
  {
    title: "Netflix UI Clone",
    description:
      "Created a responsive Netflix UI clone replicating the original front-end design with clean layouts and smooth responsiveness.",
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/kumarsinharitesh/Netflix-UI-Clone"
  },
  {
    title: "Library Management System",
    description:
      "Developed a Python–MySQL based Library Management System enabling book issue/return functionality along with an admin panel for record management.",
    techStack: ["Python", "MySQL"],
    link: "https://github.com/kumarsinharitesh/Library-Management-System"
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
