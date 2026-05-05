import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Leadership from '@/components/Leadership'
import Footer from '@/components/Footer'
import FloatingCode from '@/components/FloatingCode'

export default function Home() {
  return (
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
  )
}
