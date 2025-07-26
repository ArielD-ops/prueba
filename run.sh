#!/bin/bash

# run.sh
# This script gets the Full Stack Notes app up and running.
# Make sure you have Node.js (with npm) and PostgreSQL installed!

echo "Let’s get the Notes app started!"

# --- 1. Set up backend environment ---
echo "Checking for backend .env file..."
if [ ! -f backend/.env ]; then
  echo "No .env file found. Let’s create one!"
  read -p "What’s your PostgreSQL username? (e.g., postgres): " DB_USER
  read -s -p "What’s your PostgreSQL password? (Shh, it’s secret): " DB_PASSWORD
  echo "" # Just a new line after the password
  read -p "Database host? (e.g., localhost): " DB_HOST
  read -p "Database name? (e.g., notes_db): " DB_NAME

  cat << EOF > backend/.env
PORT=5000
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_HOST=${DB_HOST}
DB_NAME=${DB_NAME}
EOF
  echo "Created backend/.env. You’re good to go!"
else
  echo "Backend .env file already exists. Skipping this step."
fi

# --- 2. Install backend dependencies ---
echo "Installing backend stuff..."
cd backend
npm install
if [ $? -ne 0 ]; then
  echo "Oops, something went wrong installing backend dependencies. "
  exit 1
fi
cd .. # Back to the main folder

# --- 3. Install frontend dependencies ---
echo "Now setting up the frontend..."
cd frontend
npm install
if [ $? -ne 0 ]; then
  echo "Uh-oh, frontend dependencies didn’t install correctly. "
  exit 1
fi
cd .. # Back to the main folder again

# --- 4. Set up frontend environment ---
echo "Checking for frontend .env.local file..."
if [ ! -f frontend/.env.local ]; then
  echo "REACT_APP_API_BASE_URL=http://localhost:5000/api" > frontend/.env.local
  echo "Created frontend/.env.local. All set!"
else
  echo "Frontend .env.local already exists. Moving on!"
fi

# --- 5. Start the backend ---
echo "Firing up the backend server..."
nohup npm run start:dev > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend is running (PID: $BACKEND_PID). Check backend.log for details."

# Give the backend a sec to wake up
echo "Hold on 10 seconds while the backend gets ready..."
sleep 10

# --- 6. Start the frontend ---
echo "Starting the frontend..."
nohup npm run start > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend is live (PID: $FRONTEND_PID). Check frontend.log for details."

# --- All done! ---
echo "Woohoo! The app is running!"
echo "Visit the frontend at http://localhost:3000 (or whatever port React picks)."
echo "Backend is at http://localhost:5000."
echo "To stop everything, run: kill $BACKEND_PID $FRONTEND_PID"
echo "Check logs with: tail -f backend.log or tail -f frontend.log"