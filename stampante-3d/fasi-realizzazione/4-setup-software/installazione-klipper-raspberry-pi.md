---
layout: default
title: "Installazione Klipper su Raspberry Pi"
---
# Installazione Klipper su Raspberry Pi

## Descrizione

Installazione del firmware Klipper sul Raspberry Pi che fungerà da host per la stampante. Klipper separa il controllo in due parti: host (Raspberry Pi) e MCU (Octopus Pro).

Vantaggi Klipper:
- Calcolo cinematica su CPU potente (RPi)
- Configurazione via file di testo
- Input Shaper per velocità elevate
- Pressure advance avanzato
- Interfaccia web moderna (Mainsail)

## Immagini

<!-- Inserire screenshot interfaccia -->
<!-- ![Mainsail dashboard](../../media/software/mainsail-dashboard.jpg) -->

## Prerequisiti

```yaml
Hardware:
  - Raspberry Pi 3B+ o 4 (min 2GB RAM)
  - MicroSD card: 16GB+ (Class 10)
  - Alimentatore: 5V 3A ufficiale
  - Cavo USB Type-A → USB-C (per Octopus Pro)

Rete:
  - Connessione Ethernet (consigliata)
  - o WiFi configurato
```

## Installazione Sistema Base

### 1. Download Immagine MainsailOS

```bash
# MainsailOS = Raspberry Pi OS + Klipper + Mainsail preinstallati
URL: https://github.com/mainsail-crew/MainsailOS/releases

# Ultima versione stabile (verificare data release)
File: mainsailos-VERSION.img.xz
```

### 2. Flash MicroSD con Raspberry Pi Imager

```yaml
Strumento: Raspberry Pi Imager (ufficiale)
Download: https://www.raspberrypi.com/software/

Procedura:
  1. Inserire MicroSD nel PC
  2. Aprire Raspberry Pi Imager
  3. Choose OS → Use custom → Selezionare mainsailos.img.xz
  4. Choose Storage → MicroSD card
  5. Settings (icona ingranaggio):
     - Hostname: mainsailOS
     - Enable SSH: ✓
     - Username: pi
     - Password: [tua password sicura]
     - WiFi (opzionale): SSID e password
  6. Write → Attendere completamento
```

### 3. Primo Boot

```bash
# Inserire MicroSD nel Raspberry Pi
# Collegare Ethernet (o usare WiFi configurato)
# Alimentare RPi

# Attendere 2-3 minuti per boot iniziale

# Trovare IP Raspberry Pi
# Metodo 1: Router (DHCP leases)
# Metodo 2: Scan rete
nmap -sn 192.168.1.0/24

# Metodo 3: Hostname
ping mainsailos.local
```

## Configurazione Klipper

### 1. Connessione SSH

```bash
# Da PC (Linux/Mac/Windows PowerShell)
ssh pi@mainsailos.local
# O con IP
ssh pi@192.168.1.XXX

# Password: quella impostata durante flash

# Primo accesso: aggiornare sistema
sudo apt update
sudo apt upgrade -y
```

### 2. Compilazione Firmware per Octopus Pro

```bash
# Accedere a directory Klipper
cd ~/klipper

# Avviare configurazione
make menuconfig

# Impostazioni per Octopus Pro V1.1:
# [*] Enable extra low-level configuration options
#     Micro-controller Architecture: STM32
#     Processor model: STM32H723
#     Bootloader offset: 128KiB
#     Clock Reference: 25 MHz crystal
#     Communication interface: USB (on PA11/PA12)

# Salvare: Q → Yes

# Compilare firmware
make clean
make

# Output: klipper.bin in ~/klipper/out/
```

### 3. Flash Firmware su Octopus Pro

```bash
# Metodo 1: Via SD card (più semplice)
# 1. Rinominare file
cp ~/klipper/out/klipper.bin ~/firmware.bin

# 2. Copiare firmware.bin su SD card FAT32
# 3. Inserire SD in Octopus Pro (scheda spenta)
# 4. Alimentare scheda
# 5. Attendere 10 secondi (LED lampeggia)
# 6. Scheda flashata! (firmware.bin rinominato in FIRMWARE.CUR)

# Metodo 2: Via DFU (Device Firmware Upgrade)
# Richiede boot0 jumper e più complesso
# Non necessario se metodo SD funziona
```

### 4. Identificare Serial Port Octopus

```bash
# Collegare Octopus a RPi via USB Type-C
# Verificare riconoscimento
lsusb
# Output: ... Klipper ... (se firmware flashato OK)

# Trovare serial ID
ls /dev/serial/by-id/
# Output: usb-Klipper_stm32h723xx_XXXXXXXXXXXXXX

# Copiare questo ID completo per configurazione
```

## Configurazione printer.cfg

### 1. Backup Config Esistente

```bash
# Mainsail ha già config di esempio
cd ~/printer_data/config

# Backup
cp printer.cfg printer.cfg.backup
```

### 2. Caricare Config Custom

```bash
# Opzione A: Copiare da repository (se disponibile)
# Opzione B: Caricare via interfaccia web Mainsail
# Opzione C: Editare via SSH

nano printer.cfg

# Incollare configurazione completa
# (Il file printer.cfg del progetto è in: ../../software/printer.cfg)
```

### 3. Configurare Serial MCU

```ini
# Sezione [mcu] in printer.cfg
[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32h723xx_XXXXXXXXXXXXXX
# ↑ Sostituire con ID trovato precedentemente
baud: 250000
```

### 4. Riavviare Klipper

```bash
# Metodo 1: Via interfaccia web Mainsail
# Dashboard → Restart Firmware

# Metodo 2: Via SSH
sudo systemctl restart klipper
```

## Verifica Funzionamento

### Test Connessione MCU

```bash
# Via SSH
cat ~/printer_data/logs/klippy.log | grep mcu

# Output atteso:
# mcu 'mcu': Starting serial connect
# mcu 'mcu': Serial connection established

# Se errore:
# - Verificare serial ID corretto
# - Verificare cavo USB connesso
# - Verificare firmware flashato
```

### Test Interfaccia Web

```yaml
# Browser: http://mainsailos.local
# o http://192.168.1.XXX

Dashboard Mainsail:
  - Stato: Ready (verde)
  - MCU: Connesso
  - Temperature: Visibili
  - Console: Funzionante

Test comandi:
  - Console → GET_POSITION
  - Output: Posizioni assi (anche se non homing)
```

## Configurazioni Aggiuntive

### Webcam (Opzionale)

```bash
# Se webcam USB per timelapse
sudo apt install -y ffmpeg

# Configurare in mainsail.cfg
# [webcam]
# enabled: True
# port: 8081
```

### Moonraker (API Server)

```bash
# Moonraker già installato con MainsailOS
# Config in ~/printer_data/config/moonraker.conf

# Verificare servizio
sudo systemctl status moonraker

# Se non attivo:
sudo systemctl enable moonraker
sudo systemctl start moonraker
```

### Aggiornamento Componenti

```bash
# Update Manager integrato in Mainsail
# Dashboard → Machine → Update Manager

# O via script:
cd ~/klipper
git pull
cd ~/mainsail
git pull

# Ricompilare firmware se aggiornato Klipper
cd ~/klipper
make clean
make
# Re-flash su Octopus Pro
```

## Struttura Directory

```
/home/pi/
├── klipper/                  # Firmware Klipper
│   ├── out/klipper.bin       # Firmware compilato
│   └── klippy/               # Codice Python host
├── mainsail/                 # Frontend web
├── moonraker/                # API server
└── printer_data/             # Dati stampante
    ├── config/               # File configurazione
    │   ├── printer.cfg       # Config principale ★
    │   ├── moonraker.conf
    │   └── mainsail.cfg
    ├── logs/                 # Log Klipper
    │   └── klippy.log
    ├── gcodes/               # File GCode
    └── database/             # Database settings
```

## Troubleshooting

### Klipper non si connette a MCU

```yaml
Sintomo: "Unable to connect" in dashboard

Soluzioni:
  1. Verificare cavo USB collegato
  2. Controllare serial ID in printer.cfg
  3. Riflashare firmware Octopus
  4. Verificare alimentazione Octopus
  5. Controllare log: cat ~/printer_data/logs/klippy.log
```

### Raspberry Pi non raggiungibile

```yaml
Sintomo: Ping timeout, SSH refused

Soluzioni:
  1. Verificare LED RPi (rosso=power, verde=attività)
  2. Riflashare SD card
  3. Verificare alimentatore 5V 3A
  4. Connettere monitor HDMI per debug
```

### Temperatura legge -273°C

```yaml
Causa: Termistor scollegato o config errata

Soluzioni:
  1. Verificare thermistor connesso fisicamente
  2. Controllare tipo in [extruder] sensor_type
  3. Test resistenza thermistor (~100kΩ)
```

## Backup Configurazione

```bash
# Script backup automatico config
cd ~/printer_data/config

# Creare repository Git locale
git init
git add printer.cfg
git commit -m "Initial config"

# Opzionale: Push su GitHub privato
git remote add origin https://github.com/USER/klipper-config.git
git push -u origin main
```

## Checklist

- [ ] MainsailOS flashato su SD
- [ ] Raspberry Pi accessibile via rete
- [ ] SSH funzionante
- [ ] Firmware Klipper compilato per STM32H723
- [ ] Octopus Pro flashato con klipper.bin
- [ ] Serial ID identificato e configurato
- [ ] printer.cfg caricato
- [ ] Klipper si connette a MCU
- [ ] Interfaccia Mainsail accessibile
- [ ] Temperature sensori leggibili
- [ ] Backup configurazione effettuato

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
