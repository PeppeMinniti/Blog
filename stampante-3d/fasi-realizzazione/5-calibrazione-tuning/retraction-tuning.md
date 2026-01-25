---
layout: default
title: "Retraction Tuning"
---
# Retraction Tuning

## Descrizione

Calibrazione della retraction (ritiro filamento) per eliminare stringing, oozing e blob. La retraction ottimale dipende da sistema estrusione, hotend, materiale e temperatura.

**Obiettivi:**
- Zero stringing tra parti separate
- Nessun blob o zits sulle superfici
- Minimizzare under-extrusion post-retraction

## Immagini

<!-- Inserire foto stringing prima/dopo -->
<!-- ![Stringing test](../../media/calibrazione/stringing-test.jpg) -->
<!-- ![Retraction tower](../../media/calibrazione/retraction-tower.jpg) -->

## Teoria Retraction

### Meccanica Retraction

```yaml
Processo retraction:
  1. Toolhead rallenta prima travel move
  2. Estrusore inverte direzione (retract)
  3. Filamento arretra di X mm
  4. Pressione hotend diminuisce
  5. Travel move eseguito
  6. Estrusore ri-esegue prime (unretract)
  7. Stampa riprende

Parametri chiave:
  - Distance: Quanta distanza retrarre [mm]
  - Speed: Velocità retraction [mm/s]
  - Zhop: Sollevamento Z durante travel [mm]
  - Minimum travel: Distanza minima per attivare retraction
  - Wipe: Movimento pulizia nozzle prima retract
```

### Direct Drive vs Bowden

```yaml
Direct Drive (questo progetto):
  - Retraction distance: 0.5-2.5 mm
  - Tipico: 1.5 mm
  - Poco filamento da ritrarre (no tubo)
  - Retraction speed: 30-60 mm/s

Bowden (tubo PTFE):
  - Retraction distance: 3-8 mm
  - Tipico: 5 mm
  - Più filamento (compressione tubo)
  - Retraction speed: 40-80 mm/s
  - Più complicato da calibrare
```

## Configurazione Klipper

### Parametri Firmware

```ini
# In printer.cfg, sezione [extruder]

[extruder]
# ... parametri normali ...

max_extrude_only_distance: 150.0
# Max estrusione senza movimento assi [mm]
# Deve essere > retraction per permettere load/unload

max_extrude_only_velocity: 60.0
# Max velocità extrude-only [mm/s]
# Limite superiore retraction speed

max_extrude_only_accel: 1500.0
# Max accel extrude-only [mm/s²]
# (Opzionale, default alto)
```

### Configurazione Slicer

```yaml
# Impostazioni retraction in slicer

PrusaSlicer / SuperSlicer:
  Printer Settings → Extruder 1:
    - Retraction length: 1.5 mm
    - Retraction speed: 45 mm/s
    - Minimum travel after retraction: 2 mm
    - Retract on layer change: ✓
    - Wipe while retracting: ✓ (opzionale)
    - Z-hop when retracting: 0.2 mm (opzionale)

Cura:
  Travel → Retraction:
    - Enable retraction: ✓
    - Retraction distance: 1.5 mm
    - Retraction speed: 45 mm/s
    - Minimum travel distance: 2 mm
    - Z hop when retracted: 0.2 mm
    - Combing mode: Off (per test puro)
```

## Calibrazione Retraction Distance

### Test Tower Method

```yaml
{% raw %}
# Stampare retraction calibration tower

File STL: Retraction test tower
Download: https://www.thingiverse.com/thing:2563909

Configurazione slicer:
  - Disabilita retraction base (0mm)
  - Via custom gcode: incrementa ogni layer
  - Ogni sezione tower = diversa retraction

Custom G-Code dopo cambio layer:
  ; layer [layer_num]
  {% if layer_num > 5 %}
    SET_RETRACTION RETRACT_LENGTH={0.5 + ((layer_num - 5) * 0.2)}
  {% endif %}

  # Layer 5-10: 0.5mm
  # Layer 11-15: 0.7mm
  # Layer 16-20: 0.9mm
  # Layer 21-25: 1.1mm
  # ecc.

Valutazione:
  - Osservare stringing tra pilastri
  - Layer con min stringing = retraction ottimale
{% endraw %}
```

### Test Manual Incremental

```yaml
# Test manuale con stampe separate

Procedura:
  1. Stampare test con retraction 0.5mm
  2. Valutare stringing
  3. Incrementare +0.2mm
  4. Ripetere fino a stringing eliminato

File test: Dual tower stringing test
  - Due pilastri separati
  - Multiple travel move tra loro
  - Evidenzia subito stringing

Start values:
  Direct drive: 0.5mm → 2.5mm (step 0.2mm)
  Bowden: 3.0mm → 7.0mm (step 0.5mm)
```

## Calibrazione Retraction Speed

### Influenza Velocità

```yaml
Retraction speed bassa (<30mm/s):
  ✓ Meno stress meccanico
  ✓ Meno rischio grinding filamento
  ✗ Oozing durante retract (lento)
  ✗ Possibile stringing

Retraction speed alta (>60mm/s):
  ✓ Retract rapido, min oozing
  ✓ Stringing ridotto
  ✗ Stress su estrusore (possibile skip steps)
  ✗ Grinding filamento se troppo veloce

Ottimale direct drive: 40-50 mm/s
Ottimale bowden: 50-70 mm/s
```

### Test Speed

```yaml
# Dopo trovato distance ottimale

Procedura:
  1. Fissare retraction distance (es: 1.5mm)
  2. Testare speed: 30, 40, 50, 60 mm/s
  3. Valutare:
     - Stringing
     - Click estrusore (skip steps)
     - Grinding filamento

Valori test:
  Speed 30 mm/s: Baseline (conservativo)
  Speed 40 mm/s: +33%
  Speed 50 mm/s: +66%
  Speed 60 mm/s: Max consigliato

Limite pratico:
  - TMC2209 con run_current 0.65A: ~50mm/s max
  - Maggiore corrente → speed più alta possibile
```

## Z-Hop Tuning

### Quando Usare Z-Hop

```yaml
Z-hop = Sollevamento Z durante travel move

Vantaggi:
  ✓ Evita collisioni con parti stampate
  ✓ Utile per stampe con molti ostacoli
  ✓ Riduce "dragging" nozzle su superfici

Svantaggi:
  ✗ Rallenta stampa (movimento Z extra)
  ✗ Usura viti Z
  ✗ Possibili zits/blobs nei punti retraction

Raccomandazioni:
  - Disabilitare se stampa semplice (pochi travel)
  - Abilitare se geometria complessa o tall objects
  - Valore: 0.2-0.4mm (minimo efficace)
```

### Configurazione Z-Hop

```yaml
# In slicer

PrusaSlicer:
  Printer Settings → Extruder 1:
    Lift Z: 0.2 mm
    Only lift Z: Above Z = 0 (sempre attivo)
                 Below Z = 0 (disabilitato)

Cura:
  Travel → Z Hop When Retracted:
    Z Hop Height: 0.2 mm
    Z Hop Only Over Printed Parts: ✓ (riduce hop)

Test values:
  - 0.0mm: No hop (più veloce)
  - 0.2mm: Hop minimo (compromesso)
  - 0.4mm: Hop sicuro (oggetti alti)
  - >0.5mm: Eccessivo (rallenta molto)
```

## Wipe e Combing

### Wipe Before Retract

```yaml
# Nozzle si pulisce su pezzo prima di retrarre

Funzionamento:
  1. Fine perimetro
  2. Nozzle si sposta indietro 2-5mm sul perimetro appena stampato
  3. Retraction eseguita
  4. Travel move

Vantaggi:
  ✓ Riduce oozing residuo su nozzle
  ✓ Stringing ulteriormente ridotto
  ✓ Compatibile con tutti i materiali

Config slicer:
  PrusaSlicer:
    Printer Settings → Extruder 1:
      Wipe while retracting: ✓
      Length: 2mm (default)
```

### Combing Mode

```yaml
# Travel move che evitano spazi vuoti

Combing OFF:
  - Travel in linea retta
  - Retraction su tutti i travel > minimum
  - Migliore per test calibrazione retraction

Combing ON:
  - Travel segue perimetri stampati
  - Riduce necessità retraction
  - Stringing nascosto dentro infill

Raccomandazione:
  - Calibrare con combing OFF
  - Produzione: combing ON (faster prints)
```

## Retraction per Materiale

### Valori Tipici per Materiale

```yaml
PLA (190-220°C):
  Distance: 1.0-2.0mm (direct) / 4-6mm (bowden)
  Speed: 40-50 mm/s
  Note: Facile, poco stringing

PETG (230-250°C):
  Distance: 1.5-2.5mm (direct) / 5-7mm (bowden)
  Speed: 35-45 mm/s
  Note: Stringing maggiore, retract più lungo
  Z-hop consigliato (PETG appiccicoso)

ABS (240-260°C):
  Distance: 1.0-1.8mm (direct) / 4-6mm (bowden)
  Speed: 40-50 mm/s
  Note: Simile PLA, meno stringing

TPU / Flex (220-240°C):
  Distance: 0.5-1.5mm (direct) / 3-5mm (bowden)
  Speed: 20-30 mm/s (LENTO!)
  Note: Filamento morbido, rischio jam se retract veloce
  Meglio ridurre travel invece di molto retract

Nylon (250-270°C):
  Distance: 1.5-2.5mm (direct) / 5-8mm (bowden)
  Speed: 35-45 mm/s
  Note: Igroscopico, dry filament importante
```

## Macro Klipper per Retraction

### SET_RETRACTION Macro

```ini
# Klipper ha comando nativo (se configurato)

[firmware_retraction]
retract_length: 1.5
# Lunghezza retraction [mm]

retract_speed: 45
# Velocità retraction [mm/s]

unretract_extra_length: 0
# Filamento extra dopo unretract [mm]
# Usare se under-extrusion dopo retraction

unretract_speed: 40
# Velocità unretract [mm/s]
# Spesso leggermente più lento del retract

# Utilizzo in gcode:
# G10  = esegue retraction
# G11  = esegue unretract

# Cambio runtime:
# SET_RETRACTION RETRACT_LENGTH=2.0 RETRACT_SPEED=50
```

### Profili Retraction Materiali

```ini
[gcode_macro RETRACT_PROFILE_PLA]
gcode:
    SET_RETRACTION RETRACT_LENGTH=1.5 RETRACT_SPEED=45

[gcode_macro RETRACT_PROFILE_PETG]
gcode:
    SET_RETRACTION RETRACT_LENGTH=2.0 RETRACT_SPEED=40

[gcode_macro RETRACT_PROFILE_TPU]
gcode:
    SET_RETRACTION RETRACT_LENGTH=1.0 RETRACT_SPEED=25

# In start gcode:
# RETRACT_PROFILE_PLA
```

## Troubleshooting

### Stringing Persistente

```yaml
Sintomo: Filetti tra parti anche con retraction

Debug:
  1. Verificare retraction applicata:
     # Controllare gcode generato contiene G10/G11 o E-retracts

  2. Aumentare retraction distance:
     # Incrementare +0.2mm fino a eliminazione

  3. Temperatura troppo alta:
     # Ridurre -5°C e ri-testare
     # Materiale liquido = più oozing

  4. Nozzle usurato/danneggiato:
     # Oozing laterale se nozzle eroso
     # Sostituire nozzle

  5. Pressure advance:
     # PA calibrato riduce bisogno retraction
     # Verificare PA attivo
```

### Under-Extrusion Post-Retraction

```yaml
Sintomo: Gaps/buchi all'inizio perimetri dopo retraction

Cause:
  1. Retraction troppo lunga:
     # Filamento arretra troppo, serve tempo riempire
     Soluzione: Ridurre distance -0.2mm

  2. Unretract insufficiente:
     # Aggiungere extra filamento dopo retract
     [firmware_retraction]
     unretract_extra_length: 0.1  # +0.1mm extra

  3. Pressure advance alto:
     # PA può causare under-extrusion se PA + retract combinate
     Soluzione: Ridurre PA leggermente

  4. Retraction speed troppo veloce:
     # Estrusore salta passi durante retract
     Soluzione: Ridurre speed a 40mm/s
```

### Grinding Filamento

```yaml
Sintomo: Polvere filamento, segni profondi, estrusore click

Cause:
  1. Tensione estrusore troppo alta:
     # Ridurre compressione molla idler

  2. Retraction troppo frequente:
     # Stesso punto filamento grinded ripetutamente
     Aumentare "minimum travel" in slicer

  3. Retraction speed troppo alta:
     # Ingranaggi slittano e grindano
     Ridurre speed a 35-40mm/s

  4. Hotend intasato parzialmente:
     # Resistenza eccessiva → grinding
     # Cold pull per pulizia
```

## Test Finale Stringing

### Comprehensive Test

```yaml
# Stampa test definitivo

File: Stringing test comprehensive
  - Multiple torri diverse altezze
  - Travel lunghi (evidenzia problemi)
  - Dettagli piccoli

Settings finali:
  Retraction: [Valore calibrato]
  Speed: [Velocità calibrata]
  Z-hop: [0 o 0.2mm]
  Wipe: ✓
  Combing: On (per produzione)
  Temperature: Standard materiale

Risultato atteso:
  ✓ Zero stringing visibile
  ✓ Superfici lisce
  ✓ Nessun blob o zit
  ✓ Nessun under-extrusion
```

## Checklist

- [ ] Configurazione base firmware retraction
- [ ] Test tower retraction distance completato
- [ ] Retraction distance ottimale trovato (tipico 1-2mm direct)
- [ ] Retraction speed calibrato (40-50mm/s)
- [ ] Z-hop configurato se necessario (0-0.4mm)
- [ ] Wipe before retract abilitato
- [ ] Test stringing: zero filamenti visibili
- [ ] Nessun grinding filamento
- [ ] Nessuna under-extrusion post-retraction
- [ ] Profili retraction per materiali salvati
- [ ] Slicer settings aggiornati con valori ottimali
- [ ] Backup configurazione

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)