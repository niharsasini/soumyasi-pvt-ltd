'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import { formatDate } from '@/lib/utils'
import { Users, Download, Trash2, Mail } from 'lucide-react'

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getNewsletterSubscribers()
      setSubscribers(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const remove = async (id) => {
    if (!confirm('Remove this subscriber?')) return
    await api.deleteNewsletterSubscriber(id)
    load()
  }

  const exportCSV = () => {
    const rows = [
      ['Email', 'Status', 'Subscribed On'],
      ...subscribers.map(s => [
        s.email,
        s.is_active ? 'Active' : 'Unsubscribed',
        s.subscribed_at,
      ]),
    ]
    const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'newsletter-subscribers.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <Header title="Newsletter" subtitle="Manage subscriber list" />

      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-400 text-sm">
          {subscribers.length} total subscriber{subscribers.length !== 1 ? 's' : ''}
        </p>
        <button onClick={exportCSV} disabled={subscribers.length === 0}
          className="flex items-center gap-2 bg-amber-500/10 border
            border-amber-500/20 text-amber-400 px-4 py-2.5 rounded-xl
            text-sm hover:bg-amber-500/20 transition-all disabled:opacity-50">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-admin-card border border-admin-border
        rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-amber-500
              border-t-transparent rounded-full animate-spin" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No subscribers yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-admin-border">
                  {['Email', 'Status', 'Subscribed On', 'Action'].map(h => (
                    <th key={h} className="text-left px-6 py-4
                      text-slate-500 text-xs font-medium uppercase
                      tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {subscribers.map((s, i) => (
                  <tr key={i} className="hover:bg-admin-hover transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-white text-sm">{s.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border
                        ${s.is_active
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                        {s.is_active ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {formatDate(s.subscribed_at)}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => remove(s._id)}
                        className="flex items-center gap-1.5 text-slate-400
                          hover:text-red-400 text-xs transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
