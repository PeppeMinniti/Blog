---
layout: default
title: "Upgrade Incrementali"
---
# Upgrade Incrementali

## Descrizione

Roadmap di miglioramenti futuri per la stampante. Questo documento traccia upgrade opzionali che possono essere implementati gradualmente per migliorare prestazioni, affidabilità e features.

**Filosofia:** Stampante già funzionante, upgrade aggiunti secondo necessità e budget.

## Immagini

<!-- Inserire foto upgrade -->
<!-- ![Dual Z motors](../../media/upgrade/dual-z.jpg) -->

## Upgrade Priorità Alta

### 1. Enclosure (Chiusura)

```yaml
Scopo:
  - Temperatura ambiente stabile
  - Protegge da correnti aria
  - Essenziale per ABS/ASA
  - Riduce rumore

Materiali:
  - Pannelli plexiglass 3-5mm
  - Profili alluminio 2020
  - Cerniere porte accesso
  - Ventilazione controllata

Costo: 150-250€
Difficoltà: Media
Tempo: 1 weekend

Benefici:
  ✓ ABS/ASA senza warping
  ✓ Qualità consistente
  ✓ Rumore ridotto -10dB
  ✗ Richiede ventilazione extra (elettronica)
```

### 2. Dual Z-Axis Leadscrew

```yaml
Scopo:
  - Eliminare Z-binding
  - Migliorare parallelismo piatto
  - Ridurre banding

Upgrade:
  - Aggiungere seconda vite Z lato opposto
  - Motore Z2 sincronizzato via firmware
  - Supporti meccanici

Componenti:
  - 1× NEMA23 motore Z extra
  - 1× Vite TR16×5 (900mm)
  - Driver stepper extra
  - Giunto elastico
  - Supporti custom

Costo: 80-120€
Difficoltà: Alta (richiede modifiche meccaniche)
Tempo: 1-2 giorni

Klipper config:
[stepper_z1]
step_pin: ...
dir_pin: ...
endstop_pin: probe:z_virtual_endstop
# Sync con [stepper_z] principale

[z_tilt]
z_positions:
    50, 370    # Posizione motore Z1
    850, 370   # Posizione motore Z2
points:
    50, 370
    850, 370
```

### 3. Filament Runout Sensor

```yaml
Scopo:
  - Pausa automatica se filamento finisce
  - Evita stampe fallite

Tipo sensore:
  - Meccanico: Switch attivato da filamento
  - Ottico: Infrarosso detect presenza

Installazione:
  - Montare tra spool e estrusore
  - Cablare a pin Octopus (endstop spare)

Klipper config:
[filament_switch_sensor runout_sensor]
switch_pin: ^PG10  # Spare endstop pin
pause_on_runout: True
runout_gcode:
    M600  # Filament change macro

[gcode_macro M600]
gcode:
    PAUSE
    # Park toolhead
    # Beep/notify

Costo: 5-15€
Difficoltà: Bassa
Tempo: 30 minuti
```

## Upgrade Qualità

### 4. Linear Rails Upgrade (Y/Z)

```yaml
Scopo:
  - Maggiore rigidità
  - Precisione aumentata
  - Longevità maggiore vs guide attuali

Parti da sostituire:
  - Guide MGN20H esistenti OK
  - Opzionale: MGN20C (precarico maggiore)

Alternativa:
  - Se budget: Solo sostituire carrelli usurati
  - Upgrade a rails precaricate (Z1/ZA)

Costo: 200-400€ (full replacement)
Beneficio marginale: Basso (guide attuali già buone)
Priorità: Bassa
```

### 5. All-Metal Hotend Upgrade

```yaml
Status attuale: Già all-metal ✓

Upgrade possibili:
  - Hotend high-flow (Volcano, CHT nozzle)
  - Bi-metal heatbreak (performance)
  - Nozzle hardened steel (materiali abrasivi)

CHT Nozzle (High Flow):
  - Tri-hole design
  - Flow 2-3× normale
  - Permette velocità stampa >150mm/s

  Costo: 20-40€
  Difficoltà: Bassa (drop-in replacement)

Hardened Steel Nozzle:
  - Per materiali abrasivi:
    - Carbon fiber filled
    - Glow-in-dark
    - Wood filled
  - Durabilità 10× vs ottone

  Costo: 15-25€
  Note: Conduttività termica ridotta (aumentare temp +5-10°C)
```

### 6. Input Shaper Upgrade (IMU Permanente)

```yaml
Scopo:
  - Monitoring vibrazioni continuo
  - Adaptive input shaper
  - Diagnostica real-time

Accelerometro permanente:
  - ADXL345 montato fisso su toolhead
  - Cablaggio via cable chain
  - Always-on monitoring

Features avanzate:
  - Auto-calibrazione IS periodica
  - Allerta se risonanze aumentano (usura)
  - Log vibrazioni per manutenzione predittiva

Costo: 5-10€ (ADXL345)
Difficoltà: Media (cablaggio)
Beneficio: Medio (nice-to-have)
```

## Upgrade Velocità/Performance

### 7. Direct Drive → Lightweight Toolhead

```yaml
Scopo:
  - Ridurre massa toolhead
  - Permettere accel più alte
  - Ridurre ringing

Opzioni:
  - Estrusore Sherpa Mini (ultra-light)
  - Hotend Rapido (ultra-fast heating)
  - Carriage carbon fiber

Trade-off:
  ✓ Accel fino a 10000+ mm/s²
  ✗ Costo elevato (200-500€)
  ✗ Complessità assemblaggio
  ✗ Setup attuale già performante

Priorità: Bassa (attuale setup OK)
```

### 8. Klipper Advanced Features

```yaml
# Features Klipper da abilitare

Firmware retraction:
  ✓ Già configurato

Exclude objects:
  - Skip parti fallite senza fermare print
  Config:
  [exclude_object]
  # Enable in slicer: Label objects

Adaptive bed mesh:
  - Mesh solo su area print
  - Risparmio tempo
  # Richiede script custom

Skew correction:
  - Correzione non-squadratura assi
  [skew_correction]
  # Calibrare con print test

Costo: 0€ (solo config)
Difficoltà: Media (config editing)
Beneficio: Medio-Alto
```

## Upgrade Automazione

### 9. Webcam per Timelapse

```yaml
Scopo:
  - Monitoraggio remoto stampa
  - Timelapse automatici
  - Controllo qualità

Hardware:
  - Webcam USB (Logitech C270/C920)
  - Raspberry Pi Camera Module V2
  - Illuminazione LED

Software:
  - Moonraker timelapse module
  - OctoPrint (alternativa)

Posizionamento:
  - Vista frontale/laterale
  - Illuminazione adeguata
  - Cablaggio ordinato

Costo: 30-80€
Difficoltà: Bassa
Beneficio: Alto (monitoring + content)
```

### 10. Smart Power Management

```yaml
Scopo:
  - Spegnimento automatico post-print
  - Accensione remota
  - Risparmio energetico

Componenti:
  - Shelly Plug (smart plug WiFi)
  - Relay controllato da RPi GPIO
  - Power panic module

Klipper integration:
[output_pin power_device]
pin: rpi:gpio17  # Control relay

[gcode_macro POWER_OFF_PRINTER]
gcode:
    # Spegni heaters
    M104 S0
    M140 S0
    # Wait cooldown
    TEMPERATURE_WAIT SENSOR=extruder MAXIMUM=50
    # Power off via relay
    SET_PIN PIN=power_device VALUE=0

Costo: 15-50€
Difficoltà: Media (electrical safety!)
```

## Upgrade Materiali Speciali

### 11. Heated Chamber per Engineering Materials

```yaml
Materiali target:
  - ABS (già possibile con enclosure)
  - ASA (UV resistant)
  - Nylon (forte, durable)
  - Polycarbonate (high-temp, strong)
  - PEEK (industrial grade, 400°C+)

Requisiti:
  - Enclosure sealed ✓
  - Chamber heater (target 60-80°C)
  - Hotend 300°C+ (già disponibile)
  - Bed 120°C+ (upgrade necessario)

Upgrade necessari:
  1. Chamber heater:
     - Heating element 200W
     - Thermistor chamber
     - PID control via Klipper

  2. Bed upgrade (per PC/PEEK):
     - Heater 120-150°C capable
     - PSU potenza maggiore
     - Isolation migliorata

Costo: 150-300€
Difficoltà: Alta
Beneficio: Alto (se serve engineering materials)
```

### 12. Multi-Material System (MMU)

```yaml
Scopo:
  - Stampa multi-color
  - Supporti solubili
  - Multi-material single print

Opzioni:
  - Prusa MMU3 (5 colori)
  - ERCF (Enraged Rabbit Carrot Feeder)
  - Palette (splicing)

Setup ERCF:
  - Buffer filamenti
  - Selector con motore
  - Klipper native support
  - Wipe tower necessario

Costo: 200-400€
Difficoltà: Molto alta (mechanical + software)
Tempo setup: 1-2 settimane
Beneficio: Alto (se multi-color necessario)

Nota: Complessità significativa, considerare solo se reale necessità
```

## Maintenance Upgrades

### 13. Preventive Maintenance Scheduler

```yaml
# Sistema reminder manutenzione

Klipper macro tracking:
  - Ore stampa totali
  - Distance filament estruso
  - Cicli homing

[save_variables]
filename: ~/printer_data/variables.cfg

[gcode_macro TRACK_PRINT_TIME]
variable_total_time: 0
variable_filament_used: 0
gcode:
    # Update ogni print
    # Alert se > threshold

Maintenance checklist:
  - Ogni 100h: Lubrificare guide lineari
  - Ogni 200h: Check tensione cinghie
  - Ogni 500h: Sostituire nozzle
  - Ogni 1000h: Check cuscinetti, pulizia completa

Automation:
  - Telegram/email notification
  - Dashboard manutenzione Mainsail
```

## Future-Proofing

### 14. CAN Bus Toolhead

```yaml
Scopo:
  - Ridurre cavi toolhead (da ~20 a 4)
  - Communication via CAN bus
  - Modularity aumentata

Componenti:
  - CAN bus board (EBB36/42)
  - CAN transceiver Octopus
  - Cablaggio ridotto (Power + CAN)

Vantaggi:
  ✓ Cable management semplificato
  ✓ Reliability aumentata
  ✓ Hot-swap toolheads possibile

Costo: 50-100€
Difficoltà: Media-Alta (electrical)
Beneficio: Medio (nice-to-have)
```

## Roadmap Consigliata

### Phase 1 (Primi 3 mesi)
```yaml
1. Filament runout sensor (15€) - Safety
2. Webcam timelapse (50€) - Monitoring
3. Klipper advanced features (0€) - Software

Totale: ~65€
ROI: Alto (safety + content)
```

### Phase 2 (Mesi 3-6)
```yaml
1. Enclosure (200€) - Per ABS/ASA
2. Smart power management (30€) - Automation

Totale: ~230€
Condizione: Se necessità stampa ABS
```

### Phase 3 (Mesi 6-12)
```yaml
1. CHT nozzle high-flow (30€) - Speed
2. Dual Z leadscrew (100€) - Qualità
3. IMU permanente (10€) - Diagnostics

Totale: ~140€
Beneficio: Incrementale improvements
```

### Phase 4 (Futuro - se necessario)
```yaml
- MMU system (300€) - Solo se multi-material necessario
- Heated chamber (250€) - Solo se engineering materials
- CAN bus (80€) - Modernization

Totale: ~630€
Priorità: Bassa (luxury upgrades)
```

## Documentazione Upgrades

### Upgrade Log Template

```markdown
# Upgrade Log - [Nome Upgrade]
Data installazione: ___/___/______

## Motivazione
[Perché questo upgrade?]

## Componenti
- [Lista parti acquistate]
- Fornitori e costi

## Installazione
- Tempo richiesto: X ore
- Difficoltà: [Bassa/Media/Alta]
- Note procedura: [...]

## Configurazione
- File modificati: printer.cfg, moonraker.conf, etc.
- Parametri cambiati: [...]

## Test Post-Upgrade
- [ ] Homing funzionante
- [ ] Test movimento assi
- [ ] Stampa test OK
- [ ] Feature upgrade verificata

## Risultati
- Miglioramento quantificato: [...]
- Problemi riscontrati: [...]
- Soluzioni applicate: [...]

## Conclusioni
- ROI: [Vale la pena? Rifaresti?]
- Raccomandazioni: [...]

Firma: ________________
```

## Checklist

- [ ] Roadmap upgrade definita
- [ ] Budget allocato per phase 1
- [ ] Fornitori componenti identificati
- [ ] Backup configurazione prima di ogni upgrade
- [ ] Log upgrades mantenuto
- [ ] Ogni upgrade testato prima produzione
- [ ] Documentazione aggiornata post-upgrade

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
