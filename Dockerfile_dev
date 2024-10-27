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

# Copy template file to configure Nginx
COPY nginx.conf.template /etc/nginx/nginx.conf.template

COPY --from=build /usr/src/app/dist/awi /usr/share/nginx/html

# Substitute the ${PORT} variable and display its value before starting Nginx but /!\ AFTER THE BUILD | The .env HEROKU variables are set after the build /!\
CMD ["/bin/sh", "-c", "echo 'Le port utilisé est: ${PORT}' && envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]