## 🐶 Bone Appétit – Pet-Friendly Places & Reviews

A full-stack web application that helps users discover and review pet-friendly places, enhanced with AI-powered insights and location-aware search.

## ✨ Features
### 📍 Location-Based Discovery
- Automatically detects user location (with permission)
- Centers map on nearby area
- Provides location-biased search suggestions using `Geoapify`

### 🗺️ Interactive Map
- Displays places as markers using `Leaflet`
- Click a marker to view:
  - Place details
  - User reviews
  - AI-generated summary

### 🤖 AI-Powered Features
1. 🧠 AI Summary
- Generate a summary of all reviews for a place
- Helps users quickly understand overall sentiment
- Includes typewriter animation for better UX
2. ✨ AI Review Polishing
- Improve clarity and readability of user-written reviews
- Preserves original meaning and tone
- Helps users write better content before posting

### 📝 Create Reviews
- Add a new review with:
  - Place name (with autocomplete)
  - Address + coordinates
  - Category selection
  - Rating (1–5)
- Automatically creates or reuses places in the database

### 🔎 Smart Autocomplete
- Powered by `Geoapify`
- Suggests real-world places as you type
- Prioritizes results near the user's location

## 🏗️ Tech Stack
### Frontend
- React (Vite)
- SCSS
- React Leaflet
- React Testing Library + Vitest
### Backend
- Node.js
- Express
- PostgreSQL
### APIs
- Geoapify (Geocoding & Autocomplete)
- Gemini (AI Summary & Review Polishing)

## 🚀 Getting Started
1. Clone the repository: `git clone https://github.com/sylviajsy/Bone-App-tit.git`
2. Set Up the Backend
  - `cd server`
  - `npm install`
3. Inside your server folder, create an `.env` file with `touch .env`
4. Create the database if you haven't already: `createdb bone_appetit`
5. Load the schema and seed data:
  - Option A: If your Postgres requires a username
   `psql -U <your_username> -d bone_appetit -f server/db/schema.sql`
   `psql -U <your_username> -d bone_appetit -f server/db/seed.sql`
    You will be prompted to enter your Postgres password.

  -  Option B: If your Postgres is already authenticated locally
   `psql -d bone_appetit -f server/db/schema.sql`
   `psql -d bone_appetit -f server/db/seed.sql`
  - Note:
    Run schema.sql before seed.sql to ensure tables are created before inserting data.
6. Inside your both server and client folder, open the file `.env.example` and copy the correct option for your configuration found there to your new `.env` file.
7. Go to the `client` folder in the project (`cd .. and cd client`) and run the command `npm install`
8. Go to `http://localhost:5173/`
