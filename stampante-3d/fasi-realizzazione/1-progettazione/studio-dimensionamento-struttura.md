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

> 📓 **Notebook Interattivo - Esegui nel Browser (Gratuito):  (roba da ingegneri) <img src="../../../assets/images/dizzy-emoji.png" alt="dizzy emoji" width="35" style="vertical-align: middle;">**
>
> [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/PeppeMinniti/Blog/blob/main/stampante-3d/fasi-realizzazione/1-progettazione/calcoli-strutturali.ipynb)
> [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/PeppeMinniti/Blog/HEAD?filepath=stampante-3d/fasi-realizzazione/1-progettazione/calcoli-strutturali.ipynb)
>
> Clicca un badge per eseguire calcoli interattivi, modificare parametri e vedere grafici in tempo reale.
> Nessuna installazione richiesta! Oppure [scarica il notebook](calcoli-strutturali.ipynb) per uso locale.

### Esempio: Calcolo Flessione Asse X (Parametri Reali)

```python
# Asse X: Trave 1080mm che supporta testina mobile 1kg
L = 1080       # Lunghezza trave asse X [mm]
m = 1.0        # Massa testina [kg]
a = 5000       # Accelerazione max [mm/s²]
E = 210000     # Modulo elasticità acciaio S235 [N/mm²]
I = 53333      # Momento inerzia profilo 40×20×2mm, asse debole [mm⁴]

# Carico totale (peso + forza inerziale)
F = m * 9.81 + (m * a) / 1000  # [N]

# Flessione trave appoggiata, carico centrato
flessione = (F * L**3) / (48 * E * I)

print(f"Carico totale: {F:.1f} N")
print(f"Flessione: {flessione:.3f} mm")
print(f"Limite L/500: {L/500:.2f} mm")
# Output: Carico totale: 14.8 N
#         Flessione: 0.036 mm
#         Limite L/500: 2.16 mm
```

**Risultato**: Con testina leggera (1 kg) la flessione è **trascurabile** (0.036 mm), ben entro i limiti (2.16 mm).

💡 **Per analisi complete** (3 assi, frequenze risonanza, confronto profili) → Usa il notebook interattivo sopra!

## Specifiche Struttura

| Parametro | Valore | Note |
|-----------|--------|------|
| Volume stampa | 900×740×800mm | XYZ |
| Profili principali | 40x20x2mm | Acciaio |
| Altezza totale | ~1100mm | Circa |
| Ingombro base | ~1080×1000mm | Circa |

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

|       |
|:-----:|
| [Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md) - [Torna alla Home](../../../README.md) |
