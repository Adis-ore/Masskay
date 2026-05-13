import { useState } from 'react'
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { EditorHeader, Card, SaveButton, inputStyle } from './ProfileEditor'

function makeId(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const BLANK_PROJECT = {
  id: '',
  title: '',
  category: [],
  description: '',
  outcomes: ['', '', ''],
  stack: [],
  insight: '',
  github: '',
  demo: '',
}

export default function ProjectsEditor({ data, onChange }) {
  const [projects, setProjects] = useState(data)
  const [open, setOpen] = useState(null)

  function update(idx, key, value) {
    setProjects(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [key]: value }
      if (key === 'title') next[idx].id = makeId(value)
      return next
    })
  }

  function updateOutcome(idx, oIdx, value) {
    setProjects(prev => {
      const next = [...prev]
      const outcomes = [...next[idx].outcomes]
      outcomes[oIdx] = value
      next[idx] = { ...next[idx], outcomes }
      return next
    })
  }

  function addProject() {
    setProjects(prev => [...prev, { ...BLANK_PROJECT }])
    setOpen(projects.length)
  }

  function deleteProject(idx) {
    setProjects(prev => prev.filter((_, i) => i !== idx))
    setOpen(null)
  }

  function save() {
    onChange(projects)
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <EditorHeader title="Projects" subtitle="Add, edit or remove portfolio projects" />

      {projects.map((p, idx) => (
        <div
          key={idx}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            marginBottom: '0.75rem',
            overflow: 'hidden',
          }}
        >
          {/* Row header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.25rem',
              cursor: 'none',
            }}
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--accent-cyan)',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.18)',
                  borderRadius: 4,
                  padding: '0.1rem 0.4rem',
                  flexShrink: 0,
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.title || 'Untitled Project'}
              </span>
              <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                {p.category.slice(0, 2).map(c => (
                  <span key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', background: 'var(--bg-surface)', borderRadius: 4, padding: '0.1rem 0.35rem' }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <button
                onClick={e => { e.stopPropagation(); deleteProject(idx) }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-red)', display: 'flex', padding: 4 }}
              >
                <FiTrash2 size={14} />
              </button>
              {open === idx ? <FiChevronUp size={16} color="var(--text-muted)" /> : <FiChevronDown size={16} color="var(--text-muted)" />}
            </div>
          </div>

          {/* Expanded form */}
          {open === idx && (
            <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <Label>TITLE</Label>
                    <input value={p.title} onChange={e => update(idx, 'title', e.target.value)} style={inputStyle} placeholder="Project title" />
                  </div>
                  <div>
                    <Label>CATEGORY (comma-separated)</Label>
                    <input
                      value={p.category.join(', ')}
                      onChange={e => update(idx, 'category', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                      style={inputStyle}
                      placeholder="SQL, Python"
                    />
                  </div>
                </div>

                <div>
                  <Label>DESCRIPTION</Label>
                  <textarea value={p.description} onChange={e => update(idx, 'description', e.target.value)} rows={2} style={inputStyle} />
                </div>

                <div>
                  <Label>OUTCOMES (3 bullet points)</Label>
                  {p.outcomes.map((o, oi) => (
                    <input key={oi} value={o} onChange={e => updateOutcome(idx, oi, e.target.value)} style={{ ...inputStyle, marginBottom: '0.4rem' }} placeholder={`Outcome ${oi + 1}`} />
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <Label>TECH STACK (comma-separated)</Label>
                    <input
                      value={p.stack.join(', ')}
                      onChange={e => update(idx, 'stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                      style={inputStyle}
                      placeholder="SQL, Python, Tableau"
                    />
                  </div>
                  <div>
                    <Label>INSIGHT (hover reveal)</Label>
                    <input value={p.insight} onChange={e => update(idx, 'insight', e.target.value)} style={inputStyle} placeholder="Key finding..." />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <Label>GITHUB URL</Label>
                    <input type="url" value={p.github || ''} onChange={e => update(idx, 'github', e.target.value || null)} style={inputStyle} placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <Label>DEMO URL</Label>
                    <input type="url" value={p.demo || ''} onChange={e => update(idx, 'demo', e.target.value || null)} style={inputStyle} placeholder="https://..." />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add button */}
      <button
        onClick={addProject}
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
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.04)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <FiPlus size={14} /> Add Project
      </button>

      <SaveButton onClick={save} />
    </div>
  )
}

function Label({ children }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
      {children}
    </p>
  )
}
