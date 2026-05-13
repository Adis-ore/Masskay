import { motion } from 'framer-motion'
import { FiUser } from 'react-icons/fi'
import SectionLabel from '../ui/SectionLabel'
import SkillBar from '../ui/SkillBar'
import { profile, skills } from '../../data/content'

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '6rem 2rem',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="about-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Left — photo placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="about-hex-wrap" style={{ position: 'relative', width: 280, height: 280 }}>
            <div
              className="hex-clip"
              style={{
                width: '100%',
                height: '100%',
                border: '2px solid var(--accent-cyan)',
                boxShadow: '0 0 30px rgba(0,212,255,0.18)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <FiUser size={52} color="var(--text-muted)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  photo.jpg
                </span>
              </div>
            </div>
            {/* Outer hex ring */}
            <div
              className="hex-clip"
              style={{
                position: 'absolute',
                inset: -10,
                border: '1px solid rgba(0,212,255,0.12)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>

        {/* Right — bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <SectionLabel number={2} title="ABOUT ME" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.12,
              marginBottom: '1.4rem',
            }}
          >
            Data that moves<br />
            <span style={{ color: 'var(--accent-cyan)' }}>decisions forward.</span>
          </h2>

          {profile.bio.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.78,
                marginBottom: '0.9rem',
              }}
            >
              {i === 0
                ? para.replace('Oyewusi Christopher', '\x00').split('\x00').map((part, j) =>
                    j === 0
                      ? part
                      : [<strong key="name" style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Oyewusi Christopher</strong>, part]
                  )
                : para}
            </p>
          ))}

          <div style={{ marginTop: '2rem' }}>
            {skills.proficiencyBars.map(bar => (
              <SkillBar key={bar.label} label={bar.label} value={bar.value} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
