# ChurnRadar

**AI-powered churn prevention for B2B SaaS.** ChurnRadar surfaces which accounts are about to churn, explains *why* in plain language, and points your CSMs at the one action that saves the revenue.

🔗 **Live demo:** https://adriannn31.github.io/churnradar/

---

## The problem

By the time a B2B account cancels, it's too late. Renewal dashboards show *lagging* health scores and a wall of metrics — but not **which** accounts to act on, **why** they're at risk, or **what** to do about it. CSMs drown in data and still get surprised by churn.

## What ChurnRadar does

- **Priority queue** — accounts ranked by churn risk × revenue at stake, so CSMs work the highest-leverage saves first.
- **Explainable risk (SHAP)** — every score breaks down into the exact factors pushing it up or down (usage depth, login recency, decision-maker activity, support load), shown as a precision contribution chart. No black box.
- **Business-friendly model card** — model performance translated into plain value: *91% predictive accuracy, 84% precision (low false alarms), 79% catch rate.*
- **Global feature importance** — the relative weight of each risk factor across all active accounts.
- **Recommended action + save flow** — a concrete next step and retention offer for each at-risk account.
- **Role views** — tailored perspectives for CSM, Executive, and Analyst.

## Highlights

- Clean, production-grade UI with explainable-AI visualizations
- Portfolio health distribution and per-role usage insights
- Fully self-contained — no backend, no build step, runs anywhere

## Tech

Single self-contained HTML file (`index.html`) — all UI, interactions, and mock data inlined. No dependencies, no build, works fully offline. Just open it in a browser or host it on any static server.

## Run locally

Clone the repo, then open `index.html` in any browser. Or serve it:

    python3 -m http.server 8000
    # visit http://localhost:8000

## Deploy (GitHub Pages)

Configured under Settings → Pages → Deploy from a branch → main / root.

---

