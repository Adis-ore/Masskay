import { useState } from 'react'
import { FiSave } from 'react-icons/fi'

function Field({ label, value, onChange, textarea, type = 'text', hint }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
        {label}
      </label>
      {hint && <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>{hint}</p>}
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '0.65rem 0.9rem',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.88rem',
  outline: 'none',
  resize: 'vertical',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

export default function ProfileEditor({ data, onChange }) {
  const [local, setLocal] = useState(data)

  function set(path, value) {
    setLocal(prev => {
      const next = structuredClone(prev)
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  function setStat(idx, key, value) {
    setLocal(prev => {
      const next = structuredClone(prev)
      next.stats[idx][key] = key === 'value' ? Number(value) : value
      return next
    })
  }

  function save() {
    onChange(local)
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <EditorHeader title="Profile" subtitle="Name, bio, contact details and hero stats" />

      {/* Identity */}
      <Card title="Identity">
        <Field label="FULL NAME"  value={local.name}  onChange={v => set('name', v)} />
        <Field label="TITLE"      value={local.title} onChange={v => set('title', v)} />
        <Field label="AVAILABILITY BADGE" value={local.availability} onChange={v => set('availability', v)} />
      </Card>

      {/* Bio */}
      <Card title="Bio Paragraphs">
        {local.bio.map((para, i) => (
          <Field
            key={i}
            label={`PARAGRAPH ${i + 1}`}
            value={para}
            textarea
            onChange={v => {
              setLocal(prev => {
                const next = structuredClone(prev)
                next.bio[i] = v
                return next
              })
            }}
          />
        ))}
      </Card>

      {/* Stats */}
      <Card title="Hero Stats">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {local.stats.map((stat, i) => (
            <div key={i} style={{ background: 'var(--bg-primary)', borderRadius: 8, padding: '0.9rem', border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>STAT {i + 1}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="number"
                  value={stat.value}
                  onChange={e => setStat(i, 'value', e.target.value)}
                  style={{ ...inputStyle, width: 70 }}
                  placeholder="12"
                />
                <input
                  value={stat.suffix}
                  onChange={e => setStat(i, 'suffix', e.target.value)}
                  style={{ ...inputStyle, width: 50 }}
                  placeholder="+"
                />
              </div>
              <input
                value={stat.label}
                onChange={e => setStat(i, 'label', e.target.value)}
                style={{ ...inputStyle }}
                placeholder="Label"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Contact */}
      <Card title="Contact Details">
        <Field label="EMAIL"    type="email" value={local.contact.email}    onChange={v => set('contact.email', v)} />
        <Field label="LINKEDIN" type="url"   value={local.contact.linkedin} onChange={v => set('contact.linkedin', v)} />
        <Field label="GITHUB"   type="url"   value={local.contact.github}   onChange={v => set('contact.github', v)} />
        <Field label="LOCATION"              value={local.contact.location} onChange={v => set('contact.location', v)} />
      </Card>

      <SaveButton onClick={save} />
    </div>
  )
}

/* ─── Shared sub-components ─── */
export function EditorHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{title}</h2>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{subtitle}</p>
    </div>
  )
}

export function Card({ title, children }) {
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.35rem', marginBottom: '1.25rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-cyan)', letterSpacing: '0.12em', marginBottom: '1rem' }}>{title.toUpperCase()}</p>
      {children}
    </div>
  )
}

export function SaveButton({ onClick, label = 'Save Changes' }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: 'var(--accent-cyan)',
        color: '#050508',
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: '0.88rem',
        padding: '0.72rem 1.5rem',
        borderRadius: 8,
        border: 'none',
        marginTop: '0.5rem',
      }}
    >
      <FiSave size={14} /> {label}
    </button>
  )
}

export { inputStyle }
