# German Short Stories App

A full-stack MERN application for learning German through interactive short stories. It features bilingual text highlighting and a mobile-friendly, snap-scroll interface.

### Live Demo

- **Frontend:** [https://german-short-story-app.vercel.app](https://german-short-story-app.vercel.app)
- **Backend:** [https://german-short-story-app.onrender.com](https://german-short-story-app.onrender.com)

---

### Tech Stack

- **Frontend:** React (Vite), Tailwind CSS v4, React Router DOM
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Services:** Cloudinary (Images), Atlas (Database)

---

### Quick Start (Run Locally)

Follow these steps to get the whole app running from scratch.

**1. Backend Setup**

- Navigate to the `backend` folder and install dependencies: `npm install`
- Create a `.env` file in `backend/` with:
  ```env
  PORT=4000
  MONGO_URI=
  CLOUDINARY_NAME=
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  ```
- Seed the database (uploads images & stories): `node seed.js`
- Start the server: `npm run dev`

**2. Frontend Setup**

- Open a new terminal, navigate to `frontend/` and install dependencies: `npm install`
- Create a `.env` file in `frontend/` with: `VITE_API=http://localhost:4000/api`
- Start the UI: `npm run dev`
- Visit **http://localhost:5173**

---

### Application Flow

1.  **Seeding:** The backend script uploads assets to Cloudinary and saves story text/metadata to MongoDB.
2.  **API Serving:** The Express backend provides endpoints (`/api/stories`) to fetch story data.
3.  **User Interface:** The React frontend fetches this data and renders it in a vertical "TikTok-style" feed. When a user reads a story, the app parses the text to highlight German words and show English translations in brackets.
