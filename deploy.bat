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

REM Read OPENAI_API_KEY from .env.local if not set
if "%OPENAI_API_KEY%"=="" (
    for /f "tokens=2 delims==" %%a in ('findstr "OPENAI_API_KEY" .env.local') do set "OPENAI_API_KEY=%%a"
)

REM Verify we have the key
if "%OPENAI_API_KEY%"=="" (
    echo Error: Could not find OPENAI_API_KEY in environment or .env.local
    pause
    exit /b 1
)

echo Docker Desktop is running, proceeding with deployment...
"C:\Program Files\Git\bin\bash.exe" -c "./deploy.sh"
pause
