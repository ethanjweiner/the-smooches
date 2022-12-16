# base image (used in both dev & prod)
FROM node:19-alpine as base

FROM base as prod

WORKDIR /opt/node-app
COPY package*.json ./
RUN npm install
COPY build ./build
EXPOSE 8080
CMD ["node", "build/index.js"]

FROM base as dev