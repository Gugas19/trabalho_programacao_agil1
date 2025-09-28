@echo off
cd /d "%~dp0"
echo Parando processos na porta 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do taskkill /f /pid %%a >nul 2>&1
echo.
echo Instalando dependencias...
call npm install
echo.
echo Iniciando servidor de desenvolvimento...
call npm run dev
pause