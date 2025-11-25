# PowerShell Script to Create Submission ZIP
# Recipe Platform - Final Exam Project
# Student: 66315030406

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  Recipe Platform - ZIP Creator   " -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$studentId = "66315030406"
$projectName = "Recipe_Platform"
$zipName = "${studentId}_${projectName}.zip"

# Files and folders to include
$itemsToInclude = @(
    "backend",
    "frontend",
    "docs",
    "README.md",
    "SUBMISSION_GUIDE.md"
)

# Patterns to exclude
$excludePatterns = @(
    "node_modules",
    ".git",
    "database.db",
    ".env",
    "*.zip",
    ".DS_Store",
    "Thumbs.db"
)

Write-Host "Step 1: Checking if items exist..." -ForegroundColor Yellow

foreach ($item in $itemsToInclude) {
    if (Test-Path $item) {
        Write-Host "  ✓ Found: $item" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Missing: $item" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Step 2: Removing old ZIP file (if exists)..." -ForegroundColor Yellow

if (Test-Path $zipName) {
    Remove-Item $zipName -Force
    Write-Host "  ✓ Deleted old $zipName" -ForegroundColor Green
} else {
    Write-Host "  ℹ No old ZIP file found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Step 3: Creating temporary structure..." -ForegroundColor Yellow

$tempFolder = "temp_submission"

if (Test-Path $tempFolder) {
    Remove-Item $tempFolder -Recurse -Force
}

New-Item -ItemType Directory -Path $tempFolder | Out-Null

foreach ($item in $itemsToInclude) {
    if (Test-Path $item) {
        $destination = Join-Path $tempFolder $item

        if (Test-Item $item -PathType Container) {
            # It's a directory
            Write-Host "  Copying folder: $item..." -ForegroundColor Cyan

            # Copy with exclusions
            robocopy $item $destination /E /XD node_modules .git /XF database.db .env *.zip .DS_Store Thumbs.db /NJH /NJS /NDL /NC /NS | Out-Null
        } else {
            # It's a file
            Write-Host "  Copying file: $item..." -ForegroundColor Cyan
            Copy-Item $item $destination -Force
        }
    }
}

Write-Host ""
Write-Host "Step 4: Creating ZIP file..." -ForegroundColor Yellow

Compress-Archive -Path "$tempFolder\*" -DestinationPath $zipName -CompressionLevel Optimal -Force

Write-Host ""
Write-Host "Step 5: Cleaning up..." -ForegroundColor Yellow

Remove-Item $tempFolder -Recurse -Force
Write-Host "  ✓ Removed temporary folder" -ForegroundColor Green

Write-Host ""
Write-Host "===================================" -ForegroundColor Green
Write-Host "  ✓ ZIP CREATED SUCCESSFULLY!     " -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
Write-Host ""

# Get file size
$fileSize = (Get-Item $zipName).Length / 1MB
Write-Host "📦 File: $zipName" -ForegroundColor Cyan
Write-Host "📊 Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""

# List contents
Write-Host "📁 Contents:" -ForegroundColor Yellow
Get-ChildItem $zipName | ForEach-Object {
    Write-Host "  - $($_.Name)" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ Ready to submit!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Take screenshots of the application" -ForegroundColor White
Write-Host "2. Add screenshots to TASK5_Implementation.md" -ForegroundColor White
Write-Host "3. Combine all docs into PDF" -ForegroundColor White
Write-Host "4. Submit: $zipName + PDF" -ForegroundColor White
Write-Host ""
