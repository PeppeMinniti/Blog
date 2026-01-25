---
layout: default
title: "Input Shaper e Compensazione Risonanze"
---
# Input Shaper e Compensazione Risonanze

## Descrizione

Calibrazione dell'Input Shaper per eliminare ringing/ghosting e permettere velocità/accelerazioni elevate mantenendo qualità. Sistema avanzato di Klipper che analizza risonanze meccaniche e le compensa via software.

**Cosa risolve:**
- Ringing (echo pattern su superfici)
- Ghosting (ombre dopo angoli)
- Permette accelerazioni >5000mm/s² senza difetti

**Requisito:** Accelerometro ADXL345 o MPU6050/9250

## Immagini

![Accelerometro](../../media/stampante%20giroscopio-accelerometro.jpg)

<!-- Aggiungere grafici risonanze -->
<!-- ![Grafico risonanze X](../../media/calibrazione/resonance-x.jpg) -->
<!-- ![Confronto stampa con/senza IS](../../media/calibrazione/ringing-comparison.jpg) -->

## Teoria Risonanze Meccaniche

### Cos'è il Ringing

```yaml
Definizione:
  - Oscillazioni meccaniche dopo cambio direzione
  - Visibili come "onde" su superfici verticali
  - Frequenza tipica: 20-80 Hz

Cause:
  - Massa in movimento (toolhead, gantry)
  - Elasticità struttura (flessione telaio, cinghie)
  - Coupling tra assi

Effetto:
  - Pattern ripetitivo dopo angoli
  - Peggiora con velocità/accel alte
  - Riduce qualità superfici
```

### Input Shaper - Principio

```python
# Input shaper modifica profilo accelerazione
# Per cancellare risonanze meccaniche

import numpy as np
import matplotlib.pyplot as plt

# Movimento normale (square wave acceleration)
t = np.linspace(0, 0.1, 1000)
accel_normal = np.where(t < 0.05, 1, -1)  # Step acceleration

# Input shaper: modifica profilo per cancellare risonanze
freq = 50  # Hz (frequenza risonanza rilevata)
damping = 0.05
shaper_filter = np.exp(-damping * freq * 2 * np.pi * t) * np.sin(freq * 2 * np.pi * t)
accel_shaped = np.convolve(accel_normal, shaper_filter, mode='same')

plt.figure(figsize=(10,4))
plt.plot(t, accel_normal, label="Normale", alpha=0.7)
plt.plot(t, accel_shaped, label="Con Input Shaper", linewidth=2)
plt.xlabel("Tempo [s]")
plt.ylabel("Accelerazione")
plt.legend()
plt.title("Input Shaper - Modifica Profilo Accelerazione")
plt.grid()
# plt.savefig("input_shaper_profile.png")
```

## Hardware Necessario

### Accelerometro ADXL345

```yaml
Specifiche:
  - Range: ±16g
  - Interfaccia: SPI o I²C
  - Alimentazione: 3.3V
  - Sensibilità: Alta (ottimo per IS)

Connessione a Raspberry Pi:
  VCC  → 3.3V
  GND  → GND
  SCL  → GPIO 11 (SCLK)
  SDA  → GPIO 10 (MOSI)
  SDO  → GPIO 9 (MISO)
  CS   → GPIO 8 (CE0)

Montaggio:
  - Fissare su toolhead (vicino nozzle)
  - Orientamento: assi allineati a X/Y stampante
  - Cavi corti (<30cm)
  - Fissaggio rigido (no vibrazioni isolate)
```

## Configurazione Klipper

### 1. Abilitare SPI su Raspberry Pi

```bash
# Via SSH

# Abilitare SPI
sudo raspi-config
# Interfacing Options → SPI → Enable

# Riavvio
sudo reboot

# Verificare SPI attivo
ls /dev/spidev*
# Output: /dev/spidev0.0  /dev/spidev0.1
```

### 2. Configurazione printer.cfg

```ini
# Aggiungere sezione accelerometro

[mcu rpi]
serial: /tmp/klipper_host_mcu
# MCU virtuale Raspberry Pi

[adxl345]
cs_pin: rpi:None
# SPI usa CS hardware (GPIO 8)

spi_bus: spidev0.0
# Bus SPI Raspberry Pi

axes_map: x, y, z
# Mappatura assi (verificare orientamento)

[resonance_tester]
accel_chip: adxl345
probe_points:
    450, 370, 100
    # Centro bed (X/2, Y/2, Z safe)
    # Adattare alle proprie dimensioni
```

### 3. Test Connessione

```yaml
# Via console Klipper

Comando:
  ACCELEROMETER_QUERY

Output atteso:
  adxl345 values (x, y, z): 123.4, -987.6, 9876.5

Se errore:
  - Verificare cablaggio SPI
  - Check SPI abilitato (lsmod | grep spi)
  - Verificare orientamento accelerometro
```

## Calibrazione Input Shaper

### 1. Misurazione Risonanze Asse X

```yaml
# Procedura automatica

Comando:
  SHAPER_CALIBRATE AXIS=X

Processo:
  1. Klipper muove asse X avanti/indietro
  2. Aumenta gradualmente frequenza (1-130 Hz)
  3. Accelerometro registra vibrazioni
  4. Analisi FFT trova frequenze risonanti
  5. Calcola shaper ottimale

Durata: ~2 minuti

Output:
  Fitted shaper 'mzv' frequency = 48.2 Hz (vibr = 3.2%, sm ~= 0.081)
  Fitted shaper 'ei' frequency = 57.8 Hz (vibr = 4.5%, sm ~= 0.105)
  Recommended shaper is mzv @ 48.2 Hz
```

### 2. Misurazione Risonanze Asse Y

```yaml
Comando:
  SHAPER_CALIBRATE AXIS=Y

Output esempio:
  Fitted shaper 'mzv' frequency = 34.6 Hz (vibr = 2.8%, sm ~= 0.095)
  Fitted shaper '2hump_ei' frequency = 45.2 Hz (vibr = 1.2%, sm ~= 0.123)
  Recommended shaper is 2hump_ei @ 45.2 Hz

# Y spesso ha frequenza più bassa (massa maggiore)
```

### 3. Calibrazione Automatica Entrambi Assi

```yaml
# Calibrazione completa X + Y

Comando:
  SHAPER_CALIBRATE

Output:
  - Analizza X
  - Analizza Y
  - Suggerisce shaper per ogni asse
  - Salva grafici risonanze in /tmp/

File generati:
  - /tmp/resonances_x_*.png
  - /tmp/resonances_y_*.png
  - /tmp/calibration_data_x_*.csv
  - /tmp/calibration_data_y_*.csv
```

## Tipi di Input Shaper

### Algoritmi Disponibili

```yaml
Shaper disponibili (dal più semplice al più complesso):

1. ZV (Zero Vibration):
   - Più semplice
   - Smoothing minimo
   - Vibrazioni residue ~5-10%

2. MZV (Modified Zero Vibration):
   - Compromesso buono
   - Smoothing moderato
   - Vibrazioni residue ~3-5%
   - ✓ Consigliato per maggior parte stampanti

3. EI (Extra Insensitive):
   - Tollerante a variazioni frequenza
   - Smoothing maggiore
   - Vibrazioni residue ~2-4%

4. 2HUMP_EI:
   - Per risonanze multiple
   - Smoothing alto
   - Vibrazioni residue ~1-2%
   - Stampante pesanti/grandi

5. 3HUMP_EI:
   - Casi estremi (multipli picchi risonanza)
   - Smoothing molto alto
   - Raramente necessario

Scelta:
  - MZV: Default, buono per 80% casi
  - 2HUMP_EI: Stampanti grandi (come questa)
  - EI: Frequenze variabili (temperatura, usura)
```

### Applicare Risultati Calibrazione

```ini
# Aggiungere/aggiornare in printer.cfg

[input_shaper]
shaper_freq_x: 48.2
# Frequenza risonanza asse X [Hz]

shaper_type_x: mzv
# Tipo shaper X

shaper_freq_y: 34.6
# Frequenza risonanza asse Y [Hz]

shaper_type_y: 2hump_ei
# Tipo shaper Y (può essere diverso da X)

# FIRMWARE_RESTART per applicare

# Oppure salvare automaticamente:
SAVE_CONFIG
```

## Ottimizzazione Accelerazione

### Test Max Acceleration Safe

```yaml
# Dopo Input Shaper, testare accelerazioni alte

Procedura:
  1. Stampare test cube con accel crescenti
  2. Esaminare superfici per ringing

Test accelerazioni:
  # Modificare max_accel in printer.cfg
  [printer]
  max_accel: 1000  # Baseline

  # Stampare test
  # Aumentare gradualmente
  max_accel: 2000
  max_accel: 3000
  max_accel: 5000
  max_accel: 7000

Limite pratico:
  - Con Input Shaper: 3000-7000 mm/s² (stampanti grandi)
  - Senza Input Shaper: 500-1500 mm/s²
```

### Macro Test Ringing

```gcode
# Test ringing tower automatico

[gcode_macro RINGING_TOWER]
description: Stampa test tower per ringing
gcode:
    # File STL: ringing_tower.stl
    # Ogni sezione = diversa accelerazione
    # Valutare visivamente quale sezione migliore

    SET_VELOCITY_LIMIT ACCEL=1000 ACCEL_TO_DECEL=500
    # Printare tower con accel crescenti
    # Sezione 1: 1000
    # Sezione 2: 2000
    # Sezione 3: 3000
    # ecc.
```

## Analisi Grafici Risonanze

### Interpretazione Grafici

```yaml
Grafici generati (/tmp/resonances_*.png):

Grafico 1 - Spettro Potenza:
  - Asse X: Frequenza [Hz]
  - Asse Y: Ampiezza vibrazioni
  - Picchi = frequenze risonanti
  - Picco principale: frequenza da compensare

Grafico 2 - Vibrazioni Residue:
  - Confronto shaper diversi
  - Curva più bassa = migliore
  - Trade-off: vibr basse vs smoothing

Grafico 3 - Smoothing:
  - Effetto shaper su dettagli
  - Smoothing alto = angoli meno netti
  - <0.15 = accettabile
```

### Esempio Interpretazione

```yaml
Picco risonanza X: 48 Hz, ampiezza alta

Shaper possibili:
  - MZV @ 48Hz: vibr 3.2%, smooth 0.081
  - EI @ 58Hz: vibr 4.5%, smooth 0.105
  - 2HUMP_EI @ 62Hz: vibr 1.8%, smooth 0.145

Scelta:
  - Se priorità velocità: MZV (smooth basso)
  - Se priorità qualità: 2HUMP_EI (vibr basse)

✓ Consiglio: MZV (compromesso ottimo)
```

## Troubleshooting

### Accelerometro Non Rilevato

```yaml
Errore: "Failed to connect to adxl345"

Debug:
  1. Test SPI attivo:
     ls /dev/spidev*

  2. Verificare cablaggio:
     - VCC 3.3V (NON 5V!)
     - GND comune
     - CS, SCLK, MOSI, MISO corretti

  3. Test comunicazione SPI:
     sudo apt install python3-spidev
     # Script test Python per verificare lettura

  4. Verificare cs_pin in config:
     cs_pin: rpi:None  (usa CE0 hardware)
```

### Risonanze Non Migliorate

```yaml
Sintomo: Ringing persiste dopo IS

Cause:
  1. Problema meccanico dominante:
     - Cinghie allentate
     - Bulloneria lenta
     - Telaio flessibile

  2. Accelerometro montaggio errato:
     - Non solidale con toolhead
     - Orientamento assi sbagliato

  3. Frequenza risonanza variabile:
     - Usare shaper EI (più tollerante)

Soluzioni:
  - Verificare meccanica (cinghie tese)
  - Ri-calibrare IS dopo fix meccanici
  - Abbassare max_accel se persistente
```

## Advanced: Input Shaper Dinamico

```ini
{% raw %}
# Input Shaper che varia con velocità (avanzato)

[gcode_macro SET_ACTIVE_SHAPER]
gcode:
    {% set speed = params.SPEED|default(100)|int %}
    {% if speed < 100 %}
        SET_INPUT_SHAPER SHAPER_TYPE_X=mzv SHAPER_FREQ_X=48.2
    {% else %}
        SET_INPUT_SHAPER SHAPER_TYPE_X=ei SHAPER_FREQ_X=58.0
    {% endif %}

# Utilizzo in slicer (start gcode):
# SET_ACTIVE_SHAPER SPEED={print_speed}
{% endraw %}
```

## Checklist

- [ ] Accelerometro ADXL345 installato e cablato
- [ ] SPI abilitato su Raspberry Pi
- [ ] Config [adxl345] e [resonance_tester] in printer.cfg
- [ ] Test ACCELEROMETER_QUERY positivo
- [ ] Calibrazione asse X completata
- [ ] Calibrazione asse Y completata
- [ ] Grafici risonanze analizzati
- [ ] Shaper type e freq configurati
- [ ] FIRMWARE_RESTART eseguito
- [ ] Test stampa con accel alta (3000+mm/s²)
- [ ] Ringing eliminato o ridotto drasticamente
- [ ] Max acceleration ottimizzata
- [ ] Backup configurazione

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)