'use client'
import { useEffect, useRef, useState } from 'react'
import Header from '@/components/layout/Header'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { api } from '@/lib/api'
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary'
import {
  Plus, Upload, Trash2, ChevronDown, ChevronRight, Folder,
  AlertTriangle, ImageIcon,
} from 'lucide-react'

// Only the category/subcategory organization tree lives here — not the photos
// themselves. Photos are real GalleryItem documents in MongoDB (created via
// api.createGalleryItem / fetched via api.getGalleryItems) so an upload is
// visible across browsers and on the public website immediately. Storing
// photos in localStorage instead would make them exist only in the browser
// that uploaded them, which defeats the point of "connect gallery to website".
const TREE_STORAGE_KEY = 'sp_gallery_v2'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const DEFAULT_TREE = {
  'EV Charging': ['Ultra 60 Thunder Charge'],
  'Solar': ['Rooftop Solar', 'Ground Mount Solar'],
  'Wind Power': ['Wind Turbines'],
  'Industrial': ['Substations', 'Switchgear'],
}

const CATEGORY_ICON = {
  'EV Charging': '⚡',
  'Solar': '☀️',
  'Wind Power': '🌬️',
  'Industrial': '🏭',
}

export default function GalleryPage() {
  const [tree, setTree] = useState(DEFAULT_TREE)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(new Set())
  const [selected, setSelected] = useState(null) // {category, subcategory}
  const [addModal, setAddModal] = useState(false)
  const [addForm, setAddForm] = useState({ name: '', parent: '__new__' })
  const [uploadModal, setUploadModal] = useState(false)
  const [placeName, setPlaceName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const fileInputRef = useRef(null)
  const { showToast } = useToast()
  const cloudinaryReady = isCloudinaryConfigured()

  // Load category tree (organization structure only — lives in the browser)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(TREE_STORAGE_KEY)
      if (saved) setTree(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(TREE_STORAGE_KEY, JSON.stringify(tree))
    } catch {}
  }, [tree])

  // Load actual photos from the real backend — this is what the public site reads too
  const loadItems = async () => {
    setLoading(true)
    try {
      const data = await api.getGalleryItems()
      setItems(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadItems() }, [])

  const itemsFor = (category, subcategory) =>
    items.filter(i => i.category === category && i.subcategory === subcategory)

  const toggleCategory = (category) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(category) ? next.delete(category) : next.add(category)
      return next
    })
  }

  const openAddModal = () => {
    setAddForm({ name: '', parent: '__new__' })
    setAddModal(true)
  }

  const saveCategory = () => {
    const name = addForm.name.trim()
    if (!name) return

    if (addForm.parent === '__new__') {
      if (tree[name]) {
        showToast('That category already exists.', 'error')
        return
      }
      setTree(prev => ({ ...prev, [name]: [] }))
      setExpanded(prev => new Set(prev).add(name))
    } else {
      if (tree[addForm.parent]?.includes(name)) {
        showToast('That subcategory already exists.', 'error')
        return
      }
      setTree(prev => ({
        ...prev,
        [addForm.parent]: [...(prev[addForm.parent] || []), name],
      }))
      setExpanded(prev => new Set(prev).add(addForm.parent))
    }
    setAddModal(false)
    showToast('Category added', 'success')
  }

  const openUpload = () => {
    setPlaceName('')
    setUploadModal(true)
  }

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!placeName.trim()) {
      showToast('Enter a place/location name.', 'error')
      return
    }
    if (!file) {
      showToast('Choose an image to upload.', 'error')
      return
    }
    if (!cloudinaryReady) {
      showToast('Cloudinary is not configured yet. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in Vercel env vars.', 'error')
      return
    }
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file.', 'error')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      showToast('Image is larger than 10MB.', 'error')
      return
    }

    setUploading(true)
    setProgress(0)
    try {
      const result = await uploadToCloudinary(file, setProgress)
      await api.createGalleryItem({
        title: placeName.trim(),
        category: selected.category,
        subcategory: selected.subcategory,
        location: placeName.trim(),
        image_url: result.url,
      })
      await loadItems()
      setUploadModal(false)
      showToast('Photo uploaded and published to the website gallery!', 'success')
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error')
    } finally {
      setUploading(false)
    }
  }

  const removePhoto = async (item) => {
    if (!confirm('Delete this photo? This removes it from the live website too.')) return
    await api.deleteGalleryItem(item._id)
    setItems(prev => prev.filter(i => i._id !== item._id))
  }

  return (
    <div>
      <Header title="Gallery Management" subtitle="Manage project photos shown on the website" />

      {!cloudinaryReady && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-slate-300 text-sm space-y-1">
            <p className="text-amber-400 font-medium mb-1">How to set up Cloudinary (free)</p>
            <p>1. Go to cloudinary.com → sign up free</p>
            <p>2. Dashboard → Settings → Upload → Upload presets</p>
            <p>3. Create an unsigned upload preset</p>
            <p>4. Copy your Cloud Name and Preset name</p>
            <p>5. Add to Vercel: soumyashi-admin → Settings → Environment Variables:</p>
            <p className="font-mono text-xs text-slate-400 ml-4">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your-cloud-name</p>
            <p className="font-mono text-xs text-slate-400 ml-4">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = your-preset</p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel — category tree */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-sm">Gallery</h3>
            <button onClick={openAddModal}
              className="flex items-center gap-1 text-amber-400 text-xs
                hover:text-amber-300 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Category
            </button>
          </div>

          <div className="bg-admin-card border border-admin-border rounded-2xl p-2 space-y-0.5">
            {Object.keys(tree).length === 0 && (
              <p className="text-slate-500 text-xs text-center py-6">No categories yet</p>
            )}
            {Object.entries(tree).map(([category, subs]) => {
              const isExpanded = expanded.has(category)
              return (
                <div key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl
                      text-sm text-slate-300 hover:bg-admin-hover transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />}
                    <Folder className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                    <span className="flex-1 text-left truncate">{category}</span>
                  </button>
                  {isExpanded && (
                    <div className="ml-4 border-l border-admin-border pl-2 space-y-0.5 mb-1">
                      {subs.length === 0 && (
                        <p className="text-slate-600 text-xs px-3 py-1.5">No subcategories</p>
                      )}
                      {subs.map(sub => {
                        const isActive = selected?.category === category && selected?.subcategory === sub
                        const count = itemsFor(category, sub).length
                        return (
                          <button
                            key={sub}
                            onClick={() => setSelected({ category, subcategory: sub })}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors
                              ${isActive
                                ? 'bg-amber-500/10 border-l-2 border-amber-500 text-amber-400'
                                : 'text-slate-400 hover:bg-admin-hover hover:text-white'}`}
                          >
                            <span>{CATEGORY_ICON[category] || '📍'}</span>
                            <span className="flex-1 text-left truncate">{sub}</span>
                            <span className="text-slate-600">({count})</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : selected ? (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-white font-semibold">
                  <span className="text-slate-500">{selected.category}</span>
                  <span className="text-slate-600 mx-2">/</span>
                  {selected.subcategory}
                </h2>
                <button onClick={openUpload}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400
                    text-black font-bold px-4 py-2.5 rounded-xl text-sm transition-all">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </button>
              </div>

              {itemsFor(selected.category, selected.subcategory).length === 0 ? (
                <div className="bg-admin-card border border-admin-border rounded-2xl py-16 text-center">
                  <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No photos yet in this subcategory</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {itemsFor(selected.category, selected.subcategory).map(item => (
                    <div key={item._id} className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden group relative">
                      <button
                        onClick={() => removePhoto(item)}
                        className="absolute top-2 right-2 z-10 w-7 h-7 bg-black/60 backdrop-blur
                          rounded-lg flex items-center justify-center text-white
                          hover:bg-red-500/80 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div
                        onClick={() => setLightbox(item)}
                        className="relative aspect-[4/3] bg-admin-bg cursor-pointer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image_url} alt={item.location}
                          className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-3">
                        <p className="text-white text-sm font-medium truncate">{item.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-white font-semibold mb-6">All Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(tree).map(([category, subs]) => {
                  const totalPhotos = subs.reduce((sum, s) => sum + itemsFor(category, s).length, 0)
                  return (
                    <button
                      key={category}
                      onClick={() => setExpanded(prev => new Set(prev).add(category))}
                      className="text-left bg-admin-card border border-admin-border rounded-2xl p-5
                        hover:border-amber-500/40 hover:bg-admin-hover transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20
                          flex items-center justify-center text-lg">
                          {CATEGORY_ICON[category] || '📁'}
                        </div>
                        <p className="text-white font-semibold">{category}</p>
                      </div>
                      <p className="text-slate-500 text-xs">
                        {subs.length} subcategor{subs.length === 1 ? 'y' : 'ies'} · {totalPhotos} photo{totalPhotos === 1 ? '' : 's'}
                      </p>
                    </button>
                  )
                })}
              </div>
              {Object.keys(tree).length === 0 && (
                <p className="text-slate-500 text-sm text-center py-16">No categories yet. Click &lsquo;+ Add Category&rsquo; to start.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Category modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add Category">
        <div className="space-y-4">
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Category / Subcategory Name</label>
            <input
              type="text"
              value={addForm.name}
              onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Rooftop Solar"
              className="w-full bg-admin-bg border border-admin-border rounded-xl
                px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Select parent category</label>
            <select
              value={addForm.parent}
              onChange={e => setAddForm(f => ({ ...f, parent: e.target.value }))}
              className="w-full bg-admin-bg border border-admin-border rounded-xl
                px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="__new__">New top-level category</option>
              {Object.keys(tree).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setAddModal(false)}
              className="flex-1 border border-admin-border text-slate-400
                hover:text-white rounded-xl py-2.5 text-sm transition-all">
              Cancel
            </button>
            <button onClick={saveCategory}
              className="flex-1 bg-amber-500 hover:bg-amber-400
                text-black font-bold rounded-xl py-2.5 text-sm">
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Upload Photo modal */}
      <Modal isOpen={uploadModal} onClose={() => !uploading && setUploadModal(false)} title="Upload Photo">
        <div className="space-y-4">
          <p className="text-slate-500 text-xs">
            {selected?.category} <span className="mx-1">/</span> {selected?.subcategory}
          </p>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Place / Location Name</label>
            <input
              type="text"
              value={placeName}
              onChange={e => setPlaceName(e.target.value)}
              placeholder="e.g. Patia, Bhubaneswar"
              className="w-full bg-admin-bg border border-admin-border rounded-xl
                px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Photo</label>
            <input ref={fileInputRef} type="file" accept="image/*"
              className="w-full bg-admin-bg border border-admin-border rounded-xl
                px-4 py-2.5 text-sm text-white file:mr-3 file:py-1 file:px-3
                file:rounded-lg file:border-0 file:bg-amber-500 file:text-black
                file:text-xs file:font-bold" />
          </div>
          {uploading && (
            <div>
              <div className="w-full bg-admin-border rounded-full h-2 mb-2">
                <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-slate-400 text-xs">Uploading... {progress}%</p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => setUploadModal(false)} disabled={uploading}
              className="flex-1 border border-admin-border text-slate-400
                hover:text-white rounded-xl py-2.5 text-sm transition-all disabled:opacity-50">
              Cancel
            </button>
            <button onClick={handleUpload} disabled={uploading}
              className="flex-1 bg-amber-500 hover:bg-amber-400
                text-black font-bold rounded-xl py-2.5 text-sm disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Lightbox */}
      <Modal isOpen={!!lightbox} onClose={() => setLightbox(null)} title={lightbox?.location || ''} size="lg">
        {lightbox && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={lightbox.image_url} alt={lightbox.location} className="w-full rounded-xl" />
        )}
      </Modal>
    </div>
  )
}
