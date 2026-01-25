---
layout: default
title: "Taglio e Assemblaggio Telaio"
---
# Taglio e Assemblaggio Telaio

## Descrizione

Prima fase costruttiva: taglio dei profili in acciaio e assemblaggio del telaio portante principale. La precisione in questa fase è fondamentale per l'allineamento degli assi.

Materiali:
- Profili acciaio 40×20×2mm
- Squadre di rinforzo
- Bulloneria M5/M6
- Attrezzi: sega, trapano, squadra, metro

## Immagini

<!-- Inserire foto taglio e assemblaggio -->
<!-- ![Taglio profili](../../media/costruzione/taglio-profili.jpg) -->
<!-- ![Telaio assemblato](../../media/costruzione/telaio-base.jpg) -->

## Fasi di Lavorazione

### 1. Taglio Profili

```yaml
Profili verticali (4×): 1200mm
Profili orizzontali X (4×): 1000mm
Profili orizzontali Y (4×): 850mm
Traverse rinforzo (6×): variabili
```

### 2. Foratura Profili

```python
# Distanze fori guida lineari
passo_fori = 50  # mm tra fori
diametro_foro = 5.2  # mm (clearance M5)

# Precisione richiesta
tolleranza = ±0.1  # mm
```

### 3. Assemblaggio Base

**Ordine assemblaggio:**
1. Base rettangolare (4 profili)
2. Montanti verticali (4 profili)
3. Telaio superiore (4 profili)
4. Traverse diagonali (rinforzo)

## Attrezzi Necessari

- Sega circolare / Troncatrice
- Trapano a colonna (preferibile)
- Punte HSS per metallo (Ø3, Ø5, Ø6)
- Squadra millimetrata
- Metro a nastro
- Morsetti grandi
- Chiavi a brugola set completo

## Verifiche Dimensionali

```
Squadratura angoli: 90° ±0.5°
Parallelismo lati opposti: ±1mm
Planarità base: ±0.5mm
Altezza montanti: Tutti uguali ±0.5mm
```

## Schema Bulloneria

| Giunzione | Vite | Quantità | Note |
|-----------|------|----------|------|
| Angoli base | M6×20 | 8 | Con rondella |
| Montanti | M6×25 | 8 | Serraggio forte |
| Traverse | M5×20 | 12 | Rinforzo |

## Suggerimenti

💡 **Trucchi utili:**
- Usare squadra da falegname grande (600mm)
- Serrare provvisoriamente prima del serraggio finale
- Verificare diagonali (devono essere uguali)
- Lavorare su superficie piana e livellata

## Note di Sicurezza

⚠️ **Attenzione:**
- Usare occhiali protezione durante taglio
- Fissare pezzi con morsetti prima di forare
- Sbavare bordi tagliati
- Indossare guanti durante assemblaggio

## Checklist

- [ ] Tutti i profili tagliati a misura
- [ ] Fori per guide lineari eseguiti
- [ ] Telaio base assemblato
- [ ] Squadratura verificata
- [ ] Montanti verticali fissati
- [ ] Rinforzi diagonali installati
- [ ] Struttura rigida e stabile

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
