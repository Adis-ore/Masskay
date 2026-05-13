import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function AdminLogin({ onLogin }) {
  const [pw, setPw]         = useState('')
  const [show, setShow]     = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!pw) return
    setLoading(true)
    setError('')
    setTimeout(() => {
      const ok = onLogin(pw)
      if (!ok) {
        setError('> Access denied. Invalid password.')
        setPw('')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 400 }}
      >
        {/* Wordmark */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.2rem',
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Mass</span>
            <span style={{ color: 'var(--accent-cyan)' }}>kay</span>
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              marginTop: '0.35rem',
            }}
          >
            ADMIN PORTAL
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
            }}
          >
            {'>'} AUTHENTICATION REQUIRED
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Password field */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.4rem',
                }}
              >
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '0.75rem 2.75rem 0.75rem 1rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
                <button
                  type="button"
                  onClick={() => setShow(v => !v)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                >
                  {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-red)',
                  margin: 0,
                }}
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !pw}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: 'var(--accent-cyan)',
                color: '#050508',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.9rem',
                padding: '0.8rem',
                borderRadius: 8,
                border: 'none',
                opacity: loading || !pw ? 0.55 : 1,
                transition: 'opacity 0.2s',
                width: '100%',
              }}
            >
              <FiLock size={14} />
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            color: 'var(--text-muted)',
            marginTop: '1.25rem',
          }}
        >
          masskay portfolio · admin access only
        </p>
      </motion.div>
    </div>
  )
}
