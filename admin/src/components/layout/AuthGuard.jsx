'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  function checkAuth() {
    setChecking(true)

    if (typeof window === 'undefined') {
      setChecking(false)
      return
    }

    const token = localStorage.getItem('admin_token')

    if (!token) {
      setAuthorized(false)
      setChecking(false)
      router.replace('/login')
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expiry = payload.exp * 1000

      if (Date.now() > expiry) {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        setAuthorized(false)
        setChecking(false)
        router.replace('/login')
        return
      }

      setAuthorized(true)
      setChecking(false)
    } catch {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      setAuthorized(false)
      setChecking(false)
      router.replace('/login')
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Verifying...</p>
        </div>
      </div>
    )
  }

  if (!authorized) return null

  return children
}
