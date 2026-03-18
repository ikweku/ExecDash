# Executive Dashboard - Windows VDI Setup Guide

This guide walks you through setting up and running the Executive Dashboard on your Windows VDI.

## Prerequisites

### 1. Install Node.js (if not already installed)

1. Download Node.js from: https://nodejs.org/en/download/
2. Choose **"Windows Installer (.msi)"** - **LTS version** (recommended)
3. Run the installer and follow the wizard:
   - ✅ Accept the license agreement
   - ✅ Keep default installation path
   - ✅ **Important**: Check "Automatically install the necessary tools" (includes npm)
4. Restart your computer after installation

**Verify installation:**
```cmd
node --version
npm --version
```

You should see version numbers like `v20.x.x` and `10.x.x`.

### 2. Install Git (if not already installed)

1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Verify installation:
```cmd
git --version
```

## Initial Setup

### Step 1: Clone the Repository

1. Open **Command Prompt** or **PowerShell**
2. Navigate to your desired folder:
```cmd
cd C:\Users\YourUsername\Documents
```

3. Clone the repository from your company's private GitHub:
```cmd
git clone https://github.com/ikweku/ExecDash.git
cd ExecDash
```

### Step 2: Install Dependencies

```cmd
npm install
```

This will download all required packages (may take 2-3 minutes).

### Step 3: First Run

**Option A - Development Mode** (recommended for testing):
```cmd
npm run dev
```

**Option B - Use the Quick Start Batch File**:
```cmd
start-dashboard.bat
```

The dashboard will open automatically at: **http://localhost:3000**

## Daily Usage

### Starting the Dashboard

**Method 1 - Double-click the batch file:**
1. Navigate to the project folder in File Explorer
2. Double-click `start-dashboard.bat`
3. A browser window will open automatically

**Method 2 - Command line:**
```cmd
cd C:\Users\YourUsername\Documents\ExecDash
npm run dev
```

### Stopping the Dashboard

- Press `Ctrl + C` in the command prompt window
- Or simply close the command prompt window

## Updating Data

### Method 1 - Manual Update (Simplest)

1. Get your new Jira CSV export (e.g., `Sprint 11 - 03-17-26.csv`)
2. Navigate to: `ExecDash\public\data\`
3. **Backup current data** (optional):
   - Copy `latest.csv` to `archive` folder
   - Rename it with the date (e.g., `2026-03-18-jira-export.csv`)
4. **Replace** `latest.csv` with your new export
5. Refresh your browser - data updates automatically!

### Method 2 - PowerShell Script (Automated)

1. Right-click `update-data.ps1` and select **"Run with PowerShell"**
2. When prompted, enter the path to your new CSV file
3. The script will:
   - Archive the old data
   - Install the new data
   - Validate the CSV format

**Or from PowerShell:**
```powershell
.\update-data.ps1 -CSVPath "C:\Users\YourUsername\Downloads\Sprint-11-03-17-26.csv"
```

## File Structure

```
ExecDash/
├── public/
│   └── data/
│       ├── latest.csv          ← Your current data
│       └── archive/            ← Historical exports
├── start-dashboard.bat         ← Quick start script
├── update-data.ps1            ← Data update script
├── README-WINDOWS.md          ← This file
└── UPDATING.md                ← Detailed update guide
```

## Troubleshooting

### Issue: "npm is not recognized"

**Solution:** Node.js not installed or not in PATH
1. Reinstall Node.js from https://nodejs.org
2. Make sure to check "Add to PATH" during installation
3. Restart your computer

### Issue: Port 3000 already in use

**Solution:** Another app is using port 3000
1. Close other development servers
2. Or use a different port:
```cmd
npm run dev -- -p 3001
```

### Issue: Dashboard shows sample data instead of my CSV

**Solution:** CSV file not found or incorrect format
1. Check file location: `public\data\latest.csv`
2. Verify CSV has required columns:
   - Issue Key, Summary, Status, Assignee, Priority, Epic
   - Created, Updated, Due Date, Story Points
3. Check browser console (F12) for errors

### Issue: Changes not appearing after updating CSV

**Solution:** Browser cache
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Or restart the dev server (`Ctrl + C`, then `npm run dev`)

### Issue: Git authentication fails

**Solution:** Need to configure Git credentials for private GitHub
```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
```

For private repos, you may need a personal access token:
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token with `repo` scope
3. Use token as password when prompted

## Performance Tips

- **Close unused apps** when running the dashboard (Chrome can be memory-heavy)
- **Use Chrome or Edge** for best performance
- **Clear browser cache** weekly to prevent slowdowns

## Security Notes

- ✅ Dashboard runs **locally only** - no data leaves your VDI
- ✅ CSV files stay in `public\data\` folder
- ✅ Private GitHub repo requires authentication
- ⚠️ Do not commit sensitive Jira exports to public repositories

## Next Steps

Once you've tested locally and want to share with your team:
1. Contact IT/Admin about internal hosting options
2. Options include:
   - Company IIS server
   - Internal Linux web server
   - Azure Static Web Apps (if company uses Azure)
   - SharePoint (export static HTML)

## Support

For issues or questions:
1. Check the [UPDATING.md](UPDATING.md) for data update instructions
2. Check the main [README.md](README.md) for project documentation
3. Contact the development team

---

**Happy dashboarding! 📊**
