import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './Hero.css';

const Hero = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <section id="home" className="hero">
      <motion.div 
        className="logo"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        RKS
      </motion.div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#64ffda",
            },
            links: {
              color: "#64ffda",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="particles-container"
      />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <motion.div
            className="intro-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="greeting">Hello, I'm</span>
            <h1>Ritesh Kumar Sinha</h1>
            <h2>A Tech Enthusiast & Developer</h2>
          </motion.div>

          <div className="profile-container">
            <motion.div
              className="profile-picture"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img
                src="https://instagram.fdel25-2.fna.fbcdn.net/v/t51.2885-19/500777858_18346916089157002_7792877758966306305_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel25-2.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QFxE0IeLZnqINhej6WPyxlki3YTBUPxuFsmFNRbFI2UIg7qfFDywX_RXtRiWTt19kys7c4UTjl5i534SgegPy7d&_nc_ohc=2_zidx-PNsgQ7kNvwF-tmtZ&_nc_gid=Rmx1LcqOvT5I8ngpFHtq7w&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfbAJU0luI6U53Fq3Rwk7knOsh5WhJJU0amXkRp-L9r4vg&oe=68D65044&_nc_sid=7d3ac5"
                alt="Ritesh Kumar Sinha"
                className="profile-img"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.target.src = "https://via.placeholder.com/200x200.png?text=RKS";
                }}
              />
            </motion.div>
          </div>
          
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Tech Enthusiast | Aspiring Full Stack Engineer | Software Developer
          </motion.p>

          <motion.div
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a
              href="https://github.com/kumarsinharitesh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              title="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kumarsinharitesh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              title="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              delay: 1,
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <span>Scroll to explore my work</span>
            <div className="scroll-arrow">↓</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 
