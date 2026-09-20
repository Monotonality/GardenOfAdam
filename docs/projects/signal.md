# SIGNAL — Real-Time Knowledge Retrieval

- **Org / context:** Motorola Solutions · Hackolades 2026
- **Dates:** May 2026 – Jul 2026
- **Role:** Engineer (prototype)
- **Status:** Shipped prototype
- **Preview:** Voice-to-retrieval RAG pipeline putting live troubleshooting knowledge in front of support technicians.

## Summary

Prototyped an end-to-end, asynchronous RAG pipeline delivering real-time troubleshooting
knowledge to live support technicians.

## Highlights

- Voice-to-intent pipeline converting call audio to text streams with heuristic parsing for dynamic query formulation.
- Parallel async queries across 4 enterprise knowledge bases (Vector Store, MSI Library, ServiceNow KB, Salesforce).
- Unstructured data ETL ingesting team docs and chat history into searchable vector embeddings.
- Ranked and pushed relevant context payloads to the SIGNAL dashboard UI in real time.

## Stack

RAG · Vector DB · ETL · Async · Frontend

## Media (planned)

System architecture diagram — "End-to-end voice-to-retrieval pipeline: transcript → intent → parallel KB queries → ranking → dashboard."

## Links

- Demo (pending)