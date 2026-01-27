---
layout: default
title: "Cablaggio Motori e Sensori"
---
# Cablaggio Motori e Sensori

## Descrizione

Collegamento di tutti i motori stepper, endstop, sensori temperatura e sonde alla scheda Octopus Pro. La corretta identificazione dei pin è fondamentale.

Componenti da cablare:
- 8× Motori stepper (2 NEMA17 + 6 NEMA23)
- Endstop (X, Y, BLTouch)
- Termistors (hotend)
- BLTouch (auto leveling)
- Fan (hotend, part cooling)

## Immagini

<!-- Inserire foto cablaggio -->
<!-- ![Cablaggio motori](../../media/elettronica/cablaggio-motori.jpg) -->
<!-- ![Connessioni sensori](../../media/elettronica/sensori.jpg) -->

## Cablaggio Motori Stepper

### NEMA 17 - Asse X (TMC2209)

```yaml
Motore: NEMA 17 (59Ncm, 2.0A)
Connessione: MOTOR_0 su Octopus Pro
Cavo: 4-wire (2B 2A 1A 1B)
Lunghezza max: 2m

Pinout standard NEMA:
  - Rosso: Coil A+
  - Blu: Coil A-
  - Verde: Coil B+
  - Nero: Coil B-

Octopus connector:
  Pin 1: 2B (Verde)
  Pin 2: 2A (Nero)
  Pin 3: 1A (Rosso)
  Pin 4: 1B (Blu)
```

### NEMA 17 - Estrusore (TMC2209)

```yaml
Motore: NEMA 17 (59Ncm, 2.0A)
Connessione: MOTOR_7 su Octopus Pro
Nota: Stesso schema asse X
```

### NEMA 23 - Assi Y e Z (Driver Esterni DM556)

```yaml
Motori: 6× NEMA 23 (3.0Nm, 4.2A)
  - 2× per asse Y (paralleli)
  - 4× per asse Z (paralleli)

Connessione driver DM556:
  PUL+ (Step+): Da Octopus MOTOR(1 o 2) STEP
  PUL- (Step-): GND
  DIR+ (Dir+): Da Octopus MOTOR(1 o 2) DIR
  DIR- (Dir-): GND
  ENA+ (Enable+): Da Octopus MOTOR(1 o 2) ENABLE
  ENA- (Enable-): GND

Alimentazione motori:
  B+ / B- e A+ / A-: Collegare NEMA 23
  V+ / V-: 36V da PSU dedicato
```

### Schema Collegamento DM556

```
Octopus Pro                    DM556
┌──────────┐                  ┌──────────┐
│ MOTOR_1  │                  │          │
│  STEP───────────────────────→PUL+      │
│  DIR────────────────────────→DIR+      │     ┌─────────┐
│  EN─────────────────────────→ENA+      │────→│ NEMA 23 │
│  GND────────┬───────────────→PUL-      │     └─────────┘
└──────────┘  │               │  DIR-    │
              │               │  ENA-    │
              │               └──────────┘
              │
         Common GND

PSU 36V ──→ V+ DM556
PSU GND ──→ V- DM556
```

## Cablaggio Endstop

### Endstop Meccanici (X e Y)

```yaml
Tipo: Microswitch NO (Normally Open)
Connessione:
  - Pin 1 (Signal): Pin endstop Octopus
  - Pin 2 (GND): GND comune
  - Pin 3 (VCC): 5V (se LED presente)

Octopus endstops:
  X-min: PG6
  Y-min: PG9

Configurazione Klipper:
  endstop_pin: ^PG6  # ^ = pullup interno abilitato
```

### BLTouch (Z-probe Virtual Endstop)

```yaml
Connessione BLTouch:
  - Brown (GND): GND
  - Red (5V): 5V
  - Orange (PWM): PE5 (SERVO pin)
  - Black (GND sensor): GND
  - White (Signal sensor): PG15 (Z-stop pin)

Configurazione Klipper:
[bltouch]
sensor_pin: ^PG15
control_pin: PE5
x_offset: -44.0
y_offset: -6.0
z_offset: 2.4  # Calibrare
```

## Cablaggio Termistors

### Hotend Thermistor

```yaml
Tipo: ATC Semitec 104GT-2 (100K NTC)
Connessione: TH0 su Octopus
  - Pin 1: Signal (PF4)
  - Pin 2: GND

Resistenza a 25°C: ~100kΩ
Resistenza a 200°C: ~1.5kΩ

Klipper config:
[extruder]
sensor_type: ATC Semitec 104GT-2
sensor_pin: PF4
pullup_resistor: 4700
```

### Bed Thermistor

 - **Attualmente non gestito da klipper ma da controller esterno**  

<!-->
```yaml
Tipo: NTC 100K generico
Connessione: TB su Octopus
  - Pin 1: Signal (PF3)
  - Pin 2: GND

Klipper config:
[heater_bed]
sensor_type: Generic 3950
sensor_pin: PF3
```
<-->

## Cablaggio Ventole

### Hotend Fan (Always ON)

```yaml
Ventola: 24V 4010 (40×40×10mm)
Connessione: FAN0 su Octopus
  - Red (+): 24V always-on
  - Black (-): GND

Klipper config:
[heater_fan hotend_fan]
pin: PA8
heater: extruder
heater_temp: 50.0  # Accende se hotend > 50°C
```

### Part Cooling Fan (PWM)

```yaml
Ventola: 24V 5015 blower
Connessione: FAN1 su Octopus
  - Red (+): PWM output
  - Black (-): GND

Klipper config:
[fan]
pin: PE5
max_power: 1.0
shutdown_speed: 0
cycle_time: 0.010
hardware_pwm: False
kick_start_time: 0.100
```

## Gestione Cavi

### Routing Cavi

```yaml
Principi:
  - Separare cavi potenza da cavi segnale
  - Usare guaine spiralate per protezione
  - Evitare cavi volanti vicino parti mobili
  - Cable chain per assi in movimento

Sezioni consigliate:
  - Motori NEMA17: 0.75mm²
  - Motori NEMA23: 1.5mm²
  - Segnali (endstop, thermistor): 0.25mm²
  - Alimentazione 24V: 1.5-2.5mm²
```

### Cable Carriers (Drag Chain)

```yaml
Asse X (mobile):
  - Lunghezza: 1200mm
  - Cavi: Hotend, estrusore, fan, BLTouch
  - Sezione chain: 15×20mm

Asse Y (mobile):
  - Lunghezza: 1000mm
  - Cavi: Motori, sensori piatto
  - Sezione chain: 15×30mm
```

## Etichettatura Cavi

```yaml
Sistema etichettatura:
  - Motori: "MOTOR_X", "MOTOR_Y1", "MOTOR_Z1"
  - Endstop: "END_X", "END_Y"
  - Sensori: "TEMP_HE", "TEMP_BED"
  - Alimentazione: "PSU24V_MAIN", "PSU36V_MOTORS"

Strumenti:
  - Fascette colorate
  - Label maker
  - Spirale copricavo numerato
```

## Test Cablaggio

### Test Motori

```gcode
; Test movimento singolo asse
M84              ; Disabilita motori
; Muovere manualmente asse X
; Resistenza = OK, Libero = Problema cablaggio/config

; Test rotazione
G91              ; Modalità relativa
G1 X10 F1000     ; Muovi X di 10mm
; Direzione corretta? Se no, invertire dir_pin
```

### Test Endstop

```bash
# Via console Klipper
QUERY_ENDSTOPS

# Output atteso:
# x:open y:open z:open  (quando NON premuti)
# x:TRIGGERED y:open z:open  (quando X premuto)
```

### Test Termistors

```bash
# Verifica lettura temperatura
TEMPERATURE

# Output atteso a temperatura ambiente:
# extruder: 22.3°C
# heater_bed: 21.8°C

# Se legge -273°C o 999°C: cablaggio errato
```

## Problemi Comuni

| Problema | Causa | Soluzione |
|----------|-------|-----------|
| Motore non gira | Cablaggio invertito | Verificare sequenza bobine |
| Motore direzione errata | Dir pin | Invertire `!` in dir_pin |
| Endstop sempre triggered | Cablaggio o pullup | Verificare NO/NC config |
| Temperatura 999°C | Termistor disconnesso | Controllare connessione |
| Temperatura -273°C | Cortocircuito | Verificare isolamento |
| Ventola non parte | PWM invertito | Invertire `!` in pin |

## Checklist

- [ ] Tutti i motori cablati correttamente
- [ ] Endstop X e Y connessi e testati
- [ ] BLTouch connesso e risponde
- [ ] Termistor legge temperatura ambiente
- [ ] Ventole connesse e girano nella direzione corretta
- [ ] Cavi protetti con guaine
- [ ] Cable chain installate su assi mobili
- [ ] Tutti i cavi etichettati
- [ ] Test movimento assi OK
- [ ] Test endstop positivo

---

[Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md)
