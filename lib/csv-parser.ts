import Papa from 'papaparse'
import { JiraTicket } from '@/types'

export function parseCSV(file: File): Promise<JiraTicket[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const tickets = results.data.map((row: any) => {
            // Handle different possible header variations
            const issueKey = row['Issue Key'] || row['Issue key'] || row['Key'] || row['Issue ID'] || ''
            const summary = row['Summary'] || row['Title'] || row['Description'] || ''
            const status = row['Status'] || row['State'] || 'To Do'
            const assignee = row['Assignee'] || row['Assigned To'] || 'Unassigned'
            const priority = row['Priority'] || 'Medium'
            const epic = row['Epic'] || row['Epic Name'] || row['Epic Link'] || 'No Epic'
            const created = row['Created'] || row['Create Date'] || ''
            const updated = row['Updated'] || row['Last Updated'] || ''
            const dueDate = row['Due Date'] || row['Due'] || ''
            const storyPoints = row['Story Points'] || row['Points'] || null

            return {
              issueKey,
              summary,
              status,
              assignee,
              priority,
              epic,
              created,
              updated,
              dueDate,
              storyPoints: storyPoints ? parseFloat(storyPoints) : null,
            } as JiraTicket
          })

          resolve(tickets)
        } catch (error) {
          reject(error)
        }
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}
