@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo Запускаю фотоменеджер Галактики...
echo.

where node >nul 2>nul
if %errorlevel%==0 (
  node tools\photo-manager-server.js
) else (
  "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" tools\photo-manager-server.js
)

if not %errorlevel%==0 pause
