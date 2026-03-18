import { NormalizedStatus, JiraTicket, NormalizedTicket, SprintInfo } from '@/types'

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
  'in development': 'In Progress',
  'dev': 'In Progress',
  'development': 'In Progress',

  // In Review variations
  'in review': 'In Review',
  'in testing': 'In Review',
  'qa': 'In Review',
  'testing': 'In Review',
  'code review': 'In Review',
  'review': 'In Review',

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

export function parseSprintInfo(fileName: string): SprintInfo | null {
  // Expected format: "Sprint 11 - 03-17-26.csv" or similar
  const sprintPattern = /Sprint\s+(\d+)\s*-\s*(\d{2}-\d{2}-\d{2})/i
  const match = fileName.match(sprintPattern)

  if (match) {
    const sprintNumber = parseInt(match[1], 10)
    const dateStr = match[2] // MM-DD-YY format

    // Parse the date (MM-DD-YY)
    const [month, day, year] = dateStr.split('-')
    const fullYear = `20${year}` // Convert YY to 20YY
    const date = `${fullYear}-${month}-${day}` // ISO format

    return {
      sprintNumber,
      date,
      fileName,
    }
  }

  return null
}
