'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'
import { Zap, Phone, MapPin, Eye, ExternalLink } from 'lucide-react'

const STATUSES = [
  'all','new','called','site_visit_scheduled',
  'site_visit_done','agreement_sent','approved',
  'rejected','on_hold'
]

export default function EVPartnersPage() {
  const [apps, setApps] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? `?status=${filter}` : ''
      const data = await api.getEVPartners(params)
      setApps(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filter])

  const updateApp = async (id, updates) => {
    setSaving(true)
    try {
      await api.updateEVPartner(id, updates)
      load()
      if (selected?._id === id)
        setSelected(p => ({...p, ...updates}))
    } finally {
      setSaving(false)
    }
  }

  const openSelected = (app) => {
    setSelected(app)
    setNotes(app.admin_notes || '')
  }

  return (
    <div>
      <Header
        title="EV Partner Applications"
        subtitle="Manage charging station partnership requests"
      />

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium
              capitalize transition-all border
              ${filter === s
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-admin-card text-slate-400 border-admin-border hover:text-white'
              }`}>
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-amber-500
            border-t-transparent rounded-full animate-spin" />
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center py-16 bg-admin-card
          border border-admin-border rounded-2xl">
          <Zap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">No applications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2
          xl:grid-cols-3 gap-4">
          {apps.map((app, i) => (
            <div key={i} className="bg-admin-card border
              border-admin-border rounded-2xl p-5
              hover:border-amber-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold text-sm">
                    {app.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {app.location_type}
                  </p>
                </div>
                <Badge status={app.status} />
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2
                  text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  {app.city} · {app.address?.substring(0,40)}...
                </div>
                <div className="flex items-center gap-2">
                  <a href={`tel:${app.phone}`}
                    className="flex items-center gap-1.5
                      text-green-400 text-xs hover:underline">
                    <Phone className="w-3.5 h-3.5" />
                    {app.phone}
                  </a>
                </div>
                <p className="text-slate-600 text-xs">
                  {formatDate(app.created_at)}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openSelected(app)}
                  className="flex-1 flex items-center justify-center
                    gap-1.5 bg-amber-500/10 border border-amber-500/20
                    text-amber-400 rounded-xl py-2 text-xs
                    hover:bg-amber-500/20 transition-all">
                  <Eye className="w-3.5 h-3.5" />
                  View Details
                </button>
                <a href={`tel:${app.phone}`}
                  className="flex items-center justify-center
                    w-9 bg-green-500/10 border border-green-500/20
                    text-green-400 rounded-xl hover:bg-green-500/20">
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="EV Partner Application"
        size="xl"
      >
        {selected && (
          <div className="space-y-5">
            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Name', selected.name],
                ['Phone', selected.phone],
                ['Email', selected.email],
                ['City', selected.city],
                ['Location Type', selected.location_type],
                ['Available Space', selected.available_space || '—'],
                ['3-Phase Power', selected.electrical_connection || '—'],
                ['Applied On', formatDate(selected.created_at)],
              ].map(([l, v]) => (
                <div key={l}>
                  <p className="text-slate-500 text-xs mb-1">{l}</p>
                  <p className="text-white text-sm">{v}</p>
                </div>
              ))}
            </div>

            {/* Address */}
            <div>
              <p className="text-slate-500 text-xs mb-1">Address</p>
              <p className="text-white text-sm">{selected.address}</p>
              {selected.google_maps_link && (
                <a href={selected.google_maps_link}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5
                    text-blue-400 text-xs mt-1 hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  View on Google Maps
                </a>
              )}
            </div>

            {/* Documents */}
            {(selected.revenue_patta_url ||
              selected.revenue_map_url ||
              selected.land_papers_url) && (
              <div>
                <p className="text-slate-500 text-xs mb-2">
                  Documents
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selected.revenue_patta_url && (
                    <a href={selected.revenue_patta_url}
                      target="_blank" rel="noopener noreferrer"
                      className="text-amber-400 text-xs border
                        border-amber-500/20 rounded-lg px-3 py-1.5
                        hover:bg-amber-500/10">
                      Revenue Patta
                    </a>
                  )}
                  {selected.revenue_map_url && (
                    <a href={selected.revenue_map_url}
                      target="_blank" rel="noopener noreferrer"
                      className="text-amber-400 text-xs border
                        border-amber-500/20 rounded-lg px-3 py-1.5
                        hover:bg-amber-500/10">
                      Revenue Map
                    </a>
                  )}
                  {selected.land_papers_url && (
                    <a href={selected.land_papers_url}
                      target="_blank" rel="noopener noreferrer"
                      className="text-amber-400 text-xs border
                        border-amber-500/20 rounded-lg px-3 py-1.5
                        hover:bg-amber-500/10">
                      Land Papers
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Status Update */}
            <div>
              <p className="text-slate-500 text-xs mb-2">
                Update Status
              </p>
              <div className="flex flex-wrap gap-2">
                {['new','called','site_visit_scheduled',
                  'site_visit_done','agreement_sent',
                  'approved','rejected','on_hold'].map(s => (
                  <button key={s}
                    onClick={() => updateApp(selected._id, {status: s})}
                    className={`px-3 py-1.5 rounded-lg text-xs
                      capitalize transition-all
                      ${selected.status === s
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-admin-bg text-slate-400 hover:text-white border border-admin-border'
                      }`}>
                    {s.replace(/_/g,' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Notes */}
            <div>
              <p className="text-slate-500 text-xs mb-2">
                Admin Notes
              </p>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Add notes about this application..."
                className="w-full bg-admin-bg border border-admin-border
                  rounded-xl px-4 py-3 text-sm text-white
                  placeholder:text-slate-600 focus:outline-none
                  focus:border-amber-500/50 resize-none"
              />
              <button
                onClick={() => updateApp(selected._id,
                  {admin_notes: notes})}
                disabled={saving}
                className="mt-2 bg-amber-500 hover:bg-amber-400
                  text-black font-bold px-4 py-2 rounded-xl
                  text-sm disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Notes'}
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex gap-3 pt-2 border-t border-admin-border">
              <a href={`tel:${selected.phone}`}
                className="flex items-center gap-2 bg-green-500/10
                  border border-green-500/20 text-green-400
                  rounded-xl px-4 py-2.5 text-sm
                  hover:bg-green-500/20 transition-all">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a href={`https://wa.me/${selected.phone?.replace(/\D/g,'')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500/10
                  border border-green-500/20 text-green-400
                  rounded-xl px-4 py-2.5 text-sm
                  hover:bg-green-500/20 transition-all">
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
