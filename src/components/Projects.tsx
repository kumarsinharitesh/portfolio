'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import styles from './Projects.module.css'

const projects = [
  { title: 'DevSync AI', label: 'Featured', description: 'Full-stack AI developer platform for code intelligence, meeting transcription, and automated documentation.', tags: ['Next.js 15', 'tRPC', 'PostgreSQL', 'pgvector', 'OpenAI'], github: 'https://github.com/kumarsinharitesh', live: 'https://devsynchub.vercel.app', image: '/proj-devsync.png' },
  { title: 'Market Pulse', label: 'AI / ML', description: 'Real-time stock prediction and sentiment analysis platform with forecasts and decision signals.', tags: ['Next.js', 'FastAPI', 'Python', 'scikit-learn'], github: 'https://github.com/kumarsinharitesh/Market-Pulse', image: '/proj-marketpulse.jpg' },
  { title: 'NexusFlow', label: 'Full-stack', description: 'A visual pipeline orchestrator with in-browser execution and cycle detection.', tags: ['Next.js', 'React Flow', 'Zustand', 'TypeScript'], github: 'https://github.com/kumarsinharitesh/NexusFlow', image: '/proj-nexusflow.jpg' },
  { title: 'Inferprompt', label: 'Developer tool', description: 'Browser-based LLM inference playground with token streaming and model comparison.', tags: ['React', 'TypeScript', 'Vite', 'Web Speech API'], github: 'https://github.com/kumarsinharitesh/Inferprompt', live: 'https://inferprompt.vercel.app', image: '/proj-inferprompt.jpg' },
  { title: 'Netflix UI Clone', label: 'Frontend', description: 'Responsive streaming interface study built with vanilla web technologies.', tags: ['HTML5', 'CSS3', 'JavaScript'], github: 'https://github.com/kumarsinharitesh/Netflix-UI-Clone', image: '/proj-netflix.jpg' },
  { title: 'Mood-Based Music System', label: 'AI / ML', description: 'Mood classification and gesture-controlled music playback experiment.', tags: ['Python', 'TensorFlow', 'OpenCV', 'Mediapipe'], github: 'https://github.com/kumarsinharitesh', image: '/proj-mood.jpg' },
  { title: 'Friday — Personal AI Assistant', label: 'Automation', description: 'Voice-first personal assistant with automation workflows and NLP intent handling.', tags: ['Python', 'NLP', 'Speech Recognition'], github: 'https://github.com/kumarsinharitesh', image: '/proj-friday.jpg' },
  { title: 'Banking Application', label: 'Java / JDBC', description: 'Java and JDBC banking system with authentication, transactions, and audit history.', tags: ['Java', 'JDBC', 'MySQL'], github: 'https://github.com/kumarsinharitesh/Banking-Application', image: '/proj-banking.jpg' },
  { title: 'Library Management System', label: 'Full-stack', description: 'Record-management application for books, issue flows, returns, and administration.', tags: ['Python', 'MySQL', 'CLI'], github: 'https://github.com/kumarsinharitesh/Library-Management-System', image: '/proj-library.jpg' },
]

export default function Projects() {
  const [activeSlide, setActiveSlide] = useState(0)
  const reel = projects

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % reel.length), 4600)
    return () => window.clearInterval(timer)
  }, [reel.length])

  const currentSlide = reel[activeSlide]

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
          <p className="section-label">02 / Selected work</p>
          <h2 className="section-title">Things I&apos;ve<br />built.</h2>
          <p className="section-subtitle">A selection of AI experiments, developer tools, and full-stack applications.</p>
        </motion.div>
        <div className={`${styles.reel} project-reel`} aria-label="Featured project slideshow">
          <a className={`${styles.reelVisual} project-reel-visual`} href={currentSlide.live || currentSlide.github} target="_blank" rel="noreferrer" aria-label={`Open ${currentSlide.title}`}>
            <Image key={currentSlide.image} src={currentSlide.image} alt={`${currentSlide.title} preview`} fill sizes="(max-width: 720px) 100vw, 70vw" />
            <span className={styles.reelGrid} aria-hidden="true" />
          </a>
          <div className={styles.reelInfo}>
            <p>Featured project / {String(activeSlide + 1).padStart(2, '0')}</p>
            <h3>{currentSlide.title}</h3>
            <span>{currentSlide.description}</span>
            <div className={`${styles.reelControls} project-reel-controls`}>{reel.map((project, index) => <button key={project.title} onClick={() => setActiveSlide(index)} aria-label={`Show ${project.title}`} aria-current={index === activeSlide} />)}</div>
          </div>
        </div>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.article key={project.title} className={`${styles.card} project-card ${index === 0 ? styles.featured : ''}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: (index % 2) * 0.07 }}>
              <a className={`${styles.preview} project-preview ${index === 0 ? 'devsync-preview' : ''}`} href={project.live || project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 720px) 100vw, 50vw" />
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.codeMark} aria-hidden="true">&lt;/&gt;</span>
                <span className={styles.openPreview}>View project <FiArrowUpRight /></span>
              </a>
              <div className={`${styles.info} project-info`}>
                <div className={`${styles.cardMeta} card-meta`}><p className={styles.category}>{project.label}</p><span>MODULE_{String(index + 1).padStart(2, '0')}</span></div>
                <div className={styles.titleRow}><h3>{project.title}</h3><div><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}><FaGithub /></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><FiArrowUpRight /></a>}</div></div>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
