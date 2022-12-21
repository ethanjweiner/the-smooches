#!/bin/sh

# TODO: Remove `--build` for production to avoid 
docker compose -f docker-compose.production.yml up --build 