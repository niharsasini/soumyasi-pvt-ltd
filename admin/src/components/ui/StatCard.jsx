export default function StatCard({
  title, value, subtitle, icon: Icon,
  color = 'amber', trend
}) {
  const colors = {
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }

  return (
    <div className="bg-admin-card border border-admin-border
      rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl border flex
          items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium px-2 py-1
            rounded-full ${trend >= 0
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">
        {value ?? '—'}
      </p>
      <p className="text-slate-400 text-sm">{title}</p>
      {subtitle && (
        <p className="text-slate-600 text-xs mt-1">{subtitle}</p>
      )}
    </div>
  )
}
