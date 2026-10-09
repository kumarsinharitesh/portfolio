'use client'

import { motion } from 'framer-motion'
import { FiArrowUpRight, FiAward, FiBriefcase, FiCode, FiUsers } from 'react-icons/fi'
import styles from './About.module.css'

const snapshot = [
  { value: '04', label: 'Internships', Icon: FiBriefcase },
  { value: '09', label: 'Projects built', Icon: FiCode },
  { value: '03', label: 'Leadership roles', Icon: FiUsers },
  { value: '06', label: 'Credentials', Icon: FiAward },
]

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label">01 / Profile</p>
          <h2 className="section-title">Building with<br />purpose.</h2>
        </motion.div>
        <div className={styles.grid}>
          <motion.div className={styles.copy} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p>I&apos;m Ritesh Kumar Sinha, a software developer interested in the space where AI, full-stack engineering, and useful developer tools meet.</p>
            <p>I enjoy taking an idea from the first sketch to a dependable product: shaping clear interfaces, designing practical data flows, and making the details feel considered.</p>
            <a href="#projects" onClick={(event) => { event.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore selected work <FiArrowUpRight /></a>
          </motion.div>
          <motion.aside className={`${styles.rightRail} profile-rail`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .12 }}>
            <div className={styles.snapshot} aria-label="Developer snapshot">
              {snapshot.map(({ value, label, Icon }, index) => <article key={label} className={styles.metric}>
                <span className={styles.metricIcon}><Icon /></span>
                <strong>{value}</strong>
                <p>{label}</p>
                <i>0{index + 1}</i>
              </article>)}
            </div>
            <div className={styles.education}>
              <span>EDUCATION</span>
              <h3>SRM Institute of Science and Technology</h3>
              <p>2023 - 2027</p>
              <small>Academic and community work alongside software development, AI, and full-stack learning.</small>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
