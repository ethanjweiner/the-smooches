# The Smooches 🐾

[The Smooches](https://thesmooches.com/) is a minimal slideshow application of my two dogs (my family calls them the "smooches"). Uploads to the slideshows of my dogs require admin authentication, but there is a public slideshow to which any user can upload.

I built this small application to experiment with React, Typescript, Docker/containerization, AWS services (EC2, S3, CloudFront, IAM). It consists of a minimal, partially-automated deployment pipeline in which the application moves through a series of deployment environments (development, staging, and production). 

## Testing and Deployment

- `npm run dev`: Test the application in a local containerized runtime with hot-reload. You must have Docker installed and running.
  - Open React app at `http://localhost:3000`
  - Test backend at `http://localhost:8080`
- `npm run stage`: Create a staging environment to test before deployment
- `npm run deploy`: Deploy the application to public EC2 host instance

## Future Improvements

- Testing: This application has a need for tests (frontend/backend unit tests, integration tests, and E2E tests). Furthermore, a proper testing environment needs to be setup.
- Debugging: The application lacks standard debugging procedures.
- Full User Base: The application should support any number of authenticated users, each of whom has their own collection of private buckets.
- Create a client certificate to enable full end-to-end Encryption. Currently, the application uses CloudFlare edge certificates to enable traffic over HTTPS to the domain.
- CI/CD (Continuous Integration / Continuous Delivery): Fully automate the deployment process
- Shared types: Extract shared TS types to a shared source
- Deployment infrastructure improvements:
  - EC2 instance replication and auto-scaling
  - Use a managed container orchestration service
  - Host React app in an S3 bucket
  - Serverless options (esp. cloud functions)
- Optimize random image selection algorithm
