'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTerminal } from 'react-icons/fa'
import Link from 'next/link'
import styles from './WelcomeScreen.module.css'

const commands = [
  { text: 'root@rks-system:~$ ./init-portfolio.sh', delay: 0.5 },
  { text: 'Booting core systems...', delay: 1.2 },
  { text: 'Loading UI components... [OK]', delay: 1.8 },
  { text: 'Establishing neural link... [OK]', delay: 2.3 },
  { text: 'Welcome, Guest. Access Granted.', delay: 2.9 }
]

export default function WelcomeScreen() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Reveal lines sequentially
    commands.forEach((cmd, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1)
      }, cmd.delay * 1000)
    })

    // Show button after sequence completes
    const totalTime = (commands[commands.length - 1].delay + 0.8) * 1000
    const timer = setTimeout(() => {
      setShowButton(true)
    }, totalTime)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className={styles.terminal}>
        <div className={styles.header}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#ff5f56' }} />
            <span className={styles.dot} style={{ background: '#ffbd2e' }} />
            <span className={styles.dot} style={{ background: '#27c93f' }} />
          </div>
          <span className={styles.title}>bash — 80x24</span>
        </div>
        
        <div className={styles.body}>
          <AnimatePresence>
            {commands.slice(0, visibleLines).map((cmd, i) => (
              <motion.div
                key={i}
                className={styles.line}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {cmd.text.startsWith('root') ? (
                  <>
                    <span className={styles.prompt}>root@rks-system:~$</span>{' '}
                    <span className={styles.command}>{cmd.text.replace('root@rks-system:~$ ', '')}</span>
                  </>
                ) : (
                  <span className={cmd.text.includes('Access Granted') ? styles.success : styles.output}>
                    {cmd.text}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {!showButton && visibleLines < commands.length && (
            <motion.span
              className={styles.cursor}
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              █
            </motion.span>
          )}

          {/* Personal Message and Button */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                className={styles.welcomeMessage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.divider} />
                <p>Hello! I'm Ritesh. Welcome to my digital workspace. Feel free to look around and explore the things I've built.</p>
                <Link href="/home" className={styles.exploreBtn}>
                   <FaTerminal /> Start Exploring
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  )
}
