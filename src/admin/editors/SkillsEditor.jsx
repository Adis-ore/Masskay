import { useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { EditorHeader, Card, SaveButton, inputStyle } from './ProfileEditor'

function SkillRow({ skill, onChange, onDelete }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
      <input
        value={skill.name}
        onChange={e => onChange({ ...skill, name: e.target.value })}
        style={{ ...inputStyle, flex: 1 }}
        placeholder="Skill name"
      />
      <select
        value={skill.level}
        onChange={e => onChange({ ...skill, level: Number(e.target.value) })}
        style={{
          ...inputStyle,
          width: 70,
          flexShrink: 0,
          appearance: 'none',
          textAlign: 'center',
        }}
      >
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: i <= skill.level ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)' }} />
        ))}
      </div>
      <button onClick={onDelete} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', display: 'flex', flexShrink: 0 }}>
        <FiTrash2 size={13} />
      </button>
    </div>
  )
}

function SkillGroup({ title, skills, onChange }) {
  function update(idx, updated) {
    const next = [...skills]
    next[idx] = updated
    onChange(next)
  }

  function remove(idx) {
    onChange(skills.filter((_, i) => i !== idx))
  }

  function add() {
    onChange([...skills, { name: '', level: 3 }])
  }

  return (
    <Card title={title}>
      {skills.map((s, i) => (
        <SkillRow key={i} skill={s} onChange={v => update(i, v)} onDelete={() => remove(i)} />
      ))}
      <button
        onClick={add}
        style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', background: 'none', border: 'none', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.35rem' }}
      >
        <FiPlus size={12} /> Add Skill
      </button>
    </Card>
  )
}

export default function SkillsEditor({ data, onChange }) {
  const [local, setLocal] = useState(data)

  function updateGroup(key, value) {
    setLocal(prev => ({ ...prev, [key]: value }))
  }

  function save() {
    onChange(local)
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <EditorHeader title="Skills" subtitle="Manage tools, proficiency levels (1–5) and radar scores" />

      <SkillGroup title="Languages & Querying"     skills={local.languages}   onChange={v => updateGroup('languages', v)} />
      <SkillGroup title="BI & Visualization"        skills={local.bi}          onChange={v => updateGroup('bi', v)} />
      <SkillGroup title="Data Engineering & Cloud"  skills={local.engineering} onChange={v => updateGroup('engineering', v)} />

      {/* Proficiency bars */}
      <Card title="Proficiency Bars (About section)">
        {local.proficiencyBars.map((bar, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <input
              value={bar.label}
              onChange={e => {
                const next = [...local.proficiencyBars]
                next[i] = { ...next[i], label: e.target.value }
                setLocal(prev => ({ ...prev, proficiencyBars: next }))
              }}
              style={inputStyle}
              placeholder="Skill label"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={bar.value}
              onChange={e => {
                const next = [...local.proficiencyBars]
                next[i] = { ...next[i], value: Number(e.target.value) }
                setLocal(prev => ({ ...prev, proficiencyBars: next }))
              }}
              style={inputStyle}
              placeholder="85"
            />
          </div>
        ))}
      </Card>

      {/* Radar */}
      <Card title="Radar Chart Scores (0–100)">
        {local.radar.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <input
              value={r.subject}
              onChange={e => {
                const next = [...local.radar]
                next[i] = { ...next[i], subject: e.target.value }
                setLocal(prev => ({ ...prev, radar: next }))
              }}
              style={inputStyle}
            />
            <input
              type="number"
              min={0}
              max={100}
              value={r.score}
              onChange={e => {
                const next = [...local.radar]
                next[i] = { ...next[i], score: Number(e.target.value) }
                setLocal(prev => ({ ...prev, radar: next }))
              }}
              style={inputStyle}
            />
          </div>
        ))}
      </Card>

      <SaveButton onClick={save} />
    </div>
  )
}
