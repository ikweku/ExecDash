import { Card, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

interface NarrativeSummaryProps {
  narrative: string
}

export function NarrativeSummary({ narrative }: NarrativeSummaryProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-blue-50 border-blue-200/60 shadow-md overflow-hidden">
      <CardContent className="pt-8 pb-8">
        <div className="flex gap-5">
          <div className="flex-shrink-0">
            <div className="p-3.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-wide">Executive Summary</h3>
            <p className="text-base text-slate-700 leading-relaxed font-medium">{narrative}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
