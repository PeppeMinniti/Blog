# Script per scaricare e configurare FFmpeg (versione portatile - NO ADMIN)
# Scarica FFmpeg nella cartella del progetto, senza modificare il sistema

Write-Host "=========================================" -ForegroundColor Green
Write-Host "   INSTALLAZIONE FFMPEG PORTATILE       " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Questo script scarica FFmpeg nella cartella corrente" -ForegroundColor Yellow
Write-Host "NON richiede permessi amministratore" -ForegroundColor Yellow
Write-Host ""

$projectRoot = $PSScriptRoot
$ffmpegDir = Join-Path $projectRoot "ffmpeg"
$ffmpegBin = Join-Path $ffmpegDir "bin"
$ffmpegExe = Join-Path $ffmpegBin "ffmpeg.exe"

# Verifica se FFmpeg è già presente
if (Test-Path $ffmpegExe) {
    Write-Host "[OK] FFmpeg già installato in: $ffmpegDir" -ForegroundColor Green
    Write-Host ""
    & $ffmpegExe -version | Select-Object -First 1
    Write-Host ""
    Write-Host "Puoi procedere con lo script crea_tutti_poster.ps1" -ForegroundColor Cyan
    Write-Host ""
    pause
    exit
}

Write-Host "Download di FFmpeg in corso..." -ForegroundColor Cyan
Write-Host ""

# URL download FFmpeg (versione essentials - più leggera)
$downloadUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
$zipFile = Join-Path $projectRoot "ffmpeg-temp.zip"

try {
    # Scarica FFmpeg
    Write-Host "Scaricamento da: $downloadUrl" -ForegroundColor Yellow
    Write-Host "Questo potrebbe richiedere qualche minuto (circa 70 MB)..." -ForegroundColor Yellow
    Write-Host ""

    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile -UseBasicParsing
    $ProgressPreference = 'Continue'

    if (-not (Test-Path $zipFile)) {
        throw "Download fallito"
    }

    Write-Host "[OK] Download completato!" -ForegroundColor Green
    Write-Host ""

    # Estrai l'archivio
    Write-Host "Estrazione archivio..." -ForegroundColor Cyan
    Expand-Archive -Path $zipFile -DestinationPath $projectRoot -Force

    # Trova la cartella estratta (nome variabile tipo ffmpeg-6.0-essentials_build)
    $extractedFolder = Get-ChildItem -Path $projectRoot -Directory | Where-Object { $_.Name -like "ffmpeg-*-essentials*" } | Select-Object -First 1

    if ($null -eq $extractedFolder) {
        throw "Cartella FFmpeg non trovata dopo estrazione"
    }

    # Rinomina in "ffmpeg"
    if (Test-Path $ffmpegDir) {
        Remove-Item $ffmpegDir -Recurse -Force
    }
    Rename-Item -Path $extractedFolder.FullName -NewName "ffmpeg"

    Write-Host "[OK] Estrazione completata!" -ForegroundColor Green
    Write-Host ""

    # Pulisci il file zip
    Remove-Item $zipFile -Force

    # Verifica installazione
    if (Test-Path $ffmpegExe) {
        Write-Host "=========================================" -ForegroundColor Green
        Write-Host "   INSTALLAZIONE COMPLETATA!            " -ForegroundColor Green
        Write-Host "=========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "FFmpeg installato in: $ffmpegDir" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Versione installata:" -ForegroundColor Yellow
        & $ffmpegExe -version | Select-Object -First 1
        Write-Host ""
        Write-Host "[IMPORTANTE] Ora puoi eseguire lo script:" -ForegroundColor Cyan
        Write-Host ".\crea_tutti_poster.ps1" -ForegroundColor Green
        Write-Host ""
    } else {
        throw "FFmpeg.exe non trovato dopo installazione"
    }

} catch {
    Write-Host ""
    Write-Host "[ERRORE] Installazione fallita: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Soluzioni alternative:" -ForegroundColor Yellow
    Write-Host "1. Scarica manualmente da: https://www.gyan.dev/ffmpeg/builds/" -ForegroundColor Cyan
    Write-Host "2. Estrai in: $ffmpegDir" -ForegroundColor Cyan
    Write-Host "3. Riprova questo script" -ForegroundColor Cyan
    Write-Host ""
}

pause
