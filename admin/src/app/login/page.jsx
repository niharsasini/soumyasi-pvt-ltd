'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Zap, Eye, EyeOff, Lock, User } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.login(form.username, form.password)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-admin-bg flex items-center
      justify-center p-4">

      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96
          bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96
          bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center
            w-16 h-16 bg-amber-500/10 border border-amber-500/20
            rounded-2xl mb-4">
            <Zap className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Soumyashi Power
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Admin Dashboard
          </p>
        </div>

        {/* Login card */}
        <div className="bg-admin-card border border-admin-border
          rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-6">
            Sign in to continue
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20
              rounded-xl p-3 mb-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-slate-400 text-xs
                font-medium mb-1.5 block">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2
                  -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(f =>
                    ({...f, username: e.target.value}))}
                  placeholder="admin"
                  className="w-full bg-admin-bg border
                    border-admin-border rounded-xl pl-10 pr-4
                    py-3 text-sm text-white placeholder:text-slate-600
                    focus:outline-none focus:border-amber-500/50
                    focus:ring-1 focus:ring-amber-500/20"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-400 text-xs
                font-medium mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2
                  -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f =>
                    ({...f, password: e.target.value}))}
                  placeholder="••••••••"
                  className="w-full bg-admin-bg border
                    border-admin-border rounded-xl pl-10 pr-12
                    py-3 text-sm text-white placeholder:text-slate-600
                    focus:outline-none focus:border-amber-500/50
                    focus:ring-1 focus:ring-amber-500/20"
                  required
                />
                <button type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2
                    -translate-y-1/2 text-slate-500
                    hover:text-slate-300">
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400
                text-black font-bold py-3 rounded-xl transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30
                  border-t-black rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Soumyashi Power Limited · Admin Only
        </p>
      </div>
    </div>
  )
}
