# 🌙 THE MOON — Flame in Freefall

**AI-Powered Fire Safety Insights from Microgravity Combustion Data**

## 📌 Project Overview

THE MOON is a NASA Hackathon project focused on understanding fire behavior in microgravity environments. The project aims to make combustion experiment data easier to explore, compare, and understand through an interactive dashboard.

It provides a user-friendly interface for exploring experimental data, comparing combustion experiments, viewing insights, and understanding data quality.

## 🎯 Project Objectives

- Explore fire behavior in microgravity environments.
- Visualize combustion experiment data.
- Compare different experiments and their results.
- Present AI-driven insights in an accessible dashboard.
- Make scientific data easier to understand through interactive visualizations.

## ✨ Key Features

- **Overview Dashboard:** A summary of experiment data and key information.
- **Experiment Explorer:** Browse and explore individual experiments.
- **Experiment Comparison:** Compare multiple experiments and their measurements.
- **AI Insights:** Dedicated interface for presenting AI-powered insights.
- **Data Quality:** Explore data quality and validation information.
- **Experiment Details:** View detailed information about individual experiments.
- **Settings:** Manage dashboard preferences.

## 🛠️ Technology Stack

- React.js
- JavaScript
- Vite
- Recharts
- Lucide React
- CSS

## 👨‍💻 My Role — Frontend Developer

I was responsible for the frontend development of this project.

My contributions included:

- Designed and developed the interactive dashboard interface.
- Built reusable React components.
- Implemented responsive layouts for different screen sizes.
- Developed dashboard pages including Overview, Explorer, Comparison, AI Insights, Data Quality, Details, and Settings.
- Integrated charts and data visualizations using Recharts.
- Implemented experiment selection and comparison interfaces.
- Organized the frontend architecture to support future backend and API integration.

## 🚀 Project Status

Frontend development completed. The project interface currently uses mock data and is structured to support backend and AI/RAG integration.

## 🏆 Hackathon

Developed as part of a NASA-themed hackathon project focused on **Fire in Microgravity**.

---

**Developed by:** Hammad Shafique  
**Role:** Frontend Developer  
**GitHub:** [HammadShafique874](https://github.com/HammadShafique874)

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Install and run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Mock data now, real API later
- Default is **mock mode** (`VITE_USE_MOCK_DATA=true`): an in-browser mock backend answers every endpoint with the standard envelope.
- Mock records are fictional (`MOCK-*` ids, `data_status: "mock"`, `measurement_status: "illustrative"`) and are labelled in the UI. They are **not NASA findings**.
- To use the backend, copy `.env.example` to `.env.local`, set `VITE_USE_MOCK_DATA=false` and `VITE_API_BASE_URL=http://localhost:8000`, restart Vite.
- Full endpoint/field list and open questions: [`docs/API_INTEGRATION.md`](docs/API_INTEGRATION.md).

## Structure
```
src/
  types/schemas.ts      TypeScript mirror of Section 4 schemas + envelope + requests
  types/view.ts         ExperimentView used by the existing pages
  config/env.ts         mock/real switch, base URL, units for conditions
  services/apiClient.ts transport + envelope validation (mock or fetch)
  services/api.ts       one function per endpoint (only module pages use for data)
  services/adapters.ts  schema -> ExperimentView
  data/mock/            mock backend + mock Experiment/Measurement/Source records
  hooks/                useDashboardData (app-level), useAsyncData (generic)
  components/ui/        StatusBadge, StateNotice, Tag, MockNotice, CvResultCard
  pages/                Overview, Explorer, Details, Comparison, AIInsights, DataQuality, Settings
```

## Page ⇄ schema mapping
| Page | Schemas / endpoints |
|---|---|
| Overview | Experiment, AnalysisResult |
| Experiment Explorer | Experiment (+ Measurement.conditions for filters) |
| Experiment Details | Experiment, Measurement, Source |
| Comparison | Comparison (POST /comparison), Measurement |
| AI Insights | Insight (POST /assistant/ask) |
| Data Quality | AnalysisResult.data_quality, Source |
