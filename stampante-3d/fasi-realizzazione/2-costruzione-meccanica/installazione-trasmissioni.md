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
- **Asse Z:** Viti SFU1605, rotation distance 5mm

## Immagini

<div class="thumbnail-gallery">
  <img src="../media/cinghia-gt2-10.jpg" alt="cinghia gt2 10mm" class="project-thumbnail">
  <img src="../media/cinghia-gt2-6.jpg" alt="cinghia gt2 6mm" class="project-thumbnail">
  <img src="../media/sfu1605.jpg" alt="sfu1605" class="project-thumbnail">
</div>

## Trasmissione Asse X (Cinghia Singola)

### Componenti

```yaml
Cinghia: GT2 6mm, passo 2mm
Pulegge:
  - Motrice: 20 denti (albero motore)
  - Rinvio: 20 denti (lato opposto - anche liscia) 
Tensionatore: A vite
Lunghezza cinghia: ~2300mm (non loop chiuso)
```

### Calcolo Rotation Distance

```python
denti_puleggia = 20
passo_cinghia = 2  # mm

rotation_distance = denti_puleggia * passo_cinghia
print(f"Rotation distance X: {rotation_distance} mm")
# Output: 80mm (valore configurato in Klipper)
```

## Trasmissione Asse Y (Doppia Cinghia 1:1)

### Sistema a Rapporto 1:1

```yaml
Configurazione: Cartesiana
Cinghie: 2× GT2 10mm
Pulegge motrici: 20 denti (albero motore)
Pulegge folli: 20 denti (rinvio)
```

### Calcolo Rotation Distance

```python
denti_puleggia_motore = 20
passo_cinghia = 2  # mm
rapporto = 1:1

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
Tipo: Vite a ricircolo sfere SFU1605
  - Diametro: 16mm
  - Passo: 5mm (5mm per rotazione)
  - Lunghezza: 1000mm
  - Precisione: C7 (±0.05mm/300mm)

Dado a ricircolo:
  - Precarico: 3-5% (elimina gioco assiale)
  - Fissaggio: 4 viti M5
```

### Accoppiamento Motore-Vite

```yaml
Giunto: Coupler 8/10
  - Diametro 1: 8mm (albero NEMA23)
  - Diametro 2: 10mm (vite)
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
rotation_distance: 40  # Doppia cinghia GT2 10mm, puleggia 20T
position_max: 740

[stepper_z]
step_pin: ...
microsteps: 32
rotation_distance: 5  # Vite SFU1605
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
