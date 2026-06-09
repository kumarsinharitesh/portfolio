'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaArrowDown, FaTerminal } from 'react-icons/fa'
import { HiOutlineCode } from 'react-icons/hi'
import Image from 'next/image'
import styles from './Hero.module.css'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        duration: Math.random() * 18 + 12,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    )
  }, [])

  return (
    <section id="home" className={styles.hero}>
      {/* Background */}
      <div className="bg-grid" />
      <div className={`orb orb-cyan ${styles.orb1}`} />
      <div className={`orb orb-violet ${styles.orb2}`} />

      {/* Particles */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        {/* Left: Text */}
        <div className={styles.left}>
          {/* Terminal badge */}
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaTerminal size={11} color="var(--accent-cyan)" />
            <span>Open to Work & Open Source Contributions</span>
          </motion.div>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Ritesh Kumar<br />
            <span className="gradient-text">Sinha</span>
          </motion.h1>

          {/* Role text */}
          <motion.div
            className={styles.roleRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <HiOutlineCode className={styles.codeIcon} />
            <span className={styles.role} style={{ fontSize: '1.05rem', opacity: 0.9 }}>
              Tech Enthusiast |ET AI Hackathon Sem-Finalist | Aspiring Full Stack Engineer | Continuous Learning | AI/ML Enthusiast
            </span>
          </motion.div>

          <motion.p
            className={styles.bio}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            I turn ideas into production-ready code — from LLM-powered platforms
            to real-time systems and scalable backends. I contribute to open source,
            ship fast, and never stop learning.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View Projects
            </a>
            <a href="mailto:sinha.raju.rk@gmail.com" className="btn-outline">
              Contact Me
            </a>
          </motion.div>

          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="https://github.com/kumarsinharitesh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              whileHover={{ scale: 1.15, color: '#fff' }}
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kumarsinharitesh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              whileHover={{ scale: 1.15, color: '#0a66c2' }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Profile Photo */}
        <motion.div
          className={styles.photoWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <div className={styles.photoRing}>
            <div className={styles.photoInner}>
              <div className={styles.photoFrame}>
                <Image
                  src="/rks-photo.jpg"
                  alt="Ritesh Kumar Sinha"
                  width={260}
                  height={260}
                  className={styles.photo}
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #06b6d4, #8b5cf6)'
                      parent.innerHTML = '<span style="font-size:4rem;display:flex;align-items:center;justify-content:center;height:100%;color:white;font-family:monospace;font-weight:800">RKS</span>'
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {/* Floating code snippets */}
          <motion.div
            className={`${styles.floatChip} ${styles.chipLeft}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Next.js 15</span>
          </motion.div>
          <motion.div
            className={`${styles.floatChip} ${styles.chipRight}`}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span style={{ color: 'var(--accent-violet)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>AI Builder</span>
          </motion.div>
          <motion.div
            className={`${styles.floatChip} ${styles.chipBottom}`}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <span style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>GDG AI/ML Lead</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Arrow */}
      <motion.button
        className={styles.scrollBtn}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <FaArrowDown size={16} />
      </motion.button>
    </section>
  )
}
