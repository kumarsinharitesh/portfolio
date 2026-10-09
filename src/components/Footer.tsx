'use client'

import { FormEvent, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import styles from './Footer.module.css'

export default function Footer() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Unable to send your message.')
      setStatus('sent')
      setMessage('Thanks - your message has been sent.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={styles.contactGrid}>
          <div className={styles.cta}>
            <p className={styles.eyebrow}>06 / Contact</p>
            <h2>Let&apos;s make<br /><span>something useful.</span></h2>
            <p>I&apos;m open to conversations about software, AI, and thoughtful product work.</p>
            <a href="mailto:sinha.raju.rk@gmail.com">sinha.raju.rk@gmail.com <FiArrowUpRight /></a>
          </div>

          <form className={styles.form} onSubmit={submit}>
            <p className={styles.formLabel}>Send a message</p>
            <label>Name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required maxLength={150} placeholder="you@example.com" /></label>
            <label>Message<textarea name="message" required maxLength={3000} placeholder="Tell me about your project or opportunity." /></label>
            <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send message'} <FiArrowUpRight /></button>
            {message && <p className={`${styles.formStatus} ${status === 'error' ? styles.error : ''}`} role="status">{message}</p>}
          </form>
        </div>
        <div className={styles.bottom}>
          <p>Ritesh Kumar Sinha</p>
          <div>
            <a href="https://github.com/kumarsinharitesh" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/kumarsinharitesh" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button>
        </div>
      </div>
    </footer>
  )
}
