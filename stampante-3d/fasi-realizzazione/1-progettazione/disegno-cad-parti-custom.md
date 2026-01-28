---
layout: default
title: "Disegno CAD Parti Custom"
---

# Disegno CAD Parti Custom

<div style="background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%); padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: center; box-shadow: 0 4px 15px rgba(88, 166, 255, 0.3);">
  <h2 style="margin: 0 0 15px 0; color: white;">🌐 Visualizza i Modelli 3D nel Browser!</h2>
  <p style="margin: 0 0 20px 0; color: rgba(255,255,255,0.9);">
    Esplora tutti i modelli CAD con un viewer 3D interattivo - Nessun software da installare!
  </p>
  <a href="modelli-cad-3d.html" style="display: inline-block; background: white; color: var(--accent-primary); padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    🔍 Apri Viewer 3D Interattivo →
  </a>
</div>

## Descrizione

Progettazione in CAD di tutte le parti custom necessarie per l'assemblaggio della stampante. Include supporti motori, staffe, box elettronica e adattatori vari.

**Software utilizzati:**
- **FreeCAD** (open source)
- **AutoCAD** (professionale)

**📁 File CAD:** I file DWG completi sono disponibili nella cartella [`../../cad/`](../../cad/)

**🌐 Viewer 3D:** [Visualizza modelli interattivi nel browser](modelli-cad-3d.html) (rotazione, zoom, wireframe)

## Immagini

<!-- Inserire render CAD qui -->
<!-- ![Supporto motore](../../media/cad-supporto-motore.jpg) -->
<!-- ![Assembly 3D](../../media/cad-assembly.jpg) -->

## Parti Principali da Disegnare

### Supporti Motori
```
- Staffa NEMA 23 (assi Y/Z)
- Staffa NEMA 17 (asse X)
- Sistema tensionamento cinghie
- Supporti con fori per viti M5/M6
```

### Carriage e Gantry
```
- Carriage asse X (porta hotend)
- Piastra montaggio estrusore
- Supporto BLTouch
- Sistema raffreddamento part cooling
```

### Box Elettronica
```
- Pannello DIN rail
- Ventilazione forzata
- Passacavi ordinati
- Sportelli accesso
```

### Adattatori e Supporti
```
- Bracket guide lineari
- Supporti endstop
- Supporti sensori temperatura
- Copri-cinghia protezioni
```

## Note Tecniche CAD

```python
# Parametri standard utilizzati
foro_M3 = 3.2   # mm (clearance viti M3)
foro_M5 = 5.2   # mm (clearance viti M5)
foro_M6 = 6.2   # mm (clearance viti M6)

# Tolleranze stampa 3D
tolleranza_std = 0.2  # mm
tolleranza_stretta = 0.1  # mm

# Spessori pareti
parete_strutturale = 3  # mm
parete_cover = 2  # mm
```

## Convenzioni di Disegno

- Unità di misura: **millimetri**
- Sistema riferimento: **ISO (Third Angle)**
- Formato file: **.dwg** (AutoCAD), **.FCStd** (FreeCAD)
- Nomenclatura: `componente-versione.dwg` (es. `staffa-nema23-v2.dwg`)

## Checklist Disegno

- [ ] Supporti motori disegnati e verificati
- [ ] Carriage asse X completo
- [ ] Box elettronica con ventilazione
- [ ] Tutti i file esportati in formato stampa (STL/STEP)
- [ ] Lista bulloneria generata

## File CAD Repository

```
cad/
├── supporti-motori/
│   ├── staffa-nema23-y.dwg
│   ├── staffa-nema23-z.dwg
│   └── staffa-nema17-x.dwg
├── carriage/
│   ├── carriage-x.dwg
│   └── mount-hotend.dwg
├── box-elettronica/
│   └── pannello-din.dwg
└── assembly/
    └── stampante-completa.dwg
```

## Note

- Verificare clearance tra parti in movimento
- Considerare espansione termica per parti vicine a hotend
- Prevedere fori passaggio cavi

---

|       |
|:-----:|
| [Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md) - [Torna alla Home](../../../README.md) |
