'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload } from 'lucide-react'

interface CSVUploadProps {
  onFileSelect: (file: File) => void
  isLoading?: boolean
}

export function CSVUpload({ onFileSelect, isLoading = false }: CSVUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/csv') {
      onFileSelect(file)
    } else {
      alert('Please select a valid CSV file')
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50/50 hover:border-slate-400 transition-all duration-300">
      <CardContent className="pt-8">
        <div className="flex flex-col items-center justify-center space-y-6 py-12">
          <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Upload className="h-10 w-10 text-white" />
          </div>
          <div className="text-center space-y-3">
            <h3 className="font-bold text-2xl text-slate-900">Upload Jira Export</h3>
            <p className="text-base text-slate-600 max-w-md font-medium leading-relaxed">
              Upload your Jira CSV export to view the executive dashboard and track project progress
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={handleButtonClick}
            disabled={isLoading}
            size="lg"
            className="font-semibold px-8 shadow-md hover:shadow-lg transition-shadow"
          >
            {isLoading ? 'Processing...' : 'Select CSV File'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
