import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Leadership from '@/components/Leadership'
import Footer from '@/components/Footer'
import FloatingCode from '@/components/FloatingCode'
import { MotionConfig } from 'framer-motion'

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
    <main>
      <FloatingCode />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Leadership />
      <Footer />
    </main>
    </MotionConfig>
  )
}
