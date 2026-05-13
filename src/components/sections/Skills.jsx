import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import SkillRadar from '../charts/SkillRadar'
import { skills } from '../../data/content'

function DotLevel({ level }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i <= level ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)',
          }}
        />
      ))}
    </div>
  )
}

function SkillCard({ name, level }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--bg-primary)',
        border: '1px solid',
        borderColor: hov ? 'rgba(0,212,255,0.28)' : 'var(--border)',
        borderRadius: 8,
        padding: '0.65rem 0.9rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hov ? '0 0 10px rgba(0,212,255,0.07)' : 'none',
      }}
    >
      <span style={{ fontSize: '0.83rem', color: 'var(--text-primary)' }}>{name}</span>
      <DotLevel level={level} />
    </div>
  )
}

function SkillColumn({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--accent-cyan)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '0.85rem',
        }}
      >
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {items.map(item => (
          <SkillCard key={item.name} name={item.name} level={item.level} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: '6rem 2rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <SectionLabel number={3} title="EXPERTISE" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}
          >
            The full-stack analyst toolkit.
          </h2>
        </motion.div>

        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          <SkillColumn title="Languages & Querying" items={skills.languages} />
          <SkillColumn title="BI & Visualization"    items={skills.bi} />
          <SkillColumn title="Data Engineering & Cloud" items={skills.engineering} />
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '0.5rem',
            }}
          >
            PROFICIENCY RADAR
          </p>
          <SkillRadar />
        </div>
      </div>
    </section>
  )
}
