'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { formatDateShort } from '@/lib/utils'
import { Briefcase, Plus, Edit, Trash2, Users, FileText } from 'lucide-react'

const EMPTY_JOB = {
  title: '', slug: '', department: '', location: '',
  job_type: 'Full Time', description: '', requirements: '',
  salary_range: '', is_active: true,
}

const APP_STATUSES = ['new', 'reviewed', 'shortlisted', 'rejected', 'hired']

export default function CareersPage() {
  const [tab, setTab] = useState('jobs')
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY_JOB)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [j, a] = await Promise.all([
        api.getJobs(),
        api.getJobApplications(),
      ])
      setJobs(Array.isArray(j) ? j : [])
      setApplications(Array.isArray(a) ? a : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setForm(EMPTY_JOB)
    setModal('add')
  }

  const openEdit = (j) => {
    setForm(j)
    setModal('edit')
  }

  const save = async () => {
    setSaving(true)
    try {
      const { _id, id, created_at, ...rest } = form
      if (modal === 'add') await api.createJob(rest)
      else await api.updateJob(form._id, rest)
      setModal(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  const removeJob = async (id) => {
    if (!confirm('Delete this job listing permanently?')) return
    await api.deleteJob(id)
    load()
  }

  const updateAppStatus = async (id, status) => {
    await api.updateJobApplication(id, { status })
    load()
  }

  return (
    <div>
      <Header title="Careers" subtitle="Manage job listings and applicants" />

      <div className="flex gap-2 mb-6">
        {[
          ['jobs', 'Job Listings', Briefcase],
          ['applications', 'Applicants', Users],
        ].map(([key, label, Icon]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm
              font-medium transition-all border
              ${tab === key
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-admin-card text-slate-400 border-admin-border hover:text-white'
              }`}>
            <Icon className="w-4 h-4" />
            {label}
            {key === 'applications' && applications.length > 0 && (
              <span className="bg-amber-500 text-black text-[10px]
                font-bold px-1.5 py-0.5 rounded-full">
                {applications.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-amber-500
            border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tab === 'jobs' ? (
        <>
          <div className="flex justify-end mb-6">
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-amber-500
                hover:bg-amber-400 text-black font-bold px-4 py-2.5
                rounded-xl text-sm transition-all">
              <Plus className="w-4 h-4" />
              Add Job
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-admin-card
              border border-admin-border rounded-2xl">
              <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">No job listings yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {jobs.map((j, i) => (
                <div key={i} className="bg-admin-card border
                  border-admin-border rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold text-sm">{j.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {j.department} · {j.location}
                      </p>
                    </div>
                    <span className={`text-xs ${j.is_active ? 'text-green-400' : 'text-slate-500'}`}>
                      {j.is_active ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mb-4">
                    {j.job_type}{j.salary_range ? ` · ${j.salary_range}` : ''}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(j)}
                      className="flex-1 flex items-center justify-center
                        gap-1.5 bg-amber-500/10 border border-amber-500/20
                        text-amber-400 rounded-xl py-2 text-xs
                        hover:bg-amber-500/20 transition-all">
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button onClick={() => removeJob(j._id)}
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
        </>
      ) : (
        <div className="bg-admin-card border border-admin-border
          rounded-2xl overflow-hidden">
          {applications.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">No applications yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-admin-border">
                    {['Applicant', 'Job', 'Contact', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left px-6 py-4
                        text-slate-500 text-xs font-medium uppercase
                        tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {applications.map((a, i) => (
                    <tr key={i} className="hover:bg-admin-hover transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium">{a.name}</p>
                        {a.resume_url && (
                          <a href={a.resume_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-amber-400 text-xs hover:underline">
                            <FileText className="w-3 h-3" /> Resume
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{a.job_title}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${a.email}`}
                          className="text-amber-400 text-xs hover:underline block">
                          {a.email}
                        </a>
                        <a href={`tel:${a.phone}`}
                          className="text-slate-400 text-xs hover:underline">
                          {a.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {formatDateShort(a.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={a.status}
                          onChange={e => updateAppStatus(a._id, e.target.value)}
                          className="bg-admin-bg border border-admin-border
                            rounded-lg px-2 py-1.5 text-xs text-white capitalize
                            focus:outline-none focus:border-amber-500/50">
                          {APP_STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add Job Listing' : 'Edit Job Listing'}
        size="lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Title</label>
            <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white focus:outline-none focus:border-amber-500/50" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Slug</label>
            <input value={form.slug} onChange={e => setForm(f => ({...f, slug: e.target.value}))}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white focus:outline-none focus:border-amber-500/50" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Department</label>
            <input value={form.department} onChange={e => setForm(f => ({...f, department: e.target.value}))}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white focus:outline-none focus:border-amber-500/50" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Location</label>
            <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white focus:outline-none focus:border-amber-500/50" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Job Type</label>
            <select value={form.job_type} onChange={e => setForm(f => ({...f, job_type: e.target.value}))}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white focus:outline-none focus:border-amber-500/50">
              {['Full Time', 'Part Time', 'Contract', 'Internship'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Salary Range</label>
            <input value={form.salary_range || ''} onChange={e => setForm(f => ({...f, salary_range: e.target.value}))}
              placeholder="e.g. ₹4-6 LPA"
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50" />
          </div>
          <div className="col-span-2">
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
              rows={3}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white resize-none focus:outline-none focus:border-amber-500/50" />
          </div>
          <div className="col-span-2">
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Requirements</label>
            <textarea value={form.requirements} onChange={e => setForm(f => ({...f, requirements: e.target.value}))}
              rows={3}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5
                text-sm text-white resize-none focus:outline-none focus:border-amber-500/50" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-300 mt-4">
          <input type="checkbox" checked={form.is_active}
            onChange={e => setForm(f => ({...f, is_active: e.target.checked}))}
            className="accent-amber-500" />
          Active (accepting applications)
        </label>
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
            {saving ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
