'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'
import { Mail, Phone, Eye, Filter } from 'lucide-react'

const STATUSES = ['all','new','read','responded','closed']

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? `?status=${filter}` : ''
      const data = await api.getContacts(params)
      setContacts(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (id, status) => {
    await api.updateContact(id, { status })
    load()
    if (selected?._id === id)
      setSelected(p => ({...p, status}))
  }

  return (
    <div>
      <Header
        title="Contact Enquiries"
        subtitle="All contact form submissions"
      />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium
              capitalize transition-all border
              ${filter === s
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-admin-card text-slate-400 border-admin-border hover:text-white'
              }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-admin-card border border-admin-border
        rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-amber-500
              border-t-transparent rounded-full animate-spin" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16">
            <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No enquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-admin-border">
                  {['Name','Service','Phone','Date','Status','Action'].map(h => (
                    <th key={h} className="text-left px-6 py-4
                      text-slate-500 text-xs font-medium uppercase
                      tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {contacts.map((c, i) => (
                  <tr key={i} className="hover:bg-admin-hover
                    transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white text-sm font-medium">
                        {c.name}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {c.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      {c.service || '—'}
                    </td>
                    <td className="px-6 py-4">
                      {c.phone ? (
                        <a href={`tel:${c.phone}`}
                          className="text-amber-400 text-sm hover:underline">
                          {c.phone}
                        </a>
                      ) : '—'}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {formatDate(c.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={c.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelected(c)}
                        className="flex items-center gap-1.5
                          text-slate-400 hover:text-amber-400
                          text-xs transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Enquiry Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Name', selected.name],
                ['Email', selected.email],
                ['Phone', selected.phone || '—'],
                ['Service', selected.service || '—'],
                ['Date', formatDate(selected.created_at)],
                ['Status', <Badge status={selected.status} />],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-slate-500 text-xs mb-1">{label}</p>
                  <p className="text-white text-sm">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Message</p>
              <p className="text-white text-sm bg-admin-bg
                rounded-xl p-4 leading-relaxed">
                {selected.message}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-2">
                Update Status
              </p>
              <div className="flex gap-2 flex-wrap">
                {['new','read','responded','closed'].map(s => (
                  <button key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs
                      font-medium capitalize transition-all
                      ${selected.status === s
                        ? 'bg-amber-500 text-black'
                        : 'bg-admin-bg text-slate-400 hover:text-white border border-admin-border'
                      }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <a href={`mailto:${selected.email}`}
                className="flex items-center gap-2 bg-amber-500/10
                  border border-amber-500/20 text-amber-400 rounded-xl
                  px-4 py-2 text-sm hover:bg-amber-500/20 transition-all">
                <Mail className="w-4 h-4" />
                Reply via Email
              </a>
              {selected.phone && (
                <a href={`tel:${selected.phone}`}
                  className="flex items-center gap-2 bg-green-500/10
                    border border-green-500/20 text-green-400
                    rounded-xl px-4 py-2 text-sm hover:bg-green-500/20">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
