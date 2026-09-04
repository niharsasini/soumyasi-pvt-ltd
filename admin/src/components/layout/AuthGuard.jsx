'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { Zap } from 'lucide-react'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    } else {
      setChecking(false)
    }
  }, [router])

  if (checking) return (
    <div className="min-h-screen bg-admin-bg flex items-center
      justify-center">
      <div className="text-center">
        <Zap className="w-10 h-10 text-amber-400 mx-auto
          animate-pulse mb-3" />
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  )

  return children
}
