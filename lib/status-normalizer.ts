import { NormalizedStatus, JiraTicket, NormalizedTicket } from '@/types'

const statusMap: Record<string, NormalizedStatus> = {
  // Done variations
  'done': 'Done',
  'closed': 'Done',
  'resolved': 'Done',
  'complete': 'Done',
  'completed': 'Done',
  'finished': 'Done',

  // In Progress variations
  'in progress': 'In Progress',
  'in review': 'In Progress',
  'qa': 'In Progress',
  'testing': 'In Progress',
  'in development': 'In Progress',
  'dev': 'In Progress',
  'development': 'In Progress',
  'code review': 'In Progress',

  // To Do variations
  'to do': 'To Do',
  'todo': 'To Do',
  'backlog': 'To Do',
  'open': 'To Do',
  'new': 'To Do',
  'ready': 'To Do',

  // Blocked variations
  'blocked': 'Blocked',
  'on hold': 'Blocked',
  'waiting': 'Blocked',
  'paused': 'Blocked',
  'impediment': 'Blocked',
}

export function normalizeStatus(status: string): NormalizedStatus {
  const normalizedKey = status.toLowerCase().trim()
  return statusMap[normalizedKey] || 'To Do'
}

export function normalizeTickets(tickets: JiraTicket[]): NormalizedTicket[] {
  return tickets.map(ticket => ({
    ...ticket,
    rawStatus: ticket.status,
    normalizedStatus: normalizeStatus(ticket.status),
    status: normalizeStatus(ticket.status),
  }))
}
