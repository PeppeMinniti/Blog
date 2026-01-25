---
layout: default
title: "Fine Tuning Parametri"
---
# Fine Tuning Parametri

## Descrizione

Ottimizzazione fine dei parametri di stampa dopo le calibrazioni base. Questo step perfeziona flow rate, velocità, accelerazioni e altri parametri per massimizzare qualità e velocità.

**Obiettivo:** Bilanciare qualità vs velocità per ottenere il miglior compromesso per le proprie esigenze.

## Immagini

<!-- Inserire confronti qualità -->
<!-- ![Confronto velocità](../../media/tuning/speed-comparison.jpg) -->

## Flow Rate Calibration

### 1. Calibrazione Flow Globale

```yaml
# Flow rate = moltiplicatore estrusione (default 100%)

Test procedura:
  1. Stampare singola parete (1 perimetro, no top/bottom, no infill)
  2. Specificare esattamente larghezza parete = nozzle (0.4mm)
  3. Misurare spessore parete reale con calibro
  4. Calcolare flow corretto

Esempio:
  Nozzle: 0.4mm
  Slicer line width: 0.4mm
  Misurato: 0.42mm (troppo largo)

  Flow_nuovo = Flow_attuale × (target / misurato)
  Flow_nuovo = 100% × (0.4 / 0.42) = 95.2%

  # Aggiornare in slicer:
  PrusaSlicer → Filament Settings → Extrusion multiplier: 0.952
  Cura → Material → Flow: 95.2%
```

### 2. Flow Specifici (Perimetri/Infill/Top)

```yaml
# Ottimizzazione fine per diverse features

Perimeters flow:
  - Influenza precisione dimensionale
  - Tipico: 95-100%
  - Se walls troppo larghe: ridurre

Infill flow:
  - Influenza robustezza
  - Tipico: 100-105%
  - Aumentare per parts strutturali

Top/Bottom solid infill flow:
  - Influenza finitura superfici
  - Tipico: 98-102%
  - Top surface: leggermente ridotto per superficie liscia

First layer flow:
  - Influenza adesione
  - Tipico: 105-110% (maggiore squish)

Support flow:
  - Influenza facilità rimozione
  - Tipico: 90-95% (meno adesione)
```

## Velocità Ottimizzazione

### 3. Max Velocità per Feature

```yaml
# Velocità diverse per parti diverse

PrusaSlicer velocità suggerite:

Perimeters esterni:
  - Velocità: 40-60 mm/s (qualità superficie)
  - Accelerazione: 800-1500 mm/s²

Perimeters interni:
  - Velocità: 60-100 mm/s
  - Accelerazione: 1500-3000 mm/s²

Infill:
  - Velocità: 80-150 mm/s (non visibile, può essere veloce)
  - Accelerazione: 3000-5000 mm/s²

Top solid infill:
  - Velocità: 40-60 mm/s (qualità superficie superiore)
  - Pattern: Monotonic (migliore estetica)

Support:
  - Velocità: 60-80 mm/s

Travel:
  - Velocità: 150-250 mm/s (massima, no estrusione)

Bridging:
  - Velocità: 80% velocità perimetri esterni
  - Cooling: 100%
```

### 4. Test Velocità Incrementale

```yaml
# Trovare max velocità mantenendo qualità

Procedura:
  1. Stampare benchy @ 60mm/s (baseline)
  2. Incrementare +20mm/s
  3. Stampare nuovamente
  4. Confrontare qualità:
     - Ringing
     - Layer adhesion
     - Overhangs
  5. Ripetere fino a degradazione qualità

Velocità max raccomandate (con Input Shaper):
  - Perimetri: 80-100 mm/s
  - Infill: 150-200 mm/s
  - Travel: 250-300 mm/s

Senza Input Shaper:
  - Perimetri: 40-60 mm/s
  - Infill: 80-100 mm/s
```

## Accelerazioni e Jerk

### 5. Tuning Accelerazioni

```yaml
# Accelerazioni in Klipper (printer.cfg)

[printer]
max_accel: 3000
# Baseline dopo Input Shaper
# Incrementare gradualmente testando

max_accel_to_decel: 1500
# Decelerazione (default: max_accel / 2)

square_corner_velocity: 5.0
# Velocità angoli senza decel completa [mm/s]
# Più alto = angoli più veloci ma meno precisi
# Range: 3-8 mm/s

Test procedure:
  1. max_accel: 1000 → stampa test
  2. Incrementare: 2000, 3000, 5000, 7000
  3. Valutare:
     - Ringing aumenta?
     - Qualità angoli peggiora?
     - Skip steps motori?
  4. Scegliere max safe acceleration

Stampante grande (questo progetto):
  - Conservative: 2000 mm/s²
  - Balanced: 3000 mm/s²
  - Aggressive: 5000 mm/s² (con IS ottimizzato)
```

### 6. Slicer Acceleration Control

```yaml
# Accelerazioni specifiche in slicer

PrusaSlicer → Print Settings → Speed:

Default acceleration: 1000 mm/s²
  - Usato se non specificato diversamente

Perimeter acceleration: 800 mm/s²
  - Più basso per qualità

Infill acceleration: 3000 mm/s²
  - Più alto (non visibile)

First layer acceleration: 500 mm/s²
  - Conservativo per adesione

Travel acceleration: 5000 mm/s²
  - Max (no estrusione, ok vibrazioni)
```

## Layer Height Optimization

### 7. Layer Height vs Qualità/Velocità

```yaml
# Trade-off layer height

Layer Height 0.1mm:
  ✓ Qualità massima
  ✓ Dettagli fini
  ✗ Tempo stampa: 100% (baseline)
  Uso: Miniature, dettagli high-end

Layer Height 0.15mm:
  ✓ Qualità alta
  ✓ Buon compromesso
  Tempo: ~66%
  Uso: Parts funzionali qualità

Layer Height 0.2mm:
  ✓ Qualità buona
  ✓ Veloce
  Tempo: ~50%
  Uso: Standard, most common

Layer Height 0.25mm:
  ~ Qualità accettabile
  ✓ Veloce
  Tempo: ~40%
  Uso: Prototipi, bozze

Layer Height 0.3mm:
  ~ Qualità bassa (layer visibili)
  ✓ Molto veloce
  Tempo: ~33%
  Uso: Prototipi rapidi, parti interne

Limite fisico:
  - Min: ~25% nozzle diameter (0.1mm per 0.4mm nozzle)
  - Max: ~75% nozzle diameter (0.3mm per 0.4mm nozzle)
```

## Cooling Optimization

### 8. Part Cooling Tuning

```yaml
# Cooling influenza qualità drammaticamente

Test cooling percentages:

PLA:
  - Cooling: 100% (sempre max dopo layer 2-3)
  - Overhangs: Beneficia molto
  - Bridging: Essenziale

PETG:
  - Cooling: 30-50% (troppo = warping, layer adhesion scarsa)
  - Overhangs: Moderato
  - Bridging: 60-80%

ABS:
  - Cooling: 0-20% (minimo, rischio warping/cracking)
  - Overhangs: Difficili (temperatura alta)
  - Enclosure consigliato

TPU/Flex:
  - Cooling: 30-60%
  - Bilanciare flessibilità vs adhesion

Configurazione slicer:
  - Min fan speed: 0% (primi layer)
  - Max fan speed: 100% (PLA)
  - Fan below layer time: Se layer < X secondi → max fan
  - Default layer time: 10-15 secondi
```

## Line Width Tuning

### 9. Ottimizzazione Line Width

```yaml
# Line width ≠ nozzle diameter (può variare)

Nozzle 0.4mm:
  - Min line width: 0.35mm (87.5% nozzle)
  - Typical: 0.4mm (100%)
  - Max: 0.6mm (150%)

Vantaggi line width > nozzle:
  ✓ Layer adhesion migliore (più squish)
  ✓ Meno perimetri necessari (più veloce)
  ✓ Robustezza aumentata

Svantaggi:
  ✗ Precisione dimensionale ridotta
  ✗ Possibile over-extrusion se flow non regolato

Raccomandazioni:
  - Perimetri esterni: 0.4mm (precisione)
  - Perimetri interni: 0.45mm (forza)
  - Infill: 0.5mm (veloce, robusto)
  - Top/bottom: 0.4mm (superficie liscia)

PrusaSlicer:
  Print Settings → Advanced → Extrusion width
```

## Retraction Fine Tuning

### 10. Retraction Avanzato

```yaml
# Dopo calibrazione base, ottimizzare edge cases

Minimum travel requiring retraction:
  - Default: 2mm
  - Aumentare a 5mm: Meno retrazioni (più veloce)
  - Ridurre a 1mm: Più retrazioni (meno stringing)

Retract before wipe:
  - Wipe 2mm su perimetro prima di retract
  - Riduce oozing residuo

Retract layer change:
  - Retract anche su cambio layer (Z-move)
  - Previene blob su seam

Avoid crossing perimeters:
  - Travel solo dentro perimetri
  - Riduce bisogno retraction
  - Rallenta leggermente

Only retract when crossing perimeters:
  - Retraction solo se travel attraversa vuoto
  - Risparmia retractions inutili
```

## Seam Position

### 11. Z-Seam Optimization

```yaml
# Minimizzare visibilità seam (punto inizio/fine perimetro)

Opzioni PrusaSlicer:

Aligned:
  - Seam sempre nello stesso punto XY
  - ✓ Facile post-processing (sanding)
  - ✗ Visibile linea verticale

Nearest:
  - Seam nel punto più vicino a posizione precedente
  - ~ Seam sparso (meno visibile)
  - ~ Posizione random

Random:
  - Seam randomizzato ogni layer
  - ✓ Invisibile (distribuito)
  - ✗ Difficile post-processing

Rear:
  - Seam sul retro oggetto (smart positioning)
  - ✓ Best per oggetti esposizione frontale

Custom seam placement:
  - Seam painting (PrusaSlicer)
  - Definire manualmente dove nascondere seam
```

## Adaptive Layer Height

### 12. Variable Layer Height

```yaml
# Layer height dinamico basato su geometria

PrusaSlicer → Variable Layer Height:

Funzionamento:
  - Superfici piatte/inclinate: Layer height alto (veloce)
  - Curve/dettagli: Layer height basso (qualità)
  - Automatico o manuale (painting)

Parametri:
  - Quality/Speed: Slider bilanciamento
  - Min layer height: 0.1mm
  - Max layer height: 0.3mm
  - Smooth: Interpolazione transizioni

Vantaggi:
  ✓ Qualità dove serve
  ✓ Velocità dove possibile
  ✓ Risparmio tempo 20-40%

Best use cases:
  - Organic shapes (statue, miniature)
  - Parti con variabile complessità
```

## Profiles Organization

### 13. Slicer Profiles Management

```yaml
# Organizzare profili per use case

Profili PLA:
  - PLA_Quality: 0.15mm, 50mm/s, cooling 100%
  - PLA_Standard: 0.2mm, 70mm/s (default)
  - PLA_Speed: 0.25mm, 100mm/s
  - PLA_Draft: 0.3mm, 120mm/s

Profili PETG:
  - PETG_Standard: 0.2mm, 60mm/s, cooling 40%
  - PETG_Strong: 0.25mm, infill 40%

Per ogni profilo salvare:
  - Temperature
  - Retraction settings
  - Cooling
  - Pressure advance (se in start gcode)
  - Flow rate

Export/Import:
  - Esportare profili come backup
  - Condividere tra macchine
  - Version control (Git)
```

## Documentation

### Tuning Log

```markdown
# Fine Tuning Log - Stampante 3D
Data: ___/___/______

## Flow Rate
- Perimeters: 96%
- Infill: 100%
- Top surface: 98%
- First layer: 108%

## Velocità
- Perimeters ext: 50 mm/s
- Perimeters int: 80 mm/s
- Infill: 120 mm/s
- Travel: 200 mm/s

## Accelerazioni
- Max accel: 3000 mm/s²
- Perimeter accel: 1000 mm/s²
- Infill accel: 3000 mm/s²
- Travel accel: 5000 mm/s²

## Cooling (PLA)
- Min: 0% (layer 1-2)
- Max: 100% (layer 3+)

## Retraction
- Distance: 1.5mm
- Speed: 45mm/s
- Min travel: 2mm
- Wipe: ✓

## Seam
- Position: Rear
- Type: Aligned

## Note
- Profilo ottimizzato per PLA quality
- Benchy time: 1h 25min
- Qualità: Eccellente

Firma: ________________
```

## Checklist

- [ ] Flow rate calibrato per perimetri/infill/top
- [ ] Velocità ottimizzate per qualità desiderata
- [ ] Accelerazioni testate e massimizzate
- [ ] Layer height scelto per use case
- [ ] Cooling percentages ottimizzati per materiale
- [ ] Line width configurato (se diverso da nozzle)
- [ ] Retraction fine-tuned (min travel, wipe, etc.)
- [ ] Z-seam position configurato
- [ ] Profili slicer organizzati e salvati
- [ ] Tuning log documentato
- [ ] Backup profili slicer effettuato

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
