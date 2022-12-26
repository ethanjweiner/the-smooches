#!/bin/sh

./scripts/build-production.sh
./scripts/push.sh
./scripts/configure-ec2.sh