#!/bin/bash

mkdir -p ./smooches/backend
mkdir ./smooches/frontend
cp ./docker-compose.yml ./smooches
cp ./docker-compose.production.yml ./smooches
cp ./scripts/production.sh ./smooches
cp ./backend/.env.prod ./smooches/backend
ssh -i "./aws/ec2-key-pair.cer" ubuntu@ec2-54-89-237-229.compute-1.amazonaws.com rm -rf ./smooches
scp -r -i "./aws/ec2-key-pair.cer" ./smooches ubuntu@ec2-54-89-237-229.compute-1.amazonaws.com:~
rm -r ./smooches