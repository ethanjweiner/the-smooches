#!/bin/sh

cd backend
npm run build-all
cd ..
cd frontend
npm run build-all
cd ..

# Tet build locally
docker-compose -f docker-compose.production.yml up