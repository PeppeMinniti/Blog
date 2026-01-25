---
layout: default
title: "Stampe di Test"
---
# Stampe di Test

## Descrizione

Serie di stampe di test per verificare e validare tutte le calibrazioni effettuate. Queste stampe evidenziano specifici aspetti della qualità di stampa e permettono di identificare eventuali problemi residui.

**Obiettivi:**
- Validare tutte le calibrazioni
- Identificare margini di miglioramento
- Stabilire baseline qualità
- Documentare capabilities stampante

## Immagini

![Test all-in-one](../../media/test%20all%20in%20one%20stampante%201.jpg)

## Test Fondamentali

### 1. Calibration Cube (XYZ 20mm)

```yaml
File: xyz_20mm_calibration_cube.stl
Download: https://www.thingiverse.com/thing:1278865

Scopo:
  - Verifica dimensioni assi X, Y, Z
  - Accuratezza dimensionale
  - Squadratura angoli

Settings:
  Layer height: 0.2mm
  Infill: 20%
  Perimeters: 3
  Velocità: 60mm/s

Misurazioni:
  - X: 20.00mm ±0.1mm
  - Y: 20.00mm ±0.1mm
  - Z: 20.00mm ±0.1mm
  - Angoli: 90° ±1°

✓ Pass: Tutte dimensioni entro tolleranza
✗ Fail: Ricalibrare rotation_distance assi errati
```

### 2. Benchy (3D Benchy)

```yaml
File: 3DBenchy.stl
Download: https://www.thingiverse.com/thing:763622

Scopo:
  - Test completo features:
    - Overhangs
    - Bridging
    - Dettagli piccoli
    - Superfici curve
    - Testo in rilievo
  - Benchmark universale stampanti 3D

Settings standard:
  Layer height: 0.2mm
  Infill: 15%
  Supports: NO
  Velocità: 60mm/s
  Cooling: 100%

Evaluation checklist:
  ✓ Camino: Dritto, no warping
  ✓ Archi porte/finestre: Netti, no drooping
  ✓ Overhangs: Lisci fino a 45°
  ✓ Bridging tetto: No sagging
  ✓ Superfici curve: Lisce
  ✓ Testo "3DBenchy": Leggibile
  ✓ Scafo: No layer shift, no ringing

Tempo: ~1h 30min
```

### 3. Temperature Tower

```yaml
{% raw %}
File: temperature_tower_[material].stl
Download: https://www.thingiverse.com/thing:2729076

Scopo:
  - Trovare temperatura ottimale materiale
  - Valutare stringing a varie temp
  - Overhangs e bridging vs temperatura

Custom G-Code (dopo layer change):
  ; Layer [layer_num]
  {% if layer_num == 5 %}
    M104 S220  ; Sezione 220°C
  {% elif layer_num == 15 %}
    M104 S215  ; Sezione 215°C
  {% elif layer_num == 25 %}
    M104 S210  ; Sezione 210°C
  {% elif layer_num == 35 %}
    M104 S205  ; Sezione 205°C
  {% elif layer_num == 45 %}
    M104 S200  ; Sezione 200°C
  {% endif %}

Valutazione:
  - Stringing: Minimo nella sezione ottimale
  - Overhangs: Migliori a temp bassa
  - Layer adhesion: Migliore a temp alta
  - Compromesso: Temperatura ideale lavoro

PLA tipico: 205-210°C
PETG tipico: 235-240°C
{% endraw %}
```

### 4. Retraction/Stringing Test

```yaml
File: retraction_test_dual_tower.stl
Download: https://www.thingiverse.com/thing:2563909

Scopo:
  - Verifica retraction calibrazione
  - Evidenzia stringing
  - Travel move multipli

Settings:
  Layer height: 0.2mm
  Infill: 0% (solo perimetri)
  Retraction: [Valori calibrati]
  Combing: OFF
  Z-hop: Testare con/senza

Risultato atteso:
  ✓ Zero stringing tra torri
  ✓ Superfici lisce
  ✓ Nessun blob

Tempo: ~30 min
```

### 5. Overhang Test

```yaml
File: overhang_test.stl
Download: https://www.thingiverse.com/thing:3069733

Scopo:
  - Valutare capacità overhang
  - Identificare limite senza supports
  - Ottimizzare cooling

Angoli test: 15°, 30°, 45°, 50°, 55°, 60°, 65°, 70°

Settings:
  Layer height: 0.2mm
  Cooling: 100%
  Velocità: 50mm/s (overhang lento)

Evaluation:
  ✓ 15-45°: Perfetto
  ✓ 50-55°: Buono (leggera rugosità accettabile)
  ~ 60-65°: Limite (rugosità evidente ma printabile)
  ✗ 70+°: Fail (drooping, supporti necessari)

PLA: tipicamente 55-60° max
PETG: 45-50° max (più viscoso)
```

## Test Avanzati

### 6. Bridging Test

```yaml
File: bridging_test.stl
Download: https://www.thingiverse.com/thing:2936919

Scopo:
  - Massima distanza bridge senza sag

Distanze test: 10mm, 20mm, 30mm, 40mm, 50mm

Settings:
  Layer height: 0.2mm
  Cooling: 100%
  Bridge flow ratio: 95% (leggermente ridotto)
  Velocità bridge: 80% velocità normale

Risultato:
  ✓ 10-30mm: Flat, perfetto
  ~ 40mm: Leggero sag (<0.5mm)
  ✗ 50mm+: Sag significativo

PLA: ~40mm max
PETG: ~30mm max
```

### 7. Precision Test (Tolerance Check)

```yaml
File: tolerance_test.stl
Download: https://www.thingiverse.com/thing:2318172

Scopo:
  - Clearance tra parti mobili
  - Tolleranze incastri

Features:
  - Fori calibrati (dimensioni esatte)
  - Slot con tolleranze 0.1, 0.2, 0.3mm
  - Test fit cilindri

Valutazione:
  - Misurare fori con calibro
  - Testare fit con cilindri di riferimento
  - Identificare tolleranza ideale per design

Tipico:
  - 0.2mm: Fit perfetto parti mobili
  - 0.3mm: Fit loose, facile assemblaggio
  - 0.1mm: Fit stretto, press-fit
```

### 8. First Layer Calibration

```yaml
File: first_layer_square_patch.stl

Scopo:
  - Verifica prima layer perfetto
  - Z-offset corretto
  - Adesione uniforme

Procedura:
  1. Stampare singolo layer 100×100mm
  2. Osservare:
     - Linee ben schiacciate ma non troppo
     - Nessun gap tra linee
     - Superficie uniforme

Regolazione Z-offset:
  - Troppo alto: Gap tra linee
  - Troppo basso: Nozzle graffia, linee schiacciate
  - Perfetto: Linee unite, superficie liscia

  Comando:
    SET_GCODE_OFFSET Z_ADJUST=-0.02  ; Abbassa -0.02mm
    SET_GCODE_OFFSET Z_ADJUST=+0.02  ; Alza +0.02mm
    SAVE_CONFIG  ; Salva dopo trovato valore
```

### 9. All-In-One Test

```yaml
File: CTCSS_all_in_one_test.stl
Download: https://www.thingiverse.com/thing:2656594

Scopo:
  - Test completo multipli aspetti in un print
  - Bridging, overhangs, dimensioni, testo, ecc.

Features incluse:
  - Dimensional accuracy
  - Overhang test
  - Bridging
  - Stringing towers
  - Surface finish
  - Spike test
  - Hole accuracy

Tempo: ~2-3 ore
Utilità: Baseline qualità after calibration completa
```

## Test Materiali Specifici

### PLA Tests

```yaml
1. Calibration cube @ 205°C
2. Benchy @ 205°C, bed 60°C
3. Overhang test (cooling 100%)
4. Stringing test

Target qualità:
  - Dimensioni: ±0.05mm
  - Overhangs: 55° OK
  - Stringing: Zero
  - Superfici: Lisce
```

### PETG Tests

```yaml
1. Temperature tower: 230-250°C
2. Benchy @ 240°C, bed 75°C
3. Stringing test (challenging per PETG)
4. Z-hop test (PETG appiccicoso)

Target qualità:
  - Dimensioni: ±0.1mm (PETG shrink)
  - Overhangs: 45° OK
  - Stringing: Minimo (difficile eliminare)
  - Trasparenza: Se desiderata
```

### Flex/TPU Tests

```yaml
1. Cube dimensionale (stretch check)
2. Living hinge test
3. Compression test (resilienza)

Settings TPU:
  - Velocità: 20-30mm/s (lento!)
  - Retraction: Minima (0.5mm)
  - Cooling: 50% (non troppo)

Target:
  - Flessibilità maintained
  - Nessun jam extruder
  - Layer adhesion perfetta
```

## Documentazione Risultati

### Log Stampe Test

```markdown
# Test Log Stampante 3D
Data: ___/___/______
Materiale: PLA [Brand/Color]
Temperatura: Hotend 205°C, Bed 60°C

## Calibration Cube
- Dimensione X: 19.98mm ✓
- Dimensione Y: 20.01mm ✓
- Dimensione Z: 20.00mm ✓
- Angoli: 90° ✓
- Valutazione: PASS

## Benchy
- Camino: Dritto ✓
- Archi: Netti ✓
- Overhangs: Buoni ✓
- Bridging: Perfetto ✓
- Dettagli: Tutti leggibili ✓
- Valutazione: PASS

## Stringing Test
- Stringing visibile: No ✓
- Retraction: 1.5mm @ 45mm/s
- Valutazione: PASS

## Overhang Test
- Max angolo senza supports: 55° ✓
- Cooling: 100%
- Valutazione: PASS

## Note
- Tutte calibrazioni validate
- Stampante pronta produzione
- Baseline qualità stabilita

Firma: ________________
```

### Foto Documentazione

```yaml
# Organizzare foto test

Media folder structure:
  test-stampe/
  ├── calibration-cube-[data].jpg
  ├── benchy-[data].jpg
  ├── overhang-test-[data].jpg
  ├── stringing-test-[data].jpg
  ├── temperature-tower-PLA.jpg
  └── all-in-one-test.jpg

Foto standard:
  - Vista frontale
  - Vista angolare (evidenzia 3D)
  - Close-up dettagli critici
  - Confronto con righello (scala)
```

## Troubleshooting Stampe Test

### Dimensioni Errate

```yaml
Problema: Cube misura 19.5mm invece 20mm

Debug path:
  1. Verificare rotation_distance calibrato
  2. Check flow rate (deve essere 100%)
  3. Escludere shrinkage materiale (PLA ~0.3%)
  4. Verificare scaling slicer (100%)
  5. Misurare con calibro preciso
```

### Layer Inconsistenti

```yaml
Problema: Layer visibili irregolari, banding

Cause:
  - Z-axis binding (viti sporche, disallineate)
  - Estrusione variabile (E-steps errati)
  - Temperatura oscillante (PID non ottimale)
  - Filamento diametro variabile

Fix priorità:
  1. PID tuning
  2. Z-axis lubrificazione
  3. E-steps calibration
  4. Filamento di qualità
```

## Checklist

- [ ] Calibration cube: dimensioni ±0.1mm
- [ ] Benchy: tutti dettagli corretti
- [ ] Temperature tower: temperatura ottimale identificata
- [ ] Stringing test: zero filamenti
- [ ] Overhang test: limite >45° identificato
- [ ] Bridging test: capacità max verificata
- [ ] First layer test: adesione perfetta
- [ ] All-in-one test: baseline qualità stabilita
- [ ] Risultati documentati con foto
- [ ] Log test compilato
- [ ] Problemi identificati e risolti
- [ ] Stampante validata per produzione

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)