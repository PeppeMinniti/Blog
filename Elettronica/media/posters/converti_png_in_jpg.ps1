# Script per convertire tutti i PNG in JPG
# Converte automaticamente tutti i file .png in .jpg nella cartella corrente

Write-Host "=== Conversione PNG -> JPG ===" -ForegroundColor Green
Write-Host ""

# Vai alla directory dello script
Set-Location -Path $PSScriptRoot

# Trova tutti i file PNG
$pngFiles = Get-ChildItem -Filter "*.png"

if ($pngFiles.Count -eq 0) {
    Write-Host "[ERRORE] Nessun file PNG trovato in questa cartella!" -ForegroundColor Red
    Write-Host "Assicurati di essere nella cartella corretta: media/posters/" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "Trovati $($pngFiles.Count) file PNG da convertire" -ForegroundColor Cyan
Write-Host ""

# Carica assembly per manipolazione immagini
Add-Type -AssemblyName System.Drawing

$converted = 0
$errors = 0

foreach ($pngFile in $pngFiles) {
    $jpgName = $pngFile.BaseName + ".jpg"
    $jpgPath = Join-Path -Path $PSScriptRoot -ChildPath $jpgName

    Write-Host "Convertendo: $($pngFile.Name) -> $jpgName" -ForegroundColor Cyan

    try {
        # Carica l'immagine PNG
        $image = [System.Drawing.Image]::FromFile($pngFile.FullName)

        # Crea encoder JPG con qualità alta
        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                   Where-Object { $_.MimeType -eq 'image/jpeg' }

        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, 90L
        )

        # Salva come JPG
        $image.Save($jpgPath, $encoder, $encoderParams)
        $image.Dispose()

        Write-Host "  [OK] Creato: $jpgName" -ForegroundColor Green
        $converted++

        # Opzionale: elimina il PNG originale dopo conversione
        # Remove-Item $pngFile.FullName

    } catch {
        Write-Host "  [ERRORE] Fallito: $($_.Exception.Message)" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""
Write-Host "=== Completato! ===" -ForegroundColor Green
Write-Host "File convertiti: $converted" -ForegroundColor Green
if ($errors -gt 0) {
    Write-Host "Errori: $errors" -ForegroundColor Red
}

Write-Host ""
Write-Host "NOTA: I file PNG originali sono ancora presenti." -ForegroundColor Yellow
Write-Host "Puoi eliminarli manualmente se la conversione è andata bene." -ForegroundColor Yellow
Write-Host ""

# Mostra lista file JPG creati
$jpgFiles = Get-ChildItem -Filter "*.jpg"
Write-Host "File JPG nella cartella:" -ForegroundColor Cyan
$jpgFiles | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }

Write-Host ""
pause
