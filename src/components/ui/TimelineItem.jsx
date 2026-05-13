import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ position: 'relative', paddingLeft: '2.25rem', paddingBottom: '2rem' }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          left: -6,
          top: 6,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          boxShadow: '0 0 10px rgba(0,212,255,0.5)',
          zIndex: 1,
        }}
      />

      {/* Card */}
      <div
        className="timeline-card"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '1.35rem 1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '0.2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              {item.company}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-cyan)',
              }}
            >
              {item.role}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              flexShrink: 0,
            }}
          >
            {item.period}
          </span>
        </div>

        <ul style={{ listStyle: 'none', margin: '0.9rem 0' }}>
          {item.achievements.map((a, i) => (
            <li
              key={i}
              style={{
                fontSize: '0.83rem',
                color: 'var(--text-secondary)',
                paddingLeft: '1rem',
                position: 'relative',
                marginBottom: '0.38rem',
                lineHeight: 1.55,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--accent-green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  top: '0.15rem',
                }}
              >
                ▸
              </span>
              {a}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {item.stack.map(tech => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-secondary)',
                borderRadius: 4,
                padding: '0.18rem 0.45rem',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
