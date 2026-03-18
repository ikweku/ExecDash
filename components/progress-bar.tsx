import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  className?: string
  label?: string
  color?: 'green' | 'yellow' | 'red' | 'blue'
}

const colorClasses = {
  green: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
  yellow: 'bg-gradient-to-r from-amber-500 to-amber-600',
  red: 'bg-gradient-to-r from-rose-500 to-rose-600',
  blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
}

export function ProgressBar({ progress, className, label, color = 'green' }: ProgressBarProps) {
  return (
    <div className={cn('space-y-2.5', className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-900 text-sm">{label}</span>
          <span className="text-slate-600 font-bold text-sm">{progress}%</span>
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden shadow-inner">
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out shadow-sm', colorClasses[color])}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}
