# 1Fi EMI Shopping App

A full-stack product page for buying smartphones on EMI plans backed by mutual funds — built for the 1Fi SDE1 Full Stack Developer assignment.

**Live Demo:** https://1fi-emi-app-smoky.vercel.app
**Backend API:** https://onefi-emi-app-backend.onrender.com
**Demo Video:** https://drive.google.com/file/d/106UjE0fcxluW4WFtUckteL8yn3gc6orB/view?usp=sharing`

## Tech Stack

**Frontend:** React (Vite), React Router, Tailwind CSS, Axios
**Backend:** Node.js, Express
**Database:** MongoDB (Mongoose), hosted on MongoDB Atlas

## Key Design Decision: Dynamic EMI Calculation

EMI plans are **not** hardcoded monthly amounts. The database stores plan *rules* (tenure, interest rate, cashback), and the backend computes the actual monthly payment at request time using the standard reducing-balance EMI formula:
EMI = P × r × (1+r)^n / ((1+r)^n − 1)


where `P` is the variant's price, `r` is the monthly interest rate, and `n` is the tenure in months. This means monthly amounts always reflect real, database-driven pricing — nothing is precomputed or faked.

## Schema

**Product**
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| slug | String | required, unique — used in the URL |
| brand | String | required |
| category | String | required |
| description | String | |
| variants | [Variant] | required, 2+ per product |
| emiPlanRules | [EMIPlanRule] | required |

**Variant** (embedded)
| Field | Type | Notes |
|---|---|---|
| variantName | String | e.g. "256GB - Silver" |
| attributes.storage | String | |
| attributes.color | String | |
| mrp | Number | |
| price | Number | |
| image | String | |
| stock | Number | default 10 |

**EMIPlanRule** (embedded)
| Field | Type | Notes |
|---|---|---|
| tenureMonths | Number | |
| interestRate | Number | annual %, 0 for interest-free plans |
| cashback | Number | default 0 |

## API Endpoints

### `GET /api/products`
Returns all products with basic info (used for the homepage grid).

**Example response:**
```json
[
  {
    "_id": "...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "variants": [{ "mrp": 134900, "price": 127400, "image": "/images/iphone-silver.jpg" }]
  }
]
```

### `GET /api/products/:slug`
Returns a single product with all variants and their computed EMI plans.

**Example response:**
```json
{
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "brand": "Apple",
  "variants": [
    {
      "variantName": "256GB - Silver",
      "attributes": { "storage": "256GB", "color": "Silver" },
      "price": 127400,
      "emiPlans": [
        { "tenureMonths": 3, "interestRate": 0, "cashback": 7500, "monthlyAmount": 42467 }
      ]
    }
  ]
}
```

## Setup & Run Locally

### Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

Seed the database:
```bash
node seed/seed.js
```
Start the server:
```bash
npm run dev
```
API runs on `http://localhost:5000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`.

## Features

- Dynamic product pages with unique URLs per product (`/products/:slug`)
- Independent storage and color selectors (not locked combinations) for products with multiple attribute types
- Selectable EMI plans with live-computed monthly amounts
- Responsive layout

