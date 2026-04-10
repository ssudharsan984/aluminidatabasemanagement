@echo off
echo 🚀 Starting Alumni Management Portal...
echo.
echo Starting Backend Server on port 5000...
start cmd /k "cd server && node index.js"
timeout /t 3 /nobreak >nul
echo Starting React Frontend on port 5173...
start cmd /k "cd client && npm run dev"
timeout /t 3 /nobreak >nul
echo.
echo ✅ Both servers started!
echo Backend  : http://localhost:5000
echo Frontend : http://localhost:5173
echo.
start http://localhost:5173
