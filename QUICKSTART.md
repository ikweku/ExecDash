# Quick Start Guide

## Getting Started

1. **Navigate to the project**:
   ```bash
   cd executive-dashboard
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## What You'll See

The dashboard loads with **sample data** automatically, showing:
- 27 tickets across 6 epics
- 74% completion rate
- 2 blocked tickets
- Activity and progress tracking

## Using Your Own Data

### Export from Jira

1. Go to your Jira board
2. Click **...** (more options)
3. Select **Export** → **CSV**
4. Save the file

### Upload to Dashboard

1. Click **"Select CSV File"** button
2. Choose your exported CSV
3. Dashboard updates instantly

## Features to Explore

### Presentation Mode
Click **"Presentation Mode"** for a clean, boardroom-ready view that hides upload controls.

### Key Sections
- **KPI Cards**: Quick metrics overview
- **Status Distribution**: Visual breakdown via donut chart
- **Epic/Assignee Breakdown**: Stacked bar charts
- **Risk Section**: Blocked and aging tickets
- **Activity**: Recently completed and updated work

## Supported CSV Fields

The dashboard automatically maps these fields (case-insensitive):
- Issue Key, Summary, Status
- Assignee, Priority, Epic
- Created, Updated, Due Date
- Story Points

## Status Normalization

Statuses are automatically normalized:
- **Done**: Done, Closed, Resolved, Complete
- **In Progress**: In Progress, In Review, QA, Testing
- **To Do**: To Do, Backlog, Open
- **Blocked**: Blocked, On Hold, Waiting

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Page not loading?**
- Ensure port 3000 is available
- Check for any error messages in terminal

**CSV not parsing?**
- Verify it's a valid CSV file
- Check that it has headers
- Ensure at least one of the supported fields exists

**Need help?**
- Check the full README.md
- Review sample data in lib/sample-data.ts
