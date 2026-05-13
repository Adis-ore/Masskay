import { useState } from 'react'
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { EditorHeader, Card, SaveButton, inputStyle } from './ProfileEditor'

function Label({ children }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
      {children}
    </p>
  )
}

const BLANK_EXP = { company: '', role: '', period: '', achievements: ['', '', ''], stack: [] }
const BLANK_CERT = { name: '', issuer: '', year: '' }

export default function ExperienceEditor({ data, onChange }) {
  const [exp, setExp]   = useState(data.experience)
  const [edu, setEdu]   = useState(data.education)
  const [certs, setCerts] = useState(data.certifications)
  const [open, setOpen] = useState(null)

  function updateExp(idx, key, value) {
    setExp(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [key]: value }
      return next
    })
  }

  function updateAch(idx, ai, value) {
    setExp(prev => {
      const next = [...prev]
      const achievements = [...next[idx].achievements]
      achievements[ai] = value
      next[idx] = { ...next[idx], achievements }
      return next
    })
  }

  function addAch(idx) {
    setExp(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], achievements: [...next[idx].achievements, ''] }
      return next
    })
  }

  function removeAch(idx, ai) {
    setExp(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], achievements: next[idx].achievements.filter((_, i) => i !== ai) }
      return next
    })
  }

  function updateCert(idx, key, value) {
    setCerts(prev => { const next = [...prev]; next[idx] = { ...next[idx], [key]: value }; return next })
  }

  function save() {
    onChange('experience', exp)
    onChange('education', edu)
    onChange('certifications', certs)
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <EditorHeader title="Experience" subtitle="Work history, education and certifications" />

      {/* Work experience */}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-cyan)', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>WORK HISTORY</p>

      {exp.map((item, idx) => (
        <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: '0.75rem', overflow: 'hidden' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.25rem', cursor: 'none' }}
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                {item.company || 'New Role'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', marginLeft: '0.6rem' }}>
                {item.role}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.period}</span>
              <button onClick={e => { e.stopPropagation(); setExp(prev => prev.filter((_, i) => i !== idx)) }} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', display: 'flex', padding: 4 }}>
                <FiTrash2 size={13} />
              </button>
              {open === idx ? <FiChevronUp size={15} color="var(--text-muted)" /> : <FiChevronDown size={15} color="var(--text-muted)" />}
            </div>
          </div>

          {open === idx && (
            <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div><Label>COMPANY</Label><input value={item.company} onChange={e => updateExp(idx, 'company', e.target.value)} style={inputStyle} /></div>
                <div><Label>ROLE</Label><input value={item.role} onChange={e => updateExp(idx, 'role', e.target.value)} style={inputStyle} /></div>
                <div><Label>PERIOD</Label><input value={item.period} onChange={e => updateExp(idx, 'period', e.target.value)} style={inputStyle} placeholder="2022 – Present" /></div>
              </div>

              <Label>ACHIEVEMENTS</Label>
              {item.achievements.map((a, ai) => (
                <div key={ai} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <input value={a} onChange={e => updateAch(idx, ai, e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder={`Achievement ${ai + 1}`} />
                  <button onClick={() => removeAch(idx, ai)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--accent-red)', padding: '0 0.5rem' }}><FiTrash2 size={12} /></button>
                </div>
              ))}
              <button onClick={() => addAch(idx)} style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', background: 'none', border: 'none', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.75rem' }}>
                <FiPlus size={12} /> Add Achievement
              </button>

              <Label>TECH STACK (comma-separated)</Label>
              <input
                value={item.stack.join(', ')}
                onChange={e => updateExp(idx, 'stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                style={inputStyle}
                placeholder="SQL, Python, Power BI"
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => setExp(prev => [...prev, { ...BLANK_EXP }])}
        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: '1px dashed rgba(0,212,255,0.3)', borderRadius: 10, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.7rem 1.25rem', width: '100%', justifyContent: 'center', marginBottom: '2rem' }}
      >
        <FiPlus size={14} /> Add Role
      </button>

      {/* Education */}
      <Card title="Education">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div><Label>UNIVERSITY</Label><input value={edu.university} onChange={e => setEdu(p => ({ ...p, university: e.target.value }))} style={inputStyle} /></div>
          <div><Label>DEGREE</Label><input value={edu.degree} onChange={e => setEdu(p => ({ ...p, degree: e.target.value }))} style={inputStyle} /></div>
          <div><Label>YEAR</Label><input value={edu.year} onChange={e => setEdu(p => ({ ...p, year: e.target.value }))} style={inputStyle} /></div>
        </div>
      </Card>

      {/* Certifications */}
      <Card title="Certifications">
        {certs.map((cert, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px auto', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
            <input value={cert.name}   onChange={e => updateCert(i, 'name', e.target.value)}   style={inputStyle} placeholder="Certificate name" />
            <input value={cert.issuer} onChange={e => updateCert(i, 'issuer', e.target.value)} style={inputStyle} placeholder="Issuer" />
            <input value={cert.year}   onChange={e => updateCert(i, 'year', e.target.value)}   style={inputStyle} placeholder="2023" />
            <button onClick={() => setCerts(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', display: 'flex' }}><FiTrash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => setCerts(prev => [...prev, { ...BLANK_CERT }])} style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', background: 'none', border: 'none', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
          <FiPlus size={12} /> Add Certification
        </button>
      </Card>

      <SaveButton onClick={save} />
    </div>
  )
}
