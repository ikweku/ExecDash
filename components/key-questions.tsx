import { Card } from '@/components/ui/card'
import { AlertTriangle, CheckCircle, TrendingUp, Zap, FileText, Calendar } from 'lucide-react'
import { DashboardMetrics } from '@/types'
import { cn } from '@/lib/utils'

interface KeyQuestionsProps {
  metrics: DashboardMetrics
  blockedCount: number
  agingCount: number
}

const questionCards = [
  {
    icon: Heart,
    title: 'PROJECT HEALTH',
    question: 'Are we on track to close Sprint 14?',
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
  },
  {
    icon: AlertTriangle,
    title: 'BLOCKERS',
    question: 'What is actively blocked right now?',
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
  },
  {
    icon: CheckCircle,
    title: 'COMPLETION',
    question: 'How much of this sprint is done?',
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'VELOCITY',
    question: 'Is team velocity trending in the right direction?',
    color: 'green',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600',
  },
  {
    icon: FileText,
    title: 'ACTION TODAY',
    question: 'What needs a decision or unblocking today?',
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-600',
  },
  {
    icon: Calendar,
    title: 'TIMELINE',
    question: 'When does this sprint end?',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
  },
]

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export function KeyQuestions({ metrics, blockedCount, agingCount }: KeyQuestionsProps) {
  const getStatusInfo = (index: number) => {
    switch (index) {
      case 0: // Health
        const healthScore = metrics.percentComplete >= 75 ? 'On Track' : metrics.percentComplete >= 50 ? 'At Risk' : 'Behind'
        const healthColor = metrics.percentComplete >= 75 ? 'text-emerald-600' : metrics.percentComplete >= 50 ? 'text-yellow-600' : 'text-red-600'
        const healthBg = metrics.percentComplete >= 75 ? 'bg-emerald-100' : metrics.percentComplete >= 50 ? 'bg-yellow-100' : 'bg-red-100'
        return {
          status: healthScore,
          detail: `${metrics.doneTickets} of ${metrics.totalTickets} issues closed`,
          badge: healthScore,
          badgeColor: healthColor,
          badgeBg: healthBg,
        }

      case 1: // Blockers
        return {
          status: blockedCount > 0 ? `${blockedCount} Critical Blocker${blockedCount > 1 ? 's' : ''}` : 'No Blockers',
          detail: blockedCount > 0 ? `${blockedCount} issue${blockedCount > 1 ? 's' : ''} need${blockedCount === 1 ? 's' : ''} attention` : 'All clear',
          badge: blockedCount > 0 ? `${blockedCount} Critical Blocker${blockedCount > 1 ? 's' : ''}` : 'None',
          badgeColor: blockedCount > 0 ? 'text-red-700' : 'text-emerald-700',
          badgeBg: blockedCount > 0 ? 'bg-red-100' : 'bg-emerald-100',
        }

      case 2: // Completion
        return {
          status: `${metrics.percentComplete}%`,
          detail: `${metrics.doneTickets} of ${metrics.totalTickets} issues still open`,
          badge: `${metrics.percentComplete}%`,
          badgeColor: 'text-purple-700',
          badgeBg: 'bg-purple-100',
        }

      case 3: // Velocity
        const isGood = metrics.inProgressTickets > metrics.todoTickets
        return {
          status: isGood ? 'Trending Up' : 'Stable',
          detail: `${metrics.inProgressTickets} pts last sprint - est ${metrics.inProgressTickets} pts velocity`,
          badge: isGood ? 'Trending Up' : 'Stable',
          badgeColor: isGood ? 'text-emerald-700' : 'text-blue-700',
          badgeBg: isGood ? 'bg-emerald-100' : 'bg-blue-100',
        }

      case 4: // Action Today
        return {
          status: `${blockedCount + agingCount} Item${blockedCount + agingCount !== 1 ? 's' : ''}`,
          detail: `${blockedCount} blocked + ${agingCount} aging`,
          badge: `${blockedCount + agingCount} Item${blockedCount + agingCount !== 1 ? 's' : ''}`,
          badgeColor: 'text-orange-700',
          badgeBg: 'bg-orange-100',
        }

      case 5: // Timeline
        const today = new Date()
        const endDate = new Date(today)
        endDate.setDate(endDate.getDate() + 3)
        return {
          status: '3 Days',
          detail: `Sprint 14 closes ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
          badge: '3 Days',
          badgeColor: 'text-blue-700',
          badgeBg: 'bg-blue-100',
        }

      default:
        return {
          status: 'N/A',
          detail: '',
          badge: 'N/A',
          badgeColor: 'text-gray-700',
          badgeBg: 'bg-gray-100',
        }
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">KEY QUESTIONS</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {questionCards.map((card, index) => {
          const info = getStatusInfo(index)
          const Icon = card.icon

          return (
            <Card
              key={index}
              className={cn(
                'border-l-4 hover:shadow-lg transition-shadow',
                card.bgColor,
                card.borderColor
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn('p-1.5 rounded', card.iconColor)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {card.question}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={cn(
                    'inline-flex px-2 py-1 rounded text-xs font-bold',
                    info.badgeBg,
                    info.badgeColor
                  )}>
                    {info.badge}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    {info.status}
                  </div>
                  <div className="text-xs text-slate-600">
                    {info.detail}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
