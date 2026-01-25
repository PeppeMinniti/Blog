---
layout: default
title: "Studio e Dimensionamento Struttura"
---
# Studio e Dimensionamento Struttura

## Descrizione

In questa fase viene effettuato lo studio preliminare per definire le dimensioni ottimali della stampante e il dimensionamento della struttura portante.

Aspetti da considerare:
- Volume di stampa desiderato (900×740×800mm)
- Materiali strutturali (profili acciaio 40x20x2mm)
- Carichi e sollecitazioni meccaniche
- Rigidità necessaria per evitare vibrazioni
- Accessibilità per manutenzione

## Immagini

<!-- Inserire immagini qui -->
<!-- Esempio: -->
<!-- ![Schema struttura](../../media/struttura-schema.jpg) -->

## Calcoli e Dimensionamenti

```python
# Esempio: Calcolo flessione trave
L = 900  # Lunghezza trave [mm]
F = 50   # Forza applicata [N]
E = 210000  # Modulo elasticità acciaio [N/mm²]
I = 1234   # Momento inerzia profilo [mm⁴]

flessione = (F * L**3) / (48 * E * I)
print(f"Flessione massima: {flessione:.2f} mm")
```

## Specifiche Struttura

| Parametro | Valore | Note |
|-----------|--------|------|
| Volume stampa | 900×740×800mm | XYZ |
| Profili principali | 40x20x2mm | Acciaio |
| Altezza totale | ~1200mm | Circa |
| Ingombro base | ~1000×850mm | Circa |

## Note

- La rigidità è fondamentale per stampanti di grandi dimensioni
- Considerare spazio per elettronica e cablaggio
- Prevedere punti di ancoraggio per componenti

## Checklist

- [ ] Definito volume di stampa target
- [ ] Calcolata rigidità struttura
- [ ] Selezionati profili adeguati
- [ ] Verificata accessibilità componenti

---

[← Torna alle Fasi di Realizzazione](../README.md) | [Torna al Progetto](../../index.md)
