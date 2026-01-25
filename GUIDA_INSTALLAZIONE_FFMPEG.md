# Guida Installazione FFmpeg

FFmpeg è necessario per creare automaticamente i poster dai video.

## Metodo 1: Chocolatey (Più Veloce) ⚡

Se hai Chocolatey installato, esegui in PowerShell (come Amministratore):

```powershell
choco install ffmpeg
```

## Metodo 2: Download Manuale

1. **Scarica FFmpeg:**
   - Vai su: https://www.gyan.dev/ffmpeg/builds/
   - Scarica: `ffmpeg-release-essentials.zip`

2. **Estrai l'archivio:**
   - Estrai il contenuto in `C:\ffmpeg`

3. **Aggiungi al PATH:**
   - Apri "Variabili d'ambiente" dal Pannello di Controllo
   - In "Variabili di sistema", seleziona `Path` e clicca "Modifica"
   - Clicca "Nuovo" e aggiungi: `C:\ffmpeg\bin`
   - Clicca "OK" su tutte le finestre

4. **Verifica installazione:**
   Apri un nuovo PowerShell e digita:
   ```powershell
   ffmpeg -version
   ```

   Dovresti vedere la versione di FFmpeg installata.

## Uso dello Script

Dopo aver installato FFmpeg:

1. Apri PowerShell
2. Naviga alla cartella PROGETTI:
   ```powershell
   cd "C:\Users\Peppe\Desktop\PROGETTI"
   ```

3. Esegui lo script:
   ```powershell
   .\crea_tutti_poster.ps1
   ```

4. Lo script creerà automaticamente tutti i poster mancanti!

## Troubleshooting

### "Impossibile eseguire script"
Se ricevi un errore di esecuzione policy, esegui:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "ffmpeg non trovato"
- Riavvia PowerShell dopo l'installazione
- Verifica che FFmpeg sia nel PATH: `$env:Path -split ';' | Select-String ffmpeg`

### "Poster non creato"
- Verifica che il video non sia corrotto
- Prova ad aprire il video con VLC o altro player
- Controlla lo spazio disco disponibile

## Alternative Senza FFmpeg

Se preferisci non installare FFmpeg, puoi creare i poster manualmente con VLC:

1. Apri il video con VLC
2. Metti in pausa al frame desiderato
3. Menu `Video` → `Cattura schermata`
4. Salva nella cartella `media/posters/` con nome `poster-nome-video.jpg`

---

*Script creato per il portfolio Peppe Minniti - 2026*
