---
layout: default
title: "Montaggio Guide Lineari"
---
# Montaggio Guide Lineari

## Descrizione

Installazione delle guide lineari MGN20H (assi principali) e MGN12 (estrusore). La precisione del montaggio influenza direttamente la qualità di stampa.

Guide utilizzate:
- **4× MGN20H** (1000mm) per assi Y e Z
- **2× MGN12** (1000mm) per asse X

## Immagini

![Guide MGN20H](../media/guida-mgn20h.jpg)
![Guide MGN12H](../media/guida-mgn12h.jpg)

## Specifiche Guide

### MGN20H (Heavy Load)

```yaml
Larghezza guida: 20mm
Lunghezza carrello: 77.5mm (tipo H - lungo)
Passo fori: 60mm
Carico dinamico: ~15kN
Precarico: Leggero (Z0) o medio (ZA)
```

### MGN12 (Standard)

```yaml
Larghezza guida: 12mm
Lunghezza carrello: 48mm
Passo fori: 50mm
Carico dinamico: ~7kN
```

## Procedura Montaggio

### 1. Preparazione Superfici

```bash
# Pulizia guide
- Rimuovere grasso protettivo temporaneo
- Pulire con sgrassatore
- Lubrificare con olio sottile (ISO VG 32)
```

### 2. Allineamento Guida

**Metodo con comparatore:**
```
Tolleranza parallelismo: ±0.05mm su 1000mm
Tolleranza planarità: ±0.02mm
```

**Metodo semplificato:**
- Usare calibro digitale
- Misurare distanza da riferimento in 5 punti
- Differenza max ±0.1mm

### 3. Fissaggio

```python
# Sequenza serraggio viti M5
coppia_serraggio = 4.5  # Nm (viti M5)

# Ordine serraggio
# 1. Viti centrali al 50%
# 2. Viti esterne al 50%
# 3. Tutte le viti al 100%
```

## Schema Montaggio Assi

### Asse Y (Piano Mobile)

```
2× MGN20H parallele:
  - Distanza tra guide: 1020mm
  - Lunghezza utile: 900mm
  - 2 carrelli
```

### Asse Z (Verticale)

```
2× MGN20H parallele:
  - Distanza tra guide: 920mm
  - Lunghezza utile: 800mm
  - 2 carrelli
```

### Asse X (Gantry)

```
2× MGN12 parallele:
  - Distanza tra guide: 40mm
  - Lunghezza utile: 900mm
  - 2 carrelli (1 per guida)
```

## Verifiche Post-Montaggio

### Test Scorrimento

```yaml
Scorrimento manuale:
  - Deve essere fluido senza punti duri
  - Nessun rumore metallico
  - Resistenza uniforme lungo tutta la corsa

Tolleranza gioco:
  - Gioco laterale: minimo (precarico corretto)
  - Gioco verticale: quasi assente
```

### Test Parallelismo

```python
# Verifica distanza carrelli
import numpy as np

posizioni = [0, 250, 500, 750, 1000]  # mm
distanze_misurate = [700.0, 700.1, 699.9, 700.0, 700.1]  # mm

delta_max = max(distanze_misurate) - min(distanze_misurate)
print(f"Variazione parallelismo: {delta_max} mm")
# OK se < 0.3mm
```

## Manutenzione Guide

```bash
# Lubrificazione ogni 100 ore
Lubrificante: Olio ISO VG 32 o grasso NLGI 2
Quantità: 1-2 gocce per carrello

# Pulizia ogni 50 ore
- Rimuovere polveri con aria compressa
- Passare panno morbido
- Re-lubrificare
```

## Problemi Comuni e Soluzioni

| Problema | Causa | Soluzione |
|----------|-------|-----------|
| Punti duri | Allineamento scorretto | Verificare parallelismo |
| Rumore | Mancanza lubrificazione | Lubrificare carrelli |
| Gioco eccessivo | Precarico insufficiente | Sostituire carrelli |
| Usura precoce | Sporcizia | Aggiungere soffietti protezione |

## Checklist

- [ ] Guide pulite e lubrificate
- [ ] Fori telaio allineati correttamente
- [ ] Guide fissate con coppia corretta
- [ ] Parallelismo verificato
- [ ] Scorrimento fluido testato
- [ ] Nessun gioco eccessivo
- [ ] Protezioni antipolvere installate (opzionale)

---

[Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md)
