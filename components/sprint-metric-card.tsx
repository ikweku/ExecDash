import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SprintMetricCardProps {
  label: string
  value: string | number
  subtitle?: string
  color?: 'default' | 'green' | 'blue' | 'yellow' | 'red'
}

const colorClasses = {
  default: 'text-slate-700',
  green: 'text-emerald-600',
  blue: 'text-blue-600',
  yellow: 'text-amber-600',
  red: 'text-rose-600',
}

const subtitleColors = {
  default: 'text-slate-600',
  green: 'text-emerald-600',
  blue: 'text-blue-600',
  yellow: 'text-amber-600',
  red: 'text-rose-600',
}

export function SprintMetricCard({ label, value, subtitle, color = 'default' }: SprintMetricCardProps) {
  return (
    <Card className="bg-white border-slate-200">
      <div className="p-5">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          {label}
        </div>
        <div className={cn('text-4xl font-bold mb-1', colorClasses[color])}>
          {value}
        </div>
        {subtitle && (
          <div className={cn('text-xs font-medium', subtitleColors[color])}>
            {subtitle}
          </div>
        )}
      </div>
    </Card>
  )
}
