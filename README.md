# Executive Dashboard - Gerald Board

A production-ready executive dashboard for tracking project progress using Jira CSV exports. Built for executives to get clear, boardroom-ready insights at a glance.

## Features

- **CSV Upload**: Import Jira CSV exports with flexible header mapping
- **Status Normalization**: Automatically normalizes various status values into four categories (Done, In Progress, To Do, Blocked)
- **Executive Metrics**: Clean KPI cards showing total tickets, completion %, in-progress count, and blocked items
- **Visual Analytics**:
  - Donut chart for status distribution
  - Bar charts for epic and assignee breakdown
  - Progress bars for completion tracking
- **Risk Management**:
  - Blocked tickets list
  - Aging tickets (not updated in >7 days)
- **Activity Tracking**:
  - Recently completed tickets
  - Recently updated tickets
- **Executive Narrative**: Auto-generated summary for quick understanding
- **Presentation Mode**: Clean view for boardroom presentations (hides upload controls)
- **Sample Data**: Built-in demo dataset for testing

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom components inspired by shadcn/ui
- **Charts**: Recharts
- **CSV Parsing**: Papa Parse

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd executive-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### With Sample Data

The dashboard loads sample data automatically on startup. You can click "Load Sample Data" at any time to restore the demo data.

### With Your Own Data

1. Export your Jira board as CSV:
   - Go to your Jira board
   - Click "..." (more options)
   - Select "Export" → "CSV"

2. Upload the CSV:
   - Click "Select CSV File" in the dashboard
   - Choose your exported CSV file
   - The dashboard will automatically parse and display your data

### CSV Format

The dashboard handles various Jira CSV header formats. Supported fields:
- **Issue Key** (or Key, Issue ID)
- **Summary** (or Title, Description)
- **Status** (or State)
- **Assignee** (or Assigned To)
- **Priority**
- **Epic** (or Epic Name, Epic Link)
- **Created** (or Create Date)
- **Updated** (or Last Updated)
- **Due Date** (or Due)
- **Story Points** (or Points)

### Status Normalization

The dashboard automatically maps various status values:

- **Done**: Done, Closed, Resolved, Complete, Completed, Finished
- **In Progress**: In Progress, In Review, QA, Testing, In Development, Dev, Development, Code Review
- **To Do**: To Do, TODO, Backlog, Open, New, Ready
- **Blocked**: Blocked, On Hold, Waiting, Paused, Impediment

### Presentation Mode

Click "Presentation Mode" to:
- Hide upload controls
- Remove sample data button
- Show a clean, executive-friendly view
- Perfect for boardroom presentations

## Project Structure

```
executive-dashboard/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main dashboard page
├── components/
│   ├── ui/                   # Base UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── assignee-breakdown-chart.tsx
│   ├── csv-upload.tsx
│   ├── epic-breakdown-chart.tsx
│   ├── kpi-card.tsx
│   ├── narrative-summary.tsx
│   ├── progress-bar.tsx
│   ├── status-badge.tsx
│   ├── status-donut-chart.tsx
│   └── ticket-list.tsx
├── lib/
│   ├── csv-parser.ts         # CSV parsing logic
│   ├── metrics.ts            # Metrics calculation
│   ├── sample-data.ts        # Demo data
│   ├── status-normalizer.ts  # Status mapping
│   └── utils.ts              # Utilities
├── types/
│   └── index.ts              # TypeScript types
└── README.md
```

## Color System

- **Green** (#10b981): Done/Complete
- **Yellow** (#f59e0b): In Progress
- **Red** (#ef4444): Blocked
- **Gray** (#6b7280): To Do
- **Blue** (#3b82f6): General/Info

## Development

### Adding New Metrics

1. Add type definitions in `types/index.ts`
2. Implement calculation logic in `lib/metrics.ts`
3. Create/update components in `components/`
4. Integrate into `app/page.tsx`

### Customizing Status Mapping

Edit the `statusMap` in `lib/status-normalizer.ts` to add or modify status mappings.

## License

ISC

## Author

Built with Claude Code for executive reporting needs.
