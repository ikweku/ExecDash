'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Eye,
  EyeOff,
  Download
} from 'lucide-react'
import { KPICard } from '@/components/kpi-card'
import { ProgressBar } from '@/components/progress-bar'
import { StatusDonutChart } from '@/components/status-donut-chart'
import { EpicBreakdownChart } from '@/components/epic-breakdown-chart'
import { AssigneeBreakdownChart } from '@/components/assignee-breakdown-chart'
import { TicketList } from '@/components/ticket-list'
import { NarrativeSummary } from '@/components/narrative-summary'
import { CSVUpload } from '@/components/csv-upload'
import { KeyQuestions } from '@/components/key-questions'
import { SprintMetricCard } from '@/components/sprint-metric-card'
import { IssueTrackerTable } from '@/components/issue-tracker-table'
import { SprintBurndownChart } from '@/components/sprint-burndown-chart'
import { SprintVelocityChart } from '@/components/sprint-velocity-chart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { parseCSV } from '@/lib/csv-parser'
import { normalizeTickets, parseSprintInfo } from '@/lib/status-normalizer'
import {
  calculateMetrics,
  getEpicBreakdown,
  getAssigneeBreakdown,
  getStatusDistribution,
  getBlockedTickets,
  getAgingTickets,
  getRecentlyCompleted,
  getRecentlyUpdated,
  generateNarrative,
  getWeeklyProgress,
  getSprintVelocity,
} from '@/lib/metrics'
import { getAllSprints, getCurrentSprint, getSprintTickets, getSprintNumber } from '@/lib/sprint-filter'
import { sampleTickets } from '@/lib/sample-data'
import { NormalizedTicket, SprintInfo } from '@/types'

export default function DashboardPage() {
  const [tickets, setTickets] = useState<NormalizedTicket[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [presentationMode, setPresentationMode] = useState(false)
  const [hasUploadedData, setHasUploadedData] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [sprintInfo, setSprintInfo] = useState<SprintInfo | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in-progress' | 'in-review' | 'blocked' | 'todo'>('all')
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null)
  const [availableSprints, setAvailableSprints] = useState<string[]>([])

  // Load CSV data from /data/latest.csv on initial mount
  useEffect(() => {
    const loadCSVData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/data/latest.csv')
        if (response.ok) {
          const csvText = await response.text()
          const blob = new Blob([csvText], { type: 'text/csv' })
          const file = new File([blob], 'latest.csv', { type: 'text/csv' })

          const parsedTickets = await parseCSV(file)
          const normalized = normalizeTickets(parsedTickets)
          setTickets(normalized)
          setHasUploadedData(true)
          setLastUpdated(new Date(response.headers.get('last-modified') || Date.now()))

          // Set available sprints and auto-detect current sprint
          const sprints = getAllSprints(normalized)
          setAvailableSprints(sprints)
          const currentSprint = getCurrentSprint(normalized)
          setSelectedSprint(currentSprint)
        } else {
          // Fallback to sample data if CSV not found
          const normalized = normalizeTickets(sampleTickets)
          setTickets(normalized)
          setHasUploadedData(false)

          // Set sprints for sample data
          const sprints = getAllSprints(normalized)
          setAvailableSprints(sprints)
          const currentSprint = getCurrentSprint(normalized)
          setSelectedSprint(currentSprint)
        }
      } catch (error) {
        console.error('Error loading CSV:', error)
        // Fallback to sample data on error
        const normalized = normalizeTickets(sampleTickets)
        setTickets(normalized)
        setHasUploadedData(false)

        // Set sprints for sample data
        const sprints = getAllSprints(normalized)
        setAvailableSprints(sprints)
        const currentSprint = getCurrentSprint(normalized)
        setSelectedSprint(currentSprint)
      } finally {
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [])

  const handleFileSelect = async (file: File) => {
    setIsLoading(true)
    try {
      const parsedTickets = await parseCSV(file)
      const normalized = normalizeTickets(parsedTickets)
      setTickets(normalized)
      setHasUploadedData(true)

      // Parse sprint info from filename (e.g., "Sprint 11 - 03-17-26.csv")
      const sprint = parseSprintInfo(file.name)
      setSprintInfo(sprint)

      // Set available sprints and auto-detect current sprint
      const sprints = getAllSprints(normalized)
      setAvailableSprints(sprints)
      const currentSprint = getCurrentSprint(normalized)
      setSelectedSprint(currentSprint)
    } catch (error) {
      console.error('Error parsing CSV:', error)
      alert('Error parsing CSV file. Please check the file format.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadSampleData = () => {
    const normalized = normalizeTickets(sampleTickets)
    setTickets(normalized)
    setHasUploadedData(false)

    // Set sprints for sample data
    const sprints = getAllSprints(normalized)
    setAvailableSprints(sprints)
    const currentSprint = getCurrentSprint(normalized)
    setSelectedSprint(currentSprint)
  }

  const handleStatusFilter = (filter: 'all' | 'completed' | 'in-progress' | 'in-review' | 'blocked' | 'todo') => {
    setStatusFilter(filter === statusFilter ? 'all' : filter)
  }

  // Filter tickets by selected sprint (includes rollover logic)
  const sprintFilteredTickets = selectedSprint
    ? getSprintTickets(tickets, selectedSprint)
    : tickets

  // Filter tickets based on selected status
  const filteredTickets = statusFilter === 'all'
    ? sprintFilteredTickets
    : sprintFilteredTickets.filter(ticket => {
        switch (statusFilter) {
          case 'completed':
            return ticket.status === 'Done'
          case 'in-progress':
            return ticket.status === 'In Progress'
          case 'in-review':
            return ticket.status === 'In Review'
          case 'blocked':
            return ticket.status === 'Blocked'
          case 'todo':
            return ticket.status === 'To Do'
          default:
            return true
        }
      })

  // Calculate all metrics using sprint-filtered tickets
  const metrics = calculateMetrics(sprintFilteredTickets)
  const epicBreakdown = getEpicBreakdown(sprintFilteredTickets)
  const assigneeBreakdown = getAssigneeBreakdown(sprintFilteredTickets)
  const statusDistribution = getStatusDistribution(metrics)
  const blockedTickets = getBlockedTickets(sprintFilteredTickets)
  const agingTickets = getAgingTickets(sprintFilteredTickets, 7)
  const recentlyCompleted = getRecentlyCompleted(sprintFilteredTickets, 5)
  const recentlyUpdated = getRecentlyUpdated(sprintFilteredTickets, 5)
  const narrative = generateNarrative(metrics)
  const weeklyProgress = getWeeklyProgress(sprintFilteredTickets)
  const sprintVelocity = getSprintVelocity(sprintFilteredTickets)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dark Header */}
      <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-sm">
                  LM
                </div>
                <div>
                  <h1 className="text-xl font-bold">Lumenalta</h1>
                </div>
              </div>
              <div className="text-indigo-200 text-sm ml-2">
                DOMO - Capital Group
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                className="bg-indigo-800/50 border border-indigo-700 text-white text-sm rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedSprint || ''}
                onChange={(e) => setSelectedSprint(e.target.value)}
              >
                {availableSprints.length > 0 ? (
                  availableSprints.map((sprint) => (
                    <option key={sprint} value={sprint}>
                      {sprint} {sprint === getCurrentSprint(tickets) ? '(Current)' : ''}
                    </option>
                  ))
                ) : (
                  <option>Sprint {sprintInfo?.sprintNumber || 14} (Current)</option>
                )}
              </select>
              <select className="bg-indigo-800/50 border border-indigo-700 text-white text-sm rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Statuses</option>
                <option>Done</option>
                <option>In Progress</option>
                <option>Blocked</option>
              </select>
              <select className="bg-indigo-800/50 border border-indigo-700 text-white text-sm rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              {!presentationMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLoadSampleData}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Load Sample
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sprint Progress Bar */}
        {tickets.length > 0 && (
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 pb-3 border-t border-indigo-800/50 pt-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="text-indigo-300 font-semibold text-xs uppercase tracking-wider">
                {selectedSprint || `Sprint ${sprintInfo?.sprintNumber || 14}`} Progress
              </div>
              <div className="text-indigo-300 text-xs">
                {metrics.doneTickets} of {metrics.totalTickets} completed &nbsp;&nbsp; {metrics.percentComplete}%
              </div>
            </div>
            <div className="h-2 bg-indigo-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                style={{ width: `${metrics.percentComplete}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* CSV Upload Section - Hidden in presentation mode */}
        {!presentationMode && tickets.length === 0 && (
          <div className="mb-8">
            <CSVUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>
        )}

        {tickets.length > 0 && (
          <div className="space-y-8">
            {/* Key Questions */}
            <KeyQuestions
              metrics={metrics}
              blockedCount={blockedTickets.length}
              agingCount={agingTickets.length}
            />

            {/* Sprint Metrics */}
            <div>
              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">SPRINT METRICS</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <SprintMetricCard
                  label="TOTAL ISSUES"
                  value={metrics.totalTickets}
                  subtitle="across selection"
                  onClick={() => handleStatusFilter('all')}
                  isActive={statusFilter === 'all'}
                />
                <SprintMetricCard
                  label="COMPLETED"
                  value={metrics.doneTickets}
                  subtitle={`${metrics.percentComplete}% of issues`}
                  color="green"
                  onClick={() => handleStatusFilter('completed')}
                  isActive={statusFilter === 'completed'}
                />
                <SprintMetricCard
                  label="IN PROGRESS"
                  value={metrics.inProgressTickets}
                  subtitle="active development"
                  color="blue"
                  onClick={() => handleStatusFilter('in-progress')}
                  isActive={statusFilter === 'in-progress'}
                />
                <SprintMetricCard
                  label="IN REVIEW"
                  value={metrics.inReviewTickets}
                  subtitle="awaiting review"
                  color="yellow"
                  onClick={() => handleStatusFilter('in-review')}
                  isActive={statusFilter === 'in-review'}
                />
                <SprintMetricCard
                  label="BLOCKED"
                  value={metrics.blockedTickets}
                  subtitle="needs escalation"
                  color="red"
                  onClick={() => handleStatusFilter('blocked')}
                  isActive={statusFilter === 'blocked'}
                />
                <SprintMetricCard
                  label="POINTS DONE"
                  value={metrics.doneTickets * 3}
                  subtitle="of 58 pts committed"
                  color="green"
                />
              </div>
            </div>

            {/* Analytics - 2x2 Grid (Sprint Forecast) */}
            <div>
              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">SPRINT FORECAST</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SprintBurndownChart data={weeklyProgress} />
                <StatusDonutChart data={statusDistribution} />
                <SprintVelocityChart data={sprintVelocity} />
                <AssigneeBreakdownChart data={assigneeBreakdown} />
              </div>
            </div>

            {/* Issue Tracker Table */}
            <div>
              {statusFilter !== 'all' && (
                <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-blue-900">
                      Showing {filteredTickets.length} {
                        statusFilter === 'completed' ? 'completed' :
                        statusFilter === 'in-progress' ? 'in progress' :
                        statusFilter === 'in-review' ? 'in review' :
                        statusFilter === 'blocked' ? 'blocked' :
                        statusFilter === 'todo' ? 'to do' : ''
                      } issue{filteredTickets.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Clear filter
                  </button>
                </div>
              )}
              <IssueTrackerTable tickets={filteredTickets} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
