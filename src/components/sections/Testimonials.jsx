import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import { testimonials } from '../../data/content'

function TestimonialCard({ item, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent-cyan)',
        borderRadius: 12,
        padding: '1.65rem',
      }}
    >
      <p
        style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.78,
          fontStyle: 'italic',
          marginBottom: '1.2rem',
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </p>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
          }}
        >
          {item.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            marginTop: '0.15rem',
          }}
        >
          {item.role} &middot; {item.company}
        </p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <SectionLabel number={6} title="SOCIAL PROOF" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}
          >
            What stakeholders say.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.4rem',
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} item={t} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
