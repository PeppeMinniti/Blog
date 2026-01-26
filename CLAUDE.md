# CLAUDE.md - Portfolio Progetti Automazione

> **Context file per assistente AI**
> Questo file mantiene il contesto completo del progetto portfolio/blog

---

## 📋 PANORAMICA PROGETTO

### Obiettivo
Creare un **portfolio/blog professionale** per monetizzare competenze in:
- Elettronica digitale e microcontrollori
- Automazione industriale
- Sviluppo software (C++, Python, Laravel)
- Meccanica e CAD

### Motivazione
- ✅ Mettere a reddito competenze tecniche avanzate
- ✅ Dimostrare esperienza pratica con ~50 progetti realizzati
- ✅ Attrarre consulenze e collaborazioni
- ✅ Condividere conoscenza (l'utente non ha feeling con social tradizionali)

### Target Audience
1. **Aziende** che cercano consulenti automazione/embedded
2. **Maker avanzati** interessati a progetti complessi
3. **Hobbisti** che vogliono imparare da progetti reali
4. **Potenziali clienti** per consulenze custom

---

## 🏗️ STRUTTURA ATTUALE

```
PROGETTI/
├── CLAUDE.md                      ← Questo file (context tracking)
├── README.md                      ← ✅ Homepage portfolio
├── about.md                       ← ✅ Pagina "Chi Sono"
├── _config.yml                    ← ✅ Configurazione Jekyll
├── .gitignore                     ← ✅ File da escludere da Git
├── LICENSE                        ← ✅ Licenza MIT
│
├── _layouts/                      ← ✅ Layout Jekyll custom
│   └── default.html               ← Header, footer, navigation
│
├── assets/                        ← ✅ Assets statici
│   ├── css/
│   │   └── style.scss             ← Tema scuro personalizzato
│   ├── js/
│   │   └── lightbox.js            ← Sistema lightbox per media
│   └── images/                    ← Immagini generali
│
├── blog/                          ← ✅ Struttura blog
│   └── README.md                  ← Linee guida articoli, idee, template
│
├── crea_tutti_poster.ps1          ← ✅ Script automazione poster (richiede FFmpeg)
├── installa_ffmpeg_portatile.ps1  ← ℹ️ Script installazione FFmpeg (opzionale)
│   Note: FFmpeg non più incluso (296MB risparmiati). Installare se necessario.
│
├── stampante-3d/                  ← ✅ PROGETTO DOCUMENTATO
│   ├── index.md                   ← Documentazione completa
│   ├── media/
│   │   ├── (21 file foto/video)
│   │   └── posters/               ← 11 poster JPG per video
│   ├── cad/ (13 file .dwg)
│   └── software/printer.cfg
│
├── CNC/                           ← 🔶 PAGINA WIP CREATA
│   ├── index.md                   ← Work in progress page
│   └── media/
│       ├── (foto e video)
│       └── posters/               ← 3 poster JPG
│
├── plotter-verticale/             ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/
│       ├── plotter verticale.mp4
│       └── posters/               ← 1 poster JPG
│
├── Levitazione/                   ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/
│       ├── levitazione 1.jpeg
│       ├── levitazione 2.mp4
│       └── posters/               ← 1 poster JPG
│
├── Radio/                         ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/
│       ├── (5 foto + 1 video)
│       └── posters/               ← 1 poster JPG
│
├── alberello-natale/              ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/
│       ├── (3 video albero)
│       └── posters/               ← 3 poster JPG
│
├── distributore-filo/             ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/
│       ├── (2 video)
│       └── posters/               ← 2 poster JPG
│
├── Cancello/                      ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/posters/
│
├── Droni/                         ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/posters/
│
├── lampada-rgb/                   ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/posters/
│
├── Radar/                         ← 🔶 PAGINA WIP CREATA
│   ├── index.md
│   └── media/posters/
│
├── Elettronica/                   ← Da esplorare
└── Varie/                         ← Da esplorare
```

**Legenda:**
- ✅ = Completato e funzionante
- 🔶 = Pagina placeholder "Work in Progress" creata
- ⏳ = Da documentare

---

## ✅ LAVORO COMPLETATO (Sessione 2026-01-20)

### 1. Homepage Portfolio (README.md)
**File:** `README.md`
**Status:** ✅ Completato - DA PERSONALIZZARE

**Contenuti:**
- Introduzione professionale
- 5 progetti in evidenza con card descrittive
- Tabella progetti secondari
- Sezione competenze tecniche dettagliate
- Servizi offerti (consulenza, sviluppo, automazione, formazione)
- Perché scegliermi (esperienza, competenze, approccio)
- Placeholder contatti (DA AGGIORNARE)
- Footer professionale

**TODO Personalizzazione:**
- [X] Sostituire `[La tua email]` con email reale
- [X] Aggiungere link LinkedIn, GitHub, Instagram
- [X] Aggiungere nome reale nel footer
- [X] Opzionale: Aggiungere foto/logo personale

---

### 2. Pagina Chi Sono (about.md)
**File:** `about.md`
**Status:** ✅ Completato - DA PERSONALIZZARE

**Contenuti:**
- Storia personale e percorso
- Competenze chiave con rating (⭐⭐⭐⭐⭐)
- Deep dive su progetti significativi
- Filosofia di lavoro (4 principi)
- Servizi offerti dettagliati
- Motivazione del portfolio
- Interessi e curiosità
- "Statistiche nerd" divertenti
- Valori professionali
- Status disponibilità

**TODO Personalizzazione:**
- [ ] Aggiungere foto personale (placeholder presente)
- [ ] Personalizzare aneddoti e storia
- [ ] Aggiornare contatti reali
- [ ] Opzionale: Modificare "statistiche nerd" con dati reali

---

### 3. Documentazione Stampante 3D
**File:** `Stampante 3D/README.md`
**Status:** ✅ Completato - DA RIVEDERE

**Contenuti:**
- Panoramica progetto con specifiche tecniche
- Volume stampa: 900×740×800mm
- Specifiche meccaniche (ricavate da printer.cfg)
- Elettronica: BIGTREETECH Octopus Pro V1.1, STM32H723
- Firmware: Klipper + Mainsail
- Skills richieste (tabella con rating)
- Fasi realizzazione (6 step con tempistiche)
- Costi stimati: ~1.000-1.500€
- Gallery con link a foto/video esistenti
- Difficoltà e sfide affrontate
- Risultati ottenuti

**Dati tecnici estratti da printer.cfg:**
- Stepper X: 16 microstep, 80mm rotation distance, 900mm max
- Stepper Y: 64 microstep, 40mm rotation distance (rapporto 2:1), 740mm max
- Stepper Z: 32 microstep, 5mm rotation distance (TR8x5), 800mm max
- Estrusore: 8 microstep, 0.4mm nozzle, pressure advance 0.055
- BLTouch per auto leveling
- Sensori: Raspberry Pi temp, MCU temp, accelerometro (opzionale)

**TODO:**
- [ ] Verificare accuratezza specifiche tecniche
- [ ] Aggiungere dettagli personali che solo l'utente conosce
- [ ] Verificare link a immagini/video funzionanti

---

### 4. Struttura Blog
**File:** `blog/README.md`
**Status:** ✅ Completato

**Contenuti:**
- Template articolo standard
- 20+ idee per articoli futuri:
  - Tutorial pratici (stampante 3D, CNC, Input Shaper)
  - Approfondimenti tecnici (PID, Stepper vs Servo, ESP32)
  - Case study (risparmio costi, retrofit, debugging)
  - Guide introduttive (Arduino, CAD)
  - Tips & tricks
- Calendario editoriale esempio
- Linee guida stile scrittura (Do's and Don'ts)
- SEO keywords da targetizzare
- Strategie promozione
- Metriche da tracciare

**Primo articolo suggerito:**
"Come ho costruito una stampante 3D custom da 900mm" - Tutto il materiale è già disponibile

---

### 5. Sistema Automazione Poster Video
**Script:** `crea_tutti_poster.ps1` + `installa_ffmpeg_portatile.ps1`
**Status:** ✅ Completato e Funzionante

**Funzionalità:**
- Scansione automatica di tutte le cartelle `media/` del progetto
- Estrazione fotogramma da ogni video MP4 (al secondo 1)
- Generazione poster JPG ottimizzati (~40-60 KB ciascuno)
- Skip intelligente dei poster già esistenti
- Report dettagliato con statistiche

**Risultati:**
- **19 poster creati** automaticamente
- **22 video totali** processati
- Tutti i tag `<video>` aggiornati con attributo `poster`
- Performance mobile ottimizzate

**Prerequisiti:**

- ⚠️ **FFmpeg non più incluso** (296 MB risparmiati)
- Per creare nuovi poster: eseguire `.\installa_ffmpeg_portatile.ps1` prima
- Alternativa: Installare FFmpeg a livello di sistema

**Come usare:**
```powershell
# Se serve creare nuovi poster (opzionale):
.\installa_ffmpeg_portatile.ps1  # Scarica FFmpeg in locale (296 MB)
.\crea_tutti_poster.ps1          # Crea poster da nuovi video
```

**Note:** I 19 poster esistenti sono già stati creati e non serve FFmpeg per visualizzarli.

---

### 6. Pagine Work in Progress (WIP)
**Status:** ✅ 11 pagine create

Tutti i progetti hanno ora una pagina placeholder professionale:
- Header badge "Work in Progress"
- Descrizione progetto
- Anteprima media (foto/video con poster)
- Link navigazione portfolio

**Progetti con pagina WIP:**
1. CNC (2 video + poster)
2. plotter-verticale (1 video + poster)
3. Levitazione (1 foto + 1 video + poster)
4. Radio (5 foto + 1 video + poster)
5. alberello-natale (3 video + poster)
6. distributore-filo (2 video + poster)
7. Cancello
8. Droni
9. lampada-rgb
10. Radar
11. Elettronica

**Vantaggi:**
- Portfolio navigabile da subito
- Nessuna pagina 404
- User experience professionale
- Facile aggiornamento futuro

---

### 7. Sistema Lightbox e Media Gallery
**File:** `assets/js/lightbox.js` + CSS in `style.scss`
**Status:** ✅ Completato

**Caratteristiche:**
- Lightbox per immagini e video
- Click su thumbnail → apertura fullscreen (75% viewport)
- Controlli video (play, pause, volume)
- Chiusura con X o click fuori
- Animazioni smooth (fade + zoom)
- Responsive (adattamento mobile)

**CSS Gallery Features:**
- Thumbnails uniformi 300×225px
- Hover effects (scale 1.05 + glow blu)
- Grid centrato e responsive
- Play icon overlay su video
- Border e shadow professionali

---

## 🎯 TODO LIST PRIORITARIA

### ✅ COMPLETATO
- [X] Personalizzare contatti in README.md e about.md
- [X] Setup tema scuro e layout professionale
- [X] Sistema poster automatico per video (19 poster creati)
- [X] Pagine WIP per tutti i progetti (11 pagine)
- [X] Sistema lightbox funzionante
- [X] CSS ottimizzato e responsive
- [X] Installazione FFmpeg portatile

### 🔥 PRIORITÀ ALTA (Prossime settimane)
- [ ] **Deploy su GitHub Pages**
  - Creare repository pubblico
  - Primo push e test deploy
  - Verificare che tutto funzioni online

- [ ] **Documentazione completa progetti principali**
  - [ ] CNC (5 assi) - Da `index.md` WIP → documentazione completa
  - [ ] Plotter verticale - Espandere con dettagli tecnici
  - [ ] Levitazione magnetica - Aggiungere teoria e schema PID
  - [ ] Radio - Dettagli ESP32, streaming, web interface

- [ ] **Revisione stampante-3d/index.md**
  - Verificare accuratezza dati tecnici
  - Aggiungere foto processo costruzione
  - Integrare aneddoti personali

### 📊 PRIORITÀ MEDIA (Entro un mese)
- [ ] **Completare documentazione progetti secondari**
  - Radar (ultrasonico + web UI)
  - Distributore filo (hardware + software)
  - Alberello Natale (LED WS2812B)
  - Lampada RGB
  - Cancello automatico
  - Droni

- [ ] **Ottimizzazioni**
  - Comprimere immagini pesanti (>1MB)
  - Aggiungere foto personale in about.md
  - SEO: meta description per ogni pagina

### ✍️ CONTENUTI (Settimana 3-4)
- [ ] **Scrivere primo articolo blog**
  - Titolo suggerito: "Come ho costruito una stampante 3D custom da 900mm"
  - Struttura: Intro → Progettazione → Componenti → Costruzione → Sfide → Risultati → Costi
  - Materiale: Già disponibile dalla documentazione stampante

- [ ] **Preparare seconda bozza articolo**
  - Opzioni: Input Shaper, Controllo PID, o CNC tutorial

### 🚀 PUBBLICAZIONE (Settimana 4)
- [ ] **Setup GitHub**
  - Creare repository pubblico separato "portfolio" o "progetti-automazione"
  - Upload file
  - Testare in locale

- [ ] **Attivare GitHub Pages**
  - Settings → Pages → Source: main branch
  - Custom domain opzionale
  - Testare URL pubblico

- [ ] **Primo annuncio**
  - Post LinkedIn con link portfolio
  - Condivisione in community/forum pertinenti
  - Email ad alcuni contatti selezionati

---

## 📝 NOTE TECNICHE

### Informazioni Utente

**Competenze dichiarate:**
- ✅ Ottima conoscenza microcontrollori
- ✅ Approfondita conoscenza elettronica digitale
- ✅ Programmazione: C++, Python, Laravel
- ✅ CAD e disegno tecnico (FreeCAD e AutoCAD)
- ✅ Meccanica e assemblaggio

**Progetti Maggiori Realizzati:**
1. Stampante 3D grandi dimensioni (Area stampa: 900×740×800mm, Struttura: 1080×1000×1100mm)
2. Fresa CNC 5 assi
3. Fresa CNC 3 assi grandi dimensioni
4. Plotter verticale
5. ~50 progetti vari in automazione

**Parametri Tecnici Stampante 3D (Riferimento Rapido):**
- **Dimensioni:**
  - Area stampa utile: 900×740×800mm (X×Y×Z)
  - Struttura: 1080×1000×1100mm (X×Y×Z)
  - Profili: 40×20×2mm acciaio S235
- **Cinematica:**
  - Asse Z: Piatto riscaldato 30 kg mobile verticalmente (4 × NEMA23)
    - Vetro temperato 900×900×10mm: 20 kg
    - Piatto alluminio 900×900×4mm + 9 riscaldatori: 10 kg
  - Asse X: Testina + estrusore 1 kg mobile orizzontalmente (binario 1080mm)
  - Asse Y: Binari NGM20H fissi (1000mm) - la testina scorre su questi
- **Accelerazioni:**
  - Asse X (testina leggera): 5000 mm/s²
  - Asse Z (piatto pesante): 500 mm/s²
- **Elettronica:**
  - BIGTREETECH Octopus Pro V1.1
  - MCU: STM32H723
  - Firmware: Klipper + Mainsail
  - BLTouch per auto-leveling

**Situazione Attuale:**
- Ha materiale multimediale (foto/video) per molti progetti
- File CAD disponibili
- Alcuni progetti hanno configurazioni software
- Vuole monetizzare ma non ha feeling con social tradizionali
- Preferisce documentazione tecnica e blog rispetto a Instagram/TikTok

**Account GitHub:**
- ✅ Ha già account GitHub
- Usato per progetto privato: Bot crypto trading autonomo complesso
- Vuole separare portfolio pubblico da progetti privati
- **Soluzione:** Repository pubblico separato nello stesso account

---

### Decisioni Architetturali

**Formato Scelto:** Markdown + GitHub Pages
- ✅ Gratis
- ✅ Version control nativo
- ✅ Credibilità tecnica
- ✅ SEO friendly
- ✅ Facile manutenzione
- ✅ No database/hosting necessario

**Struttura Documentazione:**
Ogni progetto ha:
1. README.md principale con documentazione completa
2. Cartella `/media/` per foto/video
3. Cartella `/cad/` per file tecnici
4. Cartella `/software/` per configurazioni/codice

**Stile Comunicazione:**
- Tecnico ma accessibile
- Storytelling con sfide/soluzioni
- Dati concreti (costi, tempistiche, specifiche)
- Focus su valore pratico
- Autenticità e progetti reali

---

## 🔧 SETUP GITHUB - ISTRUZIONI

### Separare Progetti Pubblici e Privati

**Opzione consigliata:** Repository multipli nello stesso account

```
GitHub Account (username)
├── crypto-bot/           ← Repository PRIVATO (esistente)
│   └── [codice riservato]
│
└── portfolio/            ← Repository PUBBLICO (nuovo)
    └── [tutti i file PROGETTI/]
```

**Vantaggi:**
- ✅ Un solo account da gestire
- ✅ Separazione netta pubblico/privato
- ✅ URL pulito: `username.github.io/portfolio`
- ✅ Nessuna interferenza tra progetti

### Step per Setup

1. **Creare nuovo repository pubblico**
   - Nome: `portfolio` o `progetti-automazione` o `maker-portfolio`
   - Visibilità: PUBLIC
   - Non inizializzare con README (abbiamo già i nostri file)

2. **Upload file locali**
   ```bash
   cd "c:\Users\Peppe\Desktop\PROGETTI"
   git init
   git add .
   git commit -m "Initial commit: portfolio progetti automazione"
   git branch -M main
   git remote add origin https://github.com/USERNAME/portfolio.git
   git push -u origin main
   ```

3. **Attivare GitHub Pages**
   - Repository → Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

4. **Testare**
   - URL sarà: `https://USERNAME.github.io/portfolio/`
   - Aspettare 2-3 minuti per deploy
   - Aprire URL e verificare

### File da NON committare

Creare `.gitignore`:
```
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Temp
*.tmp
*.bak

# Personal (se necessario)
appunti_privati.txt
```

---

## 🎨 MIGLIORAMENTI FUTURI (Post-Launch)

### Fase 2 - Miglioramenti Estetici
- [ ] Aggiungere tema Jekyll per look più professionale
- [ ] Custom domain (esempio: `tuonome.dev` - ~10€/anno)
- [ ] Logo/branding personale
- [ ] Favicon

### Fase 3 - Funzionalità Avanzate
- [ ] Form contatto (Formspree o Google Forms)
- [ ] Google Analytics per tracking visite
- [ ] Comments su articoli blog (Disqus o giscus)
- [ ] Search functionality

### Fase 4 - Contenuti
- [ ] Video YouTube embed (time-lapse costruzioni)
- [ ] Sezione "Progetti in corso"
- [ ] FAQ tecnica
- [ ] Resources/Tools page

### Fase 5 - Monetizzazione
- [ ] Pagina servizi con prezzi
- [ ] Link affiliazione Amazon componenti
- [ ] Calendario Calendly per booking consulenze
- [ ] Stripe/PayPal per pagamenti

---

## 📊 METRICHE DA TRACCIARE

### Post-pubblicazione
- Visite mensili (Google Analytics)
- Progetti più visti
- Articoli più letti
- Origine traffico (LinkedIn, forum, search)
- Richieste consulenza ricevute
- Conversione contatti → clienti

### Obiettivi Primo Anno
- 1.000+ visite/mese entro 6 mesi
- 3-5 consulenze pagate
- 10+ articoli blog pubblicati
- 100+ follower LinkedIn
- ROI positivo (tempo investito vs guadagno)

---

## 💡 IDEE E NOTE SPARSE

### Possibili Collaborazioni
- Aziende di automazione industriale (retrofit macchinari)
- Scuole/università (workshop Arduino/3D printing)
- FabLab locali (corsi e mentoring)
- Startup hardware (prototipazione rapida)

### Content Ideas
- Video "Studio tour" dell'officina
- Time-lapse costruzione progetti
- Serie "Errori comuni e come evitarli"
- Live coding/building session (Twitch?)
- Comparison: "Commercial vs DIY" per vari tool

### Network Building
- Partecipare a Maker Faire (visitatore → espositore)
- Contribuire a progetti open source (Klipper, GRBL)
- Rispondere su forum specializzati
- Guest post su blog di settore

---

## 🔄 CHANGELOG

### 2026-01-20 - Setup Iniziale
- ✅ Creata struttura portfolio base
- ✅ Homepage (README.md) completata
- ✅ About page (about.md) completata
- ✅ Documentato progetto Stampante 3D
- ✅ Setup struttura blog con linee guida
- ✅ Creata roadmap 30 giorni
- ✅ Creato questo file CLAUDE.md per context tracking

### 2026-01-21 - Tema Scuro e GitHub Pages
- ✅ Contatti personalizzati (email, LinkedIn, GitHub, Instagram)
- ✅ Creato tema scuro completo (CSS custom)
- ✅ Layout Jekyll personalizzato con header/footer
- ✅ Configurazione Jekyll (_config.yml)
- ✅ Fix compatibilità GitHub Pages (rimosso tema non supportato)
- ✅ File LICENSE e .gitignore
- 🚀 Pronto per primo deploy GitHub Pages

### 2026-01-22 - Sistema Media e Lightbox
- ✅ Sistema lightbox completo per foto e video
- ✅ JavaScript per gestione modal e interazioni
- ✅ CSS ottimizzato per thumbnail gallery
- ✅ Fix layout e responsive design

### 2026-01-24 - Automazione Poster e Pagine WIP
- ✅ Installato FFmpeg portatile (versione 8.0.1)
- ✅ Creato script `crea_tutti_poster.ps1` (automazione poster da video)
- ✅ Creato script `installa_ffmpeg_portatile.ps1`
- ✅ Generati 19 poster JPG automaticamente da tutti i video
- ✅ Aggiornati tutti i tag `<video>` con attributo `poster`
- ✅ Creato 11 pagine "Work in Progress" per progetti
- ✅ CSS: centrati thumbnail nelle gallery (`justify-content: center`)
- ✅ Ottimizzazione performance mobile (poster JPG lightweight)

**File modificati (2026-01-24):**
- `assets/css/style.scss` - Centramento gallery
- `alberello-natale/index.md` - Aggiunti 3 poster
- `CNC/index.md` - Aggiunti 2 poster
- `distributore-filo/index.md` - Aggiunti 2 poster
- `Levitazione/index.md` - Aggiunto 1 poster
- `plotter-verticale/index.md` - Aggiunto 1 poster
- `Radio/index.md` - Aggiunto 1 poster
- `README.md` - Corretti 2 path poster

### 2026-01-25 - Ottimizzazione Dimensioni Repository

- ✅ Analisi dimensioni cartelle (totale: 536 MB → 240 MB)
- ✅ Rimossa cartella `ffmpeg/` (296 MB risparmiati, 55% di riduzione)
- ✅ Aggiunto `ffmpeg/` al `.gitignore` (evita commit accidentali)
- ✅ Aggiornata documentazione CLAUDE.md per riflettere la rimozione
- ℹ️ Script `installa_ffmpeg_portatile.ps1` disponibile se serve ricreare poster

**Motivo:** FFmpeg non necessario nel repository (i 19 poster sono già stati creati)

### 2026-01-25 - Notebook Jupyter Interattivi

- ✅ Creato primo Jupyter Notebook: `calcoli-strutturali.ipynb`
- ✅ 7 sezioni complete con analisi parametriche e grafici
- ✅ Badge Google Colab + Binder per esecuzione nel browser
- ✅ Script `genera_html_notebooks.ps1` per export HTML statico
- ✅ File `requirements.txt` per dipendenze Python
- ✅ README dedicato nella cartella progettazione
- ✅ Aggiornato `studio-dimensionamento-struttura.md` con link interattivi

**Funzionalità Notebook:**
1. Calcolo momento di inerzia profili
2. Analisi flessione con grafici parametrici
3. Frequenze di risonanza
4. Carichi reali stampante (masse + inerzia)
5. Confronto profili alternativi (tabella + grafici)
6. Dashboard riepilogo completo

**Nota:** Gli utenti web possono eseguire i notebook gratuitamente su Colab/Binder senza installare nulla.

### 2026-01-25 - Correzione Critica Notebook (Parametri Reali Stampante)

**⚠️ CORREZIONE IMPORTANTE:** Il notebook originale conteneva errori gravi nei parametri. È stato completamente riscritto.

**Errori corretti:**
- ❌ Massa piatto: 15 kg → ✅ **30 kg** (vetro 20kg + alluminio/riscaldatori 10kg)
- ❌ Massa testina: 2 kg → ✅ **1 kg** (estrusore + hotend)
- ❌ Dimensioni generiche → ✅ **Struttura: 1080×1000×1100mm** (vs area stampa 900×740×800mm)
- ❌ Cinematica errata (piatto su asse X) → ✅ **Cinematica corretta:**
  - **Asse Z**: Piatto 30 kg mobile verticalmente (4 × NEMA23)
  - **Asse X**: Testina 1 kg mobile orizzontalmente (1080mm)
  - **Asse Y**: Binari NGM20H **fissi** (1000mm)
- ❌ Accelerazioni uniformi → ✅ **Differenziate realisticamente:**
  - Asse X (testina leggera): 5000 mm/s²
  - Asse Z (piatto pesante): 500 mm/s²

**Nuove analisi aggiunte:**
1. ✅ **Analisi Asse X** (trave 1080mm, testina 1kg)
2. ✅ **Analisi Asse Y** (trave 1000mm, binari fissi + testina)
3. ✅ **Analisi Asse Z** (montanti verticali 1100mm, piatto 30kg)
   - Verifica carico di punta (formula di Eulero)
   - Coefficiente sicurezza instabilità
   - Flessione laterale da vibrazioni
4. ✅ **Frequenze di risonanza** per tutti e 3 gli assi
5. ✅ **Grafici comparativi** (4 subplot: flessione X, Y, massa, carico critico Z)
6. ✅ **Grafico parametrico** flessione vs accelerazione
7. ✅ **Schema ASCII cinematica** nella documentazione finale

**Struttura notebook finale (9 sezioni):**
1. Parametri stampante (dimensioni + masse dettagliate)
2. Calcolo momento di inerzia profilo 40×20×2mm
3. Analisi asse X - Trave 1080mm (testina)
4. Analisi asse Y - Trave 1000mm (binari)
5. Analisi asse Z - Montanti 1100mm (piatto 30kg)
6. Frequenze di risonanza (verifica vs freq. motori)
7. Confronto profili alternativi (6 profili)
8. Grafico parametrico accelerazione
9. Riepilogo finale con dashboard completo

**Impatto:** Il notebook ora riflette la configurazione reale della stampante con calcoli corretti per ogni asse.

### 2026-01-26 - Sistema Viewer CAD 3D STL (Risolto)

**✅ RISOLTO:** Viewer 3D per file STL completamente funzionante dopo debug intensivo.

**Problema iniziale:**
- Tentativo di convertire DWG → GLTF via CloudConvert API fallito (conversione non supportata)
- User trovato file STL già disponibili (13 file, 19KB-565KB)
- Creato sistema viewer con Three.js + STLLoader + OrbitControls
- **Errore critico:** CDN Three.js non caricavano correttamente ("THREE is not defined", "THREE.OrbitControls is not a constructor")
- Testati 4 CDN differenti (jsdelivr r160, r149, cdnjs r140, threejs.org) - tutti falliti

**Soluzione implementata:**
- ✅ Scaricato Three.js r128 localmente in `assets/js/three/` (~625KB totale)
  - `three.min.js`: 590KB
  - `OrbitControls.js`: 26KB
  - `STLLoader.js`: 9.7KB
- ✅ Modificato `_layouts/default.html` per caricare file locali invece di CDN
- ✅ Garantito ordine di caricamento corretto (three.min.js → OrbitControls → STLLoader)

**File creati/modificati:**
- `assets/js/three/three.min.js` - Core library (nuovo)
- `assets/js/three/OrbitControls.js` - Controlli camera (nuovo)
- `assets/js/three/STLLoader.js` - Loader STL (nuovo)
- `_layouts/default.html` - Link CDN → file locali (modificato)
- `assets/js/cad-viewer.js` - Viewer completo (~220 righe, esistente)
- `stampante-3d/fasi-realizzazione/1-progettazione/modelli-cad-3d.md` - Pagina gallery con 13 modelli (esistente)

**Funzionalità viewer:**
- ✅ Click su "🔍 Visualizza 3D" apre modal fullscreen
- ✅ Rendering STL con materiale blu (#58a6ff) portfolio-branded
- ✅ OrbitControls: rotazione mouse, zoom, pan
- ✅ Controlli: Reset vista, Wireframe toggle, Auto-rotazione
- ✅ Auto-centering e scaling camera in base a dimensioni modello
- ✅ Loading indicator con progresso percentuale
- ✅ Luci ambiente + direzionali per rendering realistico
- ✅ Griglia riferimento 3D
- ✅ Chiusura con ESC o click fuori modal
- ✅ Download buttons per STL e DWG

**Impatto:**
- Portfolio ora ha viewer 3D completamente funzionale senza dipendenze esterne
- 13 modelli CAD visualizzabili nel browser senza installare software
- Esperienza utente professionale con controlli intuitivi
- Nessun problema di CDN/CORS/timing

### TODO: Prossimi milestone
- [ ] YYYY-MM-DD - Primo deploy GitHub Pages
- [ ] YYYY-MM-DD - Documentazione completa progetti principali
- [ ] YYYY-MM-DD - Primo articolo pubblicato
- [ ] YYYY-MM-DD - Launch ufficiale e condivisione LinkedIn

---

## 🆘 QUICK REFERENCE

### File Chiave

**Configurazione Portfolio:**
- `CLAUDE.md` - Questo file (context tracking completo)
- `README.md` - Homepage portfolio
- `about.md` - Chi sono
- `_config.yml` - Configurazione Jekyll
- `_layouts/default.html` - Layout con header/footer/nav

**Stili e Script:**
- `assets/css/style.scss` - Tema scuro custom (~900 righe)
- `assets/js/lightbox.js` - Sistema lightbox per media
- `assets/js/cad-viewer.js` - Viewer 3D per modelli STL (~220 righe)
- `assets/js/three/` - Librerie Three.js r128 locali (625KB totale)
  - `three.min.js` (590KB), `OrbitControls.js` (26KB), `STLLoader.js` (9.7KB)
- `.gitignore` - File da escludere da Git

**Automazione:**
- `crea_tutti_poster.ps1` - Script creazione poster da video (richiede FFmpeg)
- `installa_ffmpeg_portatile.ps1` - Installazione FFmpeg (opzionale, 296 MB)
- `genera_html_notebooks.ps1` - Converte notebook Jupyter in HTML statico
- ⚠️ FFmpeg non più incluso nel repository (usare script installazione se necessario)

**Notebook Interattivi:**
- `requirements.txt` - Dipendenze Python per Jupyter (numpy, matplotlib, pandas)
- `stampante-3d/fasi-realizzazione/1-progettazione/calcoli-strutturali.ipynb` - Calcoli strutturali completi (9 sezioni)
  - Configurazione: Struttura 1080×1000×1100mm, Area stampa 900×740×800mm
  - Cinematica: Piatto 30kg su Z, Testina 1kg su X, Binari Y fissi
  - Analisi: Flessione 3 assi, Frequenze risonanza, Confronto profili, Carico di punta
- `stampante-3d/fasi-realizzazione/1-progettazione/README.md` - Guida notebook e badge Colab/Binder
- Badge Colab/Binder in markdown per esecuzione browser (no installazione)

**Blog e Content:**
- `blog/README.md` - Linee guida articoli e idee

### Template Progetto

**Usa `stampante-3d/index.md` come template** per documentare altri progetti.

**Sezioni standard:**
1. Header con badge status
2. Titolo progetto con emoji
3. Panoramica e motivazione
4. Caratteristiche tecniche (specs, componenti)
5. Skills richieste (tabella con rating)
6. Fasi realizzazione (timeline)
7. Costi stimati
8. Gallery media (foto + video con poster)
9. Difficoltà e sfide affrontate
10. Risultati ottenuti
11. Link navigazione (torna al portfolio)

**Convenzioni media:**
- Ogni progetto ha cartella `media/` per foto/video
- Ogni `media/` ha sottocartella `posters/` per poster JPG
- Video usano attributo `poster="media/posters/poster-nome.jpg"`
- Thumbnails 300×225px con hover effects

### Script Utili

**Creare poster da nuovi video:**
```powershell
.\crea_tutti_poster.ps1
```

**Testare sito localmente (se Jekyll installato):**
```bash
bundle exec jekyll serve
```

**Git workflow base:**
```bash
git add .
git commit -m "Descrizione modifiche"
git push
```

### Contatti Configurati

✅ Tutti i contatti sono stati personalizzati:
- Email: peppeminniti@gmail.com
- LinkedIn: giuseppe-minniti-m2m-fablab
- GitHub: PeppeMinniti
- Instagram: m2m_fablab

---

## 🎯 STATO ATTUALE E PROSSIMA AZIONE

### ✅ Completato Finora (Riepilogo)

**Setup Base:**
- Homepage, About, Blog structure
- Tema scuro professionale
- Layout Jekyll con nav/header/footer
- Sistema lightbox completo

**Media & Performance:**
- 19 poster JPG generati automaticamente
- Tutti i video ottimizzati con attributo poster
- Gallery responsive e centrate
- Script automazione riutilizzabile

**Contenuti:**
- 1 progetto documentato completamente (stampante-3d) + notebook Jupyter interattivo
- Notebook calcoli strutturali: 9 sezioni, parametri corretti, badge Colab/Binder
- 11 pagine WIP professionali create
- Tutti i contatti personalizzati

**Strumenti Analisi:**
- Notebook Jupyter interattivo con calcoli strutturali completi
- Analisi 3 assi (X: 1080mm, Y: 1000mm, Z: 1100mm)
- Cinematica corretta: Piatto 30kg su Z, Testina 1kg su X, Binari Y fissi
- Verifiche: Flessione, Frequenze risonanza, Carico di punta, Confronto profili

### 🎯 PROSSIMA AZIONE IMMEDIATA

**NEXT STEP:** Deploy su GitHub Pages

1. **Creare repository GitHub pubblico**
   - Nome suggerito: `Blog` o `portfolio` o `progetti-maker`
   - Visibilità: PUBLIC

2. **Primo push:**
   ```bash
   git add .
   git commit -m "Initial commit: portfolio completo con 11 progetti"
   git push -u origin main
   ```

3. **Attivare GitHub Pages**
   - Settings → Pages → Source: main branch
   - Attendere 2-3 minuti per deploy
   - Testare URL pubblico

4. **Verificare funzionamento:**
   - Homepage carica correttamente
   - Navigazione funziona
   - Video mostrano poster
   - Lightbox funziona
   - Mobile responsive OK

**Tempo stimato:** 15-20 minuti

### 📋 Dopo il Deploy

- Condividere link portfolio su LinkedIn
- Iniziare documentazione completa CNC o Levitazione
- Scrivere primo articolo blog (stampante 3D)

---

*File mantenuto aggiornato per preservare context tra sessioni*
*Ultima modifica: 2026-01-25*
*Status: Portfolio pronto per deploy + Notebook strutturali con parametri corretti*
