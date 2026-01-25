# Script PowerShell per creare automaticamente i poster dai video
# Richiede FFmpeg installato e nel PATH

# Cambia directory alla cartella media
Set-Location -Path $PSScriptRoot\..

Write-Host "=== Creazione Poster Automatica ===" -ForegroundColor Green
Write-Host "Questo script estrae un frame da ogni video per usarlo come poster" -ForegroundColor Yellow
Write-Host ""

# Array con mappatura video -> poster
$videos = @{
    "stampante video matriosca 1.mp4" = "poster-matriosca-1.jpg"
    "stampante video matriosca 2.mp4" = "poster-matriosca-2.jpg"
    "stampante video matriosca 3.mp4" = "poster-matriosca-3.jpg"
    "stampante video matriosca 4.mp4" = "poster-matriosca-4.jpg"
    "stampante video matriosca 5.mp4" = "poster-matriosca-5.jpg"
    "stampante video matriosca 6.mp4" = "poster-matriosca-6.jpg"
    "stampante video matriosca 7.mp4" = "poster-matriosca-7.jpg"
    "stampante controllo temperature piatto.mp4" = "poster-controllo-temperature.jpg"
    "stampante pendolo.mp4" = "poster-pendolo.jpg"
    "stampante pendolo 1.mp4" = "poster-pendolo-1.jpg"
    "stampante video xx.mp4" = "poster-video-xx.jpg"
}

# Timestamp da cui estrarre il frame (in secondi)
# Modifica questi valori per scegliere frame diversi
$timestamp = 1  # Default: 1 secondo dall'inizio

# Verifica che ffmpeg sia installato
try {
    $null = Get-Command ffmpeg -ErrorAction Stop
    Write-Host "[OK] FFmpeg trovato!" -ForegroundColor Green
} catch {
    Write-Host "[ERRORE] FFmpeg non trovato!" -ForegroundColor Red
    Write-Host "Installa FFmpeg da: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "Oppure usa il Metodo 1 (VLC) dalla guida COME_CREARE_POSTER.md" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Inizio estrazione frame..." -ForegroundColor Cyan
Write-Host ""

$count = 0
$total = $videos.Count

foreach ($video in $videos.Keys) {
    $count++
    $poster = $videos[$video]
    $posterPath = "posters\$poster"

    Write-Host "[$count/$total] Processando: $video" -ForegroundColor Cyan

    if (Test-Path $video) {
        # Estrai frame al timestamp specificato
        $args = @(
            "-i", $video,
            "-ss", "00:00:0$timestamp",
            "-vframes", "1",
            "-q:v", "2",  # Qualità alta (1-31, dove 2 è molto alta)
            "-y",  # Sovrascrivi se esiste
            $posterPath
        )

        $output = & ffmpeg @args 2>&1

        if (Test-Path $posterPath) {
            Write-Host "  [OK] Creato: $poster" -ForegroundColor Green
        } else {
            Write-Host "  [ERRORE] Fallito: $poster" -ForegroundColor Red
        }
    } else {
        Write-Host "  [SKIP] Video non trovato: $video" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== Completato! ===" -ForegroundColor Green
Write-Host ""

# Verifica risultati
$posters = Get-ChildItem -Path "posters\poster-*.jpg"
Write-Host "Poster creati: $($posters.Count) / $total" -ForegroundColor $(if ($posters.Count -eq $total) { "Green" } else { "Yellow" })

if ($posters.Count -lt $total) {
    Write-Host ""
    Write-Host "NOTA: Alcuni poster non sono stati creati." -ForegroundColor Yellow
    Write-Host "Puoi crearli manualmente con VLC (vedi guida COME_CREARE_POSTER.md)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "I poster sono salvati in: $(Get-Location)\posters\" -ForegroundColor Cyan
Write-Host ""
Write-Host "Apri il README.md in un browser per verificare!" -ForegroundColor Green

pause
