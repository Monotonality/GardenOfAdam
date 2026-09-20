# SLA Breach Predictive Diagnostics

- **Org / context:** Motorola Solutions
- **Dates:** May 2026 – Present
- **Status:** Active
- **Preview:** Predictive classifiers on 1,000+ annual SLA breaches to find the real drivers.

## Summary

Random Forest and Gradient Boosting classifiers on historical ticket metadata diagnosing the
drivers behind 1,000+ annual SLA breaches.

## Highlights

- Trained and evaluated RF / gradient boosting classifiers on historical ticket metadata.
- Feature importance surfaced open-time attributes most tied to calendar duration (company state, time opened, assignee).
- Concluded open-time metadata lacks consistent predictive power for duration — guiding a shift toward continuous prediction.

## Stack

Random Forest · Gradient Boosting · Scikit-learn · Python · Pandas

## Media (planned)

1. Feature importance chart — "Aggregated RF feature importance for open-time ticket attributes."
2. Predicted vs. actual resolution hours — "model validation."