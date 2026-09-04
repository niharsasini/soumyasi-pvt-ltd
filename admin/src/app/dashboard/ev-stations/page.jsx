'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { MapPin, Plus, Edit, Trash2, Zap } from 'lucide-react'
import EVStationForm from '@/components/forms/EVStationForm'

const EMPTY_STATION = {
  name: '', city: '', address: '',
  lat: '', lng: '', charger_type: 'Fast',
  power_kw: 60, connectors: 2, status: 'Active',
  working_hours: '24/7', operator_name: '', operator_phone: ''
}

export default function EVStationsPage() {
  const [stations, setStations] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY_STATION)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getEVStations()
      setStations(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setForm(EMPTY_STATION)
    setModal('add')
  }

  const openEdit = (s) => {
    setForm({...s, lat: String(s.lat), lng: String(s.lng)})
    setModal('edit')
  }

  const save = async () => {
    setSaving(true)
    try {
      const data = {...form,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        power_kw: parseInt(form.power_kw)
      }
      if (modal === 'add') await api.createEVStation(data)
      else await api.updateEVStation(form._id, data)
      setModal(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Deactivate this station?')) return
    await api.deleteEVStation(id)
    load()
  }

  return (
    <div>
      <Header title="EV Stations" subtitle="Manage charging network" />

      <div className="flex justify-end mb-6">
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-amber-500
            hover:bg-amber-400 text-black font-bold px-4 py-2.5
            rounded-xl text-sm transition-all">
          <Plus className="w-4 h-4" />
          Add Station
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-amber-500
            border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2
          xl:grid-cols-3 gap-4">
          {stations.map((s, i) => (
            <div key={i} className="bg-admin-card border
              border-admin-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-500/10
                    border border-amber-500/20 rounded-lg
                    flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold
                      leading-tight">{s.name}</p>
                    <p className="text-slate-500 text-xs">{s.city}</p>
                  </div>
                </div>
                <Badge status={s.status} />
              </div>
              <div className="space-y-1 mb-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {s.address}
                </div>
                <p>⚡ {s.power_kw}kW · {s.charger_type} ·
                  {s.connectors} connectors</p>
                <p>🕐 {s.working_hours}</p>
                <p>📍 {s.lat}, {s.lng}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)}
                  className="flex-1 flex items-center justify-center
                    gap-1.5 bg-amber-500/10 border border-amber-500/20
                    text-amber-400 rounded-xl py-2 text-xs
                    hover:bg-amber-500/20 transition-all">
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button onClick={() => remove(s._id)}
                  className="flex items-center justify-center w-9
                    bg-red-500/10 border border-red-500/20 text-red-400
                    rounded-xl hover:bg-red-500/20">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add EV Station' : 'Edit EV Station'}
        size="lg"
      >
        <EVStationForm form={form} setForm={setForm} />
        <div className="flex gap-3 mt-6">
          <button onClick={() => setModal(null)}
            className="flex-1 border border-admin-border text-slate-400
              hover:text-white rounded-xl py-2.5 text-sm transition-all">
            Cancel
          </button>
          <button onClick={save} disabled={saving}
            className="flex-1 bg-amber-500 hover:bg-amber-400
              text-black font-bold rounded-xl py-2.5 text-sm
              disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Station'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
