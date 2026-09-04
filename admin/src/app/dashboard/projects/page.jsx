'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import Modal from '@/components/ui/Modal'
import ProjectForm from '@/components/forms/ProjectForm'
import { FolderOpen, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

const EMPTY = {
  title: '', slug: '', category: 'Solar', location: '', city: '',
  capacity: '', description: '', highlightsText: '', image_url: '',
  completed_date: '', status: 'Completed', is_published: true,
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getProjects()
      setProjects(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setForm(EMPTY)
    setModal('add')
  }

  const openEdit = (p) => {
    setForm({
      ...p,
      highlightsText: (p.highlights || []).join(', '),
    })
    setModal('edit')
  }

  const save = async () => {
    setSaving(true)
    try {
      const { highlightsText, _id, id, created_at, ...rest } = form
      const data = {
        ...rest,
        highlights: highlightsText
          ? highlightsText.split(',').map(s => s.trim()).filter(Boolean)
          : [],
      }
      if (modal === 'add') await api.createProject(data)
      else await api.updateProject(form._id, data)
      setModal(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this project permanently?')) return
    await api.deleteProject(id)
    load()
  }

  return (
    <div>
      <Header title="Projects" subtitle="Manage completed and ongoing projects" />

      <div className="flex justify-end mb-6">
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-amber-500
            hover:bg-amber-400 text-black font-bold px-4 py-2.5
            rounded-xl text-sm transition-all">
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-amber-500
            border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-admin-card
          border border-admin-border rounded-2xl">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">No projects yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div key={i} className="bg-admin-card border
              border-admin-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold text-sm">{p.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {p.category} · {p.city}
                  </p>
                </div>
                {p.is_published ? (
                  <span className="flex items-center gap-1 text-green-400 text-xs">
                    <Eye className="w-3.5 h-3.5" /> Live
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-500 text-xs">
                    <EyeOff className="w-3.5 h-3.5" /> Draft
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-xs mb-4 line-clamp-2">
                {p.description}
              </p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)}
                  className="flex-1 flex items-center justify-center
                    gap-1.5 bg-amber-500/10 border border-amber-500/20
                    text-amber-400 rounded-xl py-2 text-xs
                    hover:bg-amber-500/20 transition-all">
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button onClick={() => remove(p._id)}
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

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add Project' : 'Edit Project'}
        size="lg"
      >
        <ProjectForm
          form={form}
          setForm={setForm}
        />
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
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
