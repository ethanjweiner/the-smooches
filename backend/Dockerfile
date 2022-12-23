# base image (used in both dev & prod)
FROM node:19-alpine as base

WORKDIR /backend
COPY . .
RUN npm ci 
# RUN npm install

FROM base as prod

ENV NODE_ENV production
RUN npm run build
RUN rm -r ./src
CMD ["node", "build/index.js"]

FROM base as dev

ENV NODE_ENV development
CMD ["npm", "run", "dev"]