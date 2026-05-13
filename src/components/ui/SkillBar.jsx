import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SkillBar({ label, value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
          {value}%
        </span>
      </div>
      <div
        style={{
          height: 3,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
          style={{ height: '100%', background: 'var(--accent-cyan)', borderRadius: 2 }}
        />
      </div>
    </div>
  )
}
