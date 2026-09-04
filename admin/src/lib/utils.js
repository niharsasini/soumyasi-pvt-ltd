export function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export function formatDateShort(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

export function getStatusColor(status) {
  const map = {
    new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    read: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    responded: 'bg-green-500/20 text-green-400 border-green-500/30',
    closed: 'bg-gray-600/20 text-gray-500 border-gray-600/30',
    called: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    site_visit_scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    site_visit_done: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    agreement_sent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    on_hold: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    Active: 'bg-green-500/20 text-green-400 border-green-500/30',
    'Coming Soon': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Maintenance: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    reviewed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    shortlisted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    hired: 'bg-green-500/20 text-green-400 border-green-500/30',
    draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    published: 'bg-green-500/20 text-green-400 border-green-500/30',
  }
  return map[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

export function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
