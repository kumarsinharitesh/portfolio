'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Projects.module.css'

const projects = [
  {
    title: 'DevSync AI',
    label: 'Featured',
    description: 'Full-stack AI developer platform unifying code intelligence, meeting transcription, and automated docs. Integrated 3 LLM providers via a modular T3 stack with rate-limit-aware GitHub repo ingestion.',
    highlight: '60% effort reduction in code capture via pgvector semantic search',
    tags: ['Next.js 15', 'tRPC', 'PostgreSQL', 'pgvector', 'OpenAI', 'Gemini', 'AssemblyAI'],
    github: 'https://github.com/kumarsinharitesh',
    live: 'https://devsynchub.vercel.app',
    color: '#06b6d4',
    featured: true,
  },
  {
    title: 'Market Pulse',
    label: 'AI/ML',
    description: 'Real-time AI-powered stock prediction and sentiment analysis platform. Delivers 7-day price forecasts via Linear Regression, NLP-based sentiment scoring from live news, and smart Buy/Hold/Sell recommendations.',
    highlight: '7-day AI stock forecasts with Buy/Hold/Sell signals',
    tags: ['Next.js', 'FastAPI', 'Python', 'scikit-learn', 'TextBlob', 'yfinance', 'Recharts'],
    github: 'https://github.com/kumarsinharitesh/Market-Pulse',
    color: '#22c55e',
    featured: false,
  },
  {
    title: 'NexusFlow',
    label: 'Full-Stack',
    description: 'Visual pipeline orchestrator inspired by Zapier & Make. Drag-and-drop node canvas with Kahn\'s algorithm for cycle detection, mock API execution engine, and Zustand-powered state management — all natively in the browser.',
    highlight: 'Topological cycle validation with real-time pipeline simulation',
    tags: ['Next.js', 'React Flow', 'Zustand', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/kumarsinharitesh/NexusFlow',
    color: '#a855f7',
    featured: false,
  },
  {
    title: 'Inferprompt',
    label: 'Developer Tool',
    description: 'Browser-based LLM inference playground with real-time token streaming, audio input via MediaRecorder API, side-by-side model diff using custom ABTD algorithm, and analytics dashboard. Supports 5 providers: Sarvam AI, OpenRouter, Gemini, Groq, and Mock.',
    highlight: 'Real-time token streaming with ABTD diff across 5 LLM providers',
    tags: ['React 19', 'TypeScript', 'Vite', 'Recharts', 'Web Speech API', 'Tailwind CSS'],
    github: 'https://github.com/kumarsinharitesh/Inferprompt',
    live: 'https://inferprompt.vercel.app',
    color: '#f97316',
    featured: false,
  },
  {
    title: 'Netflix UI Clone',
    label: 'Frontend',
    description: 'Pixel-perfect responsive Netflix UI clone replicating the navigation bar, hero section, and horizontal scrolling movie card rows. Built entirely with vanilla HTML, CSS animations, and JavaScript interactivity.',
    highlight: 'Responsive design with horizontal scroll & CSS animations',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/kumarsinharitesh/Netflix-UI-Clone',
    color: '#ef4444',
    featured: false,
  },
  {
    title: 'Mood-Based Music System',
    label: 'AI/ML',
    description: 'TensorFlow CNN classifying 7 mood states at >85% accuracy. Gesture-controlled Spotify playback via Mediapipe at <30ms latency — hands-free music experience.',
    highlight: '>85% mood classification accuracy',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Mediapipe', 'Spotify API'],
    github: 'https://github.com/kumarsinharitesh',
    color: '#8b5cf6',
    featured: false,
  },
  {
    title: 'Friday – Personal AI Assistant',
    label: 'Automation',
    description: 'Voice-first personal assistant with 10+ automation workflows (search, reminders, system commands). Achieved >90% NLP intent accuracy and sub-2s voice-to-action latency via multi-API integration.',
    highlight: '>90% NLP intent accuracy, <2s latency',
    tags: ['Python', 'NLP', 'Speech Recognition', 'Automation'],
    github: 'https://github.com/kumarsinharitesh',
    color: '#10b981',
    featured: false,
  },
  {
    title: 'Banking Application',
    label: 'Java / JDBC',
    description: 'CLI-based banking system "Bank of Java" built with Java and JDBC connected to MySQL. Features account creation with authentication, balance operations, peer-to-peer money transfers with validation, and full transaction history logging.',
    highlight: 'Full JDBC banking with auto DB setup & transaction audit trail',
    tags: ['Java', 'JDBC', 'MySQL', 'CLI'],
    github: 'https://github.com/kumarsinharitesh/Banking-Application',
    color: '#f59e0b',
    featured: false,
  },
  {
    title: 'Library Management System',
    label: 'Full-Stack',
    description: 'End-to-end Library Management System with book issuance, returns, and admin panel. Built with Python and MySQL for reliable record management.',
    highlight: 'Complete CRUD with admin panel',
    tags: ['Python', 'MySQL', 'CLI'],
    github: 'https://github.com/kumarsinharitesh/Library-Management-System',
    color: '#06b6d4',
    featured: false,
  },
]

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.35, ease: 'easeOut' },
  }),
}

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next: number) => {
    setDir(next > current ? 1 : -1)
    setCurrent(next)
  }, [current])

  const prev = () => go(current === 0 ? projects.length - 1 : current - 1)
  const next = () => go(current === projects.length - 1 ? 0 : current + 1)

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => {
        const nextIdx = c === projects.length - 1 ? 0 : c + 1
        setDir(1)
        return nextIdx
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const proj = projects[current]

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="bg-grid" style={{ opacity: 0.4 }} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">From AI platforms to gesture-controlled music — here's what I ship</p>
        </motion.div>

        <div className={styles.carousel}>
          {/* Nav Arrows */}
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous project">
            <FaChevronLeft size={18} />
          </button>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next project">
            <FaChevronRight size={18} />
          </button>

          {/* Card Track */}
          <div className={styles.track}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.article
                key={current}
                className={styles.card}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ '--card-color': proj.color } as React.CSSProperties}
              >
                {/* Top accent */}
                <div className={styles.topLine} style={{ background: `linear-gradient(90deg, ${proj.color}, transparent)` }} />

                {/* Corner glow */}
                <div className={styles.cornerGlow} style={{ background: `radial-gradient(circle at top right, ${proj.color}25, transparent 60%)` }} />

                <div className={styles.header}>
                  <div className={styles.labelRow}>
                    <span className={styles.label} style={{ color: proj.color, background: `${proj.color}15`, borderColor: `${proj.color}30` }}>
                      {proj.label}
                    </span>
                  </div>
                  <div className={styles.links}>
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`${proj.title} GitHub`}>
                      <FaGithub size={20} />
                    </a>
                    {proj.live && (
                      <a href={proj.live} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`${proj.title} Live`}>
                        <FaExternalLinkAlt size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className={styles.title}>{proj.title}</h3>
                <p className={styles.desc}>{proj.description}</p>

                <div className={styles.highlight} style={{ borderColor: `${proj.color}40`, background: `${proj.color}08` }}>
                  <span style={{ color: proj.color }}>⚡</span> {proj.highlight}
                </div>

                <div className={styles.tags}>
                  {proj.tags.map(tag => (
                    <span key={tag} className="tag" style={{ borderColor: `${proj.color}30`, color: proj.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className={styles.dots}>
            {projects.map((p, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => go(i)}
                aria-label={`Go to project ${i + 1}`}
                style={i === current ? { background: proj.color, boxShadow: `0 0 10px ${proj.color}80` } : {}}
              />
            ))}
          </div>

          {/* Progress counter */}
          <p className={styles.counter}>
            <span style={{ color: proj.color }}>{String(current + 1).padStart(2, '0')}</span>
            <span className={styles.sep}>/</span>
            {String(projects.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  )
}
