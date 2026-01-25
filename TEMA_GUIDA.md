# 🎨 Guida Tema Scuro Portfolio

## Cosa è stato creato

### 1. Configurazione Jekyll (`_config.yml`)
File di configurazione principale per GitHub Pages:
- Titolo e descrizione del sito
- URL e baseurl
- Tema di base (slate)
- Plugin SEO
- File da escludere dalla pubblicazione

### 2. CSS Custom (`assets/css/style.scss`)
Tema scuro professionale con:
- **Palette colori dark mode** (stile GitHub)
- **Testo sempre leggibile** (contrasti ottimizzati)
- **Componenti stilizzati:**
  - Headings con bordi colorati
  - Link con hover effect
  - Tabelle responsive con hover
  - Codice con syntax highlighting
  - Immagini con bordi arrotondati e shadow
  - Card progetti con effetti hover
  - Badge e tag colorati
- **Responsive design** (mobile-friendly)
- **Accessibilità** (focus states, contrasti)
- **Scrollbar personalizzata**

### 3. Layout Personalizzato (`_layouts/default.html`)
Template HTML completo con:
- **Header sticky** con navigazione
- **Footer** con link e info
- **Pulsante "Torna su"** (appare dopo scroll)
- **Meta tags SEO** ottimizzati
- **Open Graph** per condivisioni social
- **Responsive navigation**

---

## 🎨 Palette Colori

```css
Background Primario:   #0d1117 (nero-blu scuro)
Background Secondario: #161b22 (grigio molto scuro)
Background Terziario:  #21262d (grigio scuro)

Testo Primario:        #e6edf3 (bianco-grigio chiaro)
Testo Secondario:      #8b949e (grigio medio)

Accent Primario:       #58a6ff (blu chiaro)
Accent Secondario:     #1f6feb (blu intenso)
Success:               #3fb950 (verde)
Warning:               #d29922 (arancione)
Danger:                #f85149 (rosso)
```

Questi colori garantiscono **eccellente leggibilità** anche in condizioni di scarsa illuminazione.

---

## 📁 Struttura File Tema

```
PROGETTI/
├── _config.yml                 ← Configurazione Jekyll
├── _layouts/
│   └── default.html           ← Layout HTML personalizzato
├── assets/
│   └── css/
│       └── style.scss         ← CSS tema scuro
└── [tutti gli altri file...]
```

---

## 🚀 Come Funziona su GitHub Pages

1. GitHub Pages rileva automaticamente `_config.yml`
2. Usa Jekyll per processare il sito
3. Applica il tema base (slate)
4. Sovrascrive con il CSS custom in `assets/css/style.scss`
5. Usa il layout in `_layouts/default.html` per tutte le pagine

**Risultato:** Tutte le tue pagine Markdown avranno automaticamente il tema scuro!

---

## ✏️ Personalizzazioni Possibili

### Cambiare i Colori

Modifica le variabili CSS in `assets/css/style.scss`:

```scss
:root {
  --accent-primary: #58a6ff;  /* Cambia questo per colore principale */
  --bg-primary: #0d1117;      /* Cambia per sfondo più chiaro/scuro */
  /* ... */
}
```

**Esempi alternative:**
- **Blu elettrico:** `--accent-primary: #00d4ff;`
- **Verde tech:** `--accent-primary: #00ff88;`
- **Arancione:** `--accent-primary: #ff6b35;`
- **Viola:** `--accent-primary: #a78bfa;`

### Cambiare il Font

In `assets/css/style.scss`, modifica:

```scss
body {
  font-family: 'Roboto', 'Arial', sans-serif !important;
}
```

Font consigliati:
- **Roboto** - Moderno e pulito
- **Inter** - Ottimo per UI
- **Fira Code** - Per look più "coder"
- **JetBrains Mono** - Monospace elegante

### Aggiungere Logo/Favicon

1. Crea/ottieni un'immagine 32x32px (PNG)
2. Salvala in `assets/favicon.png`
3. Decommentare riga in `_layouts/default.html`:
   ```html
   <link rel="icon" type="image/png" href="{{ site.baseurl }}/assets/favicon.png">
   ```

### Modificare Header/Footer

Modifica direttamente `_layouts/default.html`:
- **Link navigazione:** Sezione `<nav class="main-nav">`
- **Footer:** Sezione `<footer class="site-footer">`

---

## 🎯 Componenti Pronti all'Uso

### Card Progetto

```html
<div class="project-card">
  <h3>Nome Progetto</h3>
  <p>Descrizione...</p>
</div>
```

### Note/Warning Box

```markdown
> **Note:** Questo è un messaggio importante
```

Oppure con classi custom:

```html
<div class="note">
  📝 <strong>Nota:</strong> Informazione utile
</div>

<div class="warning">
  ⚠️ <strong>Attenzione:</strong> Messaggio di warning
</div>
```

### Badge/Tag

```html
<span class="badge">Arduino</span>
<span class="badge">ESP32</span>
<span class="badge">Klipper</span>
```

### Pulsanti

```html
<a href="#" class="btn">Contattami</a>
```

### Statistiche

```html
<div class="stats">
  <div class="stat-item">
    <div class="stat-value">50+</div>
    <div class="stat-label">Progetti</div>
  </div>
  <div class="stat-item">
    <div class="stat-value">10+</div>
    <div class="stat-label">Anni Esperienza</div>
  </div>
</div>
```

---

## 🔧 Troubleshooting

### Il tema non si applica

1. Aspetta 2-3 minuti dopo il push (GitHub Pages impiega tempo)
2. Fai hard refresh (Ctrl+F5) per svuotare cache
3. Verifica che `_config.yml` sia presente nella root
4. Controlla GitHub Actions per errori di build

### I colori sono strani

- Controlla che il file `style.scss` abbia le righe iniziali `---` (front matter)
- Verifica sintassi CSS (errori bloccano l'import)

### Le immagini non si vedono

- Path relativi in Markdown: `![Alt](media/immagine.jpg)`
- Path assoluti: `![Alt]({{ site.baseurl }}/percorso/immagine.jpg)`

### Font non caricano

Aggiungi in `_layouts/default.html` nella sezione `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

Poi usa nel CSS:
```css
font-family: 'Roboto', sans-serif;
```

---

## 📱 Responsive Design

Il tema è **completamente responsive**:
- ✅ Desktop (> 1200px)
- ✅ Tablet (768px - 1200px)
- ✅ Mobile (< 768px)

**Breakpoint principale:** 768px

Testa su mobile usando Chrome DevTools (F12 → Toggle Device Toolbar)

---

## 🌙 Tema Chiaro (Opzionale)

Se vuoi aggiungere un **toggle light/dark mode**:

1. Aggiungi pulsante in header (`_layouts/default.html`)
2. JavaScript per salvare preferenza in localStorage
3. CSS con media query `@media (prefers-color-scheme: light)`

Posso aiutarti a implementarlo se ti interessa!

---

## 🎨 Alternative Tema

Se vuoi cambiare tema GitHub Pages, modifica in `_config.yml`:

```yaml
theme: slate        # Tema attuale (scuro)
# theme: midnight   # Alternativa scura
# theme: hacker     # Verde su nero (matrix style)
# theme: cayman     # Chiaro moderno
# theme: minimal    # Minimalista
```

**Consigliati per dark mode:**
- `slate` ← Attuale
- `midnight`
- `hacker`

---

## 📊 Accessibilità

Il tema è ottimizzato per:
- ✅ **Contrasto WCAG AAA** (testo leggibile)
- ✅ **Focus states** visibili per navigazione da tastiera
- ✅ **Screen reader friendly** (semantic HTML)
- ✅ **Responsive** per tutti i dispositivi
- ✅ **Print styles** per stampa

---

## 🚀 Prossimi Step

### Dopo il primo deploy:

1. **Testa su dispositivi reali** (smartphone, tablet)
2. **Ottimizza immagini** per caricamento veloce
3. **Aggiungi Google Analytics** (opzionale, in `_config.yml`)
4. **Custom domain** (opzionale, ~10€/anno)
5. **Aggiungi favicon** personalizzato

### Miglioramenti futuri:

- [ ] Toggle dark/light mode
- [ ] Animazioni CSS avanzate
- [ ] Search bar per trovare progetti
- [ ] Filtri per categoria/tecnologia
- [ ] Galleria immagini con lightbox

---

## 📝 Note Finali

- Il tema è **performance-friendly** (CSS puro, no framework pesanti)
- **SEO ottimizzato** con meta tags corretti
- **Facilmente manutenibile** (tutto il CSS in un file)
- **Compatibile** con tutti i browser moderni

Se vuoi modifiche o hai domande, chiedi pure!

---

**Buon lavoro con il tuo portfolio! 🚀**
