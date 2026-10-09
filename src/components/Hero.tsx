'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiArrowDownRight, FiArrowUpRight, FiCode } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from './Hero.module.css'

const introOne = "I'm Ritesh Kumar Sinha, a software developer building thoughtful digital experiences, AI powered applications, and tools that make complex workflows simpler."
const introTwo = 'From full stack engineering to LLM powered products, I enjoy turning ideas into practical, reliable software.'
const reveal = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const timing = { ease: [0.22, 1, 0.36, 1] as const }

function Typewriter({ text, delay }: { text: string; delay: number }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    let index = 0
    let interval: number | undefined
    const start = window.setTimeout(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(text)
        return
      }
      interval = window.setInterval(() => {
        index += 2
        setValue(text.slice(0, index))
        if (index >= text.length && interval) window.clearInterval(interval)
      }, 13)
    }, delay)
    return () => {
      window.clearTimeout(start)
      if (interval) window.clearInterval(interval)
    }
  }, [delay, text])

  return <p aria-label={text}><span aria-hidden="true">{value}</span></p>
}

function magneticMove(event: React.PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7
  event.currentTarget.style.transform = `translate(${x}px, ${y}px)`
}

function resetMagnet(event: React.PointerEvent<HTMLAnchorElement>) {
  event.currentTarget.style.transform = ''
}

export default function Hero() {
  const scrollTo = (selector: string) => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  const revealColour = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.pointerType !== 'mouse' && event.pointerType !== 'touch') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty('--spot-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
    event.currentTarget.style.setProperty('--spot-opacity', '1')
    event.currentTarget.classList.add('portrait-active')
  }
  const hideColour = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--spot-opacity', '0')
    event.currentTarget.classList.remove('portrait-active')
  }

  return (
    <section id="home" className={`${styles.hero} portfolio-hero`}>
      <div className={styles.topRule} />
      <div className={styles.heroInner}>
        <motion.p className={styles.eyebrow} variants={reveal} initial="hidden" animate="visible" transition={{ ...timing, duration: 0.55, delay: 0.1 }}><span /> SOFTWARE DEVELOPER &middot; INDIA</motion.p>
        <div className={`${styles.heroStage} hero-stage`}>
          <motion.div className={`${styles.intro} hero-intro`} variants={reveal} initial="hidden" animate="visible" transition={{ ...timing, duration: 0.5, delay: 0.18 }}>
            <Typewriter text={introOne} delay={360} />
            <Typewriter text={introTwo} delay={1280} />
            <span className={styles.devNote}><FiCode /> BUILD / SHIP / ITERATE</span>
          </motion.div>
          <motion.h1 className={`${styles.title} hero-name`} aria-label="Ritesh Kumar Sinha" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...timing, duration: 0.8, delay: 0.12 }}>
            <span className={`${styles.outline} hero-name-outline`}>RITESH</span><span className={styles.solid}>KUMAR</span><span className={`${styles.outline} hero-name-outline`}>SINHA</span>
          </motion.h1>
          <motion.div className={`${styles.portrait} hero-portrait`} initial={{ opacity: 0, y: 32, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...timing, duration: 0.9, delay: 0.32 }} onPointerDown={revealColour} onPointerMove={revealColour} onPointerLeave={hideColour} onPointerUp={hideColour}>
            <Image className={styles.portraitBase} src="/ritesh-portrait.png" alt="Ritesh Kumar Sinha" fill priority sizes="(max-width: 760px) 92vw, (max-width: 1100px) 40vw, 540px" />
            <div className={styles.portraitColourLayer} aria-hidden="true"><Image className={styles.portraitColour} src="/ritesh-portrait.png" alt="" fill sizes="(max-width: 760px) 92vw, (max-width: 1100px) 40vw, 540px" /></div>
          </motion.div>
        </div>
        <motion.div className={styles.footerRow} variants={reveal} initial="hidden" animate="visible" transition={{ ...timing, duration: 0.55, delay: 0.6 }}>
          <div className={styles.availability}><span /> Available for opportunities</div>
          <div className={styles.actions}>
            <a href="#projects" onPointerMove={magneticMove} onPointerLeave={resetMagnet} onClick={(event) => { event.preventDefault(); scrollTo('#projects') }}>Selected work <FiArrowUpRight /></a>
            <a href="mailto:sinha.raju.rk@gmail.com" onPointerMove={magneticMove} onPointerLeave={resetMagnet}>Get in touch <FiArrowUpRight /></a>
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/kumarsinharitesh" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/kumarsinharitesh" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#about" onClick={(event) => { event.preventDefault(); scrollTo('#about') }} aria-label="Scroll to about"><FiArrowDownRight /></a>
          </div>
        </motion.div>
      </div>
      <div className={styles.marquee} aria-label="Areas of focus"><div className={styles.marqueeTrack}><span>AI ENGINEERING <b>&middot;</b> FULL-STACK DEVELOPMENT <b>&middot;</b> DEVELOPER TOOLS <b>&middot;</b></span><span aria-hidden="true">AI ENGINEERING <b>&middot;</b> FULL-STACK DEVELOPMENT <b>&middot;</b> DEVELOPER TOOLS <b>&middot;</b></span></div></div>
    </section>
  )
}
