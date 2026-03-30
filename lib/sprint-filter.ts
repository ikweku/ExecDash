import { NormalizedTicket } from '@/types'

/**
 * Extract unique sprint names from tickets and sort them by sprint number
 */
export function getAllSprints(tickets: NormalizedTicket[]): string[] {
  const sprintSet = new Set<string>()

  tickets.forEach(ticket => {
    if (ticket.sprint && ticket.sprint.trim() !== '') {
      sprintSet.add(ticket.sprint)
    }
  })

  const sprints = Array.from(sprintSet)

  // Sort sprints by extracting sprint numbers
  return sprints.sort((a, b) => {
    const numA = extractSprintNumber(a)
    const numB = extractSprintNumber(b)
    return numA - numB
  })
}

/**
 * Extract sprint number from sprint name (e.g., "Sprint 14" -> 14)
 */
function extractSprintNumber(sprintName: string): number {
  const match = sprintName.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

/**
 * Auto-detect the current sprint (the one with the highest sprint number)
 */
export function getCurrentSprint(tickets: NormalizedTicket[]): string | null {
  const sprints = getAllSprints(tickets)

  if (sprints.length === 0) {
    return null
  }

  // Return the sprint with the highest number
  return sprints[sprints.length - 1]
}

/**
 * Get tickets for a specific sprint, including rolled-over unresolved tickets
 * from previous sprints
 */
export function getSprintTickets(
  allTickets: NormalizedTicket[],
  targetSprint: string
): NormalizedTicket[] {
  const targetSprintNumber = extractSprintNumber(targetSprint)

  // Tickets explicitly assigned to the target sprint
  const currentSprintTickets = allTickets.filter(
    ticket => ticket.sprint === targetSprint
  )

  // Unresolved tickets from previous sprints (rollover logic)
  const rolledOverTickets = allTickets.filter(ticket => {
    if (!ticket.sprint || ticket.sprint === targetSprint) {
      return false
    }

    const ticketSprintNumber = extractSprintNumber(ticket.sprint)

    // Include if:
    // 1. From a previous sprint (lower sprint number)
    // 2. Not in "Done" status (unresolved)
    return (
      ticketSprintNumber < targetSprintNumber &&
      ticket.status !== 'Done'
    )
  })

  return [...currentSprintTickets, ...rolledOverTickets]
}

/**
 * Get sprint number from sprint name for display purposes
 */
export function getSprintNumber(sprintName: string): number {
  return extractSprintNumber(sprintName)
}
