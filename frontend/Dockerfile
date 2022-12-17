FROM nginx as prod

COPY container /
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

FROM node:19-alpine as dev