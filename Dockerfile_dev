ARG NODE_VERSION=22.0.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build

## Stage 2 (Production)
FROM nginx:1.27.2-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Remplacer ${PORT} par la valeur réelle avant de démarrer Nginx
RUN envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/awi /usr/share/nginx/html

