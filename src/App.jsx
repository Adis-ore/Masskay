import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import TerminalBoot from './components/ui/TerminalBoot'
import { tickerItems } from './data/content'

const TICKER_CONTENT = tickerItems.join('  ·  ') + '  ·  '
const TICKER_REPEATED = TICKER_CONTENT + TICKER_CONTENT + TICKER_CONTENT

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [bootDone, setBootDone] = useState(false)

  useEffect(() => {
    const move = e => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* Custom crosshair cursor */}
      <div className="dv-cursor" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Skills ticker — fixed at very top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 32,
          zIndex: 200,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="ticker-track"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.65,
          }}
        >
          <span>{TICKER_REPEATED}</span>
          <span aria-hidden="true">{TICKER_REPEATED}</span>
        </div>
      </div>

      {/* Terminal boot overlay */}
      {!bootDone && <TerminalBoot onComplete={() => setBootDone(true)} />}

      {/* Navigation — fixed below ticker */}
      <Nav />

      {/* Page content — offset for fixed ticker (32px) + nav (64px) */}
      <main style={{ paddingTop: 96 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
