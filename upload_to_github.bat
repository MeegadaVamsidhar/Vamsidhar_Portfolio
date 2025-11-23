@echo off
echo ==========================================
echo   Vamsidhar Portfolio - GitHub Uploader
echo ==========================================
echo.
echo [1/5] Initializing Git repository...
git init

echo.
echo [2/5] Adding files to staging...
git add .

echo.
echo [3/5] Committing files...
git commit -m "Initial portfolio upload"

echo.
echo [4/5] Setting up main branch...
git branch -M main

echo.
echo ---------------------------------------------------------------------
echo Please create a new repository on GitHub: https://github.com/new
echo Name it 'vamsidhar_portfolio' (or similar).
echo Do NOT initialize with README, .gitignore, or License.
echo ---------------------------------------------------------------------
echo.
set /p repo_url="Enter the HTTPS URL of your new repository: "

echo.
echo [5/5] Pushing to GitHub...
git remote add origin %repo_url%
git push -u origin main

echo.
echo ==========================================
echo   Upload Complete!
echo ==========================================
echo.
echo To Deploy:
echo 1. Go to your repository on GitHub.
echo 2. Click 'Settings' tab.
echo 3. Click 'Pages' on the left sidebar.
echo 4. Under 'Build and deployment', select 'Source' -> 'Deploy from a branch'.
echo 5. Select 'main' branch and '/ (root)' folder.
echo 6. Click 'Save'.
echo.
pause
