'use client'

export default function BlogForm({ form, setForm }) {
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
          <input value={form.category} onChange={set('category')}
            placeholder="e.g. Solar"
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Author
          </label>
          <input value={form.author} onChange={set('author')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Image URL
          </label>
          <input value={form.image_url} onChange={set('image_url')}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Excerpt
          </label>
          <textarea value={form.excerpt} onChange={set('excerpt')}
            rows={2}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white resize-none
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Content
          </label>
          <textarea value={form.content} onChange={set('content')}
            rows={6}
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white resize-none
              focus:outline-none focus:border-amber-500/50" />
        </div>

        <div className="col-span-2">
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">
            Tags (comma separated)
          </label>
          <input value={form.tagsText} onChange={set('tagsText')}
            placeholder="solar, subsidy, rooftop"
            className="w-full bg-admin-bg border border-admin-border
              rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600
              focus:outline-none focus:border-amber-500/50" />
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
