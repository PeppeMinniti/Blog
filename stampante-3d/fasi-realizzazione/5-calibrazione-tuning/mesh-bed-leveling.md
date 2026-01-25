---
layout: default
title: "Mesh Bed Leveling"
---
# Mesh Bed Leveling

## Descrizione

Creazione di una mappa delle imperfezioni del piatto riscaldato per compensarle automaticamente durante la stampa. Con BLTouch e Klipper, il sistema misura la superficie in una griglia di punti e applica correzioni dinamiche all'asse Z.

**Vantaggi:**
- Compensazione automatica dislivelli piatto
- Prima layer perfetto su tutta area
- Nessun bisogno livellamento manuale ripetuto

## Immagini

![Test piatto](../../media/stampante%20test%20piatto%201.jpeg)

<!-- Aggiungere heightmap 3D -->
<!-- ![Visualizzazione heightmap](../../media/calibrazione/heightmap-3d.jpg) -->

## Prerequisiti

### 1. Z-Offset Calibrato

```yaml
# Prima di mesh, calibrare Z offset BLTouch

Procedura:
  1. Home assi: G28
  2. Posizionare sopra centro piatto
  3. PROBE_CALIBRATE
  4. Abbassare nozzle fino a toccare carta (friction test)
  5. ACCEPT
  6. SAVE_CONFIG

Z-offset:
  - Distanza tra probe triggered e nozzle a Z=0
  - Tipicamente: 1.5-3.0mm
  - Salvato in [bltouch] z_offset
```

### 2. Piatto Pulito

```yaml
Preparazione piatto:
  - Superficie pulita (alcool isopropilico)
  - Temperatura ambiente (no riscaldato)
  - Vetro/PEI ben fissato
  - Nessun residuo stampe precedenti
```

## Configurazione Bed Mesh

### Config printer.cfg

```ini
[bed_mesh]
speed: 120
# Velocità spostamenti tra punti [mm/s]

horizontal_move_z: 5
# Altezza sicura probe durante spostamenti [mm]

mesh_min: 50, 50
# Angolo minimo area probing (X, Y)
# Considerare offset BLTouch:
#   - BLTouch a sinistra nozzle: offset negativo X
#   - mesh_min.x deve essere > abs(bltouch.x_offset)

mesh_max: 850, 690
# Angolo massimo area probing
# mesh_max.x deve essere < (bed_size_x - abs(bltouch.x_offset))

probe_count: 5, 5
# Griglia punti: 5×5 = 25 misurazioni
# Opzioni: 3×3 (rapido), 5×5 (standard), 7×7 (accurato), 9×9 (preciso)

algorithm: bicubic
# Algoritmo interpolazione:
#   - lagrange: Più semplice, probe_count ≤ 6
#   - bicubic: Più accurato, qualunque probe_count

bicubic_tension: 0.2
# Tensione interpolazione bicubica [0-1]
# 0.2 = default bilanciato

fade_start: 1.0
# Altezza inizio fade compensation [mm]

fade_end: 10.0
# Altezza fine fade compensation [mm]
# Sopra 10mm: no compensazione (mesh disabilitata)

fade_target: 0
# Target Z finale fade (0 = media mesh)

# Opzionale: mesh relativo a punto
# relative_reference_index: 12  # Centro griglia 5×5
```

## Calibrazione Mesh

### 1. Prima Calibrazione

```yaml
# Via console Klipper

Procedura:
  G28                    # Home all axes
  BED_MESH_CALIBRATE     # Avvia scansione

Processo automatico:
  1. Klipper muove probe sul primo punto
  2. BLTouch estende pin
  3. Z scende fino a trigger
  4. Registra altezza
  5. Ritrae probe, si sposta al punto successivo
  6. Ripete per tutti i punti (5×5 = 25)
  7. Calcola mesh interpolata

Durata: ~3-5 minuti (dipende da probe_count)

Output:
  Mesh Bed Leveling Complete
  # Mesh attiva in memoria (non salvata)
```

### 2. Salvare Mesh

```yaml
# Salvare mesh come profilo

Comando:
  BED_MESH_PROFILE SAVE=default

# Profili multipli possibili:
  BED_MESH_PROFILE SAVE=PLA_60C
  BED_MESH_PROFILE SAVE=PETG_75C

# Caricare profilo:
  BED_MESH_PROFILE LOAD=default

# Rimuovere profilo:
  BED_MESH_PROFILE REMOVE=old_profile

# Elencare profili:
  BED_MESH_PROFILE
```

### 3. Persistenza Mesh

```yaml
# Salvare mesh permanentemente

Metodo 1: Via SAVE_CONFIG
  BED_MESH_PROFILE SAVE=default
  SAVE_CONFIG
  # Aggiunge mesh a fine printer.cfg
  # Caricata automaticamente all'avvio

Metodo 2: Manuale
  BED_MESH_PROFILE SAVE=default
  # Copiare output mesh da console
  # Aggiungere manualmente a printer.cfg

[bed_mesh default]
version = 1
points =
    0.123, 0.145, 0.132, 0.156, 0.140
    0.098, 0.112, 0.105, 0.118, 0.109
    ...
```

## Analisi Mesh

### Visualizzazione Mainsail

```yaml
# Dashboard Mainsail → Heightmap

Visualizzazione 3D:
  - Colormap: Verde = piano, Rosso/Blu = dislivelli
  - Esagerazione: 5-10× per visibilità
  - Rotazione: Mouse drag
  - Zoom: Mouse wheel

Informazioni:
  - Min Z: Punto più basso
  - Max Z: Punto più alto
  - Range: Differenza max-min
  - Mean: Media altezze
  - Std Dev: Deviazione standard

Valori tipici:
  ✓ Range < 0.3mm: Piatto buono
  ✓ Range < 0.5mm: Piatto accettabile
  ✗ Range > 1.0mm: Piatto deformato o supporti instabili
```

### Interpretazione Heightmap

```yaml
Pattern comuni:

1. "Sella" (saddle):
   - Centro alto, angoli bassi (o viceversa)
   - Causa: Piatto non planare, mounting stressato
   - Fix: Verificare supporti piatto

2. Gradiente lineare:
   - Un lato alto, opposto basso
   - Causa: Piatto non parallelo a assi X/Y
   - Fix: Livellamento meccanico tramming screws

3. "Bolla" centrale:
   - Centro alto/basso rispetto bordi
   - Causa: Stress termico, piatto deformato
   - Compensabile con mesh

4. Irregolarità random:
   - Punti alti/bassi sparsi
   - Causa: Superficie non uniforme, vetro ondulato
   - Fix: Sostituire superficie stampa
```

## Utilizzo Mesh in Stampa

### Start GCode con Mesh

```gcode
# In slicer (PrusaSlicer, Cura, etc.)

[gcode_macro START_PRINT]
gcode:
    G28                          ; Home all axes
    BED_MESH_CALIBRATE           ; Scansione mesh fresca (lento)
    # O
    BED_MESH_PROFILE LOAD=default ; Carica mesh salvata (veloce)

    G1 Z15 F300                  ; Lift Z
    G1 X10 Y10 F3000             ; Move to start
    # ... resto start gcode
    G92 E0
    G1 E10 F200                  ; Prime line
```

### Mesh Adaptive (Avanzato)

```ini
{% raw %}
# Mesh solo sull'area effettivamente usata dal print

[gcode_macro BED_MESH_CALIBRATE_ADAPTIVE]
gcode:
    # Richiede: Klipper con exclude_object
    # Calcola mesh_min/max da bounding box modello
    # Risparmio tempo: scansiona solo area necessaria

    {% set margin = params.MARGIN|default(10)|int %}
    # Calcolare min/max da first_layer_print_min/max
    # Applicare margin
    # BED_MESH_CALIBRATE MESH_MIN=... MESH_MAX=...
{% endraw %}
```

## Mesh Multipli per Temperature Diverse

### Profili Termici

```yaml
# Piatto si deforma con temperatura

Strategia:
  - Mesh separati per temperature diverse
  - Caricare mesh appropriato in start gcode

Profili esempio:
  - default: Temperatura ambiente (calibrazione)
  - PLA_60C: Mesh con bed a 60°C
  - PETG_75C: Mesh con bed a 75°C
  - ABS_100C: Mesh con bed a 100°C

Procedura creazione:
  1. Riscaldare bed a target (es. 60°C)
  2. Attendere stabilizzazione (15-20 min)
  3. G28
  4. BED_MESH_CALIBRATE
  5. BED_MESH_PROFILE SAVE=PLA_60C
  6. SAVE_CONFIG
```

### Macro Smart Mesh

```ini
{% raw %}
[gcode_macro SMART_MESH]
description: Carica mesh appropriato per temperatura bed
gcode:
    {% set BED_TEMP = params.BED_TEMP|default(60)|float %}

    {% if BED_TEMP < 50 %}
        BED_MESH_PROFILE LOAD=default
    {% elif BED_TEMP < 70 %}
        BED_MESH_PROFILE LOAD=PLA_60C
    {% elif BED_TEMP < 85 %}
        BED_MESH_PROFILE LOAD=PETG_75C
    {% else %}
        BED_MESH_PROFILE LOAD=ABS_100C
    {% endif %}

# Utilizzo:
# SMART_MESH BED_TEMP={bed_temperature}
{% endraw %}
```

## Aggiornamento Mesh

### Quando Ri-calibrare

```yaml
Ri-calibrare mesh se:
  ✓ Sostituita superficie stampa (vetro, PEI, ecc.)
  ✓ Modificato Z-offset BLTouch
  ✓ Cambiato mounting piatto
  ✓ Dopo manutenzione assi Z
  ✓ Stampe mostrano adesione irregolare
  ✓ Ogni 1-2 mesi (usura/stabilizzazione)

Non necessario ri-calibrare:
  - Tra stampe normali
  - Cambio filamento
  - Pulizia superficie (alcool)
```

## Troubleshooting

### Probe Fails o Timeout

```yaml
Sintomo: "Probe samples exceed tolerance"

Cause:
  1. BLTouch instabile:
     - Pin sporco o danneggiato
     - Cablaggio intermittente
     - Vibrazioni durante probing

  2. Superficie non uniforme:
     - Vetro ondulato
     - Superficie riflettente (confonde probe)

Soluzioni:
  - Aumentare samples_tolerance in [bltouch]:
    samples_tolerance: 0.100  # da 0.050 default
  - Ridurre speed probing:
    speed: 3.0  # più lento ma più accurato
  - Pulire pin BLTouch
  - Verificare cablaggio (no connettori allentati)
```

### Mesh Non Applicata

```yaml
Sintomo: Prima layer ignora mesh

Debug:
  1. Verificare mesh caricata:
     BED_MESH_PROFILE    # Lista profili
     # In output deve esserci: "Profile [default]: Active"

  2. Verificare fade non troppo basso:
     # Se fade_end = 0.5mm, compensazione finisce subito
     fade_end: 10.0  # Estendere a 10mm

  3. Test G-Code manuale:
     G28
     BED_MESH_PROFILE LOAD=default
     G1 Z0.2 F300
     G1 X100 Y100  # Muovere sopra punto basso mesh
     # Z dovrebbe compensare automaticamente
```

### Adesione Prima Layer Irregolare

```yaml
Sintomo: Alcune aree prima layer troppo schiacciate/alte

Cause:
  1. Z-offset globale errato:
     - Ricalibrare PROBE_CALIBRATE

  2. Mesh non riflette stato attuale:
     - Ri-scansionare BED_MESH_CALIBRATE

  3. Problema meccanico dominante:
     - Mesh compensa max ±0.5mm
     - Se piatto deformato >1mm: fix meccanico necessario

  4. Nozzle parzialmente intasato:
     - Flow irregolare sembra problema mesh
     - Pulire nozzle (cold pull)
```

## Mesh Avanzato: PROBE_ACCURACY

```yaml
# Test ripetibilità BLTouch

Comando:
  PROBE_ACCURACY

Procedura:
  - Esegue 10 probe sullo stesso punto
  - Calcola deviazione standard

Output:
  probe accuracy results: maximum 0.025000, minimum 0.020000,
  range 0.005000, average 0.022500, median 0.022500,
  standard deviation 0.001581

Valutazione:
  ✓ Std dev < 0.01mm: Probe molto accurato
  ✓ Std dev < 0.025mm: Probe OK
  ✗ Std dev > 0.05mm: Problema probe (pulire/sostituire)
```

## Checklist

- [ ] Z-offset BLTouch calibrato (PROBE_CALIBRATE)
- [ ] Config [bed_mesh] verificata (mesh_min/max corretti)
- [ ] Prima scansione mesh completata (BED_MESH_CALIBRATE)
- [ ] Mesh salvata come profilo (BED_MESH_PROFILE SAVE)
- [ ] Heightmap visualizzata in Mainsail
- [ ] Range mesh < 0.5mm (accettabile)
- [ ] Mesh persistente salvata (SAVE_CONFIG)
- [ ] Start gcode aggiornato per caricare mesh
- [ ] Test stampa prima layer uniforme
- [ ] Profili temperatura creati (opzionale: PLA, PETG, ABS)
- [ ] PROBE_ACCURACY testato (std dev < 0.025mm)
- [ ] Backup configurazione

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)