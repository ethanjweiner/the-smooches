#!/bin/bash

# Export env vars
export $(grep -v '^#' .env | xargs)