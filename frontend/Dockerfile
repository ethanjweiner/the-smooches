# Builder Stage: Install dependencies and produce build
FROM node:19-alpine as builder

WORKDIR /frontend
COPY . .
RUN npm ci
RUN npm run build

# Production Stage: Copy static build files from build stage to Nginx
FROM nginx as prod

ENV NODE_ENV production
WORKDIR /frontend
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY container /
CMD ["nginx", "-g", "daemon off;"]

# Development: Just provision a Node RTE
FROM node:19-alpine as dev

WORKDIR /frontend
ENV NODE_ENV development
CMD ["npm", "start"]