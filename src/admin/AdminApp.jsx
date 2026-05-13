import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const PASSWORD  = 'masskay'
const AUTH_KEY  = 'masskay_admin_auth'

export default function AdminApp() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true',
  )

  function handleLogin(pw) {
    if (pw === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setAuthed(true)
      return true
    }
    return false
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
  }

  return authed
    ? <AdminDashboard onLogout={handleLogout} />
    : <AdminLogin onLogin={handleLogin} />
}
