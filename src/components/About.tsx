'use client'

import { motion, type Variants } from 'framer-motion'
import { FaUniversity, FaTrophy, FaBriefcase, FaCode, FaRocket, FaGithub } from 'react-icons/fa'
import styles from './About.module.css'

const stats = [
  { icon: <FaGithub />, value: '2+', label: 'Featured', color: '#f59e0b' },
  { icon: <FaBriefcase />, value: '4', label: 'Internships', color: 'var(--accent-cyan)' },
  { icon: <FaCode />, value: '8+', label: 'Key Projects', color: 'var(--accent-violet)' },
  { icon: <FaRocket />, value: '2', label: 'Leadership Roles', color: 'var(--accent-emerald)' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`orb orb-violet ${styles.orb}`} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Who I Am</p>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className={styles.grid}>
          {/* Bio Card */}
          <motion.div
            className={`glass-card ${styles.bioCard}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.bioText}>
              I'm an aspiring <span className={styles.highlight}>Software Development Engineer (SDE)</span> with a strong passion for building scalable, high-performance applications. My expertise lies at the intersection of full-stack engineering and system architecture, ensuring solutions are robust, fast, and maintainable.
            </p>
            <p className={styles.bioText}>
              I possess a strong <strong>open-source contributor mindset</strong> — I believe in building in public, collaborating with developer communities, and writing clean, documented code. I'm actively <strong>open for work</strong> and looking for opportunities to contribute to impactful products while growing alongside a dynamic engineering team.
            </p>
          </motion.div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className={`glass-card ${styles.statCard}`}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, boxShadow: `0 12px 40px ${s.color}22` }}
              >
                <div className={styles.statIcon} style={{ color: s.color, background: `${s.color}15` }}>
                  {s.icon}
                </div>
                <span className={styles.statValue} style={{ color: s.color }}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
