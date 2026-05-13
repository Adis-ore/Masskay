import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiSend } from 'react-icons/fi'
import SectionLabel from '../ui/SectionLabel'
import { profile } from '../../data/content'

const CONTACT_LINKS = [
  { Icon: FiMail,     label: c => c.email,    href: c => `mailto:${c.email}` },
  { Icon: FiLinkedin, label: () => 'linkedin.com/in/oyewusichristopher', href: c => c.linkedin },
  { Icon: FiGithub,   label: () => 'github.com/oyewusichristopher',      href: c => c.github },
  { Icon: FiMapPin,   label: c => c.location, href: () => null },
]

function Field({ tag: Tag = 'input', name, type = 'text', placeholder, required, rows }) {
  const [focused, setFocused] = useState(false)
  const baseStyle = {
    width: '100%',
    background: 'var(--bg-surface)',
    border: '1px solid',
    borderColor: focused ? 'rgba(0,212,255,0.4)' : 'var(--border)',
    borderRadius: 8,
    padding: '0.75rem 1rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: Tag === 'textarea' ? 'vertical' : undefined,
    display: 'block',
  }
  return (
    <Tag
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      rows={rows}
      style={baseStyle}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

export default function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const data = new FormData(e.target)
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      style={{
        padding: '6rem 2rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="contact-grid"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number={7} title="LET'S WORK" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.08,
              marginBottom: '1rem',
            }}
          >
            Have data.<br />
            <span style={{ color: 'var(--accent-cyan)' }}>Need answers?</span>
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.72,
              marginBottom: '1.75rem',
            }}
          >
            Whether it&rsquo;s a full-time role, a freelance engagement, or a one-off analysis
            — I&rsquo;m open to conversations that start with a problem worth solving.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.75rem' }}>
            {CONTACT_LINKS.map(({ Icon, label, href }) => {
              const link = href(profile.contact)
              const text = label(profile.contact)
              return (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <Icon size={15} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                  {link ? (
                    <a
                      href={link}
                      style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{text}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Availability badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(0,255,136,0.07)',
              border: '1px solid rgba(0,255,136,0.18)',
              borderRadius: 20,
              padding: '0.38rem 0.85rem',
            }}
          >
            <span
              className="pulse-dot"
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-green)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--accent-green)',
                letterSpacing: '0.04em',
              }}
            >
              {profile.availability}
            </span>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {status === 'success' ? (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                color: 'var(--accent-green)',
                background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.18)',
                borderRadius: 12,
                padding: '2rem',
                lineHeight: 2,
              }}
            >
              <p>{'>'} Message sent successfully.</p>
              <p style={{ color: 'var(--text-secondary)' }}>{">"} I&rsquo;ll respond within 48h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <Field name="name" placeholder="Your name" required />
              <Field name="email" type="email" placeholder="Your email" required />
              <Field tag="textarea" name="message" placeholder="What are you working on?" required rows={5} />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  background: 'var(--accent-cyan)',
                  color: '#050508',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '0.82rem',
                  borderRadius: 8,
                  border: 'none',
                  opacity: status === 'loading' ? 0.68 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {status === 'loading' ? (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>Sending...</span>
                ) : (
                  <><FiSend size={14} /> Send Message</>
                )}
              </button>
              {status === 'error' && (
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-red)',
                    textAlign: 'center',
                  }}
                >
                  Something went wrong. Please email directly.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
