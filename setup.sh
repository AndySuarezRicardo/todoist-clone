#!/bin/bash

echo "========================================"
echo "  TODOIST CLONE - QUICK SETUP"
echo "========================================"
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    echo "Install from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker is not running"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

echo "[1/4] Stopping existing containers..."
docker-compose down

echo ""
echo "[2/4] Creating environment files..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env"
fi

if [ ! -f frontend/.env ]; then
    echo "VITE_API_URL=http://localhost:5000/api/v1" > frontend/.env
    echo "Created frontend/.env"
fi

echo ""
echo "[3/4] Building and starting containers..."
echo "This may take 5-10 minutes on first run..."
docker-compose up --build -d

echo ""
echo "[4/4] Waiting for database to be ready..."
sleep 15

echo ""
echo "Running database migrations..."
docker-compose exec -T backend npm run migrate

echo ""
echo "========================================"
echo "  ✅ SETUP COMPLETE!"
echo "========================================"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000/health"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop:      docker-compose down"
echo ""
