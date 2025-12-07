# PowerShell script to clear all build caches
Write-Host "Clearing build caches..." -ForegroundColor Yellow

# Remove Vite cache
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite"
    Write-Host "✓ Removed .vite cache" -ForegroundColor Green
}

# Remove node_modules Vite cache
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force "node_modules/.vite"
    Write-Host "✓ Removed node_modules/.vite cache" -ForegroundColor Green
}

# Remove dist folder
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Removed dist folder" -ForegroundColor Green
}

# Remove TypeScript build info
Get-ChildItem -Filter "tsconfig*.tsbuildinfo" | ForEach-Object {
    Remove-Item -Force $_.FullName
    Write-Host "✓ Removed $($_.Name)" -ForegroundColor Green
}

Write-Host "`nAll caches cleared! Now run: npm run build" -ForegroundColor Cyan

