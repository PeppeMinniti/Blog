# Fase 1: Progettazione e Dimensionamento

Questa cartella contiene la documentazione della fase di progettazione della stampante 3D custom.

## 📄 Contenuti

### [studio-dimensionamento-struttura.md](studio-dimensionamento-struttura.md)
Documentazione completa dello studio strutturale con:
- Specifiche tecniche
- Parametri di progetto
- Checklist di verifica

### 📓 [calcoli-strutturali.ipynb](calcoli-strutturali.ipynb) - Notebook Interattivo
Analisi completa con calcoli parametrici, grafici e confronti.

**🌐 Esegui nel Browser (Gratuito, Nessuna Installazione):**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/PeppeMinniti/Blog/blob/main/stampante-3d/fasi-realizzazione/1-progettazione/calcoli-strutturali.ipynb)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/PeppeMinniti/Blog/HEAD?filepath=stampante-3d/fasi-realizzazione/1-progettazione/calcoli-strutturali.ipynb)

**Contenuti del Notebook:**
1. 📐 Calcolo momento di inerzia profilo
2. ⚙️ Analisi flessione trave
3. 📊 Grafici parametrici carico vs flessione
4. 🎵 Frequenze di risonanza
5. ⚖️ Calcolo carichi reali stampante
6. 🔧 Confronto profili alternativi
7. 📋 Dashboard riepilogo completo

**💻 Uso Locale:**
```bash
# Scarica il notebook
# Apri con VS Code (+ estensione Jupyter) o Jupyter Notebook

# Oppure esegui da terminale:
jupyter notebook calcoli-strutturali.ipynb
```

### 📄 [calcoli-strutturali.html](calcoli-strutturali.html) ✅ Disponibile

Versione HTML statica del notebook (387 KB) per visualizzazione rapida senza eseguire codice.

- Apri direttamente nel browser
- Tutti i calcoli pre-eseguiti
- Grafici e tabelle già renderizzati

---

## 🛠️ Come Modificare i Calcoli

1. **Online (facile):** Clicca su un badge sopra → Modifica parametri → Esegui celle
2. **Locale (avanzato):** Scarica .ipynb → Apri con VS Code/Jupyter → Modifica → Salva

## 📝 Note

I calcoli sono basati su:
- Teoria trave di Eulero-Bernoulli
- Profili acciaio S235 (E = 210 GPa)
- Ipotesi di vincoli semplici
- Carico statico equivalente (peso + inerzia)

---

|       |
|:-----:|
| [Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md) - [Torna alla Home](../../../README.md) |
