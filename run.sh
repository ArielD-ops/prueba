#!/bin/bash

# Starting backend
echo "Starting backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# Starting frontend
echo "Starting frontend..."
cd frontend
npm run start &
FRONTEND_PID=$!
cd ..

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID