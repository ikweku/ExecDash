'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SprintVelocityData } from '@/lib/metrics'

interface SprintVelocityChartProps {
  data: SprintVelocityData[]
}

export function SprintVelocityChart({ data }: SprintVelocityChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-700">Sprint Velocity</CardTitle>
          <span className="text-xs text-blue-600 font-semibold">
            Last 6 Sprints
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="sprint"
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              label={{ value: 'Story Points', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748b' } }}
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
            />
            <Bar
              dataKey="committed"
              fill="#c4b5fd"
              name="Committed"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="completed"
              fill="#8b5cf6"
              name="Completed"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
