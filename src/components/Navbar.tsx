'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
]

const LogoSVG = () => (
  <svg width="52" height="32" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="RKS Logo">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    {/* Left brace */}
    <path d="M10 4 C6 4 4 6 4 10 L4 14 C4 17 2 18 0 18 C2 18 4 19 4 22 L4 26 C4 30 6 32 10 32" stroke="url(#lg1)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    {/* RKS text */}
    <text x="13" y="23" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="14" fill="#e2e8f0">RKS</text>
    {/* Right brace */}
    <path d="M42 4 C46 4 48 6 48 10 L48 14 C48 17 50 18 52 18 C50 18 48 19 48 22 L48 26 C48 30 46 32 42 32" stroke="url(#lg1)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { threshold: 0.25 }
    )
    document.querySelectorAll('section[id], footer[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div className={styles.progressBar} style={{ scaleX }} />

      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.inner}>
          <motion.a
            href="#home"
            className={styles.logo}
            onClick={e => { e.preventDefault(); handleNavClick('#home') }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to top"
          >
            <LogoSVG />
          </motion.a>

          {/* Desktop Links */}
          <ul className={styles.links}>
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <a
                  href={link.href}
                  className={`${styles.link} ${active === link.href.slice(1) ? styles.linkActive : ''}`}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                >
                  {link.label}
                  {active === link.href.slice(1) && (
                    <motion.span className={styles.linkDot} layoutId="navDot" />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>


          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                    className={active === link.href.slice(1) ? styles.mobileActive : ''}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
