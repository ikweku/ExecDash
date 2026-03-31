import { NormalizedTicket } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/status-badge'

interface CriticalPathTableProps {
  tickets: NormalizedTicket[]
}

export function CriticalPathTable({ tickets }: CriticalPathTableProps) {
  // Filter tickets to only show those with "critical-path-elysium" label
  const criticalPathTickets = tickets.filter(ticket =>
    ticket.labels && ticket.labels.toLowerCase().includes('critical-path-elysium')
  )

  const completedTickets = criticalPathTickets.filter(t => t.status === 'Done').length
  const totalTickets = criticalPathTickets.length
  const completionPercent = totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              CRITICAL PATH STORIES ({criticalPathTickets.length})
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              {completedTickets} of {totalTickets} completed ({completionPercent}%)
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Completion</div>
            <div className="text-2xl font-bold text-slate-800">{completionPercent}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {criticalPathTickets.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No critical path stories found. Tickets must have the "critical-path-elysium" label.
          </div>
        ) : (
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
                    Assignee
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                    Sprint
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {criticalPathTickets.map((ticket) => (
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
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {ticket.assignee ? ticket.assignee[0].toUpperCase() : 'U'}
                        </div>
                        <span className="text-slate-700 font-medium">{ticket.assignee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-600 text-xs">{ticket.sprint || '-'}</span>
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
        )}
      </CardContent>
    </Card>
  )
}
