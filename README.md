# AgriSahayak / అగ్రి సహాయక్

A bilingual, mobile-first agriculture guidance website for Indian farmers, with an emphasis on Telugu-speaking farmers in Andhra Pradesh and Telangana.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
```

## Included

- English and Telugu interface with persisted language preference
- Search across crops, crop protection, natural farming and schemes
- Five expandable crop guides with saved-guide support
- Five crop-protection entries with a safety-first approach and browser text-to-speech
- Five natural-farming practice guides with clear verification and transcript states
- Five official-government-sourced scheme cards and a non-binding scheme finder
- Land-area and seed-estimate calculators that avoid inventing agronomic rates
- Responsive mobile navigation, accessibility focus states and PWA manifest foundation

## Content safety

Crop-protection doses, current scheme eligibility, exact natural-input recipes and video links are intentionally not invented. The interface explicitly directs users to current local advice and official sources where verification is required.

## Data structure

All initial content lives in `src/data/content.js`; UI and route logic live in `src/App.jsx`. This keeps content ready to migrate to a CMS or API later.
