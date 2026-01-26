---
layout: default
title: "Selezione Componenti"
---
# Selezione Componenti

## Descrizione

Fase cruciale in cui vengono selezionati tutti i componenti necessari per la realizzazione della stampante, bilanciando prestazioni, costi e disponibilità. I componenti di seguito mostrati sono solo alcune delle scelte possibili, sentiti libero di cambiarli a piacimento, ma fai anche in modo di poterli adattare meccanicamente e elettronicamente agli altri componenti.

- Elettronica di controllo
- Motori stepper
- Guide lineari e trasmissioni
- Hotend ed estrusore
- Sensori e sicurezze

## Immagini

<div class="small-thumbnail-gallery">
  <img src="../media/bigtreetech.jpg" alt="BIGTREETECH Octopus Pro" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/tmc2209.jpg" alt="Driver TMC2209" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/dm556.jpg" alt="Driver DM556" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/raspberry.jpg" alt="Raspberry Pi" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/nema23.jpg" alt="Motore NEMA 23" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/nema17.jpg" alt="Motore NEMA 17" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/guida-mgn20h.jpg" alt="Guida MGN20H" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/guida-mgn12h.jpg" alt="Guida MGN12H" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/cinghia-gt2-6.jpg" alt="Cinghia GT2 6mm" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/cinghia-gt2-10.jpg" alt="Cinghia GT2 10mm" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/sfu1605.jpg" alt="Vite a ricircolo SFU1605" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/hotend.jpg" alt="Hotend All-Metal" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/riscaldatore-piatto.jpg" alt="Riscaldatore Piatto" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/vetro-temperato.jpg" alt="Vetro Temperato" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/sensore-livellamento.jpg" alt="Sensore CR Touch" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/sensore-filamento.jpg" alt="Sensore Filamento" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/sensore-accelerometro.jpg" alt="Accelerometro S2DW" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/endstop.jpg" alt="Endstop Meccanico" class="small-thumbnail" onclick="openLightbox(this)">
  <img src="../media/pulsante-arresto.jpg" alt="Pulsante Arresto Emergenza" class="small-thumbnail" onclick="openLightbox(this)">
</div>

## Lista Componenti Principali

### Elettronica
```yaml
Scheda madre: BIGTREETECH Octopus Pro V1.1
MCU: STM32H723XX
Driver X/Estrusore: TMC 2209 v.3
Driver Y/Z: DM556 20-50V 5.6A
Host: Raspberry Pi 4/5
```

### Motori
```yaml
Assi Y/Z: 6× NEMA 23 (3.0Nm, 4.2A)
Asse X/Estrusore: 2× NEMA 17 (59Ncm, 2.0A)
```

### Meccanica  
```yaml
Guide MGN20H: 4 guide 1000mm + 4 carrelli
Guide MGN12H: 2 guide 1000mm + 2 carrelli
Cinghie GT2: 6mm (X), 10mm (Y)
Viti a ricircolo: SFU1605 (Z)
```

### Riscaldamento

```yaml
Hotend: All-metal 300°C max
Piatto: 9× riscaldatori 200W
Vetro temperato: 900×900×10mm
```

### Sensori e Sicurezza

```yaml
Sensore livellamento piatto: Creality Sensore di livellamento automatico CR Touch
Modulo di Rilevamento Rottura del Filamento: BIGTREETECH Smart Filament Sensor
Modulo sensore di accelerazione: BIGTREETECH S2DW V1.0 - Klipper
Endstop (X/Y):  Finecorsa Meccanico con Indicatore LED
Pulsante di arresto emergenza: GUUZI Interruttore a Pulsante di Arresto di Emergenza in Metallo a Fungo
```

## Criteri di Selezione

| Componente | Criterio Principale | Note |
|------------|---------------------|------|
| Scheda madre | Numero assi, espandibilità | Octopus Pro: 8 driver |
| Motori | Coppia e corrente | NEMA 23 per assi pesanti |
| Guide lineari | Carico e precisione | MGN20H per carichi elevati |
| Hotend | Temperatura max | All-metal per diversi materiali |

## Budget Componenti

```
Elettronica:        150-250€
Motori:             270-420€
Driver:             200-250€
Guide:              350-410€
Riscaldamento:      380-480€
Sensori/Altro:       50-100€
Alimentatori:       150-200€
-----------------------------
TOTALE:          1.550-2.110€
```

## Note

- Preferire fornitori affidabili per componenti critici
- Verificare compatibilità tra componenti
- Considerare disponibilità ricambi

## Checklist

- [ ] Elettronica selezionata e verificata
- [ ] Motori dimensionati per carichi
- [ ] Guide adeguate al peso
- [ ] Sistema riscaldamento calcolato
- [ ] Sensori sicurezza identificati

---

[Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md)
