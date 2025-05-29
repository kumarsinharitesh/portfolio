import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import NewFooter from './components/NewFooter';

// Import component styles
import './components/Header.css';
import './components/Hero.css';
import './components/About.css';
import './components/Skills.css';
import './components/Experience.css';
import './components/Contact.css';
import './components/NewFooter.css';

function App() {
  return (
    <div className="App">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <NewFooter />
    </div>
  );
}

export default App; 