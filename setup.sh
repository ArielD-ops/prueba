#!/bin/bash

# Setting up PostgreSQL database
echo "Setting up PostgreSQL database..."
psql -U postgres -c "CREATE DATABASE notes_app;" || { echo "Database creation failed"; exit 1; }

# Installing backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install || { echo "Backend npm install failed"; exit 1; }
cd ..

# Installing frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install || { echo "Frontend npm install failed"; exit 1; }
cd ..

echo "Setup complete! Run './run.sh' to start the app."