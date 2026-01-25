# ============================================================================
# Script: Genera HTML da Jupyter Notebooks
# ============================================================================
# Descrizione: Converte tutti i notebook .ipynb in HTML statici per
#              visualizzazione web senza necessità di eseguire codice
# ============================================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Genera HTML da Jupyter Notebooks" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifica installazione jupyter nbconvert
Write-Host "Verifico installazione jupyter nbconvert..." -ForegroundColor Yellow
$nbconvertCheck = & python -m jupyter nbconvert --version 2>$null

if (-not $nbconvertCheck) {
    Write-Host "❌ jupyter nbconvert non trovato!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installazione necessaria:" -ForegroundColor Yellow
    Write-Host "  pip install jupyter nbconvert" -ForegroundColor White
    Write-Host ""
    $install = Read-Host "Vuoi installarlo ora? (s/n)"

    if ($install -eq 's') {
        Write-Host "Installazione in corso..." -ForegroundColor Yellow
        & python -m pip install jupyter nbconvert
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Installazione fallita!" -ForegroundColor Red
            exit 1
        }
        Write-Host "✅ Installazione completata!" -ForegroundColor Green
    } else {
        Write-Host "Operazione annullata." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "✅ jupyter nbconvert trovato!" -ForegroundColor Green
Write-Host ""

# Trova tutti i notebook nel progetto
Write-Host "Ricerca notebooks..." -ForegroundColor Yellow
$notebooks = Get-ChildItem -Path . -Filter "*.ipynb" -Recurse | Where-Object {
    $_.FullName -notmatch "\.ipynb_checkpoints"
}

if ($notebooks.Count -eq 0) {
    Write-Host "❌ Nessun notebook trovato!" -ForegroundColor Red
    exit 0
}

Write-Host "Trovati $($notebooks.Count) notebook(s):" -ForegroundColor Green
$notebooks | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor White }
Write-Host ""

# Contatori
$convertiti = 0
$errori = 0

# Converti ogni notebook
foreach ($notebook in $notebooks) {
    $nomeFile = $notebook.Name
    $percorso = $notebook.DirectoryName
    $nomeBase = [System.IO.Path]::GetFileNameWithoutExtension($nomeFile)
    $outputHtml = Join-Path $percorso "$nomeBase.html"

    Write-Host "📄 Conversione: $nomeFile" -ForegroundColor Cyan
    Write-Host "   Output: $outputHtml" -ForegroundColor Gray

    try {
        # Esegui conversione con template completo
        & python -m jupyter nbconvert --to html `
            --template classic `
            --embed-images `
            "$($notebook.FullName)" `
            --output "$outputHtml" 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0 -and (Test-Path $outputHtml)) {
            $dimensione = (Get-Item $outputHtml).Length / 1KB
            Write-Host "   ✅ Convertito! ($([math]::Round($dimensione, 1)) KB)" -ForegroundColor Green
            $convertiti++
        } else {
            Write-Host "   ❌ Errore durante la conversione" -ForegroundColor Red
            $errori++
        }
    }
    catch {
        Write-Host "   ❌ Errore: $($_.Exception.Message)" -ForegroundColor Red
        $errori++
    }

    Write-Host ""
}

# Riepilogo finale
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RIEPILOGO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Notebook trovati:  $($notebooks.Count)" -ForegroundColor White
Write-Host "Convertiti:        $convertiti" -ForegroundColor Green
Write-Host "Errori:            $errori" -ForegroundColor $(if ($errori -gt 0) { "Red" } else { "White" })
Write-Host ""

if ($convertiti -gt 0) {
    Write-Host "✅ File HTML pronti per il deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 Nota: I file HTML sono standalone (immagini embedded)" -ForegroundColor Yellow
    Write-Host "   Possono essere visualizzati direttamente nel browser." -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Nessun file convertito!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Premi un tasto per uscire..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
