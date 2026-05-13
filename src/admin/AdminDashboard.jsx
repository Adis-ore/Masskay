import { useState } from 'react'
import {
  FiUser, FiFolder, FiBriefcase, FiZap,
  FiMessageSquare, FiSettings, FiLogOut, FiSave,
} from 'react-icons/fi'
import { useAdminData } from './useAdminData'
import ProfileEditor      from './editors/ProfileEditor'
import ProjectsEditor     from './editors/ProjectsEditor'
import ExperienceEditor   from './editors/ExperienceEditor'
import SkillsEditor       from './editors/SkillsEditor'
import TestimonialsEditor from './editors/TestimonialsEditor'
import SettingsPanel      from './editors/SettingsPanel'

const TABS = [
  { id: 'profile',      label: 'Profile',      Icon: FiUser },
  { id: 'projects',     label: 'Projects',     Icon: FiFolder },
  { id: 'experience',   label: 'Experience',   Icon: FiBriefcase },
  { id: 'skills',       label: 'Skills',       Icon: FiZap },
  { id: 'testimonials', label: 'Testimonials', Icon: FiMessageSquare },
  { id: 'settings',     label: 'Settings',     Icon: FiSettings },
]

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab]   = useState('profile')
  const { data, update, reset } = useAdminData()
  const [toast, setToast] = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const EDITORS = {
    profile:      <ProfileEditor      data={data.profile}      onChange={v => { update('profile', v);      showToast('Profile saved') }} />,
    projects:     <ProjectsEditor     data={data.projects}     onChange={v => { update('projects', v);     showToast('Projects saved') }} />,
    experience:   <ExperienceEditor   data={data}              onChange={(k, v) => { update(k, v);         showToast('Saved') }} />,
    skills:       <SkillsEditor       data={data.skills}       onChange={v => { update('skills', v);       showToast('Skills saved') }} />,
    testimonials: <TestimonialsEditor data={data.testimonials} onChange={v => { update('testimonials', v); showToast('Testimonials saved') }} />,
    settings:     <SettingsPanel      data={data}              onReset={reset} onToast={showToast} />,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <header
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '0 1.5rem',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800 }}>
          <span style={{ color: 'var(--text-primary)' }}>Mass</span>
          <span style={{ color: 'var(--accent-cyan)' }}>kay</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '0.6rem', fontWeight: 400 }}>
            ADMIN
          </span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Toast */}
          {toast && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiSave size={12} /> {toast}
            </span>
          )}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            View Site
          </a>

          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              background: 'rgba(255,69,96,0.1)',
              border: '1px solid rgba(255,69,96,0.25)',
              borderRadius: 6,
              color: 'var(--accent-red)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              padding: '0.35rem 0.75rem',
            }}
          >
            <FiLogOut size={12} /> Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <aside
          style={{
            width: 200,
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border)',
            padding: '1rem 0',
            flexShrink: 0,
            overflowY: 'auto',
          }}
          className="admin-sidebar"
        >
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                width: '100%',
                padding: '0.7rem 1.25rem',
                background: tab === id ? 'rgba(0,212,255,0.08)' : 'none',
                border: 'none',
                borderLeft: `3px solid ${tab === id ? 'var(--accent-cyan)' : 'transparent'}`,
                color: tab === id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                transition: 'all 0.15s',
                textAlign: 'left',
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {EDITORS[tab]}
        </main>
      </div>

      {/* Mobile tab bar */}
      <nav
        style={{
          display: 'none',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          overflowX: 'auto',
        }}
        className="admin-tab-bar"
      >
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.6rem 1rem',
              background: 'none',
              border: 'none',
              borderTop: `2px solid ${tab === id ? 'var(--accent-cyan)' : 'transparent'}`,
              color: tab === id ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
