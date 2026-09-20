# Ticket Recurrence Diagnostic Pipeline

- **Org / context:** Motorola Solutions
- **Dates:** Jun 2026 – Present
- **Status:** Active
- **Preview:** Diagnosing recurring "boomerang" tickets with text similarity and hypothesis testing.

## Summary

Heuristic/rule-based pipeline for detecting recurring ticket pairs and diagnosing the root
causes behind "boomerang" tickets.

## Highlights

- Boomerang detection via short-description text similarity and operational category tiers.
- RMA & defect correlation: **19%** of 60-day boomerangs involved RMAs; **72%** of repeat cases classified as core engineering/system defects rather than user errors.
- Hypothesis testing debunked "rushed closures" by comparing close-note word counts and RCA keyword density against non-boomerang controls.

## Stack

Python · Pandas · Text Similarity · Hypothesis Testing

## Media (planned)

1. Boomerang ticket issue classification chart — "72% of recurring incidents stem from core engineering/system defects."
2. Hypothesis testing close-note depth vs. recurrence chart — "disproving the 'rushed closures' assumption."
3. Boomerang recurrence rates by time window — "Recurrence across 1 / 7 / 60-day windows, peaking at 36.2%."