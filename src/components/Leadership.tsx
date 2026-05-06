'use client'

import { motion } from 'framer-motion'
import { FaMicrophone, FaCode, FaUsers, FaAward, FaCheckCircle } from 'react-icons/fa'
import styles from './Leadership.module.css'

const roles = [
  {
    title: 'Ex AIML Co-lead',
    org: 'Google Developer Groups (GDG)',
    period: '2024 – Present',
    icon: <FaMicrophone />,
    color: '#06b6d4',
    desc: 'Led AI/ML sessions, content design, and technical community events on campus',
  },
  {
    title: 'Core Member',
    org: 'Hackhound',
    period: '2024 – Present',
    icon: <FaCode />,
    color: '#8b5cf6',
    desc: 'Guided DSA practice and competitive programming for club members, organizing coding challenges',
  },
  {
    title: 'Organizing Secretary',
    org: 'NSS – National Service Scheme',
    period: '2023 – 2025',
    icon: <FaUsers />,
    color: '#10b981',
    desc: 'Managed planning and logistics for large-scale campus outreach events',
  },
]

const certs = [
  { name: 'Oracle Cloud Infrastructure 2025', sub: 'AI Foundations Associate', color: '#f59e0b', icon: '☁️' },
  { name: 'HTML5, CSS3 & JavaScript', sub: 'Infosys Springboard', color: '#06b6d4', icon: '🌐' },
  { name: 'Python (Basic)', sub: 'HackerRank', color: '#10b981', icon: '🐍' },
]

const extras = ['Photography', 'Video Editing', 'UI/UX Design']

export default function Leadership() {
  return (
    <section id="leadership" className={`section ${styles.leadership}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Beyond Code</p>
          <h2 className="section-title">Leadership & Recognition</h2>
        </motion.div>

        <div className={styles.grid}>
          {/* Leadership Roles */}
          <div>
            <motion.h3
              className={styles.colTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaUsers style={{ color: 'var(--accent-cyan)' }} /> Positions of Responsibility
            </motion.h3>
            <div className={styles.rolesList}>
              {roles.map((r, i) => (
                <motion.div
                  key={r.title}
                  className={`glass-card ${styles.roleCard}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -4 }}
                  style={{ '--role-color': r.color } as React.CSSProperties}
                >
                  <div className={styles.roleIcon} style={{ color: r.color, background: `${r.color}15` }}>
                    {r.icon}
                  </div>
                  <div className={styles.roleInfo}>
                    <div className={styles.roleTop}>
                      <h4>{r.title}</h4>
                      <span className={styles.period}>{r.period}</span>
                    </div>
                    <p className={styles.roleOrg} style={{ color: r.color }}>{r.org}</p>
                    <p className={styles.roleDesc}>{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column: Certs + Extras */}
          <div className={styles.rightCol}>
            <motion.h3
              className={styles.colTitle}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaAward style={{ color: 'var(--accent-violet)' }} /> Certifications
            </motion.h3>
            <div className={styles.certsList}>
              {certs.map((c, i) => (
                <motion.div
                  key={c.name}
                  className={`glass-card ${styles.certCard}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, borderColor: `${c.color}40` }}
                >
                  <span className={styles.certEmoji}>{c.icon}</span>
                  <div>
                    <p className={styles.certName}>{c.name}</p>
                    <p className={styles.certSub}>{c.sub}</p>
                  </div>
                  <FaCheckCircle style={{ color: c.color, flexShrink: 0, marginLeft: 'auto' }} />
                </motion.div>
              ))}
            </div>

            <motion.h3
              className={`${styles.colTitle} ${styles.colTitleSm}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              ✦ Hobbies
            </motion.h3>
            <div className={styles.extras}>
              {extras.map((e, i) => (
                <motion.span
                  key={e}
                  className={styles.extraTag}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
