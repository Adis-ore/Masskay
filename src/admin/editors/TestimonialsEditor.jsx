import { useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { EditorHeader, Card, SaveButton, inputStyle } from './ProfileEditor'

function Label({ children }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
      {children}
    </p>
  )
}

const BLANK = { quote: '', name: '', role: '', company: '' }

export default function TestimonialsEditor({ data, onChange }) {
  const [items, setItems] = useState(data)

  function update(idx, key, value) {
    setItems(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [key]: value }
      return next
    })
  }

  function add() {
    setItems(prev => [...prev, { ...BLANK }])
  }

  function remove(idx) {
    setItems(prev => prev.filter((_, i) => i !== idx))
  }

  function save() {
    onChange(items)
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <EditorHeader title="Testimonials" subtitle="Client and colleague endorsements displayed on the portfolio" />

      {items.map((item, idx) => (
        <Card key={idx} title={`Testimonial ${idx + 1}${item.name ? ` — ${item.name}` : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
            <button
              onClick={() => remove(idx)}
              style={{ background: 'rgba(255,69,96,0.08)', border: '1px solid rgba(255,69,96,0.2)', borderRadius: 6, color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', padding: '0.3rem 0.65rem' }}
            >
              <FiTrash2 size={12} /> Remove
            </button>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <Label>QUOTE</Label>
            <textarea
              value={item.quote}
              onChange={e => update(idx, 'quote', e.target.value)}
              rows={3}
              style={inputStyle}
              placeholder="What they said about working with Oyewusi..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div>
              <Label>NAME</Label>
              <input value={item.name} onChange={e => update(idx, 'name', e.target.value)} style={inputStyle} placeholder="Jane Doe" />
            </div>
            <div>
              <Label>ROLE</Label>
              <input value={item.role} onChange={e => update(idx, 'role', e.target.value)} style={inputStyle} placeholder="Head of Data" />
            </div>
            <div>
              <Label>COMPANY</Label>
              <input value={item.company} onChange={e => update(idx, 'company', e.target.value)} style={inputStyle} placeholder="Acme Corp" />
            </div>
          </div>
        </Card>
      ))}

      <button
        onClick={add}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'transparent',
          border: '1px dashed rgba(0,212,255,0.3)',
          borderRadius: 10,
          color: 'var(--accent-cyan)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          padding: '0.7rem 1.25rem',
          width: '100%',
          justifyContent: 'center',
          marginBottom: '1.25rem',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.04)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <FiPlus size={14} /> Add Testimonial
      </button>

      <SaveButton onClick={save} />
    </div>
  )
}
