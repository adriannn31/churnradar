# ChurnRadar

**AI-powered churn prevention for B2B SaaS.** ChurnRadar surfaces which accounts are about to churn, explains *why* in plain language, and points Customer Success teams at the one action that saves the revenue.

🔗 **Live demo:** https://adriannn31.github.io/churnradar/

---

## What ChurnRadar does

- **Priority queue** — accounts ranked by churn risk × revenue at stake, so CSMs work the highest-leverage saves first. Each row shows MRR, risk score, and trend at a glance.
- **Explainable risk (SHAP)** — every score breaks down into the exact factors pushing it up or down (usage depth, login recency, decision-maker activity, support load), shown as a signed per-factor contribution chart. No black box.
- **Business-friendly model card** — model performance in plain value terms: 91% predictive accuracy, 84% precision (low false alarms), 79% catch rate, 81% overall reliability.
- **Global feature importance** — the relative weight of each risk factor across all active accounts.
- **Portfolio health distribution** — the book of business broken down by health tier (Healthy / Monitor / At Risk / Critical) and the revenue in each.
- **Recommended action + save flow** — a concrete next step and tailored retention offer per at-risk account, with a guided cancel-deflection flow.
- **Role views** — tailored perspectives for CSM, Executive, and Analyst.

---

## Setup & running the project (for judges)

ChurnRadar is a **single self-contained HTML file** (`index.html`). All UI, interactions, and demo data are inlined — there is **no build step, no server, and no dependencies to install**.

### Option 1 — Open directly (fastest)

1. Download or clone this repository.
2. Double-click `index.html`, or open it in any modern browser (Chrome, Edge, Firefox, Safari).

That's it — the full dashboard loads offline.

### Option 2 — Serve locally (recommended)

From the project folder, run any static file server:

    # Python 3
    python3 -m http.server 8000

    # or Node
    npx serve .

Then open **http://localhost:8000** in your browser.

### Option 3 — Live hosted version

No setup at all — just visit **https://adriannn31.github.io/churnradar/**

---

## Notes

- Best viewed on a desktop browser at ≥1280px width.
- All data shown is illustrative / mock data for demonstration.
- No API keys, environment variables, or accounts are required.

---
