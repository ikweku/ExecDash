import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  color?: 'green' | 'yellow' | 'red' | 'gray' | 'blue'
}

const colorClasses = {
  green: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  yellow: 'text-amber-600 bg-amber-50 border-amber-100',
  red: 'text-rose-600 bg-rose-50 border-rose-100',
  gray: 'text-slate-600 bg-slate-50 border-slate-100',
  blue: 'text-blue-600 bg-blue-50 border-blue-100',
}

export function KPICard({ title, value, icon: Icon, trend, color = 'blue' }: KPICardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50 overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          {title}
        </CardTitle>
        <div className={cn('p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110', colorClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{value}</div>
        {trend && (
          <p className="text-sm text-slate-500 font-medium">
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
