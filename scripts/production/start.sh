#!/bin/sh

# Run the application on the production server

docker compose -f docker-compose.yml -f docker-compose.production.yml up
