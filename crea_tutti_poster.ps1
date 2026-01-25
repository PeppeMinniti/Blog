# Script PowerShell per creare automaticamente TUTTI i poster dai video
# Scansiona tutte le cartelle del progetto e crea i poster mancanti
# Richiede FFmpeg installato e nel PATH

Write-Host "=========================================" -ForegroundColor Green
Write-Host "   CREAZIONE AUTOMATICA POSTER VIDEO    " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Questo script estrae un frame da ogni video" -ForegroundColor Yellow
Write-Host "e lo salva come poster nella cartella posters/" -ForegroundColor Yellow
Write-Host ""

# Verifica che ffmpeg sia installato
$ffmpegCmd = $null

# Prima cerca la versione portatile nella cartella del progetto
$localFFmpeg = Join-Path $PSScriptRoot "ffmpeg\bin\ffmpeg.exe"
if (Test-Path $localFFmpeg) {
    $ffmpegCmd = $localFFmpeg
    Write-Host "[OK] FFmpeg trovato (versione locale portatile)!" -ForegroundColor Green
} else {
    # Altrimenti cerca nel PATH di sistema
    try {
        $null = Get-Command ffmpeg -ErrorAction Stop
        $ffmpegCmd = "ffmpeg"
        Write-Host "[OK] FFmpeg trovato (installazione di sistema)!" -ForegroundColor Green
    } catch {
        Write-Host "[ERRORE] FFmpeg non trovato!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Scegli un metodo per installare FFmpeg:" -ForegroundColor Yellow
        Write-Host "1. Esegui: .\installa_ffmpeg_portatile.ps1 (NO permessi admin)" -ForegroundColor Cyan
        Write-Host "2. Oppure usa Chocolatey: choco install ffmpeg (richiede admin)" -ForegroundColor Cyan
        Write-Host ""
        pause
        exit
    }
}

Write-Host ""
Write-Host "Scansione cartelle..." -ForegroundColor Cyan
Write-Host ""

# Trova tutte le cartelle media con video
$projectRoot = $PSScriptRoot
$mediaFolders = Get-ChildItem -Path $projectRoot -Directory -Recurse | Where-Object { $_.Name -eq "media" }

$totalVideos = 0
$createdPosters = 0
$skippedPosters = 0
$failedPosters = 0

# Timestamp da cui estrarre il frame (in secondi)
$timestamp = 1  # Default: 1 secondo dall'inizio

foreach ($mediaFolder in $mediaFolders) {
    $projectName = Split-Path (Split-Path $mediaFolder.FullName -Parent) -Leaf

    # Trova tutti i video MP4 nella cartella
    $videos = Get-ChildItem -Path $mediaFolder.FullName -Filter "*.mp4"

    if ($videos.Count -eq 0) {
        continue
    }

    Write-Host ">>> Progetto: $projectName ($($videos.Count) video)" -ForegroundColor Magenta

    # Assicurati che esista la cartella posters
    $postersFolder = Join-Path $mediaFolder.FullName "posters"
    if (-not (Test-Path $postersFolder)) {
        New-Item -Path $postersFolder -ItemType Directory -Force | Out-Null
        Write-Host "    [CREATA] Cartella posters" -ForegroundColor Green
    }

    foreach ($video in $videos) {
        $totalVideos++

        # Genera nome poster standardizzato
        # Rimuovi estensione e caratteri speciali, converti in minuscolo
        $videoBaseName = [System.IO.Path]::GetFileNameWithoutExtension($video.Name)
        $posterName = $videoBaseName -replace '[^a-zA-Z0-9-_ ]', '' -replace '\s+', '-'
        $posterName = $posterName.ToLower()
        $posterName = "poster-$posterName.jpg"

        $posterPath = Join-Path $postersFolder $posterName

        # Verifica se il poster esiste già
        if (Test-Path $posterPath) {
            Write-Host "    [SKIP] $($video.Name) -> $posterName (già esistente)" -ForegroundColor Yellow
            $skippedPosters++
            continue
        }

        Write-Host "    [CREA] $($video.Name) -> $posterName" -ForegroundColor Cyan

        # Estrai frame usando ffmpeg
        $ffmpegArgs = @(
            "-i", $video.FullName,
            "-ss", "00:00:0$timestamp",
            "-vframes", "1",
            "-q:v", "2",  # Qualità alta (1-31, dove 2 è molto alta)
            "-y",  # Sovrascrivi se esiste
            $posterPath
        )

        # Esegui ffmpeg in modalità silenziosa
        & $ffmpegCmd @ffmpegArgs 2>&1 | Out-Null

        # Verifica se il poster è stato creato
        if (Test-Path $posterPath) {
            $fileSize = (Get-Item $posterPath).Length / 1KB
            Write-Host "           [OK] Creato ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Green
            $createdPosters++
        } else {
            Write-Host "           [ERRORE] Creazione fallita" -ForegroundColor Red
            $failedPosters++
        }
    }

    Write-Host ""
}

# Report finale
Write-Host "=========================================" -ForegroundColor Green
Write-Host "             REPORT FINALE               " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Video totali trovati:    $totalVideos" -ForegroundColor White
Write-Host "Poster creati:           $createdPosters" -ForegroundColor Green
Write-Host "Poster già esistenti:    $skippedPosters" -ForegroundColor Yellow
Write-Host "Poster falliti:          $failedPosters" -ForegroundColor $(if ($failedPosters -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($createdPosters -gt 0) {
    Write-Host "[SUCCESS] Tutti i poster sono stati creati!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Puoi verificare i poster aprendo i file README.md dei progetti in un browser." -ForegroundColor Cyan
}

if ($failedPosters -gt 0) {
    Write-Host "[ATTENZIONE] Alcuni poster non sono stati creati." -ForegroundColor Yellow
    Write-Host "Controlla che i video non siano corrotti." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Completato!" -ForegroundColor Green
Write-Host ""

pause
