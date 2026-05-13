import { motion } from 'framer-motion'
import { FiChevronRight, FiDownload } from 'react-icons/fi'
import StatBadge from '../ui/StatBadge'
import HeroMiniDashboard from '../charts/HeroMiniDashboard'
import { profile } from '../../data/content'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100vh - 96px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 2rem',
      }}
    >
      {/* Scanline overlay */}
      <div
        className="scanline-overlay"
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      />

      {/* Radial glow behind dashboard */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '8%',
          transform: 'translateY(-50%)',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.055) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="hero-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          {/* Label */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            // DATA ANALYST
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              lineHeight: 1.04,
              marginBottom: '1.4rem',
              fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
            }}
          >
            <span style={{ color: 'var(--text-primary)', display: 'block' }}>
              {profile.tagline[0]}
            </span>
            <span style={{ display: 'block' }}>
              <span
                style={{
                  color: 'var(--accent-cyan)',
                  textShadow: '0 0 32px rgba(0,212,255,0.35)',
                }}
              >
                Data
              </span>
              <span style={{ color: 'var(--text-primary)' }}> Into Decisions.</span>
            </span>
          </h1>

          {/* Body */}
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 500,
              marginBottom: '2rem',
            }}
          >
            I find the signal in your noise — transforming messy datasets into clear strategy,
            sharp visualizations, and decisions that move the needle.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--accent-cyan)',
                color: '#050508',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '0.75rem 1.45rem',
                borderRadius: 8,
                letterSpacing: '0.02em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              View My Work <FiChevronRight size={15} />
            </a>
            <a
              href="/cv.pdf"
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid var(--accent-cyan)',
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '0.75rem 1.45rem',
                borderRadius: 8,
                letterSpacing: '0.02em',
                background: 'transparent',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Download CV <FiDownload size={14} />
            </a>
          </div>

          {/* Stat badges */}
          <div className="stat-row" style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {profile.stats.map(stat => (
              <StatBadge key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </motion.div>

        {/* Right — animated dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.35 }}
        >
          <HeroMiniDashboard />
        </motion.div>
      </div>
    </section>
  )
}
