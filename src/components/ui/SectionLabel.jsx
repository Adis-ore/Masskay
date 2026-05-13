export default function SectionLabel({ number, title }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--accent-cyan)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
      }}
    >
      // {String(number).padStart(2, '0')} {title}
    </p>
  )
}
