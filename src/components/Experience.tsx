'use client'

import { motion } from 'framer-motion'
import styles from './Experience.module.css'

const experiences = [
  {
    role: 'Information Technology Intern',
    company: 'Food Safety and Standards Authority of India (FSSAI)',
    period: 'Oct 2025 – Dec 2025',
    type: 'Internship',
    color: '#10b981',
    points: [
      'Optimized PostgreSQL relational databases for regulatory data management across multiple government record systems',
      'Built React.js UI components for production-facing internal portals using HTML, CSS, and JavaScript',
    ],
  },
  {
    role: 'Conversational Data Analyst Intern',
    company: 'VOIS & Vi – Edunet Foundation (AICTE)',
    period: 'Sept 2025 – Oct 2025',
    type: 'Analytics',
    color: '#8b5cf6',
    points: [
      'Engineered LLM-powered data pipelines to process large-scale conversational datasets, surfacing actionable customer-interaction quality insights',
      'Automated reporting workflows via structured data transformations, delivering cross-functional business intelligence',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Bluestock',
    period: 'Aug 2025 – Sept 2025',
    type: 'Startup',
    color: '#06b6d4',
    points: [
      'Architected PostgreSQL database schemas, wrote optimized queries and executed data migrations for 3+ core application modules',
      'Implemented front-end features using HTML, CSS, and JavaScript, improving UI responsiveness across the platform',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.exp}`}>
      <div className={`orb orb-cyan ${styles.orb}`} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Work History</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Production-grade systems built across real-world roles</p>
        </motion.div>

        <div className={styles.timeline}>
          <div className="timeline-line" />
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className={styles.item}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="timeline-dot" style={{ boxShadow: `0 0 12px ${exp.color}99` }} />
              <motion.div
                className={`glass-card ${styles.card}`}
                whileHover={{ x: 6, borderColor: `${exp.color}44` }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.type} style={{ color: exp.color, background: `${exp.color}15`, borderColor: `${exp.color}30` }}>
                      {exp.type}
                    </span>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company}</p>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <ul className={styles.points}>
                  {exp.points.map((pt, j) => (
                    <li key={j}>
                      <span className={styles.bullet} style={{ background: exp.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
