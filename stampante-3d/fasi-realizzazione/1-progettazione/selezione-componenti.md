---
layout: default
title: "Selezione Componenti"
---
# Selezione Componenti

## Descrizione

Fase cruciale in cui vengono selezionati tutti i componenti necessari per la realizzazione della stampante, bilanciando prestazioni, costi e disponibilità.

Categorie principali:
- Elettronica di controllo
- Motori stepper
- Guide lineari e trasmissioni
- Hotend ed estrusore
- Sensori e sicurezze

## Immagini

<!-- Inserire immagini componenti qui -->
<!-- ![Componenti elettronici](../../media/componenti-elettronica.jpg) -->

## Lista Componenti Principali

### Elettronica
```yaml
Scheda madre: BIGTREETECH Octopus Pro V1.1
MCU: STM32H723XX
Driver X/Estrusore: TMC 2209 v.3
Driver Y/Z: DM556 20-50V 5.6A
Host: Raspberry Pi 3/4
```

### Motori
```yaml
Assi Y/Z: 6× NEMA 23 (3.0Nm, 4.2A)
Asse X/Estrusore: 2× NEMA 17 (59Ncm, 2.0A)
```

### Meccanica
- Guide MGN20H: 4 guide 1000mm + 4 carrelli
- Guide MGN12: 2 guide 1000mm + 2 carrelli
- Cinghie GT2: 6mm (X), 10mm (Y)
- Viti a ricircolo: TR16x5 (Z)

### Riscaldamento
- Hotend: All-metal 300°C max
- Piatto: 9× riscaldatori 200W
- Vetro temperato: 900×900×10mm

## Criteri di Selezione

| Componente | Criterio Principale | Note |
|------------|---------------------|------|
| Scheda madre | Numero assi, espandibilità | Octopus Pro: 8 driver |
| Motori | Coppia e corrente | NEMA 23 per assi pesanti |
| Guide lineari | Carico e precisione | MGN20H per carichi elevati |
| Hotend | Temperatura max | All-metal per materiali tecnici |

## Budget Componenti

```
Elettronica:        150-250€
Motori:             270-420€
Driver:             200-250€
Guide:              350-410€
Riscaldamento:      380-480€
Sensori/Altro:       50-100€
Alimentatori:       150-200€
------------------------
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

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
