'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-theme')
    const useDark = saved === 'dark'
    document.documentElement.dataset.theme = useDark ? 'dark' : 'light'
    const sync = window.setTimeout(() => setDark(useDark), 0)
    return () => window.clearTimeout(sync)
  }, [])

  const toggleTheme = () => {
    setDark((current) => {
      const next = !current
      document.documentElement.dataset.theme = next ? 'dark' : 'light'
      window.localStorage.setItem('portfolio-theme', next ? 'dark' : 'light')
      return next
    })
  }

  const navigate = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <motion.nav className={styles.nav} initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} aria-label="Primary navigation">
        <a href="#home" className={styles.brand} onClick={(event) => { event.preventDefault(); navigate('#home') }}>
          RKS<span>&reg;</span>
        </a>
        <div className={styles.desktopLinks}>
          {navLinks.map((link) => <a key={link.href} href={link.href} onClick={(event) => { event.preventDefault(); navigate(link.href) }}>{link.label}</a>)}
        </div>
        <button className={styles.themeButton} onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title="Toggle colour theme">{dark ? <FiSun /> : <FiMoon />}</button>
        <a className={styles.contact} href="mailto:sinha.raju.rk@gmail.com">Let&apos;s talk <FiArrowUpRight aria-hidden="true" /></a>
        <button className={styles.menuButton} onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <FiX /> : <FiMenu />}</button>
      </motion.nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className={styles.mobileMenu} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={(event) => { event.preventDefault(); navigate(link.href) }}>{link.label}</a>)}
            <a href="mailto:sinha.raju.rk@gmail.com">Let&apos;s talk <FiArrowUpRight aria-hidden="true" /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
