# Guida Rapida - Creare Poster per Video

Devi creare 11 immagini poster dai video. Ecco i nomi esatti dei file da creare:

## Lista File Poster Necessari

```
media/posters/
├── poster-matriosca-1.jpg
├── poster-matriosca-2.jpg
├── poster-matriosca-3.jpg
├── poster-matriosca-4.jpg
├── poster-matriosca-5.jpg
├── poster-matriosca-6.jpg
├── poster-matriosca-7.jpg
├── poster-controllo-temperature.jpg
├── poster-pendolo.jpg
├── poster-pendolo-1.jpg
└── poster-video-xx.jpg
```

---

## Metodo 1: VLC Media Player (RACCOMANDATO - Veloce)

### Installazione
Se non hai VLC, scaricalo da: https://www.videolan.org/vlc/

### Procedura
1. Apri il video con VLC
2. Pausa sul frame più rappresentativo (o usa le frecce per muoverti frame per frame)
3. Menu: **Video** → **Take Snapshot** (o premi `Shift + S`)
4. Lo screenshot viene salvato nella cartella Immagini
5. Rinomina il file con il nome corrispondente dalla lista sopra
6. Sposta il file in `Stampante 3D/media/posters/`

**Shortcut veloce:** `Shift + S` per screenshot istantaneo

---

## Metodo 2: FFmpeg (Automatico - per utenti avanzati)

### Installazione FFmpeg
Windows: Scarica da https://ffmpeg.org/download.html

### Script PowerShell Automatico

Apri PowerShell nella cartella `Stampante 3D/media/` e esegui:

```powershell
# Crea la cartella posters se non esiste
New-Item -ItemType Directory -Force -Path "posters"

# Estrae frame a 1 secondo da ogni video
ffmpeg -i "stampante video matriosca 1.mp4" -ss 00:00:01 -vframes 1 "posters/poster-matriosca-1.jpg"
ffmpeg -i "stampante video matriosca 2.mp4" -ss 00:00:01 -vframes 1 "posters/poster-matriosca-2.jpg"
ffmpeg -i "stampante video matriosca 3.mp4" -ss 00:00:01 -vframes 1 "posters/poster-matriosca-3.jpg"
ffmpeg -i "stampante video matriosca 4.mp4" -ss 00:00:01 -vframes 1 "posters/poster-matriosca-4.jpg"
ffmpeg -i "stampante video matriosca 5.mp4" -ss 00:00:01 -vframes 1 "posters/poster-matriosca-5.jpg"
ffmpeg -i "stampante video matriosca 6.mp4" -ss 00:00:01 -vframes 1 "posters/poster-matriosca-6.jpg"
ffmpeg -i "stampante video matriosca 7.mp4" -ss 00:00:01 -vframes 1 "posters/poster-matriosca-7.jpg"
ffmpeg -i "stampante controllo temperature piatto.mp4" -ss 00:00:01 -vframes 1 "posters/poster-controllo-temperature.jpg"
ffmpeg -i "stampante pendolo.mp4" -ss 00:00:01 -vframes 1 "posters/poster-pendolo.jpg"
ffmpeg -i "stampante pendolo 1.mp4" -ss 00:00:01 -vframes 1 "posters/poster-pendolo-1.jpg"
ffmpeg -i "stampante video xx.mp4" -ss 00:00:01 -vframes 1 "posters/poster-video-xx.jpg"
```

**Nota:** Cambia `00:00:01` con il timestamp del frame più rappresentativo per ogni video

---

## Metodo 3: Windows - Foto App (Semplice)

1. Apri il video con l'app Foto di Windows
2. Clicca **Modifica e crea** → **Salva foto**
3. Scorri al frame desiderato e clicca **Salva foto**
4. Rinomina e sposta nella cartella `posters/`

---

## Metodo 4: Screenshot Manuale (Ultimo Resort)

1. Apri il video a schermo intero con qualsiasi player
2. Pausa sul frame desiderato
3. Premi `Win + Shift + S` (Strumento di cattura Windows)
4. Seleziona l'area del video
5. Apri Paint, incolla (`Ctrl + V`)
6. Salva come JPG con il nome corretto nella cartella `posters/`

---

## Tips per Scegliere i Frame Migliori

- Scegli frame dove si vede chiaramente **cosa sta succedendo**
- Evita frame sfocati o in movimento
- Per i video matrioska: scegli frame dove si vede bene la stampante che stampa
- Per test: scegli frame che mostrano il componente testato (piatto, pendolo, etc.)
- Preferisci frame nei primi 3-5 secondi del video (sono più rappresentativi)

---

## Verifica Finale

Dopo aver creato tutti i poster, verifica che:
- [ ] Ci sono esattamente 11 file `.jpg` nella cartella `posters/`
- [ ] I nomi dei file corrispondono ESATTAMENTE a quelli nella lista sopra
- [ ] Le immagini sono in formato JPG (non PNG o altro)
- [ ] Le immagini hanno una risoluzione decente (almeno 640x480)

---

## Troubleshooting

**Problema:** Il poster non appare nel browser
- Verifica che il nome del file sia esattamente come nella lista (maiuscole/minuscole, trattini)
- Controlla che il file sia effettivamente nella cartella `media/posters/`
- Prova a ricaricare la pagina con `Ctrl + F5`

**Problema:** L'immagine è troppo grande/piccola
- Le dimensioni verranno ridimensionate automaticamente dal CSS
- Risoluzione consigliata: 800x600 o simile (non troppo pesante)

---

Fatto! Dopo aver creato tutti i poster, apri il README.md in un browser e verifica che si vedano correttamente su mobile.
