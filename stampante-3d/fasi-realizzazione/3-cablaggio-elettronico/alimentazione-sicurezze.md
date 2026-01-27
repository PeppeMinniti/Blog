---
layout: default
title: "Alimentazione e Sicurezze"
---
# Alimentazione e Sicurezze

## Descrizione

Sistema di alimentazione multi-tensione con protezioni di sicurezza. La stampante richiede 3 alimentatori separati per gestire le diverse tensioni e correnti richieste.

Schema alimentazione:
- **24V 10A**: Octopus Pro + NEMA17 + hotend
- **36V 30A**: Driver DM556 + NEMA23 (Y/Z)
- **24V 62.5A**: Piatto riscaldato (1500W)

## Immagini

<div class="thumbnail-gallery">
  <img src="../../media/sistema raffreddamento alimentatore piatti.jpeg" class="project-thumbnail">
</div>

<!-- Aggiungere schema elettrico -->
<!-- ![Schema alimentazione](../../media/elettronica/schema-alimentazione.jpg) -->

## Alimentatori Utilizzati

### PSU 1: Octopus Pro e Logica (24V 10A)

```yaml
Specifiche:
  - Tensione: 24VDC
  - Corrente: 10A
  - Potenza: 240W
  - Tipo: Switching PSU industriale

Carichi alimentati:
  - Octopus Pro: ~2A
  - 2× NEMA 17: ~4A (2A cad.) _impostati a max 1.5A ciascuno ~3A totali_
  - Hotend heater: ~2A (40W)
  - Ventole: ~0.5A
  - LED e accessori: ~0.5A
  ────────────────────────────
  Totale: ~9A (90% capacità) _effettivi 8A in base a impostazioni attuali_

Protezione: Fusibile 12A fast-blow
```

### PSU 2: Motori Y/Z (36V 30A)

```yaml
Specifiche:
  - Tensione: 36VDC
  - Corrente: 30A
  - Potenza: 1080W
  - Tipo: Switching PSU industriale

Carichi alimentati:
  - 4× NEMA 23 (Y): ~17A (4.2A cad.)
  - 2× NEMA 23 (Z): ~8.5A (4.2A cad.)
  ────────────────────────────
  Totale: ~25.5A (85% capacità) _anche qui l'impostazione di erogazione RMS non supera 2.5A cad._

Protezione: Fusibile 35A slow-blow
Nota: I motori non assorbono corrente peak continua
```

### PSU 3: Piatto Riscaldato (24V 62.5A)

```yaml
Specifiche:
  - Tensione: 24VDC
  - Corrente: 62.5A
  - Potenza: 1500W
  - Tipo: Switching PSU alta potenza

Carichi alimentati:
  - 9× Heater pad 200W: 1800W totale
  - Controllo: SSR (Solid State Relay)
  ────────────────────────────
  Potenza max: 1500W (limitata da PSU)

Protezione: Fusibile 75A slow-blow
Raffreddamento: Ventilazione forzata obbligatoria
```

## Schema Collegamento Alimentazione

```
Rete 230VAC ──┬──[Interruttore Generale]──┬── PSU 24V 10A ──→ Octopus Pro
              │                            │                   ├→ NEMA 17
              │                            │                   └→ Hotend
              │                            │
              │                            ├── PSU 36V 30A ──→ DM556 ──→ NEMA 23
              │                            │
              │                            └── PSU 24V 62.5A ──[SSR]──→ Piatto
              │
              └──[Emergency Stop]── NC ──→ Taglia alimentazione
```

## Sistema per Controllo Temperatura Piatto

### Solid State Relay

```yaml
Connessione potenza:
  - Input AC: Da PSU 24V piatto
  - Output AC: A piatto riscaldato
```

## Sistema di Raffreddamento Alimentatori

### Ventilazione Forzata

```yaml
Configurazione (vedi foto):
  - Ventola 120mm 
  - Flusso: Dal basso verso l'alto
  - Alimentazione fan: 24V sempre ON
```

## Protezioni di Sicurezza

### Fusibili

```yaml
PSU 24V 10A: Fusibile 12A fast-blow (5×20mm)
PSU 36V 30A: Fusibile 35A slow-blow (cartuccia)
PSU 24V 62.5A: Fusibile 75A slow-blow (cartuccia)

Posizione: Su cavo positivo in uscita da ogni PSU
```

### Thermal Runaway Protection (Firmware)

```ini
# Configurazione Klipper
[verify_heater extruder]
max_error: 120          # °C massimo errore
check_gain_time: 20     # secondi per verificare aumento temp
hysteresis: 5           # °C tolleranza oscillazione
heating_gain: 2         # °C/secondo minimo durante riscaldo
```

### Emergency Stop (Opzionale)

```yaml
Tipo: Pulsante NC (Normally Closed)
Funzione: Taglia alimentazione rete 230V
Posizione: Accessibile frontalmente
Cablaggio: In serie con interruttore generale

Schema:
  230V ──[Int.Gen.]──[E-STOP NC]──┬→ PSU 1
                                  ├→ PSU 2
                                  └→ PSU 3
```

## Sezioni Cavi Alimentazione

### Calcolo Sezione

```python
# Legge: S = (ρ × L × I) / ΔV
# ρ = resistività rame (0.0175 Ωmm²/m)
# L = lunghezza cavo (metri)
# I = corrente (A)
# ΔV = caduta tensione ammessa (V)

def calcola_sezione(corrente, lunghezza, tensione, caduta_perc=3):
    """Calcola sezione minima cavo"""
    rho = 0.0175  # Ωmm²/m
    delta_v = (tensione * caduta_perc) / 100
    sezione = (2 * rho * lunghezza * corrente) / delta_v
    return sezione

# Esempi
print("Piatto 62.5A, 2m, 24V:", calcola_sezione(62.5, 2, 24), "mm²")
# Output: ~15 mm² → Usare 16mm² o 2× 10mm² paralleli

print("Motori 25A, 1.5m, 36V:", calcola_sezione(25, 1.5, 36), "mm²")
# Output: ~4 mm² → Usare 6mm²
```

### Tabella Sezioni Consigliate

| Carico | Corrente | Lunghezza | Sezione Min | Sezione Usata |
|--------|----------|-----------|-------------|---------------|
| Piatto | 62.5A | 2m | 15mm² | 2× 10mm² |
| Motori Y/Z | 25A | 1.5m | 4mm² | 6mm² |
| Octopus | 10A | 1m | 1mm² | 2.5mm² |

## Ground Comune e Sicurezza Terra

```yaml
Sistema ground:
  - Tutti i PSU con GND comune (star topology)
  - Terra di protezione (PE) a telaio metallico
  - NO ground loop (evitare collegamenti multipli)

Connessioni terra:
  - PSU chassis → PE
  - Telaio stampante → PE
  - Box elettronica → PE
  - Scheda Octopus GND → GND comune PSU
```

## Test Pre-Accensione

### Checklist Sicurezza

```bash
# Test PRIMA di alimentare
1. Resistenza GND-PE telaio: < 1Ω
2. Isolamento 230V-GND: > 1MΩ
3. Polarità tutti i PSU corretta
4. Fusibili installati valori corretti
5. Ventilazione box funzionante
6. No cavi schiacciati o danneggiati
7. Morsetti serrati correttamente
```

### Test Accensione Graduale

```yaml
Step 1: Alimentare solo PSU 24V 10A (logica)
  - Verificare LED Octopus acceso
  - Misurare tensioni 24V, 5V, 3.3V

Step 2: Alimentare PSU 36V 30A (motori)
  - Test movimento motori a bassa velocità
  - Verificare temperatura driver

Step 3: Alimentare PSU 24V 62.5A (piatto)
  - Test riscaldo piatto a 60°C
  - Monitorare temperatura SSR e PSU
  - Verificare thermal runaway protection
```

## Monitoraggio Temperature

```ini
# Sensori temperatura aggiuntivi (Klipper)
[temperature_sensor raspberry_pi]
sensor_type: temperature_host

[temperature_sensor octopus_mcu]
sensor_type: temperature_mcu
```

## Checklist

- [ ] 3 PSU installati e fissati
- [ ] Fusibili di protezione installati
- [ ] Ventilazione box funzionante
- [ ] Sezioni cavi adeguate alle correnti
- [ ] Ground comune realizzato (star topology)
- [ ] Terra protezione collegata
- [ ] Test isolamento passato (>1MΩ)
- [ ] Test accensione graduale completato
- [ ] Thermal runaway configurato
- [ ] Monitoraggio temperature attivo

---

[Torna alle Fasi di Realizzazione](../README.md) - [Torna al Progetto](../../index.md)
