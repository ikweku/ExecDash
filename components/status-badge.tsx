import { NormalizedStatus } from '@/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: NormalizedStatus
  className?: string
}

const statusStyles: Record<NormalizedStatus, string> = {
  'Done': 'bg-emerald-100 text-emerald-800 border-emerald-200/60 shadow-sm',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200/60 shadow-sm',
  'In Review': 'bg-amber-100 text-amber-800 border-amber-200/60 shadow-sm',
  'To Do': 'bg-slate-100 text-slate-700 border-slate-200/60 shadow-sm',
  'Blocked': 'bg-rose-100 text-rose-800 border-rose-200/60 shadow-sm',
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm',
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  )
}
