import { useState } from 'react'
import { FiDownload, FiRefreshCw, FiLink, FiAlertTriangle, FiCheck } from 'react-icons/fi'
import { EditorHeader, Card, SaveButton, inputStyle } from './ProfileEditor'
import { generateContentJs } from '../useAdminData'

const APPS_SCRIPT_TEMPLATE = `// Google Apps Script — paste this in script.google.com
// Bound to a Google Sheet named "Masskay Portfolio Data"

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
  const data = JSON.parse(e.postData.contents)

  // Profile sheet
  const profileSheet = sheet.getSheetByName('Profile') || sheet.insertSheet('Profile')
  profileSheet.clearContents()
  profileSheet.appendRow(['Field', 'Value'])
  profileSheet.appendRow(['Name', data.profile.name])
  profileSheet.appendRow(['Title', data.profile.title])
  profileSheet.appendRow(['Email', data.profile.contact.email])
  profileSheet.appendRow(['LinkedIn', data.profile.contact.linkedin])
  profileSheet.appendRow(['Location', data.profile.contact.location])

  // Projects sheet
  const projSheet = sheet.getSheetByName('Projects') || sheet.insertSheet('Projects')
  projSheet.clearContents()
  projSheet.appendRow(['Title', 'Category', 'Description', 'Stack', 'GitHub', 'Demo'])
  data.projects.forEach(p => {
    projSheet.appendRow([p.title, p.category.join(', '), p.description, p.stack.join(', '), p.github || '', p.demo || ''])
  })

  // Experience sheet
  const expSheet = sheet.getSheetByName('Experience') || sheet.insertSheet('Experience')
  expSheet.clearContents()
  expSheet.appendRow(['Company', 'Role', 'Period', 'Achievements', 'Stack'])
  data.experience.forEach(e => {
    expSheet.appendRow([e.company, e.role, e.period, e.achievements.join(' | '), e.stack.join(', ')])
  })

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON)
}
`

export default function SettingsPanel({ data, onReset, onToast }) {
  const SCRIPT_KEY = 'masskay_apps_script_url'
  const [scriptUrl, setScriptUrl] = useState(() => localStorage.getItem(SCRIPT_KEY) || '')
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState(null) // 'ok' | 'error'
  const [resetConfirm, setResetConfirm] = useState(false)
  const [copied, setCopied] = useState(false)

  function saveScriptUrl() {
    localStorage.setItem(SCRIPT_KEY, scriptUrl)
    onToast('Apps Script URL saved')
  }

  async function syncToSheets() {
    if (!scriptUrl.trim()) { onToast('Paste your Apps Script URL first'); return }
    setSyncing(true)
    setSyncStatus(null)
    try {
      const res = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      })
      setSyncStatus('ok')
      onToast('Synced to Google Sheets')
    } catch {
      setSyncStatus('error')
      onToast('Sync failed — check the URL')
    } finally {
      setSyncing(false)
    }
  }

  function exportContentJs() {
    const code = generateContentJs(data)
    const blob = new Blob([code], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.js'
    a.click()
    URL.revokeObjectURL(url)
    onToast('content.js downloaded')
  }

  function copyTemplate() {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleReset() {
    if (!resetConfirm) { setResetConfirm(true); return }
    onReset()
    setResetConfirm(false)
    onToast('Data reset to defaults')
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <EditorHeader title="Settings" subtitle="Google Sheets sync, content export and data management" />

      {/* Google Apps Script */}
      <Card title="Google Sheets Sync">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
          Connect your portfolio data to a Google Sheet for spreadsheet-based editing.
          Deploy the Apps Script template below, then paste the web app URL here.
        </p>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
          APPS SCRIPT WEB APP URL
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="url"
            value={scriptUrl}
            onChange={e => setScriptUrl(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
            placeholder="https://script.google.com/macros/s/.../exec"
          />
          <button
            onClick={saveScriptUrl}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0 1rem', flexShrink: 0 }}
          >
            Save
          </button>
        </div>

        <button
          onClick={syncToSheets}
          disabled={syncing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: syncing ? 'rgba(0,212,255,0.06)' : 'rgba(0,212,255,0.12)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 8,
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.82rem',
            padding: '0.6rem 1.25rem',
            opacity: syncing ? 0.7 : 1,
          }}
        >
          <FiRefreshCw size={14} style={syncing ? { animation: 'spin 1s linear infinite' } : {}} />
          {syncing ? 'Syncing...' : 'Sync to Google Sheets'}
        </button>

        {syncStatus === 'ok' && (
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-green)', marginTop: '0.6rem' }}>
            <FiCheck size={13} /> Sync successful
          </p>
        )}
        {syncStatus === 'error' && (
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-red)', marginTop: '0.6rem' }}>
            <FiAlertTriangle size={13} /> Sync failed. Check the script URL and CORS settings.
          </p>
        )}
      </Card>

      {/* Apps Script template */}
      <Card title="Apps Script Template">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
          1. Open{' '}
          <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>script.google.com</span>
          , create a new project bound to your Sheet.
          2. Paste the code below into Code.gs.
          3. Deploy as a Web App (execute as: Me, access: Anyone).
          4. Copy the deployment URL into the field above.
        </p>
        <div style={{ position: 'relative' }}>
          <pre style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-secondary)',
            overflowX: 'auto',
            maxHeight: 260,
            overflowY: 'auto',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {APPS_SCRIPT_TEMPLATE}
          </pre>
          <button
            onClick={copyTemplate}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: copied ? 'rgba(0,255,136,0.12)' : 'rgba(0,212,255,0.08)',
              border: `1px solid ${copied ? 'rgba(0,255,136,0.3)' : 'rgba(0,212,255,0.2)'}`,
              borderRadius: 6,
              color: copied ? 'var(--accent-green)' : 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              padding: '0.3rem 0.6rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            {copied ? <><FiCheck size={11} /> Copied</> : <><FiLink size={11} /> Copy</>}
          </button>
        </div>
      </Card>

      {/* Export */}
      <Card title="Export Content">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
          Download your current admin edits as a <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>content.js</span> file.
          Replace <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>src/data/content.js</span> in the project and redeploy to make changes permanent.
        </p>
        <button
          onClick={exportContentJs}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0,212,255,0.12)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 8,
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.82rem',
            padding: '0.6rem 1.25rem',
          }}
        >
          <FiDownload size={14} /> Download content.js
        </button>
      </Card>

      {/* Danger zone */}
      <Card title="Danger Zone">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
          Reset all admin edits back to the original hardcoded defaults. This clears localStorage and cannot be undone.
        </p>
        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: resetConfirm ? 'rgba(255,69,96,0.15)' : 'rgba(255,69,96,0.08)',
            border: `1px solid ${resetConfirm ? 'rgba(255,69,96,0.5)' : 'rgba(255,69,96,0.25)'}`,
            borderRadius: 8,
            color: 'var(--accent-red)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.82rem',
            padding: '0.6rem 1.25rem',
          }}
        >
          <FiAlertTriangle size={14} />
          {resetConfirm ? 'Click again to confirm reset' : 'Reset to Defaults'}
        </button>
        {resetConfirm && (
          <button
            onClick={() => setResetConfirm(false)}
            style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}
          >
            Cancel
          </button>
        )}
      </Card>
    </div>
  )
}
