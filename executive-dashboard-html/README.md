# Executive Dashboard - Standalone HTML Version

A self-contained, single-file executive dashboard for Jira project tracking. No Node.js or Python required!

## Features

- **Real-time Metrics**: Total tickets, completion %, in-progress, in-review, to-do, and blocked items
- **Interactive Charts**:
  - Status Distribution (Donut Chart)
  - Epic Breakdown (Stacked Bar Chart)
  - Weekly Progress (Area Chart)
  - Sprint Velocity (Bar Chart)
- **Issue Tracker**: Full searchable table with all ticket details
- **CSV Upload**: Drag-and-drop or browse to upload your Jira exports
- **Status Normalization**: Automatically maps various Jira status names to 5 standard categories
- **Presentation Mode**: Hide upload controls for executive presentations
- **Executive Narrative**: Auto-generated summary of sprint progress

## How to Run

### Option 1: Using VSCode Live Server (Recommended)

1. Open the `executive-dashboard-html` folder in VSCode
2. Right-click on `dashboard.html`
3. Select "Open with Live Server"
4. The dashboard will open in your default browser

### Option 2: Direct Browser Open

1. Navigate to the `executive-dashboard-html` folder
2. Double-click `dashboard.html`
3. The dashboard will open in your default browser

**Note**: Some browsers restrict loading local files for security. If you see CORS errors, use Option 1 (Live Server) instead.

## Using the Dashboard

### Loading Data

The dashboard will automatically try to load `latest.csv` from the same folder. If this file doesn't exist or you want to load different data:

1. Click the upload zone or drag-and-drop your CSV file
2. The dashboard will immediately update with your data

### CSV Format

Your Jira CSV export should include these columns (flexible header names supported):

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

The dashboard automatically normalizes various Jira status names into 5 categories:

- **Done**: Done, Closed, Resolved, Complete, Completed, Finished
- **In Progress**: In Progress, In Development, Dev, Development
- **In Review**: In Review, In Testing, QA, Testing, Code Review, Review
- **To Do**: To Do, TODO, Backlog, Open, New, Ready
- **Blocked**: Blocked, On Hold, Waiting, Paused, Impediment

### Search and Filter

Use the search box in the Issue Tracker section to filter by:
- Issue key
- Summary
- Assignee
- Epic
- Status

### Presentation Mode

Click "Presentation Mode" in the header to hide the CSV upload section for cleaner executive presentations.

## Updating Your Data

### Weekly Updates

1. Export new CSV from Jira
2. Replace `latest.csv` with the new file (or use the upload interface)
3. Click "Refresh Data" in the header

### Keeping Historical Data

You can rename old CSV files with dates for archival purposes:
- `sprint-14-2026-03-18.csv`
- `sprint-13-2026-03-11.csv`
- etc.

Then upload the specific CSV you want to view.

## Technical Details

### Dependencies (Loaded from CDN)

- **Chart.js 4.4.0**: For all visualizations
- **PapaParse 5.4.1**: For CSV parsing

No installation required - these are loaded automatically from CDN when you open the dashboard.

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

### File Structure

```
executive-dashboard-html/
├── dashboard.html          # The complete dashboard (all-in-one)
├── latest.csv             # Your current sprint data
└── README.md              # This file
```

## Troubleshooting

### Dashboard shows "No data loaded"

- Ensure `latest.csv` is in the same folder as `dashboard.html`
- Try using VSCode Live Server instead of direct browser open
- Or use the CSV upload interface to manually load your data

### Charts not displaying

- Check your browser console for errors (F12)
- Ensure you have an active internet connection (needed for CDN libraries)
- Try refreshing the page

### CSV upload not working

- Ensure your file ends with `.csv`
- Check that the CSV has proper headers
- Try opening the CSV in a text editor to verify it's valid

### Status colors look wrong

- Check the status values in your CSV
- The dashboard expects standard Jira status names
- Custom statuses may default to "To Do" category

## Customization

The dashboard is contained in a single HTML file. You can customize:

- **Colors**: Search for color hex codes in the `<style>` section
- **Metrics**: Modify the `calculateMetrics()` function in the `<script>` section
- **Chart Types**: Change Chart.js configurations
- **Status Mapping**: Update the `statusMap` object

## Support

For issues or questions about the original Next.js version, refer to the main project README in the parent folder.

For issues specific to this HTML version:
- Check that you're using a modern browser
- Verify your CSV format matches the expected structure
- Try using VSCode Live Server if direct browser open doesn't work

---

**Version**: 1.0.0
**Last Updated**: March 18, 2026
**Generated with**: Claude Code
