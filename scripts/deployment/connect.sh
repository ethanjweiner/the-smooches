#!/bin/bash

# Connect to the EC2 instance host for configuration & debugging
source ./scripts/load-env.sh

ssh -i "./aws/ec2-key-pair.cer" ubuntu@"$IP_ADDRESS"