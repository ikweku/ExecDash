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
import { AssigneeBreakdown } from '@/types'

interface AssigneeBreakdownChartProps {
  data: AssigneeBreakdown[]
}

export function AssigneeBreakdownChart({ data }: AssigneeBreakdownChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-bold text-slate-700">Story Points by Assignee</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="assignee" type="category" width={120} />
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
