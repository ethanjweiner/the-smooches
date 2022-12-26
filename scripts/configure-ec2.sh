#!/bin/bash

ssh -i "./aws/ec2-key-pair.cer" ubuntu@18.210.251.134 "cd ~/smooches && sudo docker compose down"
mkdir -p ./smooches/backend
mkdir ./smooches/frontend
cp ./docker-compose.yml ./smooches
cp ./docker-compose.production.yml ./smooches
cp ./scripts/production.sh ./smooches
cp ./scripts/pull.sh ./smooches
cp ./backend/.env.prod ./smooches/backend
ssh -i "./aws/ec2-key-pair.cer" ubuntu@18.210.251.134 rm -rf ./smooches
scp -r -i "./aws/ec2-key-pair.cer" ./smooches ubuntu@18.210.251.134:~
rm -r ./smooches
ssh -i "./aws/ec2-key-pair.cer" ubuntu@18.210.251.134 "cd ~/smooches && sudo sh ./pull.sh && sudo sh ./production.sh"
