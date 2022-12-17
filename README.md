# My Dogs

A slideshow of my dogs.

### Development

- Run `docker compose -f docker-compose.development.yml up` (spins up frontend and backend servers)
- Open React app at `http://localhost:3000` to test frontend and frontend-backend interaction
- Test backend API only at `http://localhost:8080`

### Production

- `npm run build`
- Build & deploy Docker image with `docker build 
- Configure container service (or instancee) with `docker-compose.production.yml`