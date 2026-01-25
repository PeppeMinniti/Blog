---
layout: default
title: "Installazione Trasmissioni"
---
# Installazione Trasmissioni

## Descrizione

Installazione dei sistemi di trasmissione per il movimento degli assi: cinghie GT2 per X e Y, viti a ricircolo per Z.

Sistemi utilizzati:
- **Asse X:** Cinghia GT2 6mm, rotation distance 80mm
- **Asse Y:** Cinghie GT2 10mm con rapporto 2:1, rotation distance 40mm
- **Asse Z:** Viti TR16×5, rotation distance 5mm

## Immagini

<!-- Inserire foto trasmissioni -->
<!-- ![Cinghia GT2](../../media/costruzione/cinghia-gt2.jpg) -->
<!-- ![Viti Z](../../media/costruzione/viti-z.jpg) -->

## Trasmissione Asse X (Cinghia Singola)

### Componenti

```yaml
Cinghia: GT2 6mm, passo 2mm
Pulegge:
  - Motrice: 20 denti (albero motore)
  - Rinvio: 20 denti (lato opposto)
Tensionatore: A molla o vite
Lunghezza cinghia: ~2500mm (loop chiuso)
```

### Calcolo Rotation Distance

```python
denti_puleggia = 20
passo_cinghia = 2  # mm

rotation_distance = denti_puleggia * passo_cinghia
print(f"Rotation distance X: {rotation_distance} mm")
# Output: 80mm (valore configurato in Klipper)
```

### Tensionamento

```
Tensione corretta:
  - Freccia al centro: 3-5mm con pressione dito
  - Suono: "twang" acuto (come corda chitarra)
  - Nessun saltamento denti sotto carico
```

## Trasmissione Asse Y (Doppia Cinghia 2:1)

### Sistema a Rapporto 2:1

```yaml
Configurazione: CoreXY modificato
Cinghie: 2× GT2 10mm
Pulegge motrici: 40 denti (riduzione 2:1)
Pulegge folli: 20 denti (rinvio)

Vantaggi rapporto 2:1:
  - Coppia motore raddoppiata
  - Precisione aumentata
  - Velocità dimezzata (ok per asse pesante)
```

### Calcolo Rotation Distance

```python
denti_puleggia_motore = 40
passo_cinghia = 2  # mm
rapporto = 2  # riduzione 2:1

rotation_distance = (denti_puleggia_motore * passo_cinghia) / rapporto
print(f"Rotation distance Y: {rotation_distance} mm")
# Output: 40mm (configurato in Klipper)
```

### Sincronizzazione Cinghie

⚠️ **Importante:** Le due cinghie devono avere tensione identica

```bash
# Procedura sincronizzazione:
1. Allentare entrambe le cinghie
2. Posizionare carriage al centro
3. Tensionare cinghia 1 fino a freccia 5mm
4. Tensionare cinghia 2 fino a stessa freccia
5. Verificare movimento fluido
```

## Trasmissione Asse Z (Viti a Ricircolo)

### Specifiche Viti

```yaml
Tipo: Vite a ricircolo sfere TR16×5
  - Diametro: 16mm
  - Passo: 5mm (5mm per rotazione)
  - Lunghezza: 900mm
  - Precisione: C7 (±0.05mm/300mm)

Dado a ricircolo:
  - Precarico: 3-5% (elimina gioco assiale)
  - Fissaggio: 4 viti M5
```

### Accoppiamento Motore-Vite

```yaml
Giunto: Giunto elastico a soffietto
  - Diametro 1: 8mm (albero NEMA23)
  - Diametro 2: 16mm (vite)
  - Lunghezza: 40mm
  - Tolleranza disallineamento: ±0.5mm

Cuscinetto reggispinta:
  - Tipo: Cuscinetto assiale a sfere
  - Sopporta carico piatto (50kg+)
```

### Calcolo Rotation Distance

```python
passo_vite = 5  # mm/rotazione

rotation_distance = passo_vite
print(f"Rotation distance Z: {rotation_distance} mm")
# Output: 5mm (configurato in Klipper)
```

## Anti-Backlash e Precisione

### Eliminazione Gioco

```yaml
Asse X/Y (cinghie):
  - Tensione corretta elimina gioco
  - Pulegge con grani di bloccaggio
  - Nessun gioco nei cuscinetti carrelli

Asse Z (viti):
  - Dadi a ricircolo con precarico
  - Giunto elimina tensioni assiali
  - Motori con holding torque
```

## Configurazione Klipper

```ini
[stepper_x]
step_pin: PE2
dir_pin: PE3
enable_pin: !PD4
microsteps: 16
rotation_distance: 80  # Cinghia GT2 6mm, puleggia 20T
position_max: 900

[stepper_y]
step_pin: ...
microsteps: 64
rotation_distance: 40  # Doppia cinghia 2:1, puleggia 40T
position_max: 740

[stepper_z]
step_pin: ...
microsteps: 32
rotation_distance: 5  # Vite TR16×5
position_max: 800
```

## Manutenzione Trasmissioni

### Cinghie (ogni 500 ore)

```bash
- Verificare tensione
- Controllare usura denti
- Pulire da polveri
- Ri-tensionare se necessario
```

### Viti Z (ogni 200 ore)

```bash
- Lubrificare con grasso NLGI 2
- Verificare gioco assiale
- Controllare cuscinetti
```

## Checklist

- [ ] Cinghie GT2 installate e tese correttamente
- [ ] Pulegge fissate con grani di bloccaggio
- [ ] Viti Z installate con cuscinetti reggispinta
- [ ] Giunti elastici montati
- [ ] Rotation distance verificato per ogni asse
- [ ] Movimento manuale fluido senza giochi
- [ ] Nessun rumore anomalo durante movimento

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
