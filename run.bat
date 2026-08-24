@echo off
title AuraMart Server Launcher
echo ==================================================
echo       AURAMART - LAUNCHING LOCAL SYSTEM...
echo ==================================================
echo.

:: Move to Backend folder
cd Backend

echo [1/2] Verifying package dependencies...
if not exist node_modules (
    echo node_modules folder is missing. Installing packages, please wait...
    call npm install
) else (
    echo Dependencies verified. Skipping npm install.
)

echo.
echo [2/2] Booting server and opening your browser...
:: Launch default web browser at local port
start "" http://localhost:5000
:: Run the node application
node app.js

pause
