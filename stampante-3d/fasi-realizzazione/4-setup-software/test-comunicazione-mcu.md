---
layout: default
title: "Test Comunicazione MCU"
---
# Test Comunicazione MCU

## Descrizione

Verifica della comunicazione tra Raspberry Pi (host Klipper) e scheda Octopus Pro (MCU). Questi test assicurano che il firmware sia correttamente flashato e che l'hardware risponda ai comandi.

**Prerequisiti:** Klipper installato, printer.cfg configurato, Mainsail accessibile.

<!--
## Immagini
-->
<!-- Inserire screenshot test console -->
<!-- ![Console test MCU](../../media/software/test-mcu.jpg) -->

## Test Base Comunicazione

### 1. Verifica Connessione MCU

```yaml
# Via Mainsail Console o SSH

Comando:
  STATUS

Output atteso:
  printer state: ready
  mcu: Ready

Se output è "Firmware restart required":
  - Eseguire: FIRMWARE_RESTART
  - Verificare errori config
```

### 2. Check Serial Connection

```bash
# Via SSH su Raspberry Pi

# Verificare device riconosciuto
ls /dev/serial/by-id/

# Output atteso:
# usb-Klipper_stm32h723xx_XXXXXXXXXXXXXX

# Test comunicazione basso livello
cat /dev/serial/by-id/usb-Klipper_stm32h723xx_XXXXXXXXXXXXXX
# CTRL+C per uscire
# Dovrebbe mostrare caratteri casuali (comunicazione attiva)

# Log Klipper
cat ~/printer_data/logs/klippy.log | grep "mcu 'mcu'"

# Output atteso:
# mcu 'mcu': Starting serial connect
# mcu 'mcu': Serial connection established
# mcu 'mcu': Got status...
```

### 3. Verifica Versione Firmware

```yaml
Comando console:
  GET_FIRMWARE_VERSION

Output atteso:
  mcu: v0.12.0-XXX (Klipper version)
  host: v0.12.0-XXX
  config_file: /home/pi/printer_data/config/printer.cfg
```

## Test Hardware Components

### 4. Test Endstop

```yaml
Comando:
  QUERY_ENDSTOPS

Output (endstop NON premuti):
  x:open y:open z:open

Test:
  1. Premere endstop X manualmente
  2. QUERY_ENDSTOPS
  3. Output: x:TRIGGERED y:open z:open
  4. Rilasciare
  5. QUERY_ENDSTOPS
  6. Output: x:open y:open z:open

✓ Se risponde = OK
✗ Se sempre TRIGGERED = cablaggio invertito o endstop NC invece di NO
✗ Se sempre open = endstop non connesso o pin errato
```

### 5. Test BLTouch

```yaml
Comando:
  QUERY_PROBE

Output normale (probe ritratto):
  probe: open

Test deploy/stow:
  BLTOUCH_DEBUG COMMAND=pin_down    # Estende probe
  QUERY_PROBE                        # Dovrebbe essere: open

  # Toccare pin con dito
  QUERY_PROBE                        # Dovrebbe essere: TRIGGERED

  BLTOUCH_DEBUG COMMAND=pin_up       # Ritrae probe
  QUERY_PROBE                        # Torna: open

Self-test:
  BLTOUCH_DEBUG COMMAND=self_test
  # LED BLTouch lampeggia, pin fa 2-3 cicli
  # LED rimane acceso fisso = OK
  # LED lampeggia rosso = ERRORE
```

### 6. Test Temperature Sensors

```yaml
Comando:
  GET_TEMPERATURE

Output atteso (temperatura ambiente ~25°C):
  extruder: 23.5°C
  heater_bed: 24.1°C
  temperature_sensor raspberry_pi: 45.2°C
  temperature_sensor octopus_mcu: 38.7°C

✓ Temperature realistiche = OK
✗ -273°C = Termistor in cortocircuito
✗ 999°C = Termistor scollegato
✗ Valore fisso = ADC non funziona o pin errato
```

### 7. Test Riscaldamento Controllato

**⚠️ ATTENZIONE:** Eseguire con cautela, non lasciare incustodito!
##### _Ignorare test bed se si utilizza controller esterno per riscaldamento piatto_

```yaml
# Test hotend (temperatura bassa per sicurezza)
Comandi:
  M104 S50              # Imposta target 50°C
  TEMPERATURE_WAIT SENSOR=extruder MINIMUM=48
  # Attendere ~30-60 secondi

Verifiche:
  - Temperatura sale gradualmente
  - Raggiunge target e si stabilizza
  - Oscillazione ±2-3°C (prima del PID tuning)

Spegnimento:
  M104 S0               # Target 0°C

# Test bed (temperatura bassa)
Comandi:
  M140 S40              # Imposta target 40°C
  # Monitorare grafici temperatura
  # Bed riscalda più lentamente (massa termica)

Spegnimento:
  M140 S0
```

## Test Motori Stepper

### 8. Test Driver Stepper
##### _Da ignorare se gli stepper X e Estrusore sono collegati tramite STEP/DIR_

```yaml
# Verificare driver attivi e temperatura

Comando:
  M122                  # TMC debug info (se TMC2209)

Output (per ogni driver configurato):
  Driver: X
  State: Enabled
  Temperature: 35°C
  Current: 0.8A
  StealthChop: False
  ...

✓ Temperature < 60°C = OK
✗ Temperature > 80°C = Sovracorrente o dissipazione scarsa
✗ State: Error = Problema driver o config
```

### 9. Test Movimento Singoli Assi

**⚠️ IMPORTANTE:** Motori devono potersi muovere liberamente!

```yaml
# Preparazione
Comandi:
  M84                   # Disabilita motori
  # Muovere manualmente ogni asse al centro
  # Verificare nessun ostacolo

# Test Asse X
Comandi:
  G28 X                 # Home solo X
  # Dovrebbe muoversi verso endstop, trigger, retract

  G91                   # Modalità relativa
  G1 X10 F1000          # Muovi +10mm
  G1 X-10 F1000         # Muovi -10mm
  G90                   # Modalità assoluta

Verifiche:
  ✓ Movimento fluido senza scatti
  ✓ Direzione corretta (+X va verso destra)
  ✓ Nessun rumore anomalo driver
  ✓ Temperatura driver stabile

Se direzione invertita:
  # In printer.cfg, sezione [stepper_x]
  dir_pin: !PE3         # Aggiungere ! per invertire

# Ripetere per Y, Z, E
G28 Y
G91
G1 Y10 F1000
...
```

### 10. Test Estrusore

```yaml
# Riscaldare hotend prima di estrudere
Comandi:
  M104 S200             # Riscalda a 200°C
  TEMPERATURE_WAIT SENSOR=extruder MINIMUM=195

  G92 E0                # Reset posizione estrusore
  G1 E10 F300           # Estrudi 10mm a 5mm/s

Verifiche:
  ✓ Filamento estruso effettivamente
  ✓ Quantità corrisponde (10mm estrusore = ~10mm filamento)
  ✓ Nessun saltamento ingranaggi

  G92 E0
  G1 E-5 F1800          # Retract 5mm

Spegnimento:
  M104 S0
```

## Test Avanzati

### 11. Test Accuratezza Posizionamento

```yaml
# Verifica precisione movimento

Comandi:
  G28                   # Home all
  G90                   # Absolute mode
  G1 X100 Y100 F3000    # Vai a (100,100)
  GET_POSITION
  # Output: X:100.000 Y:100.000 (dovrebbe essere preciso)

  # Movimento ripetuto
  G1 X200 Y200
  G1 X100 Y100
  GET_POSITION
  # Verificare ritorna a posizione esatta

✓ Precision ±0.1mm = Ottimo
✗ Drift >0.5mm = Problema meccanico (cinghie, guide, step/mm)
```

### 12. Test Limiti Software

```yaml
# Verificare software endstop previene crash

Comandi:
  G28                   # Home all
  G90
  G1 X-10               # Tentativo movimento oltre limite

Output atteso:
  !! Move out of range: -10.0 0.0 ... [0.0, 900.0]

✓ Klipper blocca movimento = Sicurezza OK
✗ Movimento eseguito = Config position_min/max errata
```

### 13. Stress Test Comunicazione

```python
# Script Python per test ripetuto (da PC via Moonraker API)

import requests
import time

base_url = "http://mainsailos.local"

for i in range(100):
    # Richiesta status
    r = requests.get(f"{base_url}/printer/objects/query?toolhead")
    if r.status_code != 200:
        print(f"Errore iterazione {i}: {r.status_code}")
        break
    time.sleep(0.1)  # 100ms

print("Test completato: 100 richieste OK")
```

## Diagnosi Problemi Comuni

### MCU Offline

```yaml
Sintomo: "MCU protocol error" o "Unable to connect"

Soluzioni:
  1. Verificare USB collegato
     lsusb | grep Klipper

  2. Verificare serial ID in printer.cfg
     ls /dev/serial/by-id/

  3. Riflashare firmware Octopus

  4. Verificare alimentazione scheda (LED acceso)

  5. Test cavo USB diverso

  6. Log dettagliato:
     cat ~/printer_data/logs/klippy.log | tail -50
```

### Motore non risponde

```yaml
Sintomo: Comando movimento non muove motore

Debug:
  1. M84 → Motore libero? (Se bloccato: problema driver)

  2. Verificare LED driver (se presente)

  3. Test cablaggio bobine:
     Multimetro: resistenza ~2-4Ω tra coppie pin

  4. Verificare enable_pin in config
     enable_pin: !PD4  (! = inverted logic)

  5. Aumentare run_current (se troppo basso, no coppia)
```

### Temperature errate

```yaml
Sintomo: Lettura -273°C, 999°C, o fissa

Debug -273°C (cortocircuito):
  1. Scollegare termistor da scheda
  2. Misurare resistenza: dovrebbe essere ~100kΩ a 25°C
  3. Se 0Ω: cavo in corto, sostituire

Debug 999°C (disconnesso):
  1. Verificare connettore ben inserito
  2. Test continuità cavo
  3. Verificare pin in config (PF4 per TH0)

Debug valore fisso:
  1. Verificare pullup_resistor in config (default 4700)
  2. Test termistor con calore (dovrebbe variare)
```

## Log di Test Consigliato

```markdown
# Test Comunicazione MCU - Stampante 3D

## Connessione Base
- [ ] STATUS: ready
- [ ] Serial device riconosciuto
- [ ] Firmware version: v___________
- [ ] Config caricata senza errori

## Sensori
- [ ] Endstop X/Y/Z rispondono
- [ ] BLTouch self-test OK
- [ ] Temp extruder: ____°C (ambiente)
- [ ] Temp bed: ____°C (ambiente)

## Motori
- [ ] Driver temperature < 60°C
- [ ] Homing X/Y/Z OK
- [ ] Test movimento relativo X: OK
- [ ] Test movimento relativo Y: OK
- [ ] Test movimento relativo Z: OK
- [ ] Test estrusione a 200°C: OK

## Test Riscaldamento
- [ ] Hotend 50°C raggiunto e stabile
- [ ] Bed 40°C raggiunto e stabile

## Problemi Riscontrati
- Nessuno / [Descrizione]
```

## Checklist

- [ ] MCU connesso e status: ready
- [ ] Serial device corretto in config
- [ ] Endstop rispondono correttamente
- [ ] BLTouch self-test passed
- [ ] Temperature sensori realistiche (~25°C)
- [ ] Test riscaldamento hotend OK (50°C)
- [ ] Test riscaldamento bed OK (40°C)
- [ ] Driver stepper temperature normali (<60°C)
- [ ] Homing tutti gli assi funzionante
- [ ] Movimenti assi fluidi e direzioni corrette
- [ ] Test estrusione positivo
- [ ] Limiti software prevengono movimenti fuori range
- [ ] Nessun errore in klippy.log
- [ ] Log test compilato

---

|       |
|:-----:|
| [Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md) |
