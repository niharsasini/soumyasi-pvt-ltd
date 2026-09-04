import { getStatusColor } from '@/lib/utils'

export default function Badge({ status, label }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1
      rounded-full text-xs font-medium border capitalize
      ${getStatusColor(status)}`}>
      {label || status?.replace(/_/g, ' ')}
    </span>
  )
}
