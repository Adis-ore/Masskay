import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(0,212,255,0.4)' : 'var(--border)',
        borderRadius: 12,
        padding: '1.4rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: hovered ? '0 0 22px rgba(0,212,255,0.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Category badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
        {project.category.map(cat => (
          <span
            key={cat}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--accent-cyan)',
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.18)',
              borderRadius: 4,
              padding: '0.12rem 0.45rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.45rem',
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '0.9rem',
        }}
      >
        {project.description}
      </p>

      {/* Outcomes */}
      <ul style={{ listStyle: 'none', marginBottom: '1rem', flex: 1 }}>
        {project.outcomes.map((o, i) => (
          <li
            key={i}
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              paddingLeft: '1rem',
              position: 'relative',
              marginBottom: '0.3rem',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: 'var(--accent-green)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                top: '0.1rem',
              }}
            >
              ▸
            </span>
            {o}
          </li>
        ))}
      </ul>

      {/* Stack chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
        {project.stack.map(tech => (
          <span
            key={tech}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-surface)',
              borderRadius: 4,
              padding: '0.18rem 0.45rem',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <FiGithub size={13} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <FiExternalLink size={13} /> Live Demo
          </a>
        )}
      </div>

      {/* Hover overlay — terminal insight */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: hovered ? 0 : '100%' }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0,212,255,0.07)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,212,255,0.18)',
          padding: '0.65rem 1.4rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--accent-cyan)',
          lineHeight: 1.5,
        }}
      >
        <span style={{ opacity: 0.5 }}>{'>'} insight: </span>
        {project.insight}
      </motion.div>
    </motion.div>
  )
}
