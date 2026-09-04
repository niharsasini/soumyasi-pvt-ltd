'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Header from '@/components/layout/Header'
import Modal from '@/components/ui/Modal'
import BlogForm from '@/components/forms/BlogForm'
import { formatDateShort } from '@/lib/utils'
import { FileText, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

const EMPTY = {
  title: '', slug: '', excerpt: '', content: '', category: '',
  author: 'Soumyashi Power Team', image_url: '', tagsText: '',
  is_published: true,
}

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getBlogPosts()
      setPosts(Array.isArray(data) ? data : [])
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
      tagsText: (p.tags || []).join(', '),
    })
    setModal('edit')
  }

  const save = async () => {
    setSaving(true)
    try {
      const { tagsText, _id, id, created_at, updated_at, ...rest } = form
      const data = {
        ...rest,
        tags: tagsText
          ? tagsText.split(',').map(s => s.trim()).filter(Boolean)
          : [],
      }
      if (modal === 'add') await api.createBlogPost(data)
      else await api.updateBlogPost(form._id, data)
      setModal(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this blog post permanently?')) return
    await api.deleteBlogPost(id)
    load()
  }

  return (
    <div>
      <Header title="Blog Posts" subtitle="Manage articles and updates" />

      <div className="flex justify-end mb-6">
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-amber-500
            hover:bg-amber-400 text-black font-bold px-4 py-2.5
            rounded-xl text-sm transition-all">
          <Plus className="w-4 h-4" />
          Add Post
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-amber-500
            border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-admin-card
          border border-admin-border rounded-2xl">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">No blog posts yet</p>
        </div>
      ) : (
        <div className="bg-admin-card border border-admin-border
          rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-admin-border">
                  {['Title', 'Category', 'Author', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-4
                      text-slate-500 text-xs font-medium uppercase
                      tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {posts.map((p, i) => (
                  <tr key={i} className="hover:bg-admin-hover transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white text-sm font-medium">{p.title}</p>
                      <p className="text-slate-500 text-xs">/{p.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{p.category}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{p.author}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {formatDateShort(p.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      {p.is_published ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs">
                          <Eye className="w-3.5 h-3.5" /> Live
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <EyeOff className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openEdit(p)}
                          className="flex items-center gap-1.5 text-slate-400
                            hover:text-amber-400 text-xs transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button onClick={() => remove(p._id)}
                          className="flex items-center gap-1.5 text-slate-400
                            hover:text-red-400 text-xs transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add Blog Post' : 'Edit Blog Post'}
        size="xl"
      >
        <BlogForm form={form} setForm={setForm} />
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
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
