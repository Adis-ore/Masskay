import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { tickerItems, profile } from '../../data/content'

const TICKER = (tickerItems.join('  ·  ') + '  ·  ').repeat(3)

const SOCIAL = [
  { Icon: FiGithub,   href: profile.contact.github },
  { Icon: FiLinkedin, href: profile.contact.linkedin },
  { Icon: FiTwitter,  href: 'https://twitter.com' },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* Mini ticker strip */}
      <div
        style={{
          height: 30,
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="ticker-track"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>{TICKER}</span>
          <span aria-hidden="true">{TICKER}</span>
        </div>
      </div>

      {/* Footer row */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '1.1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Mass</span>
          <span style={{ color: 'var(--accent-cyan)' }}>kay</span>
          <span style={{ fontWeight: 400, fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}> &copy; 2025</span>
        </span>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {SOCIAL.map(({ Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
