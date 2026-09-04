export function getUser() {
  if (typeof window === 'undefined') return null
  try {
    const user = localStorage.getItem('admin_user')
    return user ? JSON.parse(user) : null
  } catch { return null }
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('admin_token')
}

export function logout() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  window.location.href = '/login'
}
