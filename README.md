# 🛡️ Name Classification API (HNG Stage 1)

A robust **Node.js/Express** API designed for the HNG Stage 1 Backend task. This service integrates multiple external data sources to classify names based on gender, age, and nationality, utilizing **MongoDB Atlas** for persistence and **UUID v7** for unique identification.

## 🚀 Live Demo
**API Endpoint:** `https://your-app-name.vercel.app/api/profiles`

---

## ✨ Features
- **External API Integration:** Consumes Genderize.io, Agify.io, and Nationalize.io.
- **Persistent Storage:** MongoDB Atlas integration for historical data tracking.
- **Idempotency:** Prevents duplicate processing and redundant external API calls.
- **Standardized Responses:** Clean JSON output with appropriate HTTP status codes.
- **Advanced ID System:** Implementation of UUID v7 (Time-ordered identifiers).
- **CORS Enabled:** Ready for cross-origin frontend consumption.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **HTTP Client:** Axios
- **Deployment:** Vercel

---

## 🚦 API Endpoints

### 1. Create Profile
`POST /api/profiles`
```json
{
  "name": "ella"
}