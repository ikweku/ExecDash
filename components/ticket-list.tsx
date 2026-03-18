import { NormalizedTicket } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/status-badge'

interface TicketListProps {
  title: string
  tickets: NormalizedTicket[]
  emptyMessage?: string
}

export function TicketList({ title, tickets, emptyMessage = 'No tickets found' }: TicketListProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {tickets.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8 font-medium">{emptyMessage}</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.issueKey}
                className="group flex items-start justify-between p-4 rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/30 hover:shadow-md hover:border-slate-300/60 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-sm font-mono font-bold text-slate-900 tracking-tight">
                      {ticket.issueKey}
                    </span>
                    <StatusBadge status={ticket.status} />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mb-2 line-clamp-2 leading-relaxed">
                    {ticket.summary}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span className="inline-flex items-center">{ticket.assignee}</span>
                    {ticket.epic && <span>• {ticket.epic}</span>}
                    {ticket.updated && (
                      <span>• Updated {new Date(ticket.updated).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
