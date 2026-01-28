---
layout: default
title: "PID Tuning Hotend e Piatto"
---
# PID Tuning Hotend e Piatto

## Descrizione

#### Cosa è il P.I.D. ? - Di seguito il modo più semplice che ho trovato per capirlo e poterlo utilizzare con consapevolezza
Il PID (Proportional-Integral-Derivative) è un tipo di controllo utilizzato in svariate applicazioni per mantenere un valore desiderato, ad esempio: la temperatura di un sistema di riscaldamento, la tensione di un sistema di alimentazione, la velocità di un motore.

<div class="thumbnail-gallery">
  <img src="../media/calibrazione/pid.jpg" class="project-thumbnail">
</div>

Il PID utilizza tre componenti per calcolare l’errore che si viene a creare tra il valore desiderato (valore nominale) e il valore attuale (valore misurato) e regolare di conseguenza l’output per minimizzare tale errore. Questi componenti sono:

1. **Proporzionale (P)**: come suggerisce il nome, questa componente produce un output proporzionale all’errore presente. Più grande è l’errore, più grande sarà l’output.

2. **Integrale (I)**: questa componente tiene conto dell’errore accumulato nel tempo, producendo un output più grande se l’errore persiste a lungo. Questo componente aiuta a compensare gli errori a lungo termine.

3. **Derivativo (D)**: questa componente tiene conto della velocità di variazione dell’errore, producendo un output più grande se l’errore cambia rapidamente. In pratica si reagirà più velocemente ad una variazione più repentina e viceversa.

_L’utilizzo corretto dei tre componenti di controllo (P, I o D) può consentire di raggiungere molto prima il valore desiderato della variabile (set point) soprattutto in caso di forti variazioni nel tempo e nel valore assoluto del parametro._
_Utilizzando l’analogia dell’automobile che deve percorrere una strada in salita, possiamo immaginare come il guidatore si comporterà a seconda che si tratti di una semplice collina, di un altipiano in ascesa continua o di un improvviso cavalcavia._

_(P) Quando guidiamo un’auto ed arriviamo a percorrere una collina improvvisa, infatti, dovremo premere l’acceleratore tanto quanto basta per contrastare la decelerazione che la pendenza causa all’automobile. Maggiore sarà la pendenza, maggiore sarà la nostra pressione sul pedale dell’acceleratore; minore la pendenza, minore sarà il bisogno di imprimere tale forza sul pedale, fino alla situazione di pianura e poi discesa in cui potremo alzare il piede dall’acceleratore: questa è la componente Proporzionale._

_(I) La componente Integrale invece si spiega facilmente pensando alla continua pressione che imprimiamo all’acceleratore in modo tale da mantenere una velocità costante: se ci troviamo a salire un altipiano in ascesa continua, dovremo mantenere per tutto il viaggio una pressione maggiore rispetto a quella minima, ma pur sempre presente, impressa al pedale dell’acceleratore se percorriamo una strada in pianura. L’auto, si sa, tende a rallentare se non le si dà un minimo di gas; dunque, la componente Integrale è la nostra continua e costante pressione dell’acceleratore._

_(D) Se però nel nostro viaggio ci imbattiamo improvvisamente in un cavalcavia, ecco che la nostra automobile tenderà a rallentare in pochi istanti e ci troveremo d’istinto a premere velocemente e a fondo l’acceleratore nel momento stesso in cui imbocchiamo la salita per tentare di contrastare la diminuzione di velocità. La componente Derivativa, quindi, rispecchia la velocità di variazione dell’errore, che nel nostro caso è piuttosto improvvisa dunque elevata, e reagisce con un output altrettanto grande (la pressione a fondo del pedale)._


## Applicazione nel nostro caso...

Calibrazione del controllo PID (Proportional-Integral-Derivative) per hotend e piatto riscaldato. Il PID ottimizza il controllo temperatura eliminando oscillazioni e riducendo overshoot.

**Perché è importante:**
- Temperature stabili = qualità stampa consistente
- Riduce overshoot (pericoloso per hotend)
- Minimizza undershoot (attese più lunghe)
- Ottimizza consumo energetico

### Componenti PID

```yaml
P (Proportional):
  - Reazione proporzionale all'errore
  - Kp alto: risposta rapida, possibile overshoot
  - Kp basso: risposta lenta, no overshoot

I (Integral):
  - Corregge errore accumulato nel tempo
  - Ki alto: elimina offset, possibile oscillazione
  - Ki basso: lento raggiungimento target

D (Derivative):
  - Anticipa variazioni future
  - Kd alto: smorzamento oscillazioni, sistema più stabile
  - Kd basso: possibili oscillazioni

Formula:
  Output = Kp × e(t) + Ki × ∫e(t)dt + Kd × de(t)/dt
  dove e(t) = target - actual_temp
```

### Comportamento Temperatura

```python
# Curva temperatura ideale dopo PID tuning

import matplotlib.pyplot as plt
import numpy as np

# Senza PID (ON/OFF control)
time_no_pid = np.linspace(0, 300, 300)
temp_no_pid = 200 + 10 * np.sin(time_no_pid / 10)  # Oscillazione ±10°C

# Con PID ottimizzato
temp_with_pid = np.ones(300) * 200  # Stabile ±1°C
temp_with_pid[:50] = 20 + (200-20) * (time_no_pid[:50] / 50)  # Rampa iniziale

# Target
target = np.ones(300) * 200

plt.figure(figsize=(10,5))
plt.plot(time_no_pid, temp_no_pid, label="Senza PID", linestyle='--')
plt.plot(time_no_pid, temp_with_pid, label="Con PID", linewidth=2)
plt.plot(time_no_pid, target, label="Target", linestyle=':')
plt.xlabel("Tempo [s]")
plt.ylabel("Temperatura [°C]")
plt.legend()
plt.grid()
plt.title("Confronto Controllo Temperatura")
# plt.savefig("pid_comparison.png")
```

## PID Tuning Hotend

### Procedura Calibrazione

```yaml
# ⚠️ IMPORTANTE: Eseguire con ventola part cooling OFF

Preparazione:
  - Rimuovere filamento da hotend
  - Ambiente stabile (no correnti aria)
  - Attendere hotend freddo (<30°C)

Comando Klipper:
  PID_CALIBRATE HEATER=extruder TARGET=200

Parametri:
  - HEATER: extruder (nome sezione in config)
  - TARGET: Temperatura di stampa tipica
    - PLA: 200°C
    - PETG: 230°C
    - ABS: 240°C

Processo automatico:
  1. Klipper riscalda fino a target
  2. Esegue cicli riscaldo/raffreddamento (8-10 cicli)
  3. Analizza risposta termica
  4. Calcola Kp, Ki, Kd ottimali
  5. Durata: ~5-10 minuti

Output finale:
  PID parameters: pid_Kp=22.200 pid_Ki=1.080 pid_Kd=114.000
```

### Salvare Risultati

```yaml
# Klipper mostra valori calcolati

Opzione 1: Salvataggio automatico
  Comando:
    SAVE_CONFIG

  Effetto:
    - Aggiunge valori a fine printer.cfg
    - Restart firmware automatico

Opzione 2: Manuale (consigliato)
  1. Copiare valori PID da output
  2. Editare printer.cfg
  3. Sezione [extruder]:
     control: pid
     pid_Kp: 22.200
     pid_Ki: 1.080
     pid_Kd: 114.000
  4. FIRMWARE_RESTART
```

### Verifica Hotend

```yaml
Test stabilità:

  M104 S200               # Imposta target 200°C
  # Monitorare grafici temperatura Mainsail

Valutazione:
  ✓ Raggiunge target in 2-3 minuti
  ✓ Overshoot < 5°C
  ✓ Oscillazione ± 1-2°C max
  ✓ Temperatura stabile dopo raggiungimento

  M104 S0                 # Spegni
```

## PID Tuning Piatto

### Procedura Calibrazione Bed

```yaml
Preparazione:
  - Attendere piatto freddo (<30°C)
  - Ambiente stabile

Comando:
  PID_CALIBRATE HEATER=heater_bed TARGET=60

Target consigliati:
  - PLA: 60°C
  - PETG: 75°C
  - ABS: 90°C

Nota: Piatto ha massa termica maggiore
  - Calibrazione più lenta (~15-20 minuti)
  - Cicli riscaldo/raffreddamento più lunghi

Output:
  PID parameters: pid_Kp=54.027 pid_Ki=0.770 pid_Kd=948.182

# Notare: Ki molto basso (massa termica alta)
#         Kd molto alto (compensazione inerzia)
```

### Salvare e Verificare

```yaml
# In printer.cfg, sezione [heater_bed]:

[heater_bed]
heater_pin: PA1
sensor_type: Generic 3950
sensor_pin: PF3
control: pid
pid_Kp: 54.027
pid_Ki: 0.770
pid_Kd: 948.182
min_temp: 0
max_temp: 130

# FIRMWARE_RESTART

Test:
  M140 S60                # Target 60°C
  # Monitorare: riscaldo graduale, stabile dopo 5-10 min
  M140 S0
```

## Ottimizzazione Avanzata

### Tuning per Materiali Diversi

```yaml
{% raw %}
# PID varia leggermente con temperatura

Best practice:
  - PLA (190-210°C): Calibrare a 200°C
  - PETG (230-250°C): Calibrare a 240°C
  - ABS (240-260°C): Calibrare a 250°C

# Salvare profili multipli (via macro)

[gcode_macro PID_PROFILE_PLA]
gcode:
    {% set extruder = printer.configfile.settings.extruder %}
    SET_HEATER_PID HEATER=extruder KP=22.2 KI=1.08 KD=114

[gcode_macro PID_PROFILE_PETG]
gcode:
    SET_HEATER_PID HEATER=extruder KP=24.5 KI=1.15 KD=125
{% endraw %}
```

### Influenza Ventola Part Cooling

```yaml
# Ventola part cooling influenza PID hotend

Problema:
  - Flusso aria raffredda hotend
  - PID calibrato senza ventola → oscillazioni con ventola ON

Soluzione: Calibrare con ventola al 50%

  1. M106 S127            # Ventola al 50%
  2. PID_CALIBRATE HEATER=extruder TARGET=200
  3. SAVE_CONFIG
  4. M106 S0              # Spegni ventola

# PID risultante sarà compromesso ma più stabile
```

## Analisi Grafici Temperatura

### Interpretazione Curve

```yaml
Grafici Mainsail durante PID tuning:

Fase 1 - Rampa iniziale:
  - Salita rapida fino a ~90% target
  - Rallentamento vicino target (controllo D)

Fase 2 - Oscillazioni controllate:
  - 8-10 cicli sopra/sotto target
  - Ampiezza diminuisce progressivamente

Fase 3 - Stabilizzazione:
  - Temperatura converge a target
  - Oscillazione finale < ±2°C

Problemi visibili:
  ✗ Oscillazioni crescenti: Ki troppo alto
  ✗ Raggiungimento lento: Kp troppo basso
  ✗ Overshoot >10°C: Kp troppo alto, Kd basso
  ✗ Offset persistente: Ki troppo basso
```

## Troubleshooting PID

### Calibrazione Fallisce

```yaml
Errore: "PID calibration failed"

Cause comuni:
  1. Correnti aria:
     - Chiudere porte/finestre
     - Spegnere ventole ambiente

  2. Thermal runaway trigger:
     - Aumentare check_gain_time in [verify_heater]
     - Durante calibrazione temporaneamente:
       [verify_heater extruder]
       check_gain_time: 60  # Più permissivo

  3. Temperatura ambiente bassa (<15°C):
     - Calibrare in ambiente >20°C

  4. Potenza heater insufficiente:
     - Verificare heater funzionante
     - Check alimentazione 24V stabile
```

### Oscillazioni Persistenti

```yaml
Sintomo: Dopo PID tuning, temp oscilla ±5-10°C

Debug:
  1. Verificare ventola hotend sempre ON
     - Se intermittente: influenza PID

  2. Massa termica hotend bassa:
     - Heater block piccolo → oscillazioni naturali
     - Aumentare Kd:
       pid_Kd: 150 (provare +20% rispetto calcolato)

  3. Thermistor lento:
     - Alcuni thermistor hanno risposta lenta
     - Verificare connessione termica buona

  4. Rumore elettrico:
     - Cavi thermistor lontani da cavi potenza
     - Aggiungere filtering in config:
       [extruder]
       smooth_time: 2.0  # Filtro 2 secondi
```

## Valori PID Tipici di Riferimento

```yaml
# Valori indicativi (variano con hardware)

Hotend E3D V6 style:
  Kp: 20-25
  Ki: 1.0-1.5
  Kd: 100-150

Hotend all-metal high-flow:
  Kp: 18-22
  Ki: 0.8-1.2
  Kd: 120-180

Bed piccolo (<300mm):
  Kp: 40-60
  Ki: 0.5-1.0
  Kd: 500-1000

Bed grande (>600mm):
  Kp: 50-70
  Ki: 0.3-0.7
  Kd: 800-1200
  # Massa alta → Ki basso, Kd alto
```

## Macro Utility PID

```ini
{% raw %}
# Aggiungere a printer.cfg

[gcode_macro PID_HOTEND]
description: PID calibration hotend
gcode:
    {% set TARGET = params.TARGET|default(200)|float %}
    M106 S64                # Ventola al 25% (opzionale)
    PID_CALIBRATE HEATER=extruder TARGET={TARGET}
    M106 S0
    SAVE_CONFIG

[gcode_macro PID_BED]
description: PID calibration bed
gcode:
    {% set TARGET = params.TARGET|default(60)|float %}
    PID_CALIBRATE HEATER=heater_bed TARGET={TARGET}
    SAVE_CONFIG

# Utilizzo:
# PID_HOTEND TARGET=240   (per PETG)
# PID_BED TARGET=75       (per PETG)
{% endraw %}
```

## Checklist

- [ ] Hotend PID calibrato a temperatura stampa tipica
- [ ] Valori Kp, Ki, Kd salvati in printer.cfg
- [ ] Test stabilità hotend: oscillazione <±2°C
- [ ] Bed PID calibrato
- [ ] Test stabilità bed: oscillazione <±3°C
- [ ] Grafici temperatura controllati (no overshoot eccessivo)
- [ ] PID verificato con ventola part cooling
- [ ] Thermal runaway protection funzionante
- [ ] Macro PID create (opzionale)
- [ ] Backup configurazione

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)