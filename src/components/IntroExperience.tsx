'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowUpRight } from 'react-icons/fi'
import styles from './IntroExperience.module.css'

const fragments = ['const orbit = true;', 'await explore();', 'git push universe', '</build>', '01  01  10', 'system://ready']

export default function IntroExperience() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const scene = useRef<HTMLDivElement>(null)
  const orbitShift = useRef(0)
  const orbitAngle = useRef(0)
  const settleTimer = useRef<number | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const parallax = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const x = (event.clientX / window.innerWidth - .5) * 2
    const y = (event.clientY / window.innerHeight - .5) * 2
    scene.current?.style.setProperty('--px', `${x * 10}px`)
    scene.current?.style.setProperty('--py', `${y * 8}px`)
  }

  const enter = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => router.push('/home'), 620)
  }

  const rollOrbit = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    orbitShift.current = Math.max(-80, Math.min(80, orbitShift.current + event.deltaY * .1))
    orbitAngle.current += event.deltaY * .12
    scene.current?.style.setProperty('--orbit-shift', `${orbitShift.current}px`)
    scene.current?.style.setProperty('--orbit-angle', `${orbitAngle.current}deg`)
    if (settleTimer.current) window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      orbitShift.current = 0
      scene.current?.style.setProperty('--orbit-shift', '0px')
    }, 380)
  }

  return <main ref={scene} className={`${styles.scene} intro-scene ${ready ? 'intro-ready' : ''} ${leaving ? styles.leaving : ''}`} onPointerMove={parallax} onWheel={rollOrbit}>
    <div className={styles.stars} aria-hidden="true" />
    <div className={styles.grain} aria-hidden="true" />
    <div className={`${styles.orbit} intro-orbit`} aria-hidden="true"><span className="orbit-probe" /></div>
    <div className={`${styles.earth} intro-earth`} aria-hidden="true"><i /><b /></div>
    <div className={styles.fragments} aria-hidden="true">{fragments.map((fragment, index) => <span key={fragment} style={{ '--i': index } as React.CSSProperties}>{fragment}</span>)}</div>
    <section className={styles.content}>
      <p className={styles.kicker}>RKS / ORBITAL WORKSPACE</p>
      <div className={styles.status}><span /> {ready ? 'SYSTEM READY' : 'INITIALIZING ENVIRONMENT...'}</div>
      <p className="intro-welcome">Welcome. You are entering Ritesh&apos;s digital orbit.</p>
      <h1 className="intro-heading">ENTER THE<br /><em>DEVELOPER UNIVERSE</em></h1>
      <p className={`${styles.console} intro-console`}>&gt; {ready ? 'Portfolio coordinates acquired' : 'Establishing uplink'}<b /></p>
      <div className={`${styles.actions} intro-actions`}>
        <button className={styles.explore} onClick={enter} disabled={leaving}>Explore my universe <FiArrowUpRight /></button>
      </div>
    </section>
    <div className={styles.flash} aria-hidden="true" />
  </main>
}
