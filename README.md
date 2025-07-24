# Shomvob Job Board

This is the full-stack application for the Mini job board, consisting of a **backend** (Express.js, MongoDB, JWT authentication) hosted on **Railway** and a **frontend** (NextJs) hosted on **Vercel**. The backend provides APIs for managing job postings, applications, and admin authentication, while the frontend offers a user interface to interact with these APIs. The project includes unit tests, Docker containerization for the backend, and a CI/CD pipeline with GitHub Actions for automated testing and deployment.

**Note** : Use ADMIN_USERNAME=admin ADMIN_PASSWORD=secret for test live website. you can find live project in 
Live Frontend : `https://shomvob-mini-job-board.vercel.app/`
Live backend : `https://shomvob-mini-job-board-production.up.railway.app/`

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend](#backend)
  - [Installation](#backend-installation)
  - [Running Locally](#backend-running-locally)
  - [Running with Docker](#backend-running-with-docker)
  - [Testing](#backend-testing)
  - [Deploying to Railway](#backend-deploying-to-railway)
- [Frontend](#frontend)
  - [Installation](#frontend-installation)
  - [Running Locally](#frontend-running-locally)
  - [Deploying to Vercel](#frontend-deploying-to-vercel)
- [API Endpoints](#api-endpoints)

## Project Structure
```
shomvob/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   ├── __tests__/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .env
│   ├── database.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
├── .github/workflows/
│   └── ci-cd.yml
└── README.md
```

## Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Version 7 or higher
- **Docker**: Docker Desktop for local containerized setup
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas for production)
- **Railway Account**: For backend deployment ([railway.app](https://railway.app))
- **Vercel Account**: For frontend deployment ([vercel.com](https://vercel.com))
- **GitHub Account**: For CI/CD

## Backend

### Backend Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with:
   ```plaintext
   PORT=5000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/shomvob
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=secret
   ```
   Replace `your_jwt_secret` with a secure secret. Use a MongoDB Atlas URI for production.
   **Note** : Use ADMIN_USERNAME=admin ADMIN_PASSWORD=secret for test live website.

### Backend Running Locally
1. Ensure MongoDB is running locally or use a cloud instance.
2. Start the server:
   ```bash
   npm start
   ```
3. The API will be available at `http://localhost:5000`.
4. Test endpoints using Postman or browser (see [API Endpoints](#api-endpoints)).

### Backend Running with Docker
1. Ensure Docker Desktop is installed and running.
2. From the `backend/` directory, build and start services:
   ```bash
   docker-compose up --build
   ```
3. The API will be available at `http://localhost:5000`.
4. Stop containers:
   ```bash
   docker-compose down
   ```

### Backend Testing
The backend uses **Jest** and **Supertest** with **MongoDB Memory Server** for testing.
1. Run tests:
   ```bash
   npm test
   ```
2. Run tests with coverage:
   ```bash
   npm test -- --coverage
   ```

### Backend Deploying to Railway
1. Sign up or log in to Railway ([railway.app](https://railway.app)).
2. Create a new project:
   - Click "New Project" > "Deploy from GitHub Repo".
   - Select your backend repository (`shomvob/backend`).
3. Add a MongoDB service:
   - In the Railway dashboard, click "New" > "Database" > "MongoDB".
   - Note the `MONGO_URL` from the MongoDB service’s "Variables" tab.
4. Set environment variables in Railway:
   - Go to your project > "Variables" tab.
   - Add:
     ```plaintext
     PORT=3000
     JWT_SECRET=your_jwt_secret
     MONGODB_URI=your_mongodb_uri
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=secret
     ```
5. Deploy:
   - Railway automatically deploys on GitHub pushes if connected.
   - Or manually trigger deployment in the "Deployments" tab.
6. Get the app URL:
   - Go to "Deployments" > "Domains" or "Settings" > "Generate Domain".
   - Example: `https://shomvob-mini-job-board-production.up.railway.app/`.


## Frontend

### Frontend Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/` with:
   ```plaintext
   REACT_APP_API_URL=http://localhost:3000
   ```
   For production, set `REACT_APP_API_URL` to your Railway backend URL (e.g., `https://shomvob-mini-job-board-production.up.railway.app/`).

### Frontend Running Locally
1. Start the development server:
   ```bash
   npm start
   ```
2. The frontend will be available at `http://localhost:3000`
3. Ensure the backend is running to handle API requests.

### Frontend Deploying to Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel:
   ```bash
   vercel login
   ```
3. From the `frontend/` directory, deploy:
   ```bash
   cd frontend
   vercel
   ```
4. Configure during deployment:
   - Set the root directory to `frontend/` if prompted.
   - Add environment variables:
     ```bash
     vercel env add REACT_APP_API_URL production
     ```
     Enter your Railway backend URL (e.g., `https://shomvob-mini-job-board-production.up.railway.app`).
5. Access the deployed frontend via the Vercel-provided URL (e.g., `https://shomvob-mini-job-board.vercel.app/`).
6. Enable auto-deployment:
   - Link your GitHub repository in the Vercel dashboard.
   - Vercel will redeploy on every push to the `main` branch.

**Note**: Ensure the backend URL in `REACT_APP_API_URL` does not end with a `/` to avoid issues with API endpoints (e.g., use `https://shomvob-mini-job-board.vercel.app`, not `https://shomvob-backend.up.railway.app/`).


## API Endpoints
- **Auth**:
  - `POST /auth/login`: Authenticate admin (returns JWT).
    - Body: `{ "username": "admin", "password": "secret" }`
- **Jobs**:
  - `GET /jobs`: List all jobs.
  - `GET /jobs/:id`: Get a job by ID.
  - `POST /jobs`: Create a job (requires admin JWT).
    - Body: `{ "title": "Software Engineer", "companyName": "Tech Corp", ... }`
- **Applications**:
  - `GET /applications`: List all applications.
  - `POST /applications`: Submit an application.
    - Body: `{ "jobId": "job_id", "jobTitle": "Software Engineer", ... }`

## Links
Github : `https://github.com/MMamunurRashid/Shomvob-Mini-Job-Board`
Live Frontend : `https://shomvob-mini-job-board.vercel.app/`
Live backend : `https://shomvob-mini-job-board-production.up.railway.app/`
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=secret