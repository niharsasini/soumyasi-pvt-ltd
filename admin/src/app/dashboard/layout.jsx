'use client'
import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import AuthGuard from '@/components/layout/AuthGuard'
import { api } from '@/lib/api'
import { isAuthenticated } from '@/lib/auth'
import { ToastProvider } from '@/components/ui/Toast'

export default function DashboardLayout({ children }) {
  const [stats, setStats] = useState({})

  useEffect(() => {
    if (!isAuthenticated()) return
    api.getDashboard().then(setStats).catch(() => {})
  }, [])

  return (
    <AuthGuard>
      <ToastProvider>
        <div className="flex h-screen bg-admin-bg overflow-hidden">
          <Sidebar stats={stats} />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </ToastProvider>
    </AuthGuard>
  )
}
