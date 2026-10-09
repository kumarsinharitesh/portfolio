import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please submit a valid message.' }, { status: 400 })
  }

  const safeName = clean(body.name)
  const safeEmail = clean(body.email)
  const safeMessage = clean(body.message)
  const honeypot = clean(body.website)

  if (honeypot || !safeName || !safeEmail || !safeMessage || safeName.length > 100 || safeEmail.length > 150 || safeMessage.length > 3000) {
    return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  const recipient = process.env.CONTACT_TO_EMAIL || 'sinha.raju.rk@gmail.com'

  if (!gmailUser || !gmailAppPassword) {
    return NextResponse.json({ error: 'Contact form is not configured yet. Please email sinha.raju.rk@gmail.com directly.' }, { status: 503 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailAppPassword },
  })

  try {
    await transporter.sendMail({
      from: `Ritesh Portfolio <${gmailUser}>`,
      to: recipient,
      replyTo: safeEmail,
      subject: `Portfolio message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
    })
  } catch {
    return NextResponse.json({ error: 'Unable to send your message right now. Please try email instead.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
