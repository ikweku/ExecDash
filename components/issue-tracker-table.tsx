import { NormalizedTicket } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/status-badge'

interface IssueTrackerTableProps {
  tickets: NormalizedTicket[]
}

const priorityColors = {
  High: 'bg-red-500',
  Critical: 'bg-red-600',
  Medium: 'bg-amber-500',
  Low: 'bg-blue-500',
}

const epicColors: Record<string, string> = {
  'Authentication': 'bg-purple-100 text-purple-700',
  'Dashboard': 'bg-blue-100 text-blue-700',
  'API Integration': 'bg-teal-100 text-teal-700',
  'Mobile App': 'bg-pink-100 text-pink-700',
  'Testing': 'bg-indigo-100 text-indigo-700',
  'Documentation': 'bg-orange-100 text-orange-700',
}

export function IssueTrackerTable({ tickets }: IssueTrackerTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            ISSUE TRACKER ({tickets.length})
          </CardTitle>
          <input
            type="text"
            placeholder="Search issues..."
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  Epic
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  Priority
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  PTS
                </th>
                <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {tickets.map((ticket) => (
                <tr key={ticket.issueKey} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-blue-600 font-mono font-semibold text-xs hover:underline cursor-pointer">
                      {ticket.issueKey}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-sm">
                    <div className="font-medium text-slate-800 truncate">{ticket.summary}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                      epicColors[ticket.epic] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.epic || 'No Epic'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {ticket.assignee ? ticket.assignee[0].toUpperCase() : 'U'}
                      </div>
                      <span className="text-slate-700 font-medium">{ticket.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        priorityColors[ticket.priority as keyof typeof priorityColors] || 'bg-gray-500'
                      }`} />
                      <span className="text-slate-700">{ticket.priority}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-700 font-semibold">
                      {ticket.storyPoints || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-600 text-xs">
                      {ticket.updated ? new Date(ticket.updated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }) : '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
