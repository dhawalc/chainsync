@echo off
REM This script pulls the latest code from GitHub for your Chainsync repo.
REM Change directory to your repo folder (adjust the path accordingly)
cd /d "C:\Users\dhawa\chainsync"

echo Pulling latest code from GitHub...
git pull origin main

REM Pause so you can review the output before the window closes
pause
