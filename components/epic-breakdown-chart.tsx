'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EpicBreakdown } from '@/types'

interface EpicBreakdownChartProps {
  data: EpicBreakdown[]
}

export function EpicBreakdownChart({ data }: EpicBreakdownChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Breakdown by Epic</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="epic" type="category" width={120} />
            <Tooltip />
            <Legend />
            <Bar dataKey="done" stackId="a" fill="#10b981" name="Done" />
            <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="In Progress" />
            <Bar dataKey="todo" stackId="a" fill="#6b7280" name="To Do" />
            <Bar dataKey="blocked" stackId="a" fill="#ef4444" name="Blocked" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
