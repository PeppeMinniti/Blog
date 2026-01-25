---
layout: default
title: "Installazione Scheda Madre"
---
# Installazione Scheda Madre

## Descrizione

Installazione e configurazione della scheda BIGTREETECH Octopus Pro V1.1 nel box elettronica. Questa scheda è il cervello della stampante e gestisce tutti i componenti.

Scheda: BIGTREETECH Octopus Pro V1.1
MCU: STM32H723XX (180MHz, 32-bit ARM)
Driver: 8× slot per driver stepper

## Immagini

![Pinout Octopus Pro](../../media/BIGTREETECH%20Octopus%20Pro%20V1.1-Pin.jpg)

<!-- Aggiungere foto installazione -->
<!-- ![Box elettronica](../../media/elettronica/box-elettronica.jpg) -->

## Specifiche Scheda

```yaml
MCU: STM32H723XX @ 180MHz
Flash: 512KB
RAM: 320KB
Driver slot: 8× (TMC/DRV8825/A4988 compatibili)
Alimentazione logica: 12-24V
Max corrente per driver: 5A peak
Connettori stepper: 8× (4-pin)
Heater output: 3× MOSFET (HE0, HE1, BED)
Fan output: 6× (4× PWM + 2× always-on)
Thermistor input: 6× ADC
Endstop input: 6×
USB: Type-C
Ethernet: Optional (con modulo aggiuntivo)
```

## Preparazione Box Elettronica

### Dimensionamento Box

```yaml
Dimensioni minime: 400×300×150mm
Materiale: Lamiera o plastica
Ventilazione: Obbligatoria (2× fan 120mm)
DIN rail: Per PSU e componenti accessori
Passacavi: Guarnizioni PG13.5
```

### Montaggio Scheda

```bash
# Posizionamento
- Distanza dal fondo: 50mm (clearance ventilazione)
- Fissaggio: 4× distanziatori M3 (10-15mm)
- Orientamento: USB verso basso (accessibilità)

# Ventilazione
- Fan intake: Lato componenti
- Fan exhaust: Lato opposto
- Temperatura max box: 45°C
```

## Installazione Driver Stepper

### Driver TMC2209 (Assi X ed Estrusore)

```yaml
Slot utilizzati: MOTOR_0 (X), MOTOR_7 (E)
Modalità: UART (step/dir + comunicazione seriale)
Jumpers richiesti:
  - Rimuovere tutti i jumper microstep
  - Installare jumper UART
Vref: Configurato via software (non tramite potenziometro)
```

### Configurazione Jumper TMC2209

```
Jumper MS0: RIMOSSO
Jumper MS1: RIMOSSO
Jumper MS2: RIMOSSO
Jumper UART: INSTALLATO (connette pin UART al MCU)
```

### Driver DM556 Esterni (Assi Y e Z)

```yaml
Connessione: Via interfaccia STEP/DIR
Slot: MOTOR_1 (Y), MOTOR_2 (Z)
Alimentazione driver: 36V separata (NON dalla scheda)
Microstep: Impostato su DIP switch driver (64 per Y, 32 per Z)
```

## Alimentazione Scheda

### Power Input

```yaml
Morsettiera principale:
  - V+ (24V): Da PSU 24V 10A
  - GND: Ground comune
  - Sezione cavi: 1.5mm² minimo

Protezione:
  - Fusibile: 10A fast-blow
  - Posizione: In linea su cavo +24V
```

### Schema Alimentazione

```
PSU 24V 10A ──[Fusibile 10A]──┬── Octopus Pro V+ (morsettiera)
                               └── GND (morsettiera)

ATTENZIONE: Driver DM556 hanno alimentazione separata (36V)
```

## Connessioni Principali

### Motori Stepper

```yaml
MOTOR_0 (X - TMC2209):
  - Cable: 4-pin JST-XH
  - Sequence: 2B 2A 1A 1B (verificare datasheet motore)

MOTOR_1 (Y - DM556 esterno):
  - Step+, Step-, Dir+, Dir-, Enable+, Enable-

MOTOR_2 (Z - DM556 esterno):
  - Step+, Step-, Dir+, Dir-, Enable+, Enable-

MOTOR_7 (Estrusore - TMC2209):
  - Cable: 4-pin JST-XH
```

### Heaters

```yaml
HE0 (Hotend):
  - Max: 5A
  - Connessione: Morsettiera 2-pin
  - Protezione: Thermal runaway via firmware

BED (Piatto):
  - Controllo: SSR esterno (corrente troppo alta)
  - Output: Segnale per SSR (12-24V)
  - Max corrente diretta: 10A (non sufficiente per piatto grande)
```

### Thermistors

```yaml
TH0 (Hotend):
  - Pin: PF4
  - Tipo: ATC Semitec 104GT-2
  - Connessione: 2-pin JST-XH
  - Pullup: 4.7kΩ (integrato)

TB (Bed):
  - Pin: PF3
  - Tipo: Generico NTC 100K
  - Connessione: 2-pin JST-XH
```

## Connessione Raspberry Pi

### UART/USB Connection

```yaml
Metodo preferito: USB Type-C
  - Cavo: USB-A (RPi) → USB-C (Octopus)
  - Lunghezza max: 1m
  - Baud rate: Automatico via Klipper

Power RPi dal Octopus: NON consigliato
  - Meglio: PSU separato 5V 3A per RPi
```

## Test Post-Installazione

### Verifica Alimentazione

```bash
# Controllo tensioni (multimetro)
V+ morsettiera: 24V ±1V
Uscita 5V logica: 5V ±0.25V
Uscita 3.3V MCU: 3.3V ±0.1V

# LED scheda
- Power LED: Acceso (rosso)
- MCU LED: Lampeggiante (verde/blu)
```

### Test Continuità

```bash
# PRIMA di alimentare verificare:
1. Nessun corto tra V+ e GND
2. Resistenza >1MΩ tra alimentazione
3. Connessioni motori corrette (no inversione)
4. Termistors connessi (valore ~100kΩ a 25°C)
```

## Sicurezza e Protezioni

```yaml
Protezioni implementate:
  - Fusibile alimentazione principale
  - Thermal runaway firmware (hotend + bed)
  - Overcurrent protection driver TMC
  - Watchdog MCU
  - Emergency stop (opzionale): NC switch
```

## Configurazione Klipper Iniziale

```ini
[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32h723xx_XXXXXX
baud: 250000

[printer]
kinematics: cartesian
max_velocity: 500
max_accel: 1000
max_z_velocity: 15
max_z_accel: 100

[board_pins]
aliases:
    # Driver TMC2209
    X_STEP=PE2, X_DIR=PE3, X_EN=PD4, X_UART=PE1,
    E_STEP=PD15, E_DIR=PD14, E_EN=PC7, E_UART=PC6,
    # Heaters
    HE0=PA2,
    # Thermistors
    TH0=PF4, TB=PF3
```

## Checklist

- [ ] Box elettronica assemblato con ventilazione
- [ ] Scheda fissata con distanziatori
- [ ] Driver TMC2209 installati con jumper corretti
- [ ] Alimentazione 24V connessa con fusibile
- [ ] Raspberry Pi connesso via USB
- [ ] Test continuità passato
- [ ] LED scheda accesi correttamente
- [ ] Nessun surriscaldamento componenti

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
