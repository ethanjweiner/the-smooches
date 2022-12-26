# My Dogs

A slideshow of my dogs.

### Development/Testing

- Make sure you have Docker installed
- Navigate into the project repo and run `sh ./scripts/develop.sh`
- Open React app at `http://localhost:3000` to test frontend and frontend-backend interaction
- Test backend API only at `http://localhost:8080`

## Production

- Run build and push scripts to create images
- Run configure ec2 script to send and run docker compose on ec2
- EC2 instance should automatically be configured with latest images