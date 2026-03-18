#!/bin/bash

# Executive Dashboard Data Update Script
# This script automates the process of updating dashboard data with a new Jira export

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$SCRIPT_DIR/public/data"
ARCHIVE_DIR="$DATA_DIR/archive"
LATEST_CSV="$DATA_DIR/latest.csv"

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if file argument is provided
if [ $# -eq 0 ]; then
    print_error "No file provided!"
    echo ""
    echo "Usage: ./update-data.sh <path-to-jira-export.csv>"
    echo ""
    echo "Example:"
    echo "  ./update-data.sh ~/Downloads/jira-export-2026-03-17.csv"
    exit 1
fi

NEW_CSV="$1"

# Validate input file exists
if [ ! -f "$NEW_CSV" ]; then
    print_error "File not found: $NEW_CSV"
    exit 1
fi

# Validate it's a CSV file
if [[ ! "$NEW_CSV" =~ \.csv$ ]]; then
    print_warning "File does not have .csv extension. Continuing anyway..."
fi

echo ""
print_info "Executive Dashboard Data Update"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Create archive directory if it doesn't exist
print_info "Checking archive directory..."
mkdir -p "$ARCHIVE_DIR"
print_success "Archive directory ready"

# Step 2: Archive current data if it exists
if [ -f "$LATEST_CSV" ]; then
    ARCHIVE_NAME="$(date +%Y-%m-%d)-jira-export.csv"
    ARCHIVE_PATH="$ARCHIVE_DIR/$ARCHIVE_NAME"

    print_info "Archiving current data to $ARCHIVE_NAME..."
    cp "$LATEST_CSV" "$ARCHIVE_PATH"
    print_success "Current data archived"
else
    print_warning "No existing data to archive (first time setup)"
fi

# Step 3: Copy new CSV to latest.csv
print_info "Installing new data..."
cp "$NEW_CSV" "$LATEST_CSV"
print_success "New data installed"

# Step 4: Validate CSV format (basic check)
print_info "Validating CSV format..."
FIRST_LINE=$(head -n 1 "$LATEST_CSV")

# Check for required columns
REQUIRED_COLUMNS=("Issue Key" "Summary" "Status" "Assignee")
MISSING_COLUMNS=()

for col in "${REQUIRED_COLUMNS[@]}"; do
    if [[ ! "$FIRST_LINE" =~ "$col" ]]; then
        MISSING_COLUMNS+=("$col")
    fi
done

if [ ${#MISSING_COLUMNS[@]} -eq 0 ]; then
    print_success "CSV format validated"
else
    print_error "Missing required columns: ${MISSING_COLUMNS[*]}"
    print_warning "Dashboard may not display correctly. Please check your Jira export."
fi

# Step 5: Check if we're in a git repository
if [ ! -d "$SCRIPT_DIR/.git" ]; then
    print_warning "Not a git repository. Skipping git operations."
    echo ""
    print_success "Data update complete!"
    echo ""
    print_info "Next steps:"
    echo "  1. Initialize git: git init"
    echo "  2. Add remote: git remote add origin <your-repo-url>"
    echo "  3. Commit and push changes"
    exit 0
fi

# Step 6: Git operations
print_info "Staging changes for git..."
git add "$DATA_DIR"

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes detected in data files"
    echo ""
    print_success "Data update complete!"
    exit 0
fi

# Step 7: Commit changes
COMMIT_MSG="Update dashboard data - $(date +%Y-%m-%d)"
print_info "Creating commit: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"
print_success "Changes committed"

# Step 8: Push to remote (if configured)
print_info "Pushing to remote repository..."
if git remote | grep -q "origin"; then
    # Get current branch name
    BRANCH=$(git rev-parse --abbrev-ref HEAD)

    if git push origin "$BRANCH"; then
        print_success "Changes pushed to remote"
    else
        print_error "Failed to push changes"
        print_info "You may need to push manually: git push origin $BRANCH"
        exit 1
    fi
else
    print_warning "No remote repository configured"
    print_info "Add remote with: git remote add origin <your-repo-url>"
    print_info "Then push with: git push -u origin main"
fi

echo ""
print_success "Data update complete!"
echo ""
print_info "GitHub Pages will automatically rebuild in 1-2 minutes"
print_info "Dashboard will be updated at your GitHub Pages URL"
echo ""
