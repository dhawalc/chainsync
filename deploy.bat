@echo off
echo Checking Docker Desktop status...

REM Check if Docker Desktop is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker Desktop is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Docker Desktop is running, proceeding with deployment...
"C:\Program Files\Git\bin\bash.exe" -c "./deploy.sh"
pause
