'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Skills.module.css'

const categories = ['All', 'Languages', 'Frontend', 'Backend', 'AI/ML', 'DevOps']

const skills = [
  { name: 'C++',            cat: 'Languages', icon: '⚙️',  color: '#06b6d4' },
  { name: 'JavaScript',     cat: 'Languages', icon: '🟨',  color: '#f7df1e' },
  { name: 'Python',         cat: 'Languages', icon: '🐍',  color: '#3776ab' },
  { name: 'Java',           cat: 'Languages', icon: '☕',  color: '#f89820' },
  { name: 'SQL',            cat: 'Languages', icon: '🗄️',  color: '#00a1e0' },
  { name: 'React.js',       cat: 'Frontend',  icon: '⚛️',  color: '#61dafb' },
  { name: 'Next.js 15',     cat: 'Frontend',  icon: '▲',   color: '#e2e8f0' },
  { name: 'HTML5',          cat: 'Frontend',  icon: '🌐',  color: '#e34f26' },
  { name: 'CSS3',           cat: 'Frontend',  icon: '🎨',  color: '#1572b6' },
  { name: 'Radix UI',       cat: 'Frontend',  icon: '🔘',  color: '#8b5cf6' },
  { name: 'Node.js',        cat: 'Backend',   icon: '🟢',  color: '#83cd29' },
  { name: 'Express.js',     cat: 'Backend',   icon: '🚂',  color: '#e2e8f0' },
  { name: 'tRPC',           cat: 'Backend',   icon: '🔗',  color: '#2596be' },
  { name: 'PostgreSQL',     cat: 'Backend',   icon: '🐘',  color: '#336791' },
  { name: 'MongoDB',        cat: 'Backend',   icon: '🍃',  color: '#4db33d' },
  { name: 'Prisma ORM',     cat: 'Backend',   icon: '🔷',  color: '#2d3748' },
  { name: 'pgvector',       cat: 'Backend',   icon: '📐',  color: '#06b6d4' },
  { name: 'TensorFlow',     cat: 'AI/ML',     icon: '🧠',  color: '#ff6f00' },
  { name: 'OpenAI API',     cat: 'AI/ML',     icon: '🤖',  color: '#10a37f' },
  { name: 'Gemini AI',      cat: 'AI/ML',     icon: '✨',  color: '#8b5cf6' },
  { name: 'AssemblyAI',     cat: 'AI/ML',     icon: '🎙️',  color: '#f43f5e' },
  { name: 'Mediapipe',      cat: 'AI/ML',     icon: '👁️',  color: '#06b6d4' },
  { name: 'Docker',         cat: 'DevOps',    icon: '🐳',  color: '#2496ed' },
  { name: 'GitHub Actions', cat: 'DevOps',    icon: '⚡',  color: '#e2e8f0' },
  { name: 'Vercel',         cat: 'DevOps',    icon: '▲',   color: '#e2e8f0' },
  { name: 'Supabase',       cat: 'DevOps',    icon: '⚡',  color: '#3ecf8e' },
  { name: 'Firebase',       cat: 'DevOps',    icon: '🔥',  color: '#ffca28' },
]

function SkillPill({ skill }: { skill: typeof skills[0] }) {
  return (
    <div
      className={styles.pill}
      style={{ '--skill-color': skill.color } as React.CSSProperties}
    >
      <span className={styles.icon}>{skill.icon}</span>
      <span className={styles.name}>{skill.name}</span>
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? skills : skills.filter(s => s.cat === active)

  // Duplicate for seamless infinite loop — need at least ~20 items for smooth loop
  const loopCount = Math.ceil(40 / filtered.length)
  const track = Array.from({ length: loopCount }, () => filtered).flat()

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className={`orb orb-violet ${styles.orb}`} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Tech Arsenal</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">From systems to AI — my full technology stack</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Ticker — full width, outside container for edge-to-edge effect */}
      <div className={styles.tickerWrapper}>
        {/* Fade masks on edges */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div
          className={styles.ticker}
          key={active} /* re-mount on filter change to reset animation */
          style={{ animationDuration: `${filtered.length * 3.5}s` }}
        >
          {/* Render double for seamless loop */}
          {[...track, ...track].map((skill, i) => (
            <SkillPill key={`${skill.name}-${i}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
