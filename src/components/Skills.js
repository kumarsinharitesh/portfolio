import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';
import TechSphere from './TechSphere';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [animateCards, setAnimateCards] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const skills = [
      { name: 'JavaScript', category: 'frontend', level: 85, icon: '🟨' },
      { name: 'React', category: 'frontend', level: 90, icon: '⚛️' },
      { name: 'HTML5', category: 'frontend', level: 95, icon: '🌐' },
      { name: 'CSS3', category: 'frontend', level: 85, icon: '🎨' },
      { name: 'Node.js', category: 'backend', level: 80, icon: '🟢' },
      { name: 'MongoDB', category: 'backend', level: 70, icon: '🍃' },
      { name: 'PostgreSQL', category: 'backend', level: 75, icon: '🐘'},
      { name: 'Python', category: 'backend', level: 75, icon: '🐍' },
      { name: 'C++', category: 'backend', level: 70, icon: '💻' },
      { name: 'SQL', category: 'backend', level: 65, icon: '🗄️' },
      { name: 'Git', category: 'tools', level: 85, icon: '📦' },
      { name: 'AWS', category: 'tools', level: 50, icon: '☁️' }
    ];

    if (activeCategory === 'all') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => skill.category === activeCategory));
    }
    
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 10);
  }, [activeCategory]);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setAnimateCards(true);
    }, 500);

    return () => clearTimeout(initialTimeout);
  }, []);

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  // Progress bar animation
  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="skills-content"
        >
          <motion.div 
            className="section-title-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">My professional skillset & proficiency</p>
          </motion.div>
          
          <div className="skills-container">
            <motion.div 
              className="tech-sphere-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TechSphere />
            </motion.div>
            
            <div className="skills-main">
              <motion.div 
                className="filter-buttons"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {['all', 'frontend', 'backend', 'tools'].map((category) => (
                  <motion.button
                    key={category}
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </motion.div>

              <div className="skills-grid">
                {animateCards && filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className={`skill-card ${hoveredSkill === skill.name ? 'hovered' : ''}`}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.3)',
                      borderColor: 'rgba(100, 255, 218, 0.5)' 
                    }}
                  >
                    <div className="skill-header">
                      <span className="skill-icon">{skill.icon}</span>
                      <h3>{skill.name}</h3>
                    </div>
                    <div className="skill-level">
                      <motion.div 
                        className="level-fill"
                        custom={skill.level}
                        initial="hidden"
                        animate="visible"
                        variants={progressVariants}
                      />
                      <span className="level-percent">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 
