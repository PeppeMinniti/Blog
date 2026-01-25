---
layout: default
title: "Schema Elettrico e Pinout"
---
# Schema Elettrico e Pinout

## Descrizione

Definizione dello schema elettrico completo e del pinout della scheda BIGTREETECH Octopus Pro V1.1. Questa fase è fondamentale per evitare errori di cablaggio e danni ai componenti.

Documentazione di riferimento:
- [Pinout Octopus Pro](../../media/BIGTREETECH%20Octopus%20Pro%20V1.1-Pin.jpg)
- Datasheet TMC2209
- Datasheet DM556

## Immagini

![Pinout Octopus Pro V1.1](../../media/BIGTREETECH%20Octopus%20Pro%20V1.1-Pin.jpg)

<!-- Aggiungere schema elettrico custom -->
<!-- ![Schema elettrico](../../media/schema-elettrico.jpg) -->

## Pinout Motori Stepper

### Octopus Pro - Driver Interni (TMC2209)

```yaml
MOTOR_0 (X):
  - Step: PE2
  - Dir: PE3
  - Enable: PD4
  - UART: PE1
  - Microstep: 1/16

MOTOR_7 (Estrusore):
  - Step: PD15
  - Dir: PD14
  - Enable: PC7
  - UART: PC6
  - Microstep: 1/8
```

### Driver Esterni (DM556) - Assi Y e Z

```yaml
Asse Y (4× motori NEMA23):
  - Step: Connettore MOTOR_1
  - Dir: Connettore MOTOR_1
  - Enable: Connettore MOTOR_1
  - Alimentazione: 36V separata

Asse Z (2× motori NEMA23):
  - Step: Connettore MOTOR_2
  - Dir: Connettore MOTOR_2
  - Enable: Connettore MOTOR_2
  - Alimentazione: 36V separata
```

## Pinout Sensori

```yaml
BLTouch (Z-probe):
  - Servo: PE5 (SERVO pin)
  - Sensor: PG15 (Z-STOP)
  - GND: GND
  - VCC: 5V

Thermistors:
  - Hotend: PF4 (TH0 - ADC)
  - Bed: PF3 (TB - ADC)
  - Tipo: ATC Semitec 104GT-2

Endstops:
  - X-min: PG6
  - Y-min: PG9
  - Z-min: Virtuale (BLTouch)
```

## Schema Alimentazione

```
Alimentatore 24V 10A:
  → Octopus Pro (elettronica + hotend)
  → NEMA 17 (X + estrusore)

Alimentatore 36V 30A:
  → Driver DM556 (NEMA 23 Y/Z)

Alimentatore 24V 62.5A:
  → Piatto riscaldato (9× 200W)
  → SSR (Solid State Relay)
```

## Cablaggio Critico

### Hotend
```yaml
Heater Cartridge: HE0 (Max 5A)
Fan Hotend: FAN0 (sempre ON)
Part Cooling: FAN1 (PWM controllato)
```

### Piatto Riscaldato
```yaml
Controllo: SSR via MOSFET BED-OUT
Sensore: Termistor TB
Potenza: 9× 200W = 1800W max
Corrente: 75A @ 24V
```

## Sicurezze Implementate

```python
# Configurazione Klipper - Thermal Runaway
[verify_heater hotend]
max_error: 120
check_gain_time: 20
hysteresis: 5
heating_gain: 2

[verify_heater heater_bed]
max_error: 120
check_gain_time: 90
hysteresis: 5
heating_gain: 1
```

## Codice Colori Cavi (Convenzione)

```
Rosso:    +24V / +36V
Nero:     GND
Giallo:   Segnali step
Verde:    Segnali dir
Blu:      Segnali enable
Bianco:   Sensori analogici
```

## Note Importanti

⚠️ **ATTENZIONE:**
- NON invertire polarità alimentazione
- Driver DM556 richiedono 36V (NON 24V)
- Piatto riscaldato usa alimentazione dedicata
- Usare cavi sezione adeguata (4mm² per piatto)
- Terminali con capicorda per connessioni potenza

## Checklist Pinout

- [ ] Schema elettrico disegnato
- [ ] Pinout motori verificato
- [ ] Pinout sensori verificato
- [ ] Alimentazioni calcolate
- [ ] Sezioni cavi dimensionate
- [ ] Protezioni termiche configurate

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
