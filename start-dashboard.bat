@echo off
REM Executive Dashboard - Quick Start Script for Windows VDI
REM Double-click this file to start the dashboard

echo.
echo ==========================================
echo   Executive Dashboard - Starting...
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo Then restart your computer and try again.
    echo.
    pause
    exit /b 1
)

REM Display Node.js version
echo [INFO] Node.js version:
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] First time setup - Installing dependencies...
    echo This may take 2-3 minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to install dependencies!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [SUCCESS] Dependencies installed successfully!
    echo.
)

REM Start the development server
echo [INFO] Starting dashboard server...
echo.
echo Dashboard will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ==========================================
echo.

REM Open browser after a short delay
timeout /t 3 /nobreak >nul
start http://localhost:3000

REM Start the dev server
npm run dev
