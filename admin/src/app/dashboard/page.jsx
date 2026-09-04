'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import StatCard from '@/components/ui/StatCard'
import Header from '@/components/layout/Header'
import { formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import {
  Mail, Zap, MapPin, Users,
  TrendingUp, Clock, CheckCircle
} from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [contacts, setContacts] = useState([])
  const [evApps, setEVApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getDashboard(),
      api.getContacts('?limit=5'),
      api.getEVPartners('?limit=5'),
    ]).then(([s, c, e]) => {
      setStats(s)
      setContacts(Array.isArray(c) ? c : [])
      setEVApps(Array.isArray(e) ? e : [])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-amber-500
        border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle={`Welcome back! Here's what's happening.`}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Contact Enquiries"
          value={stats?.contacts?.total || 0}
          subtitle={`${stats?.contacts?.new || 0} new unread`}
          icon={Mail}
          color="amber"
        />
        <StatCard
          title="EV Partner Applications"
          value={stats?.ev_partners?.total || 0}
          subtitle={`${stats?.ev_partners?.new || 0} need action`}
          icon={Zap}
          color="green"
        />
        <StatCard
          title="Active EV Stations"
          value={stats?.ev_stations?.total_active || 0}
          subtitle="Across Odisha"
          icon={MapPin}
          color="blue"
        />
        <StatCard
          title="Newsletter Subscribers"
          value={stats?.newsletter?.total_subscribers || 0}
          subtitle="Active subscribers"
          icon={Users}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Contacts */}
        <div className="bg-admin-card border border-admin-border
          rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">
              Recent Enquiries
            </h3>
            <a href="/dashboard/contacts"
              className="text-amber-400 text-xs hover:underline">
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-6">
                No enquiries yet
              </p>
            ) : contacts.map((c, i) => (
              <div key={i} className="flex items-start gap-3
                py-3 border-b border-admin-border last:border-0">
                <div className="w-8 h-8 bg-amber-500/10
                  border border-amber-500/20 rounded-lg
                  flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 text-xs font-bold">
                    {c.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium
                      truncate">{c.name}</p>
                    <Badge status={c.status} />
                  </div>
                  <p className="text-slate-500 text-xs truncate">
                    {c.service || 'General'} · {formatDate(c.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent EV Applications */}
        <div className="bg-admin-card border border-admin-border
          rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">
              EV Partner Applications
            </h3>
            <a href="/dashboard/ev-partners"
              className="text-amber-400 text-xs hover:underline">
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {evApps.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-6">
                No applications yet
              </p>
            ) : evApps.map((app, i) => (
              <div key={i} className="flex items-start gap-3
                py-3 border-b border-admin-border last:border-0">
                <div className="w-8 h-8 bg-green-500/10
                  border border-green-500/20 rounded-lg
                  flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium
                      truncate">{app.name}</p>
                    <Badge status={app.status} />
                  </div>
                  <p className="text-slate-500 text-xs truncate">
                    {app.city} · {app.location_type}
                  </p>
                  <a href={`tel:${app.phone}`}
                    className="text-green-400 text-xs
                      hover:underline">
                    {app.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
