export type NormalizedStatus = 'Done' | 'In Progress' | 'In Review' | 'To Do' | 'Blocked'

export interface JiraTicket {
  issueKey: string
  summary: string
  status: string
  assignee: string
  priority: string
  epic: string
  created: string
  updated: string
  dueDate: string
  storyPoints: number | null
  sprint: string | null
}

export interface NormalizedTicket extends Omit<JiraTicket, 'status'> {
  status: NormalizedStatus
  normalizedStatus: NormalizedStatus
  rawStatus: string
}

export interface DashboardMetrics {
  totalTickets: number
  doneTickets: number
  inProgressTickets: number
  inReviewTickets: number
  todoTickets: number
  blockedTickets: number
  percentComplete: number
  percentRemaining: number
  percentInProgress: number
  percentInReview: number
  percentBlocked: number
}

export interface EpicBreakdown {
  epic: string
  done: number
  inProgress: number
  inReview: number
  todo: number
  blocked: number
  total: number
}

export interface AssigneeBreakdown {
  assignee: string
  done: number
  inProgress: number
  inReview: number
  todo: number
  blocked: number
  total: number
}

export interface StatusDistribution {
  name: string
  value: number
  color: string
}

export interface SprintInfo {
  sprintNumber: number
  date: string
  fileName: string
}
