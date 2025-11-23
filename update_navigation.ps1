# Update all navigation URLs to use clean paths
$replacements = @{
    'pages/technical_skills_showcase\.html'        = 'skills/'
    'technical_skills_showcase\.html'              = '../skills/'
    'pages/project_portfolio_theater\.html'        = 'projects/'
    'project_portfolio_theater\.html'              = '../projects/'
    'pages/achievements_credentials_gallery\.html' = 'achievements/'
    'achievements_credentials_gallery\.html'       = '../achievements/'
    'pages/professional_connection_hub\.html'      = 'contact/'
    'professional_connection_hub\.html'            = '../contact/'
}

$files = @(
    "index.html",
    "skills\index.html",
    "projects\index.html",
    "achievements\index.html",
    "contact\index.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        
        foreach ($old in $replacements.Keys) {
            $new = $replacements[$old]
            $content = $content -replace $old, $new
        }
        
        $content | Set-Content $file -NoNewline -Encoding UTF8
        Write-Host "Updated: $file"
    }
}

Write-Host "`nAll navigation URLs updated to clean paths!"
