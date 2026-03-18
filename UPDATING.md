# Updating Dashboard Data

This guide explains how to update the executive dashboard with new Jira export data.

## Overview

The dashboard automatically loads data from `/public/data/latest.csv`. To update the dashboard with new data, you simply need to replace this file with a fresh Jira export.

## Manual Update Process

### 1. Export Data from Jira

1. Navigate to your Jira project
2. Go to **Issues** → **Search for issues** or use your saved filter
3. Click **Export** → **Export CSV (all fields)**
4. Download the CSV file

### 2. Archive Current Data (Optional but Recommended)

Before replacing the current data, archive it for historical reference:

```bash
# Copy current latest.csv to archive with date stamp
cp public/data/latest.csv public/data/archive/$(date +%Y-%m-%d)-jira-export.csv
```

### 3. Replace Data File

Replace the current `latest.csv` with your new export:

```bash
# If your export is named differently, rename it
mv ~/Downloads/your-jira-export.csv public/data/latest.csv
```

### 4. Commit and Push Changes

```bash
git add public/data/
git commit -m "Update dashboard data - $(date +%Y-%m-%d)"
git push origin main
```

### 5. Wait for Deployment

GitHub Pages will automatically rebuild and deploy your site within 1-2 minutes.

## Automated Update Process

For convenience, use the included automation script:

```bash
# Run the update script with your Jira export file
./update-data.sh ~/Downloads/your-jira-export.csv
```

This script will:
- Archive the current data
- Replace latest.csv with your new export
- Commit and push changes to GitHub
- Trigger automatic redeployment

## CSV Format Requirements

Your Jira export must include these columns:

- **Issue Key** (e.g., GER-101)
- **Summary** (issue title)
- **Status** (e.g., Done, In Progress, To Do, Blocked)
- **Assignee** (person assigned)
- **Priority** (e.g., High, Medium, Low)
- **Epic** (epic name or link)
- **Created** (creation date)
- **Updated** (last update date)
- **Due Date** (optional)
- **Story Points** (optional, numeric)

The dashboard will automatically normalize different status values (e.g., "Closed" → "Done", "In Review" → "In Progress").

## Viewing Changes Locally

To preview changes before pushing:

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Building for Production

To create a production build:

```bash
npm run build

# The static site will be in the /docs folder
```

## Troubleshooting

### Dashboard shows sample data instead of my CSV

- Check that your CSV is located at `/public/data/latest.csv`
- Verify the CSV has the required column headers
- Check browser console for parsing errors

### CSV parsing errors

- Ensure CSV is properly formatted with quoted fields
- Check for special characters or line breaks within cells
- Verify column headers match the required format

### Changes not appearing on GitHub Pages

- Wait 1-2 minutes for deployment to complete
- Check the **Actions** tab in GitHub for deployment status
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear browser cache if needed

## Support

For issues or questions, refer to the project README or contact the development team.
