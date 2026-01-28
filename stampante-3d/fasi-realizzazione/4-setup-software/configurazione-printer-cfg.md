---
layout: default
title: "Configurazione printer.cfg"
---
# Configurazione printer.cfg

## Descrizione

Configurazione completa del file `printer.cfg`, il cuore della configurazione Klipper. Questo file definisce tutti i parametri hardware della stampante.

File di riferimento: [`../../software/printer.cfg`](../../software/printer.cfg)

## Immagini

<!-- Inserire screenshot configurazione -->
<!-- ![Editor printer.cfg](../../media/software/config-editor.jpg) -->

## Struttura File printer.cfg

### Organizzazione Sezioni

```ini
# printer.cfg è diviso in sezioni logiche:

# 1. MCU e stampante
[mcu]
[printer]

# 2. Stepper (X, Y, Z, E)
[stepper_x]
[stepper_y]
[stepper_z]
[extruder]

# 3. Riscaldamento
[heater_bed]
[verify_heater]

# 4. Ventole
[fan]
[heater_fan]

# 5. Sensori
[bltouch]
[temperature_sensor]

# 6. Calibrazione
[bed_mesh]
[input_shaper]

# 7. Macro e customizzazioni
[gcode_macro]
```

## Configurazione Base

### MCU e Comunicazione

```ini
[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32h723xx_XXXXXXXXXXXXXX
# ↑ Sostituire con serial ID reale (trovato con: ls /dev/serial/by-id/)

baud: 250000
# Velocità comunicazione (automatica con Klipper moderno)

restart_method: command
# Metodo restart MCU
```

### Parametri Stampante

```ini
[printer]
kinematics: cartesian
# Tipo cinematica: cartesian, corexy, delta, etc.

max_velocity: 500
# Velocità massima [mm/s]

max_accel: 1000
# Accelerazione massima [mm/s²]

max_accel_to_decel: 500
# Decelerazione (default: max_accel/2)

max_z_velocity: 15
# Velocità max asse Z [mm/s] (più lenta per precisione)

max_z_accel: 100
# Accelerazione Z [mm/s²] (conservativa per peso piatto)

square_corner_velocity: 5.0
# Velocità angoli [mm/s] (Input Shaper aiuta qui)
```

## Configurazione Stepper

### Stepper X (NEMA 17 + TMC2209)

```ini
[stepper_x]
step_pin: PE2
dir_pin: PE3
# !PE3 per invertire direzione (se necessario)

enable_pin: !PD4
# ! = attivo basso (logica invertita)

microsteps: 16
# TMC2209 via UART, microstep configurato qui

rotation_distance: 80
# GT2 belt, 20-tooth pulley: 20 teeth × 2mm = 40mm
# Ma configurato 80 → verificare setup

gear_ratio: 1:1
# Nessuna riduzione

endstop_pin: ^PG6
# ^ = pullup abilitato, endstop X-min

position_min: 0
position_endstop: 0
position_max: 900
# Corsa massima 900mm

homing_speed: 50
# Velocità homing [mm/s]

homing_retract_dist: 5
# Distanza retract dopo trigger [mm]

homing_positive_dir: false
# Homing verso min (X=0)
```

### TMC2209 per Asse X
##### _(nel caso di comunicazione uart e non step/dir)_

```ini
[tmc2209 stepper_x]
uart_pin: PE1
# Pin UART per comunicazione TMC

interpolate: True
# Interpolazione 256 microstep (smoothness)

run_current: 0.800
# Corrente RMS [A] (NEMA17 rated 2.0A peak = ~1.4A RMS)
# 0.8A = ~60% → safe e silenzioso

hold_current: 0.500
# Corrente mantenimento (quando fermo)

stealthchop_threshold: 0
# 0 = sempre SpreadCycle (performance)
# 999999 = sempre StealthChop (silenzioso)
```

### Stepper Y (NEMA 23, doppia cinghia 2:1, driver DM556)

```ini
[stepper_y]
step_pin: PF13
dir_pin: PF12
enable_pin: !PF14

microsteps: 64
# Impostato su driver DM556 (DIP switch)

rotation_distance: 40
# Doppia cinghia con riduzione 2:1
# Puleggia 40 denti × 2mm / 2 = 40mm

endstop_pin: ^PG9
position_endstop: 0
position_max: 740

homing_speed: 40
# Più lento per asse pesante
```

### Stepper Z (NEMA 23, viti SFU1605, driver DM556)

```ini
[stepper_z]
step_pin: PF11
dir_pin: !PG3
enable_pin: !PG5

microsteps: 32

rotation_distance: 5
# Vite a ricircolo SFU1605 = 5mm/rotazione

endstop_pin: probe:z_virtual_endstop
# Usa BLTouch come endstop virtuale

position_min: -5
# Permette Z negativo per calibrazione

position_max: 800

homing_speed: 8
# Lento per precisione Z

second_homing_speed: 3
# Ancora più lento al secondo tentativo
```

### Estrusore (NEMA 17 + BMG + TMC2209)

```ini
[extruder]
step_pin: PD15
dir_pin: PD14
enable_pin: !PC7

microsteps: 8
# Meno microstep per estrusore (più couple)

rotation_distance: 7.82
# BMG dual gear, da calibrare con E-steps!
# Procedura: estrudere 100mm, misurare, calcolare nuovo valore

nozzle_diameter: 0.400
filament_diameter: 1.750

heater_pin: PA2
# HE0 output su Octopus

sensor_type: ATC Semitec 104GT-2
sensor_pin: PF4
# TH0 input

pullup_resistor: 4700
# Pullup interno (default Klipper)

min_temp: 0
max_temp: 300
min_extrude_temp: 170
# Sicurezza: no estrusione sotto 170°C

max_extrude_only_distance: 150.0
# Max estrusione senza movimento assi (es. load filament)

max_extrude_cross_section: 5.0
# Limite sezione estrusa (anti-clog)

# PID (eseguire PID_CALIBRATE)
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114

# Pressure Advance (calibrare!)
pressure_advance: 0.055
pressure_advance_smooth_time: 0.040
```

### TMC2209 per Estrusore
##### _(nel caso di comunicazione uart e non step/dir)_

```ini
[tmc2209 extruder]
uart_pin: PC6
interpolate: False
# No interpolation per estrusore (precisione)

run_current: 0.650
hold_current: 0.400

stealthchop_threshold: 0
# SpreadCycle per couple migliore
```

## Configurazione Riscaldamento

### Piatto Riscaldato
##### _(si può anche tralasciare questa sezione se si utilizza, come da progetto, il controller esterno)_

```ini
[heater_bed]
heater_pin: PA1
# BED output → SSR control

sensor_type: Generic 3950
sensor_pin: PF3
# TB thermistor input

min_temp: 0
max_temp: 130
# Max sicurezza piatto

# PID (eseguire PID_CALIBRATE HEATER=heater_bed TARGET=60)
control: pid
pid_Kp: 54.027
pid_Ki: 0.770
pid_Kd: 948.182
```

### Protezione Thermal Runaway

```ini
[verify_heater extruder]
max_error: 120
# °C errore max prima di shutdown

check_gain_time: 20
# Secondi per verificare aumento temperatura

hysteresis: 5
heating_gain: 2
# Minimo 2°C/secondo durante riscaldo

[verify_heater heater_bed]
max_error: 120
check_gain_time: 90
# Più lungo per massa termica piatto

hysteresis: 5
heating_gain: 1
```

## Configurazione Sensori

### BLTouch

```ini
[bltouch]
sensor_pin: ^PG15
# Z-stop pin, ^ = pullup

control_pin: PE5
# Servo pin per controllo probe

x_offset: -44.0
y_offset: -6.0
# Offset probe rispetto a nozzle (misurare!)

z_offset: 2.4
# Offset Z (calibrare con PROBE_CALIBRATE)

probe_with_touch_mode: True
pin_up_reports_not_triggered: True
pin_up_touch_mode_reports_triggered: False

speed: 5.0
# Velocità probing [mm/s]

samples: 2
# Numero campioni per punto

sample_retract_dist: 5.0
samples_tolerance: 0.050
# Tolleranza tra campioni [mm]
```

### Bed Mesh (Auto Leveling)

```ini
[bed_mesh]
speed: 120
horizontal_move_z: 5
# Altezza sicura movimento probe

mesh_min: 50, 50
mesh_max: 850, 690
# Area probing (considerare offset BLTouch)

probe_count: 5, 5
# Griglia 5×5 = 25 punti

algorithm: bicubic
# Interpolazione mesh: bicubic o lagrange

fade_start: 1.0
fade_end: 10.0
# Fade compensation dopo Z=10mm
```

### Sensori Temperatura

```ini
[temperature_sensor raspberry_pi]
sensor_type: temperature_host
# Temp RPi CPU

min_temp: 10
max_temp: 100

[temperature_sensor octopus_mcu]
sensor_type: temperature_mcu
# Temp MCU Octopus

min_temp: 0
max_temp: 100
```

## Configurazione Ventole

### Part Cooling Fan (PWM)

```ini
[fan]
pin: PE5
# FAN1 output (PWM controllato da slicer)

max_power: 1.0
shutdown_speed: 0

cycle_time: 0.010
# Frequenza PWM [s] (100Hz)

kick_start_time: 0.100
# Pulse iniziale per avvio
```

### Hotend Fan (Always ON)

```ini
[heater_fan hotend_fan]
pin: PA8
# FAN0 output

heater: extruder
heater_temp: 50.0
# Accende se hotend > 50°C

fan_speed: 1.0
# Sempre 100% quando ON
```

## Macro GCode Utili

### Start Print

```ini
[gcode_macro START_PRINT]
gcode:
    G28                      ; Home all axes
    BED_MESH_PROFILE LOAD=default  ; Load saved mesh
    G1 Z15.0 F6000           ; Move Z up
    G92 E0                   ; Reset extruder
    G1 F200 E10              ; Prime nozzle
    G92 E0
```

### End Print

```ini
[gcode_macro END_PRINT]
gcode:
    G91                      ; Relative positioning
    G1 E-5 F3000             ; Retract
    G1 Z10                   ; Move Z up
    G90                      ; Absolute positioning
    G1 X0 Y700               ; Present print
    M104 S0                  ; Turn off hotend
    M140 S0                  ; Turn off bed
    M84                      ; Disable motors
```

## Salvare e Applicare Config

```bash
# Via interfaccia Mainsail:
# 1. Editor → Modificare printer.cfg
# 2. Save & Restart

# Via SSH:
nano ~/printer_data/config/printer.cfg
# Modificare
# CTRL+X → Y → Enter

# Riavviare Klipper
sudo systemctl restart klipper

# O via console Mainsail
RESTART
```

## Checklist

- [ ] Serial MCU configurato correttamente
- [ ] Tutti gli stepper definiti con pin corretti
- [ ] Rotation distance verificato per ogni asse
- [ ] TMC2209 configurati con correnti appropriate
- [ ] Hotend e bed thermistor configurati
- [ ] PID tuning eseguito (vedi prossima sezione)
- [ ] BLTouch configurato e offset misurati
- [ ] Bed mesh configurato
- [ ] Ventole funzionanti
- [ ] Macro START_PRINT e END_PRINT definite
- [ ] Config salvata e backup effettuato

---

[Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md)
