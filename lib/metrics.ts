import {
  NormalizedTicket,
  DashboardMetrics,
  EpicBreakdown,
  AssigneeBreakdown,
  StatusDistribution
} from '@/types'

export function calculateMetrics(tickets: NormalizedTicket[]): DashboardMetrics {
  const totalTickets = tickets.length
  const doneTickets = tickets.filter(t => t.status === 'Done').length
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length
  const todoTickets = tickets.filter(t => t.status === 'To Do').length
  const blockedTickets = tickets.filter(t => t.status === 'Blocked').length

  const percentComplete = totalTickets > 0 ? Math.round((doneTickets / totalTickets) * 100) : 0
  const percentInProgress = totalTickets > 0 ? Math.round((inProgressTickets / totalTickets) * 100) : 0
  const percentRemaining = totalTickets > 0 ? Math.round((todoTickets / totalTickets) * 100) : 0
  const percentBlocked = totalTickets > 0 ? Math.round((blockedTickets / totalTickets) * 100) : 0

  return {
    totalTickets,
    doneTickets,
    inProgressTickets,
    todoTickets,
    blockedTickets,
    percentComplete,
    percentRemaining,
    percentInProgress,
    percentBlocked,
  }
}

export function getEpicBreakdown(tickets: NormalizedTicket[]): EpicBreakdown[] {
  const epicMap = new Map<string, EpicBreakdown>()

  tickets.forEach(ticket => {
    const epic = ticket.epic || 'No Epic'

    if (!epicMap.has(epic)) {
      epicMap.set(epic, {
        epic,
        done: 0,
        inProgress: 0,
        todo: 0,
        blocked: 0,
        total: 0,
      })
    }

    const epicData = epicMap.get(epic)!
    epicData.total++

    switch (ticket.status) {
      case 'Done':
        epicData.done++
        break
      case 'In Progress':
        epicData.inProgress++
        break
      case 'To Do':
        epicData.todo++
        break
      case 'Blocked':
        epicData.blocked++
        break
    }
  })

  return Array.from(epicMap.values()).sort((a, b) => b.total - a.total)
}

export function getAssigneeBreakdown(tickets: NormalizedTicket[]): AssigneeBreakdown[] {
  const assigneeMap = new Map<string, AssigneeBreakdown>()

  tickets.forEach(ticket => {
    const assignee = ticket.assignee || 'Unassigned'

    if (!assigneeMap.has(assignee)) {
      assigneeMap.set(assignee, {
        assignee,
        done: 0,
        inProgress: 0,
        todo: 0,
        blocked: 0,
        total: 0,
      })
    }

    const assigneeData = assigneeMap.get(assignee)!
    assigneeData.total++

    switch (ticket.status) {
      case 'Done':
        assigneeData.done++
        break
      case 'In Progress':
        assigneeData.inProgress++
        break
      case 'To Do':
        assigneeData.todo++
        break
      case 'Blocked':
        assigneeData.blocked++
        break
    }
  })

  return Array.from(assigneeMap.values()).sort((a, b) => b.total - a.total)
}

export function getStatusDistribution(metrics: DashboardMetrics): StatusDistribution[] {
  return [
    { name: 'Done', value: metrics.doneTickets, color: '#10b981' },
    { name: 'In Progress', value: metrics.inProgressTickets, color: '#f59e0b' },
    { name: 'To Do', value: metrics.todoTickets, color: '#6b7280' },
    { name: 'Blocked', value: metrics.blockedTickets, color: '#ef4444' },
  ].filter(item => item.value > 0)
}

export function getBlockedTickets(tickets: NormalizedTicket[]): NormalizedTicket[] {
  return tickets.filter(t => t.status === 'Blocked')
}

export function getAgingTickets(tickets: NormalizedTicket[], daysThreshold = 7): NormalizedTicket[] {
  const now = new Date()
  const thresholdDate = new Date(now.getTime() - daysThreshold * 24 * 60 * 60 * 1000)

  return tickets
    .filter(ticket => {
      if (!ticket.updated) return false
      const updatedDate = new Date(ticket.updated)
      return updatedDate < thresholdDate && ticket.status !== 'Done'
    })
    .sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime())
}

export function getRecentlyCompleted(tickets: NormalizedTicket[], limit = 5): NormalizedTicket[] {
  return tickets
    .filter(t => t.status === 'Done' && t.updated)
    .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    .slice(0, limit)
}

export function getRecentlyUpdated(tickets: NormalizedTicket[], limit = 5): NormalizedTicket[] {
  return tickets
    .filter(t => t.updated && t.status !== 'Done')
    .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    .slice(0, limit)
}

export function generateNarrative(metrics: DashboardMetrics): string {
  const { percentComplete, percentInProgress, percentRemaining, blockedTickets } = metrics

  let narrative = `${percentComplete}% of scoped work is complete`

  if (percentInProgress > 0) {
    narrative += `, ${percentInProgress}% is in progress`
  }

  if (percentRemaining > 0) {
    narrative += `, and ${percentRemaining}% remains`
  }

  narrative += '.'

  if (blockedTickets > 0) {
    narrative += ` ${blockedTickets} ${blockedTickets === 1 ? 'ticket is' : 'tickets are'} currently blocked and require${blockedTickets === 1 ? 's' : ''} attention.`
  }

  return narrative
}
