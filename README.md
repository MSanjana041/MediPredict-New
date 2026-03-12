# MediPredict

An AI-powered sports injury recovery prediction platform that helps athletes, coaches, and medical staff estimate accurate return-to-play timelines using both machine learning models and LLM-powered explanations.

## Tech Stack
- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Machine Learning**: Python, scikit-learn (Random Forest)
- **AI Integration**: Google Gemini API

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [Git](https://git-scm.com/)
- A free MongoDB Atlas cluster or local MongoDB instance
- A free Google Gemini API key (from [Google AI Studio](https://aistudio.google.com/))

---

## 🚀 Installation & Setup Steps

This application requires **three separate terminals** running concurrently (one for the backend, one for the frontend, and one for the Python ML service).

### step 1. Clone the Repository
```bash
git clone https://github.com/MSanjana041/MediPredict-New.git
cd MediPredict-New
```

### step 2. Backend Setup (Terminal 1)
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the necessary Node dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and populate it with your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
4. **Seed the database** (Optional but recommended for testing):
   ```bash
   # To clear out any existing messy data
   node seeder.js -d
   # To populate the database with fresh test data
   node seeder.js
   ```
5. Start the backend server:
   ```bash
   node server.js
   ```
   *The Node.js server should now be running on `http://localhost:5000`.*

### step 3. Machine Learning Service Setup (Terminal 2)
In order for the Random Forest predictions to execute, the Python Flask service needs to run alongside the Node server.

**Option A: Using the Windows Auto Script (Recommended for Windows)**
1. Open a new terminal in the root directory (`MediPredict-New`).
2. Run the bat file to auto-install dependencies, train the model, and start the python server:
   ```cmd
   .\run_ml_service.bat
   ```

**Option B: Manual Setup (Mac/Linux/Troubleshooting)**
1. Open a new terminal and navigate to the ML folder:
   ```bash
   cd backend/ml
   ```
2. Install required Python packages via pip:
   ```bash
   pip install pandas scikit-learn flask flask-cors joblib numpy
   ```
3. Train the model (this generates the `recovery_model.pkl` binary):
   ```bash
   python train_model.py
   ```
4. Start the ML Flask service:
   ```bash
   python app.py
   ```
   *The Python service should now be running on `http://127.0.0.1:5001`.*

### step 4. Frontend Setup (Terminal 3)
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the React dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will open in your browser at `http://localhost:5173`.*

---

## 👥 Authors & Contributors
1. Lavishka Dhamija
2. Sanjana M
3. Leena Sri K
