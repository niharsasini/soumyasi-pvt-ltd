'use client'

const CATEGORIES = ['Solar', 'EV', 'Wind', 'Industrial']

export default function ProjectForm({ form, setForm }) {
  const set = (field) => (e) => setForm(f => ({...f, [field]: e.target.value}))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Title
          </label>
          <input value={form.title} onChange={set('title')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Slug
          </label>
          <input value={form.slug} onChange={set('slug')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Category
          </label>
          <select value={form.category} onChange={set('category')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            City
          </label>
          <input value={form.city} onChange={set('city')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Capacity
          </label>
          <input value={form.capacity} onChange={set('capacity')}
            placeholder="e.g. 50MW"
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Location
          </label>
          <input value={form.location} onChange={set('location')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Description
          </label>
          <textarea value={form.description} onChange={set('description')}
            rows={3}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white resize-none
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Highlights (comma separated)
          </label>
          <input value={form.highlightsText} onChange={set('highlightsText')}
            placeholder="Grid-connected, 100% commissioned, ..."
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Image URL
          </label>
          <input value={form.image_url} onChange={set('image_url')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Completed Date
          </label>
          <input value={form.completed_date} onChange={set('completed_date')}
            placeholder="e.g. Mar 2025"
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Status
          </label>
          <select value={form.status} onChange={set('status')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50">
            {['Completed', 'Ongoing', 'Upcoming'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={form.is_published}
          onChange={e => setForm(f => ({...f, is_published: e.target.checked}))}
          className="accent-amber-500" />
        Published (visible on website)
      </label>
    </div>
  )
}
