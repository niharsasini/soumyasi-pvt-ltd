'use client'
import { useEffect, useState } from 'react'
import { getUser, isAuthenticated, logout } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    setUser(getUser())
    setAuthenticated(isAuthenticated())
  }, [])

  return { user, authenticated, logout }
}
