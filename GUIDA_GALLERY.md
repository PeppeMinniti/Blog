# 📸 Guida Gallery Thumbnail + Lightbox

Questa guida spiega come aggiungere e modificare le gallery di immagini e video nel portfolio.

---

## 🎯 Sistema Implementato

Ogni progetto nella sezione "Progetti in Evidenza" ha una **thumbnail gallery** con:
- **Immagini cliccabili** → Si espandono in lightbox a schermo intero
- **Video cliccabili** → Si aprono in lightbox e partono in autoplay
- **Layout orizzontale** → Le thumbnail sono affiancate automaticamente
- **Responsive** → Su mobile si adattano automaticamente

---

## 📝 Come Aggiungere una Gallery

### Template Base

```html
<div class="thumbnail-gallery">
  <!-- Aggiungi qui le tue immagini e video -->
</div>
```

### Aggiungere Immagini

```html
<img src="CARTELLA/NOME_FILE.jpeg" alt="Descrizione immagine" class="project-thumbnail">
```

**Esempio:**
```html
<div class="thumbnail-gallery">
  <img src="Stampante 3D/media/stampante 1.jpeg" alt="Stampante 3D - Vista principale" class="project-thumbnail">
  <img src="Stampante 3D/media/stampante 2.jpeg" alt="Stampante 3D - Dettaglio meccanica" class="project-thumbnail">
  <img src="Stampante 3D/media/stampante 3.jpeg" alt="Stampante 3D - Vista laterale" class="project-thumbnail">
</div>
```

### Aggiungere Video

**IMPORTANTE:** I video devono essere racchiusi in un wrapper `div` per visualizzare l'icona play ▶

```html
<div class="video-thumbnail-wrapper">
  <video src="CARTELLA/NOME_FILE.mp4" muted loop preload="metadata" title="Descrizione video"></video>
</div>
```

**Esempio:**
```html
<div class="thumbnail-gallery">
  <div class="video-thumbnail-wrapper">
    <video src="Plotter verticale/plotter verticale.mp4" muted loop preload="metadata" title="Plotter in azione"></video>
  </div>
</div>
```

### Mescolare Immagini e Video

Puoi mescolare immagini e video nella stessa gallery:

```html
<div class="thumbnail-gallery">
  <img src="Levitazione/media/levitazione 1.jpeg" alt="Levitazione - Vista frontale" class="project-thumbnail">
  <div class="video-thumbnail-wrapper">
    <video src="Levitazione/media/levitazione 2.mp4" muted loop preload="metadata" title="Turbina che fluttua"></video>
  </div>
  <img src="Levitazione/media/levitazione 3.jpeg" alt="Levitazione - Dettaglio circuito" class="project-thumbnail">
</div>
```

---

## 🎨 Dimensioni Thumbnail

- **Larghezza:** 300px
- **Altezza:** 225px
- **Aspect ratio:** 4:3

Le immagini vengono **automaticamente ridimensionate e croppate** (object-fit: cover) per adattarsi a queste dimensioni, mantenendo la proporzione.

---

## ⚙️ Attributi Importanti

### Per Immagini

```html
<img
  src="percorso/file.jpeg"           <!-- Percorso al file -->
  alt="Descrizione accessibile"       <!-- Testo alternativo per accessibilità -->
  class="project-thumbnail"           <!-- OBBLIGATORIO: classe CSS -->
>
```

### Per Video

**NOTA:** I video devono essere dentro un wrapper `<div class="video-thumbnail-wrapper">`

```html
<div class="video-thumbnail-wrapper">         <!-- OBBLIGATORIO: wrapper per icona play -->
  <video
    src="percorso/file.mp4"                  <!-- Percorso al file -->
    muted                                    <!-- Senza audio nella thumbnail -->
    loop                                     <!-- Riproduzione continua -->
    preload="metadata"                       <!-- Carica solo il primo frame -->
    title="Descrizione video"                <!-- Tooltip al passaggio del mouse -->
  ></video>
</div>
```

---

## 📂 Organizzazione File

Struttura consigliata per ogni progetto:

```
Nome Progetto/
├── README.md              ← Documentazione
├── media/                 ← Cartella immagini e video
│   ├── foto1.jpeg
│   ├── foto2.jpeg
│   └── video1.mp4
├── cad/                   ← File CAD (opzionale)
└── software/              ← Codice sorgente (opzionale)
```

---

## 🔧 Esempi Completi

### Esempio 1: Solo Immagini (3 foto)

```markdown
### [🖨️ Stampante 3D di Grandi Dimensioni](Stampante%203D/)

<div class="thumbnail-gallery">
  <img src="Stampante 3D/media/stampante 1.jpeg" alt="Stampante 3D - Vista principale" class="project-thumbnail">
  <img src="Stampante 3D/media/stampante 2.jpeg" alt="Stampante 3D - Dettaglio meccanica" class="project-thumbnail">
  <img src="Stampante 3D/media/stampante 3.jpeg" alt="Stampante 3D - Vista laterale" class="project-thumbnail">
</div>

**Stampante 3D custom da 900×740×800mm** - Una build completamente personalizzata...
```

### Esempio 2: Solo Video (1 video)

```markdown
### [📐 Plotter Verticale](Plotter%20verticale/)

<div class="thumbnail-gallery">
  <div class="video-thumbnail-wrapper">
    <video src="Plotter verticale/plotter verticale.mp4" muted loop preload="metadata" title="Plotter in azione"></video>
  </div>
</div>

**Wall plotter automatico** - Disegna su pareti e superfici verticali...
```

### Esempio 3: Immagine + Video

```markdown
### [🎆 Levitazione Magnetica](Levitazione/)

<div class="thumbnail-gallery">
  <img src="Levitazione/media/levitazione 1.jpeg" alt="Levitazione Magnetica - Vista frontale" class="project-thumbnail">
  <div class="video-thumbnail-wrapper">
    <video src="Levitazione/media/levitazione 2.mp4" muted loop preload="metadata" title="Turbina che fluttua"></video>
  </div>
</div>

**Sistema di levitazione magnetica** con controllo PID...
```

### Esempio 4: Gallery Grande (5+ elementi)

```markdown
### [⚙️ CNC a 5 Assi](CNC/)

<div class="thumbnail-gallery">
  <img src="CNC/media/cnc-overview.jpeg" alt="CNC - Vista completa" class="project-thumbnail">
  <img src="CNC/media/cnc-asse-x.jpeg" alt="CNC - Asse X" class="project-thumbnail">
  <img src="CNC/media/cnc-asse-y.jpeg" alt="CNC - Asse Y" class="project-thumbnail">
  <div class="video-thumbnail-wrapper">
    <video src="CNC/media/cnc-lavorazione.mp4" muted loop preload="metadata" title="CNC in lavorazione"></video>
  </div>
  <img src="CNC/media/cnc-dettaglio-motori.jpeg" alt="CNC - Dettaglio motori" class="project-thumbnail">
</div>

**Fresa CNC custom a 5 assi** per lavorazioni complesse...
```

---

## 🎬 Come Funziona il Lightbox

### Per Immagini
1. **Click sulla thumbnail** → Immagine si espande a schermo intero
2. **Click sullo sfondo** o **pulsante X** → Chiudi
3. **Tasto ESC** → Chiudi

### Per Video
1. **Click sulla thumbnail video** (con icona ▶) → Video si apre in lightbox
2. Video parte **in autoplay** con controlli nativi
3. **Click sullo sfondo** o **pulsante X** → Chiudi e ferma video
4. **Tasto ESC** → Chiudi e ferma video

---

## 📱 Comportamento Responsive

### Desktop (>768px)
- Thumbnail: 300×225px
- Layout: Affiancate orizzontalmente
- Wrap automatico quando non c'è spazio

### Tablet (768px - 480px)
- Thumbnail: 50% larghezza (2 per riga)
- Altezza: Auto (mantiene aspect ratio 4:3)

### Mobile (<480px)
- Thumbnail: 100% larghezza (1 per riga)
- Altezza: Auto (mantiene aspect ratio 4:3)

---

## ⚠️ Errori Comuni

### ❌ SBAGLIATO: Classe mancante

```html
<img src="foto.jpeg" alt="Foto">  <!-- ❌ Nessuna classe! -->
```

### ✅ CORRETTO: Con classe

```html
<img src="foto.jpeg" alt="Foto" class="project-thumbnail">  <!-- ✅ -->
```

---

### ❌ SBAGLIATO: Video senza wrapper

```html
<video src="video.mp4" muted loop preload="metadata"></video>  <!-- ❌ Senza wrapper! -->
```

### ✅ CORRETTO: Video con wrapper

```html
<img src="foto.jpeg" alt="Foto" class="project-thumbnail">  <!-- ✅ Immagine -->
<div class="video-thumbnail-wrapper">  <!-- ✅ Video con wrapper -->
  <video src="video.mp4" muted loop preload="metadata"></video>
</div>
```

---

### ❌ SBAGLIATO: Percorso con backslash (Windows)

```html
<img src="Progetto\media\foto.jpeg">  <!-- ❌ Windows path -->
```

### ✅ CORRETTO: Percorso con forward slash

```html
<img src="Progetto/media/foto.jpeg">  <!-- ✅ Web standard -->
```

---

### ❌ SBAGLIATO: Spazi non codificati

```html
<img src="Plotter verticale/plotter verticale.mp4">  <!-- ❌ Potrebbe non funzionare -->
```

### ✅ CORRETTO: Spazi come-sono (GitHub Pages gestisce)

```html
<img src="Plotter verticale/plotter verticale.mp4">  <!-- ✅ Funziona su GitHub Pages -->
```

O meglio ancora, **usa %20** per gli spazi:

```html
<img src="Plotter%20verticale/plotter%20verticale.mp4">  <!-- ✅ Standard web -->
```

---

## 🚀 Quick Reference

### Aggiungere una singola immagine:

```html
<div class="thumbnail-gallery">
  <img src="CARTELLA/FOTO.jpeg" alt="Descrizione" class="project-thumbnail">
</div>
```

### Aggiungere un singolo video:

```html
<div class="thumbnail-gallery">
  <div class="video-thumbnail-wrapper">
    <video src="CARTELLA/VIDEO.mp4" muted loop preload="metadata" title="Descrizione"></video>
  </div>
</div>
```

### Aggiungere multipli elementi:

```html
<div class="thumbnail-gallery">
  <img src="CARTELLA/FOTO1.jpeg" alt="Descrizione 1" class="project-thumbnail">
  <img src="CARTELLA/FOTO2.jpeg" alt="Descrizione 2" class="project-thumbnail">
  <div class="video-thumbnail-wrapper">
    <video src="CARTELLA/VIDEO.mp4" muted loop preload="metadata" title="Video"></video>
  </div>
  <img src="CARTELLA/FOTO3.jpeg" alt="Descrizione 3" class="project-thumbnail">
</div>
```

---

## 🎨 Personalizzazione CSS (Avanzato)

Se vuoi modificare le dimensioni o lo stile delle thumbnail, edita il file `assets/css/style.scss`:

```scss
/* Immagini */
.project-thumbnail {
  width: 300px;     /* Larghezza thumbnail */
  height: 225px;    /* Altezza thumbnail */
  /* ... altri stili ... */
}

/* Video wrapper */
.video-thumbnail-wrapper {
  width: 300px;     /* Larghezza wrapper video */
  height: 225px;    /* Altezza wrapper video */
  /* ... altri stili ... */
}

/* Video element dentro wrapper */
.video-thumbnail-wrapper video {
  width: 100%;      /* Occupa tutto il wrapper */
  height: 100%;     /* Occupa tutto il wrapper */
  /* ... altri stili ... */
}
```

---

## 📞 Supporto

Per problemi o domande:
- Controlla questa guida
- Verifica la sintassi HTML
- Assicurati che i file esistano nel percorso corretto
- Testa in locale prima di pubblicare

---

*Guida creata per Portfolio Peppe Minniti - Gennaio 2026*
