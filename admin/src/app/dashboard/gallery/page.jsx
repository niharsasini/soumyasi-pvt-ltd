'use client'
import { useRef, useState } from 'react'
import Header from '@/components/layout/Header'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary'
import { Info, Upload, MapPin, Edit, Image as ImageIcon, Copy, AlertTriangle } from 'lucide-react'

const FRONTEND_URL = 'https://www.soumyashipower.in'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const INITIAL_GALLERY_ITEMS = [
  {
    id: 1,
    category: 'Solar',
    title: 'Rooftop Solar Installation',
    location: 'Manufacturing Plant, Bhubaneswar',
    capacity: '500 kW',
    description: 'Ground-mount solar system powering a full manufacturing facility',
    image: '/soumyasi/solar-field-odisha.png',
  },
  {
    id: 2,
    category: 'EV Charging',
    title: 'Ultra 60 Thunder Charge',
    location: 'Commercial Hub, Bhubaneswar',
    capacity: '60 kW DC',
    description: 'Dual connector fast charging station serving urban EV users',
    image: '/soumyasi/ev-charger-ultra60.png',
  },
  {
    id: 3,
    category: 'Wind Power',
    title: 'Wind Energy Project',
    location: 'Coastal Odisha',
    capacity: '2 MW',
    description: 'Harnessing Odisha coastline wind for clean power generation',
    image: '/soumyasi/wind-power-plant.png',
  },
  {
    id: 4,
    category: 'Industrial',
    title: 'Industrial Power Supply',
    location: 'Industrial Park, Rourkela',
    capacity: '5 MVA',
    description: 'Complete substation and switchgear for industrial complex',
    image: '/soumyasi/industrial-power.png',
  },
  {
    id: 5,
    category: 'Solar',
    title: 'Commercial Solar Setup',
    location: 'Office Complex, Cuttack',
    capacity: '200 kW',
    description: 'Rooftop solar reducing electricity costs by 85%',
    image: '/soumyasi/solar-field-odisha.png',
  },
  {
    id: 6,
    category: 'EV Charging',
    title: 'EV Hub at Hotel',
    location: 'Hotel Parking, Puri',
    capacity: '60 kW DC',
    description: 'Charging station serving hotel guests 24/7',
    image: '/soumyasi/ev-charger-ultra60.png',
  },
]

const CATEGORY_STYLES = {
  Solar: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'EV Charging': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Wind Power': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Industrial: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Uncategorized: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function imageSrc(image) {
  return image.startsWith('http') ? image : `${FRONTEND_URL}${image}`
}

export default function GalleryPage() {
  const [items, setItems] = useState(INITIAL_GALLERY_ITEMS)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '' })
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedUrl, setUploadedUrl] = useState(null)
  const fileInputRef = useRef(null)
  const { showToast } = useToast()
  const cloudinaryReady = isCloudinaryConfigured()

  const triggerFileInput = () => fileInputRef.current?.click()

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

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
    setUploadedUrl(null)

    try {
      const result = await uploadToCloudinary(file, setProgress)
      setUploadedUrl(result.url)
      setItems(prev => [...prev, {
        id: Date.now(),
        category: 'Uncategorized',
        title: file.name.replace(/\.[^.]+$/, ''),
        location: '',
        capacity: '',
        description: '',
        image: result.url,
      }])
      showToast('Image uploaded! Add the URL to frontend/src/components/sections/home/Gallery.jsx', 'success')
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error')
    } finally {
      setUploading(false)
    }
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({ title: item.title, description: item.description })
  }

  const saveEdit = () => {
    setItems(items.map(i => i.id === editing.id ? { ...i, ...form } : i))
    setEditing(null)
    showToast('Preview updated. This does not change the live site yet — update frontend/src/components/sections/home/Gallery.jsx to publish changes.', 'info')
  }

  return (
    <div>
      <Header title="Gallery Management" subtitle="Manage project photos shown on the website" />

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-300 text-sm">
          Existing gallery images are stored in <code className="text-blue-300">frontend/public/soumyasi/</code>.
          New images can now be uploaded directly to Cloudinary below.
        </p>
      </div>

      {/* Upload dropzone */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        onClick={!uploading ? triggerFileInput : undefined}
        className="border-2 border-dashed border-admin-border rounded-2xl p-8 text-center hover:border-amber-500/40 transition cursor-pointer bg-admin-card"
      >
        {uploading ? (
          <div>
            <div className="w-full bg-admin-border rounded-full h-2 mb-3 max-w-sm mx-auto">
              <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-slate-400 text-sm">Uploading... {progress}%</p>
          </div>
        ) : (
          <div>
            <Upload className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-white font-medium">Click to upload image</p>
            <p className="text-slate-500 text-sm mt-1">PNG, JPG up to 10MB</p>
          </div>
        )}
      </div>

      {uploadedUrl && (
        <div className="bg-admin-card border border-amber-500/20 rounded-xl p-4 mt-4">
          <p className="text-amber-400 text-sm font-medium mb-2">
            ✅ Image uploaded successfully!
          </p>
          <p className="text-slate-400 text-xs mb-2">
            Image URL (copy and add to Gallery.jsx):
          </p>
          <div className="flex gap-2">
            <input value={uploadedUrl} readOnly
              className="flex-1 bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-xs text-white" />
            <button
              onClick={() => {
                navigator.clipboard.writeText(uploadedUrl)
                showToast('Copied to clipboard', 'success')
              }}
              className="flex items-center gap-1.5 bg-amber-500 text-black px-3 py-2 rounded-lg text-xs font-bold">
              <Copy className="w-3.5 h-3.5" />
              Copy
            </button>
          </div>
        </div>
      )}

      {!cloudinaryReady && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mt-6 flex gap-3">
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

      <div className="flex items-center justify-between mt-8 mb-6">
        <p className="text-slate-400 text-sm">
          {items.length} gallery item{items.length !== 1 ? 's' : ''} shown on the homepage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden">
            <div className="relative aspect-[4/3] bg-admin-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc(item.image)}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className={`absolute top-3 left-3 rounded-full px-2.5 py-1
                text-[10px] font-bold border backdrop-blur-sm ${CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Uncategorized}`}>
                {item.category}
              </span>
              {item.capacity && (
                <span className="absolute top-3 right-3 rounded-full px-2.5 py-1
                  text-[10px] font-bold bg-black/50 backdrop-blur-sm text-white border border-white/20">
                  {item.capacity}
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-white text-sm font-semibold leading-tight">{item.title}</p>
              {item.location && (
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1.5">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </div>
              )}
              {item.description && (
                <p className="text-slate-500 text-xs mt-2 line-clamp-2">{item.description}</p>
              )}
              <button onClick={() => openEdit(item)}
                className="w-full flex items-center justify-center gap-1.5
                  bg-amber-500/10 border border-amber-500/20 text-amber-400
                  rounded-xl py-2 text-xs mt-3 hover:bg-amber-500/20 transition-all">
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Gallery Item">
        {editing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-admin-bg border border-admin-border rounded-xl p-3">
              <ImageIcon className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <p className="text-slate-500 text-xs truncate">{editing.image}</p>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl
                  px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full bg-admin-bg border border-admin-border rounded-xl
                  px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditing(null)}
                className="flex-1 border border-admin-border text-slate-400
                  hover:text-white rounded-xl py-2.5 text-sm transition-all">
                Cancel
              </button>
              <button onClick={saveEdit}
                className="flex-1 bg-amber-500 hover:bg-amber-400
                  text-black font-bold rounded-xl py-2.5 text-sm">
                Save Preview
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
