# Executive Dashboard Data Update Script for Windows
# PowerShell script to automate updating dashboard data with a new Jira export

param(
    [Parameter(Mandatory=$false)]
    [string]$CSVPath
)

# Color output functions
function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

# Script directories
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$DataDir = Join-Path $ScriptDir "public\data"
$ArchiveDir = Join-Path $DataDir "archive"
$LatestCSV = Join-Path $DataDir "latest.csv"

Write-Host ""
Write-Info "Executive Dashboard Data Update"
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""

# Prompt for CSV file if not provided
if (-not $CSVPath) {
    Write-Info "Please enter the path to your Jira CSV export file:"
    Write-Host "   (You can drag and drop the file here)"
    Write-Host ""
    $CSVPath = Read-Host "CSV File Path"

    # Remove quotes if user dragged and dropped
    $CSVPath = $CSVPath.Trim('"')
}

# Validate input file exists
if (-not (Test-Path $CSVPath)) {
    Write-Error-Custom "File not found: $CSVPath"
    Write-Host ""
    pause
    exit 1
}

# Validate it's a CSV file
if (-not ($CSVPath -like "*.csv")) {
    Write-Warning-Custom "File does not have .csv extension. Continuing anyway..."
}

# Step 1: Create archive directory if it doesn't exist
Write-Info "Checking archive directory..."
if (-not (Test-Path $ArchiveDir)) {
    New-Item -ItemType Directory -Path $ArchiveDir -Force | Out-Null
}
Write-Success "Archive directory ready"

# Step 2: Archive current data if it exists
if (Test-Path $LatestCSV) {
    $ArchiveName = "$(Get-Date -Format 'yyyy-MM-dd')-jira-export.csv"
    $ArchivePath = Join-Path $ArchiveDir $ArchiveName

    Write-Info "Archiving current data to $ArchiveName..."
    Copy-Item $LatestCSV $ArchivePath -Force
    Write-Success "Current data archived"
} else {
    Write-Warning-Custom "No existing data to archive (first time setup)"
}

# Step 3: Copy new CSV to latest.csv
Write-Info "Installing new data..."
Copy-Item $CSVPath $LatestCSV -Force
Write-Success "New data installed"

# Step 4: Validate CSV format (basic check)
Write-Info "Validating CSV format..."
try {
    $FirstLine = Get-Content $LatestCSV -First 1

    # Check for required columns
    $RequiredColumns = @("Issue Key", "Summary", "Status", "Assignee")
    $MissingColumns = @()

    foreach ($col in $RequiredColumns) {
        if ($FirstLine -notlike "*$col*") {
            $MissingColumns += $col
        }
    }

    if ($MissingColumns.Count -eq 0) {
        Write-Success "CSV format validated"
    } else {
        Write-Error-Custom "Missing required columns: $($MissingColumns -join ', ')"
        Write-Warning-Custom "Dashboard may not display correctly. Please check your Jira export."
    }
} catch {
    Write-Error-Custom "Error reading CSV file: $_"
}

# Step 5: Check if we're in a git repository
$GitDir = Join-Path $ScriptDir ".git"
if (-not (Test-Path $GitDir)) {
    Write-Warning-Custom "Not a git repository. Skipping git operations."
    Write-Host ""
    Write-Success "Data update complete!"
    Write-Host ""
    Write-Info "Next steps:"
    Write-Host "  1. Refresh your browser to see the new data"
    Write-Host "  2. Or restart the dashboard: start-dashboard.bat"
    Write-Host ""
    pause
    exit 0
}

# Step 6: Git operations
Write-Info "Staging changes for git..."
git add $DataDir

# Check if there are changes to commit
$GitStatus = git diff --staged --quiet
if ($LASTEXITCODE -ne 0) {
    # There are changes
    $CommitMsg = "Update dashboard data - $(Get-Date -Format 'yyyy-MM-dd')"
    Write-Info "Creating commit: $CommitMsg"
    git commit -m $CommitMsg
    Write-Success "Changes committed"

    # Step 7: Push to remote (if configured)
    Write-Info "Pushing to remote repository..."
    $HasOrigin = git remote | Select-String "origin"
    if ($HasOrigin) {
        try {
            git push origin main 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Changes pushed to remote"
            } else {
                Write-Error-Custom "Failed to push changes"
                Write-Info "You may need to push manually: git push origin main"
            }
        } catch {
            Write-Error-Custom "Error pushing to remote: $_"
        }
    } else {
        Write-Warning-Custom "No remote repository configured"
        Write-Info "Add remote with: git remote add origin <your-repo-url>"
    }
} else {
    Write-Warning-Custom "No changes detected in data files"
}

Write-Host ""
Write-Success "Data update complete!"
Write-Host ""
Write-Info "Next steps:"
Write-Host "  • Refresh your browser to see the new data"
Write-Host "  • Or restart the dashboard"
Write-Host ""

pause
