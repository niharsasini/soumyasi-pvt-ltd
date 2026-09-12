'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { timeAgo } from '@/lib/utils'
import {
  Mail, Zap, MapPin, Users, ArrowRight, FileText, FolderOpen,
  CheckCircle2, AlertTriangle, XCircle, Building2, Phone, Clock,
} from 'lucide-react'

const TARGETS = { contacts: 50, ev_partners: 30, ev_stations: 20, newsletter: 500 }

const STAT_CARDS = [
  { key: 'contacts', label: 'Contact Enquiries', icon: Mail, color: 'amber' },
  { key: 'ev_partners', label: 'EV Partners', icon: Zap, color: 'emerald' },
  { key: 'ev_stations', label: 'Active EV Stations', icon: MapPin, color: 'blue' },
  { key: 'newsletter', label: 'Newsletter', icon: Users, color: 'purple' },
]

const COLOR_CLASSES = {
  amber: { icon: 'bg-amber-500/10 text-amber-400 border-amber-500/20', bar: 'bg-amber-500' },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', bar: 'bg-emerald-500' },
  blue: { icon: 'bg-blue-500/10 text-blue-400 border-blue-500/20', bar: 'bg-blue-500' },
  purple: { icon: 'bg-purple-500/10 text-purple-400 border-purple-500/20', bar: 'bg-purple-500' },
}

const QUICK_ACTIONS = [
  { href: '/dashboard/ev-stations', icon: MapPin, title: 'Add EV Station', desc: 'Register a new charging point', color: 'emerald' },
  { href: '/dashboard/contacts', icon: Mail, title: 'View Enquiries', desc: 'Respond to contact requests', color: 'amber' },
  { href: '/dashboard/blog', icon: FileText, title: 'Add Blog Post', desc: 'Publish a new article', color: 'blue' },
  { href: '/dashboard/projects', icon: FolderOpen, title: 'Add Project', desc: 'Showcase completed work', color: 'orange' },
]

const ACTION_COLOR_CLASSES = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

function getGreeting(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const [now, setNow] = useState(new Date())
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState('checking')
  const [dbStatus, setDbStatus] = useState('checking')
  const user = getUser()

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    fetch(`${api.baseURL}/health`)
      .then(res => setApiStatus(res.ok ? 'online' : 'offline'))
      .catch(() => setApiStatus('offline'))

    Promise.all([
      api.getDashboard(),
      api.getContacts('?limit=5'),
      api.getEVPartners('?limit=5'),
    ]).then(([s, contacts, evApps]) => {
      setStats(s)
      setDbStatus('online')

      const merged = [
        ...(Array.isArray(contacts) ? contacts : []).map(c => ({
          id: `c-${c._id}`,
          dot: 'bg-amber-500',
          text: `New enquiry from ${c.name}`,
          time: c.created_at,
        })),
        ...(Array.isArray(evApps) ? evApps : []).map(a => ({
          id: `e-${a._id}`,
          dot: 'bg-emerald-500',
          text: `EV partner application from ${a.name}`,
          time: a.created_at,
        })),
      ].sort((a, b) => new Date(b.time) - new Date(a.time))

      setActivity(merged)
    }).catch(() => {
      setDbStatus('offline')
    }).finally(() => setLoading(false))
  }, [])

  const username = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : 'Admin'

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      {/* Welcome banner */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-6 mb-8 border-l-4 border-amber-500"
        style={{ background: 'linear-gradient(135deg, #1e2235, #252840)' }}
      >
        <div>
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            {getGreeting(now.getHours())}, {username} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Here&apos;s your Soumyashi Power overview
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-white font-semibold text-sm">
            {now.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-amber-400 text-xs mt-0.5 font-mono">
            {now.toLocaleTimeString('en-IN')}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ key, label, icon: Icon, color }) => {
          const value = key === 'contacts' ? stats?.contacts?.total
            : key === 'ev_partners' ? stats?.ev_partners?.total
            : key === 'ev_stations' ? stats?.ev_stations?.total_active
            : stats?.newsletter?.total_subscribers
          const newCount = key === 'contacts' ? stats?.contacts?.new
            : key === 'ev_partners' ? stats?.ev_partners?.new
            : null
          const target = TARGETS[key]
          const pct = Math.min(100, Math.round(((value || 0) / target) * 100))
          const cls = COLOR_CLASSES[color]

          return (
            <div key={key} className="bg-admin-card border border-admin-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cls.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {newCount !== null ? (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${cls.icon}`}>
                    +{newCount} new
                  </span>
                ) : (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${cls.icon}`}>
                    Live
                  </span>
                )}
              </div>
              <p className="text-4xl font-black text-white mb-1">{value ?? 0}</p>
              <p className="text-slate-400 text-sm mb-4">{label}</p>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${cls.bar}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-slate-600 text-[11px] mt-1.5">{pct}% of {target} target</p>
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {QUICK_ACTIONS.map(({ href, icon: Icon, title, desc, color }) => (
          <Link key={href} href={href}
            className="group flex items-start gap-3 bg-admin-card border border-admin-border rounded-2xl p-5 hover:border-amber-500/40 hover:bg-admin-hover transition-all">
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${ACTION_COLOR_CLASSES[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold">{title}</p>
              <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>

      {/* Activity + System status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent activity — 60% */}
        <div className="lg:col-span-3 bg-admin-card border border-admin-border rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-5">Recent Activity</h3>
          {activity.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-10">No recent activity</p>
          ) : (
            <div className="space-y-1">
              {activity.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-2.5 border-b border-admin-border last:border-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                  <p className="flex-1 text-slate-300 text-sm truncate">{item.text}</p>
                  <span className="text-slate-600 text-xs flex-shrink-0">{timeAgo(item.time)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System status — 40% */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-admin-card border border-admin-border rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              <StatusRow label="Backend API" status={apiStatus} okText="Online" />
              <StatusRow label="MongoDB" status={dbStatus} okText="Connected" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Email</span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" /> Configure Gmail
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 text-[11px] mt-4 pt-4 border-t border-admin-border">
              <Clock className="w-3 h-3" />
              Last updated: {now.toLocaleTimeString('en-IN')}
            </div>
          </div>

          <div className="bg-admin-card border border-admin-border rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Company Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Building2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                Soumyashi Power Limited
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                MIG-126, Bhimatangi, Bhubaneswar
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                +91 94376 11129
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                soumyashipower@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusRow({ label, status, okText }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      {status === 'checking' ? (
        <span className="flex items-center gap-1.5 text-slate-500">
          <div className="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
          Checking...
        </span>
      ) : status === 'online' ? (
        <span className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" /> {okText}
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-red-400">
          <XCircle className="w-3.5 h-3.5" /> Offline
        </span>
      )}
    </div>
  )
}
