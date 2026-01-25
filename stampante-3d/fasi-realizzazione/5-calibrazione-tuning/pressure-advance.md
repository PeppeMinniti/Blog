---
layout: default
title: "Pressure Advance"
---
# Pressure Advance

## Descrizione

Calibrazione del Pressure Advance (PA), feature avanzata di Klipper che compensa il ritardo di pressione nel sistema di estrusione. Migliora drasticamente angoli netti, riduce oozing e stringing.

**Cosa risolve:**
- Bulging (rigonfiamenti) agli angoli
- Gaps (vuoti) dopo angoli
- Stringing e oozing
- Qualità generale superfici

## Immagini

<!-- Inserire foto confronto con/senza PA -->
<!-- ![Corner senza PA](../../media/calibrazione/corner-no-pa.jpg) -->
<!-- ![Corner con PA](../../media/calibrazione/corner-with-pa.jpg) -->

## Teoria Pressure Advance

### Problema Fisico

```yaml
Sistema estrusione = Sistema idraulico:
  - Filamento = Fluido comprimibile
  - Hotend = Tubo con resistenza
  - Nozzle = Restrizione

Comportamento:
  1. Motore estrusore inizia a girare
  2. Filamento si comprime (elasticità)
  3. Pressione sale gradualmente nel hotend
  4. Filamento esce dal nozzle con RITARDO

Risultato senza PA:
  - Inizio linea: Sotto-estrusione (pressione bassa)
  - Fine linea: Sovra-estrusione (pressione alta residua)
  - Angoli: Bulging (eccesso materiale) o gaps (mancanza)
```

### Soluzione Pressure Advance

```python
# PA anticipa/riduce estrusione basandosi su velocità

# Formula semplificata:
# extrude_rate_adjusted = extrude_rate + pressure_advance × d(velocity)/dt

# Accelerazione positiva (aumento velocità):
#   → Aumenta estrusione anticipatamente (build pressure)

# Decelerazione (riduzione velocità):
#   → Riduce estrusione prima (release pressure)

import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 1, 100)
velocity = np.where(t < 0.5, t*2, 2-t*2)  # Triangular velocity

extrude_normal = velocity  # Estrusione proporzionale a velocità
accel = np.gradient(velocity, t)
extrude_pa = extrude_normal + 0.05 * accel  # Con PA

plt.figure(figsize=(10,5))
plt.subplot(1,2,1)
plt.plot(t, velocity, label="Velocità")
plt.ylabel("Velocità")
plt.xlabel("Tempo")
plt.grid()
plt.legend()

plt.subplot(1,2,2)
plt.plot(t, extrude_normal, label="Estrusione normale", linestyle='--')
plt.plot(t, extrude_pa, label="Estrusione con PA", linewidth=2)
plt.ylabel("Rate estrusione")
plt.xlabel("Tempo")
plt.grid()
plt.legend()
plt.suptitle("Pressure Advance - Anticipo Estrusione")
# plt.savefig("pressure_advance.png")
```

## Configurazione Base

### Config printer.cfg

```ini
# Sezione [extruder]

[extruder]
# ... altri parametri ...

pressure_advance: 0.0
# Valore PA [secondi]
# Default: 0.0 (disabilitato)
# Tipico: 0.03-0.15 (dipende da setup)

pressure_advance_smooth_time: 0.040
# Smoothing tempo applicazione PA [secondi]
# Default: 0.040 (40ms)
# Generalmente non modificare
```

## Calibrazione Pressure Advance

### Metodo 1: PA Tower (Visivo)

```yaml
# Stampa tower con PA crescente

File STL: Klipper pressure advance calibration tower
Download: https://www.klipper3d.org/Pressure_Advance.html

Slicer setup:
  - Layer height: 0.2mm
  - Perimetri esterni: 1
  - Infill: 0% (solo perimetri)
  - Velocità: 100 mm/s (alta per evidenziare effetto)
  - No retraction (disabilita per test)

Custom G-Code per tower:
  # Aggiungere in slicer "After Layer Change"
  # Ogni layer incrementa PA

  ; layer [layer_num]
  SET_PRESSURE_ADVANCE ADVANCE={0.02 + layer_num * 0.002}

  # Esempio:
  # Layer 0: PA = 0.02
  # Layer 10: PA = 0.04
  # Layer 20: PA = 0.06
  # Layer 30: PA = 0.08

Valutazione post-stampa:
  - Osservare angoli tower
  - Layer con angoli più netti = PA ottimale
  - Annotare layer number → calcolare PA
```

### Metodo 2: PA Line Test (Preciso)

```gcode
# Test manuale con singole linee

# Preparazione
G28                          ; Home
G1 Z0.2 F300                 ; Prima layer height
M109 S200                    ; Riscalda hotend
M190 S60                     ; Riscalda bed

# Disabilita PA inizialmente
SET_PRESSURE_ADVANCE ADVANCE=0

# Linea test 1 (PA = 0)
G1 X50 Y50 F300              ; Inizio lento
G1 X150 Y50 F300 E10         ; Linea lenta
G1 X150 Y50 F3000            ; Accelerazione rapida
G1 X250 Y50 F3000 E10        ; Linea veloce
G1 X250 Y50 F300             ; Decelerazione
G1 E-1 F1800                 ; Retract

# Incrementare PA e ripetere
SET_PRESSURE_ADVANCE ADVANCE=0.03
G1 X50 Y55 F300
G1 X150 Y55 F300 E10
G1 X150 Y55 F3000
G1 X250 Y55 F3000 E10
# ... ecc per PA = 0.06, 0.09, 0.12

# Valutazione:
# Linea ideale = Spessore uniforme lento/veloce
# Troppo poco PA: Linea veloce sottile
# Troppo PA: Linea veloce sovra-estrusa, gaps inizio
```

### Metodo 3: PA Calibration Pattern (Automatico)

```yaml
# Script Klipper ufficiale

Generatore online:
  https://www.klipper3d.org/Pressure_Advance.html
  # Sezione "Tuning"

Parametri input:
  - Start PA: 0.0
  - End PA: 0.1
  - Step PA: 0.005
  - Velocità: 100 mm/s

Output:
  - File gcode con pattern calibrazione
  - Quadrati con angoli netti
  - PA incrementa progressivamente

Stampa e valutazione:
  - Osservare angoli quadrati
  - Migliore = angoli 90° netti, no bulging
  - Leggere valore PA corrispondente da pattern
```

## Valori Tipici Pressure Advance

### Reference Values

```yaml
# Dipende fortemente da sistema estrusione

Bowden (tubo lungo):
  - Range: 0.30-1.00
  - Tipico: 0.60-0.80
  - Maggiore compressione filamento nel tubo

Bowden corto (<30cm):
  - Range: 0.15-0.50
  - Tipico: 0.25-0.35

Direct Drive:
  - Range: 0.025-0.150
  - Tipico: 0.040-0.080
  - Minima compressione (no tubo)

All-metal hotend:
  - Leggermente più alto vs PTFE-lined
  - +0.01-0.02 rispetto a lined

Setup stampante 3D progetto:
  - Direct drive + all-metal
  - Stimato: 0.05-0.08
  - Da calibrare empiricamente
```

### Influenza Variabili

```yaml
PA aumenta con:
  ✓ Lunghezza bowden (se presente)
  ✓ Flessibilità filamento (TPU > PLA)
  ✓ Temperatura bassa (viscosità alta)
  ✓ Diametro nozzle piccolo (resistenza alta)

PA diminuisce con:
  ✓ Direct drive vs bowden
  ✓ Filamento rigido (PLA < PETG < TPU)
  ✓ Temperatura alta (viscosità bassa)
  ✓ Nozzle grande (resistenza bassa)
```

## Applicazione Pressure Advance

### Salvare Valore Calibrato

```ini
# Aggiornare printer.cfg

[extruder]
# ... parametri ...
pressure_advance: 0.055
# ↑ Valore trovato con calibrazione

pressure_advance_smooth_time: 0.040

# FIRMWARE_RESTART
```

### PA Dinamico per Materiali

```ini
# Macro per cambiare PA al volo

[gcode_macro SET_PA_PLA]
gcode:
    SET_PRESSURE_ADVANCE ADVANCE=0.055

[gcode_macro SET_PA_PETG]
gcode:
    SET_PRESSURE_ADVANCE ADVANCE=0.065

[gcode_macro SET_PA_TPU]
gcode:
    SET_PRESSURE_ADVANCE ADVANCE=0.120

# In slicer start gcode:
# SET_PA_PLA    ; per PLA
# SET_PA_PETG   ; per PETG
```

### PA in Slicer

```yaml
# Alcuni slicer permettono override PA

PrusaSlicer / SuperSlicer:
  # Filament Settings → Custom G-Code → Start G-code
  SET_PRESSURE_ADVANCE ADVANCE=0.055

Cura:
  # Non supporto nativo
  # Usare plugin "Klipper Settings"
  # O custom start gcode

OrcaSlicer:
  # Machine settings → Klipper pressure advance
  # Campo dedicato
```

## Effetti Collaterali PA

### Smoothing Eccessivo

```yaml
Sintomo: Angoli arrotondati, dettagli smussati

Causa:
  - pressure_advance_smooth_time troppo alto

Soluzione:
  pressure_advance_smooth_time: 0.020
  # Ridurre a 20ms (da 40ms default)
  # Trade-off: possibili vibrazioni motore estrusore
```

### Estrusore Salta Passi

```yaml
Sintomo: Click estrusore, under-extrusion random

Causa:
  - PA troppo alto → estrusore richiede accel/decel estreme
  - Motore non ha coppia sufficiente

Soluzioni:
  1. Ridurre PA:
     pressure_advance: 0.040  # Provare -20%

  2. Aumentare corrente estrusore (TMC):
     [tmc2209 extruder]
     run_current: 0.750  # Da 0.650

  3. Ridurre max extrude velocità:
     [extruder]
     max_extrude_only_velocity: 60  # Da 120
```

## Verifica Efficacia PA

### Test Angoli Netti

```yaml
# Stampare calibration cube

File: XYZ 20mm calibration cube

Osservazione angoli:
  ✓ Senza PA: Bulging evidente, angoli arrotondati
  ✓ Con PA ottimale: Angoli 90° netti, spigoli definiti
  ✗ PA eccessivo: Gaps agli angoli, under-extrusion

Misurazioni:
  - Spessore pareti: Uniforme (±0.05mm)
  - Angoli: 90° ±1°
  - Superficie: Lisa, no rigonfiamenti
```

### Test Retraction Tower

```yaml
# Verifica stringing

File: Retraction tower STL

Setup:
  - PA calibrato
  - Retraction: 1-2mm (direct drive)
  - Temperatura: Standard materiale

Risultato atteso:
  - Stringing ridotto drasticamente
  - PA compensa parte del oozing
  - Possibile ridurre retraction distance
```

## Troubleshooting

### PA Non Ha Effetto

```yaml
Sintomo: Bulging persiste anche con PA alto

Debug:
  1. Verificare PA applicato:
     GET_POSITION
     # Output mostra pressure_advance attuale

  2. Verificare velocità stampa:
     # PA efficace solo a velocità >50mm/s
     # A 20mm/s effetto minimo

  3. Problema meccanico:
     # Cinghie allentate, gioco meccanico
     # PA non compensa problemi hardware

  4. Flow rate errato:
     # Se flow troppo alto, PA non basta
     # Calibrare E-steps prima di PA
```

### Variazione PA con Temperatura

```yaml
{% raw %}
Problema: PA ottimale cambia con temperatura

Causa: Viscosità filamento varia

Soluzione: Tabella PA per temperature

[gcode_macro SET_PA_TEMP]
gcode:
    {% set TEMP = params.TEMP|default(200)|int %}
    {% if TEMP < 210 %}
        SET_PRESSURE_ADVANCE ADVANCE=0.060  ; Bassa temp
    {% elif TEMP < 230 %}
        SET_PRESSURE_ADVANCE ADVANCE=0.055  ; Media temp
    {% else %}
        SET_PRESSURE_ADVANCE ADVANCE=0.050  ; Alta temp
    {% endif %}

# Utilizzo:
# SET_PA_TEMP TEMP={temperature}
{% endraw %}
```

## PA Avanzato: Per-Filament Profiles

```ini
{% raw %}
# Sistema profili filament completo

[gcode_macro LOAD_FILAMENT_PROFILE]
gcode:
    {% set PROFILE = params.PROFILE|default("PLA")|string %}

    {% if PROFILE == "PLA" %}
        SET_PRESSURE_ADVANCE ADVANCE=0.055
        SET_RETRACTION RETRACT_LENGTH=1.5 RETRACT_SPEED=45
    {% elif PROFILE == "PETG" %}
        SET_PRESSURE_ADVANCE ADVANCE=0.065
        SET_RETRACTION RETRACT_LENGTH=2.0 RETRACT_SPEED=35
    {% elif PROFILE == "ABS" %}
        SET_PRESSURE_ADVANCE ADVANCE=0.058
        SET_RETRACTION RETRACT_LENGTH=1.8 RETRACT_SPEED=40
    {% elif PROFILE == "TPU" %}
        SET_PRESSURE_ADVANCE ADVANCE=0.120
        SET_RETRACTION RETRACT_LENGTH=0.5 RETRACT_SPEED=20
    {% endif %}

# In start gcode slicer:
# LOAD_FILAMENT_PROFILE PROFILE=PLA
{% endraw %}
```

## Checklist

- [ ] Configurazione base PA in printer.cfg
- [ ] Calibrazione PA eseguita (tower, line test, o pattern)
- [ ] Valore PA ottimale identificato (tipico 0.03-0.10)
- [ ] PA salvato in config estrusore
- [ ] Test calibration cube: angoli netti
- [ ] Nessun salto passi estrusore
- [ ] Stringing ridotto significativamente
- [ ] Profili PA per materiali diversi creati (opzionale)
- [ ] Start gcode slicer aggiornato
- [ ] Backup configurazione

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)