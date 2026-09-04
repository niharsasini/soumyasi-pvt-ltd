'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import { getUser } from '@/lib/auth'
import { Lock, Building2, UserPlus, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const [me, setMe] = useState(null)
  const user = getUser()

  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState(null)

  const [adminForm, setAdminForm] = useState({ username: '', email: '', password: '', full_name: '', is_superadmin: false })
  const [adminSaving, setAdminSaving] = useState(false)
  const [adminMsg, setAdminMsg] = useState(null)

  useEffect(() => {
    api.getMe().then(setMe).catch(() => {})
  }, [])

  const changePassword = async (e) => {
    e.preventDefault()
    setPwMsg(null)
    if (pwForm.new_password !== pwForm.confirm) {
      setPwMsg({ type: 'error', text: 'New passwords do not match' })
      return
    }
    setPwSaving(true)
    try {
      await api.changePassword({
        current_password: pwForm.current_password,
        new_password: pwForm.new_password,
      })
      setPwMsg({ type: 'success', text: 'Password updated successfully' })
      setPwForm({ current_password: '', new_password: '', confirm: '' })
    } catch (err) {
      setPwMsg({ type: 'error', text: err.message || 'Failed to update password' })
    } finally {
      setPwSaving(false)
    }
  }

  const createAdmin = async (e) => {
    e.preventDefault()
    setAdminMsg(null)
    setAdminSaving(true)
    try {
      await api.createAdmin(adminForm)
      setAdminMsg({ type: 'success', text: `Admin "${adminForm.username}" created` })
      setAdminForm({ username: '', email: '', password: '', full_name: '', is_superadmin: false })
    } catch (err) {
      setAdminMsg({ type: 'error', text: err.message || 'Failed to create admin' })
    } finally {
      setAdminSaving(false)
    }
  }

  const inputCls = "w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 " +
    "text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"

  return (
    <div>
      <Header title="Settings" subtitle="Account and company settings" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Company Info */}
        <div className="bg-admin-card border border-admin-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-semibold">Company Information</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs mb-1">Company Name</p>
              <p className="text-white">Soumyashi Power Limited</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Address</p>
              <p className="text-white">
                MIG-126, Bhimatangi Housing Colony, Bhubaneswar, Odisha 751002
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Website</p>
              <a href="https://www.soumyashipower.in" target="_blank" rel="noopener noreferrer"
                className="text-amber-400 hover:underline">
                www.soumyashipower.in
              </a>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">API Endpoint</p>
              <p className="text-white break-all">
                {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Logged in as</p>
              <p className="text-white">
                {me?.full_name || user?.username} · {me?.email}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                {user?.is_superadmin ? 'Super Admin' : 'Admin'}
              </p>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-admin-card border border-admin-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-semibold">Change Password</h3>
          </div>
          {pwMsg && (
            <div className={`rounded-xl p-3 mb-4 text-sm border ${
              pwMsg.type === 'success'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {pwMsg.text}
            </div>
          )}
          <form onSubmit={changePassword} className="space-y-4">
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">
                Current Password
              </label>
              <input type="password" required className={inputCls}
                value={pwForm.current_password}
                onChange={e => setPwForm(f => ({...f, current_password: e.target.value}))} />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">
                New Password
              </label>
              <input type="password" required minLength={8} className={inputCls}
                value={pwForm.new_password}
                onChange={e => setPwForm(f => ({...f, new_password: e.target.value}))} />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">
                Confirm New Password
              </label>
              <input type="password" required minLength={8} className={inputCls}
                value={pwForm.confirm}
                onChange={e => setPwForm(f => ({...f, confirm: e.target.value}))} />
            </div>
            <button type="submit" disabled={pwSaving}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold
                px-4 py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">
              {pwSaving ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Create Admin — superadmin only */}
        {user?.is_superadmin && (
          <div className="bg-admin-card border border-admin-border rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <UserPlus className="w-4 h-4 text-amber-400" />
              <h3 className="text-white font-semibold">Add New Admin</h3>
            </div>
            {adminMsg && (
              <div className={`rounded-xl p-3 mb-4 text-sm border flex items-center gap-2 ${
                adminMsg.type === 'success'
                  ? 'bg-green-500/10 border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {adminMsg.type === 'success' && <CheckCircle className="w-4 h-4" />}
                {adminMsg.text}
              </div>
            )}
            <form onSubmit={createAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Username</label>
                <input required className={inputCls} value={adminForm.username}
                  onChange={e => setAdminForm(f => ({...f, username: e.target.value}))} />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Full Name</label>
                <input required className={inputCls} value={adminForm.full_name}
                  onChange={e => setAdminForm(f => ({...f, full_name: e.target.value}))} />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Email</label>
                <input type="email" required className={inputCls} value={adminForm.email}
                  onChange={e => setAdminForm(f => ({...f, email: e.target.value}))} />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Password</label>
                <input type="password" required minLength={8} className={inputCls}
                  value={adminForm.password}
                  onChange={e => setAdminForm(f => ({...f, password: e.target.value}))} />
              </div>
              <div className="md:col-span-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={adminForm.is_superadmin}
                    onChange={e => setAdminForm(f => ({...f, is_superadmin: e.target.checked}))}
                    className="accent-amber-500" />
                  Grant Super Admin access
                </label>
                <button type="submit" disabled={adminSaving}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold
                    px-4 py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">
                  {adminSaving ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
