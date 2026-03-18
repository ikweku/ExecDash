'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WeeklyProgressData } from '@/lib/metrics'

interface SprintBurndownChartProps {
  data: WeeklyProgressData[]
}

export function SprintBurndownChart({ data }: SprintBurndownChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-700">Weekly Progress</CardTitle>
          <button className="text-xs text-blue-600 font-semibold hover:underline">
            Last 6 Weeks
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              label={{ value: 'Completion %', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748b' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            <Area
              type="monotone"
              dataKey="planned"
              stroke="#cbd5e1"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#colorPlanned)"
              name="Planned"
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#colorCompleted)"
              name="Completed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
