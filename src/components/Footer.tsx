'use client'

import { motion, Variants } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaArrowUp } from 'react-icons/fa'
import { HiOutlineCode } from 'react-icons/hi'
import styles from './Footer.module.css'

const socials = [
  {
    iconType: 'github',
    label: 'GitHub',
    sub: '@kumarsinharitesh',
    href: 'https://github.com/kumarsinharitesh',
    color: '#c9d1d9',
  },
  {
    iconType: 'linkedin',
    label: 'LinkedIn',
    sub: 'kumarsinharitesh',
    href: 'https://www.linkedin.com/in/kumarsinharitesh',
    color: '#0a66c2',
  },
  {
    iconType: 'email',
    label: 'Email',
    sub: 'sinha.raju.rk@gmail.com',
    href: 'mailto:sinha.raju.rk@gmail.com',
    color: '#06b6d4',
  },
  {
    iconType: 'phone',
    label: 'Phone',
    sub: '+91 9835858465',
    href: 'tel:+919835858465',
    color: '#10b981',
  },
]

function SocialIcon({ type }: { type: string }) {
  const size = 20
  if (type === 'github')   return <FaGithub size={size} />
  if (type === 'linkedin') return <FaLinkedin size={size} />
  if (type === 'email')    return <FaEnvelope size={size} />
  if (type === 'phone')    return <FaPhone size={size} />
  return null
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer id="contact" className={styles.footer}>
      {/* Animated top glow bar */}
      <div className={styles.glowBar} />

      {/* Ambient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className="container">
        {/* ── CTA Hero Row ── */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.ctaLeft}>
            <span className={styles.ctaEyebrow}>
              <HiOutlineCode size={14} /> Open for opportunities
            </span>
            <h2 className={styles.ctaHeading}>
              Let&apos;s build something<br />
              <span className="gradient-text">remarkable.</span>
            </h2>
            <p className={styles.ctaSub}>
              Got a project, idea, or role in mind? I&apos;m one message away.
            </p>
          </div>
          <motion.a
            href="mailto:sinha.raju.rk@gmail.com"
            className={styles.ctaBtn}
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(6,182,212,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            <FaEnvelope size={16} />
            Say Hello
          </motion.a>
        </motion.div>

        {/* ── Divider ── */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDot} />
          <span className={styles.dividerLine} />
        </div>

        {/* ── Main Footer Grid ── */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div className={styles.brand} variants={itemVariants}>
            <div className={styles.logo}>
              <span style={{ color: 'var(--accent-cyan)' }}>{'{'}</span>
              <span>RKS</span>
              <span style={{ color: 'var(--accent-violet)' }}>{'}'}</span>
            </div>
            <div className={styles.brandMeta}>
              <span className={styles.codeTag}>&lt;/&gt;</span>
              <span className={styles.brandName}>Ritesh Kumar Sinha</span>
            </div>
            <p className={styles.tagline}>
              I turn ideas into production-ready code —<br />
              one commit at a time.
            </p>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              Available for SDE roles
            </div>
          </motion.div>

          {/* Contact / Social Cards */}
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={styles.socialCard}
              variants={itemVariants}
              whileHover={{
                y: -6,
                borderColor: `${s.color}66`,
                boxShadow: `0 12px 40px ${s.color}22`,
              }}
              style={{ '--card-color': s.color } as React.CSSProperties}
            >
              <div
                className={styles.cardIcon}
                style={{
                  color: s.color,
                  background: `${s.color}18`,
                  borderColor: `${s.color}30`,
                }}
              >
                <SocialIcon type={s.iconType} />
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardLabel}>{s.label}</span>
                <span className={styles.cardSub}>{s.sub}</span>
              </div>
              <div
                className={styles.cardGlow}
                style={{
                  background: `radial-gradient(circle at bottom left, ${s.color}20, transparent 70%)`,
                }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* ── Bottom Bar ── */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Ritesh Kumar Sinha
          </p>
          <motion.button
            className={styles.topBtn}
            onClick={scrollTop}
            whileHover={{ scale: 1.12, borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back to top"
          >
            <FaArrowUp size={13} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
