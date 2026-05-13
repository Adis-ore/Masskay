import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import ProjectCard from '../ui/ProjectCard'
import { projects } from '../../data/content'

const FILTERS = ['All', 'SQL', 'Python', 'Power BI', 'Tableau', 'Machine Learning']

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? projects : projects.filter(p => p.category.includes(active))

  return (
    <section
      id="projects"
      style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <SectionLabel number={4} title="PROJECTS" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '1.75rem',
            }}
          >
            Work that moves numbers.
          </h2>

          {/* Filter tabs */}
          <div className="filter-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  padding: '0.38rem 0.9rem',
                  borderRadius: 6,
                  border: '1px solid',
                  borderColor: active === f ? 'var(--accent-cyan)' : 'var(--border)',
                  background: active === f ? 'rgba(0,212,255,0.09)' : 'transparent',
                  color: active === f ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  transition: 'all 0.18s',
                  letterSpacing: '0.07em',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.4rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
